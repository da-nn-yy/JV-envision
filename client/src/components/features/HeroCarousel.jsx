import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { heroCarouselData, carouselConfig } from '../../data/heroCarousel';

/**
 * HeroCarousel Component
 *
 * A modern, accessible, and performant hero carousel with:
 * - Keyboard navigation (Arrow keys, Space, Enter)
 * - Touch/swipe support for mobile
 * - Image preloading for smooth transitions
 * - Smooth animations with Framer Motion
 * - Full accessibility support (ARIA labels, focus management)
 * - Auto-play with pause on hover/interaction
 *
 * @param {Object} props
 * @param {Array} props.images - Array of image objects (defaults to heroCarouselData)
 * @param {number} props.autoSlideInterval - Auto-slide interval in ms (defaults to carouselConfig)
 */
const HeroCarousel = ({
  images = heroCarouselData,
  autoSlideInterval = carouselConfig.autoSlideInterval
}) => {
  const [fetchedImages, setFetchedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next/right, -1 for prev/left
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const carouselRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${API_BASE_URL}/api/hero-images?section=hero`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const formattedImages = data.map(img => ({
              image: img.image,
              title: img.title,
              subtitle: img.subtitle,
              alt: img.title
            }));
            setFetchedImages(formattedImages);
          }
        }
      } catch (error) {
        console.error('Failed to fetch hero images:', error);
      }
    };
    fetchImages();
  }, []);

  // Determine valid images: prefer fetched, then props, then default data
  const validImages = fetchedImages.length > 0
    ? fetchedImages
    : (Array.isArray(images) && images.length > 0 ? images : heroCarouselData);

  // Ensure currentIndex is within bounds
  useEffect(() => {
    if (currentIndex >= validImages.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, validImages.length]);

  // Preload images for smooth transitions
  useEffect(() => {
    const preloadImages = () => {
      validImages.forEach((item, index) => {
        if (item?.image) {
          const img = new Image();
          // Handle both URL strings and imported image objects
          const imageUrl = typeof item.image === 'string'
            ? item.image
            : (item.image?.src || item.image);
          img.src = imageUrl;
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]));
          };
          img.onerror = () => {
            console.warn(`Failed to load image at index ${index}: ${imageUrl}`);
          };
        }
      });
    };
    preloadImages();
  }, [validImages]);

  // Auto-slide functionality with proper cleanup
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex === validImages.length - 1 ? 0 : prevIndex + 1
      );
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [validImages.length, autoSlideInterval, isAutoPlaying, isPaused]);

  // Pause auto-play temporarily after user interaction
  const pauseAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    setIsPaused(true);

    // Clear any existing timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    // Resume auto-play after configured delay
    resumeTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
      setIsPaused(false);
    }, carouselConfig.resumeAfterPause);
  }, []);

  // Navigation functions
  const goToSlide = useCallback((index) => {
    if (index === currentIndex || index < 0 || index >= validImages.length) return;

    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    pauseAutoPlay();
  }, [currentIndex, validImages.length, pauseAutoPlay]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
    pauseAutoPlay();
  }, [validImages.length, pauseAutoPlay]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
    pauseAutoPlay();
  }, [validImages.length, pauseAutoPlay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!carouselRef.current?.contains(document.activeElement) &&
          document.activeElement !== document.body) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          if (e.key === ' ' || e.key === 'Enter') {
            goToNext();
          }
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(validImages.length - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, goToSlide, validImages.length]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Enhanced slide variants with direction-aware animations
  const slideVariants = {
    enter: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
      scale: 0.95
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      scale: 0.95
    })
  };

  // Get current image data safely
  const currentImage = validImages[currentIndex] || validImages[0];
  // Handle both imported images (objects with src) and URL strings
  const imageSrc = typeof currentImage?.image === 'string'
    ? currentImage.image
    : currentImage?.image?.src || currentImage?.image || '';

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={carouselRef}
      className="relative flex items-end justify-start h-screen overflow-hidden"
      role="region"
      aria-label="Hero carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => carouselConfig.pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => carouselConfig.pauseOnHover && setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: carouselConfig.transitionDuration / 1000,
              ease: [0.25, 0.1, 0.25, 1] // Custom easing for smoother animation
            }}
            className="absolute inset-0"
          >
            <img
              src={imageSrc}
              alt={currentImage?.alt || `Hero image ${currentIndex + 1}`}
              decoding="async"
              loading={currentIndex === 0 ? "eager" : "lazy"}
              className="absolute inset-0 z-0 object-cover w-full h-full"
              style={{
                filter: loadedImages.has(currentIndex) ? 'none' : 'blur(10px)',
                transition: 'filter 0.3s ease-in-out'
              }}
            />
            {/* Dark gradient overlay - hianime style */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/10 to-black/50"></div>
            {/* Additional bottom gradient for text readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute z-30 p-4 transition-all duration-300 transform -translate-y-1/2 border rounded-full left-6 top-1/2 bg-black/40 backdrop-blur-sm border-white/20 hover:bg-black/60 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2"
        aria-label="Previous image"
        aria-controls="carousel-content"
      >
        <ChevronLeft className="text-white w-7 h-7" />
      </button>

      <button
        onClick={goToNext}
        className="absolute z-30 p-4 transition-all duration-300 transform -translate-y-1/2 border rounded-full right-6 top-1/2 bg-black/40 backdrop-blur-sm border-white/20 hover:bg-black/60 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2"
        aria-label="Next image"
        aria-controls="carousel-content"
      >
        <ChevronRight className="text-white w-7 h-7" />
      </button>

      {/* Play/Pause Button - hianime style */}
      <button
        onClick={() => {
          setIsAutoPlaying(!isAutoPlaying);
          setIsPaused(!isAutoPlaying);
        }}
        className="absolute z-30 p-3 transition-all duration-300 transform border rounded-full top-6 right-6 bg-black/40 backdrop-blur-sm border-white/20 hover:bg-black/60 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2"
        aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
        aria-pressed={isAutoPlaying}
      >
        {isAutoPlaying ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Content - Bottom Left */}
      <div id="carousel-content" className="relative z-20 px-4 pb-16 md:pb-20 lg:pb-24 container-custom md:px-6 lg:px-8 w-full flex justify-start">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl text-left"
        >
          {/* Main Content - Clean, no heavy glassmorphism */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mr-auto"
          >
            {/* Dynamic Title - Large and bold */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="mb-6 font-serif text-4xl font-bold leading-tight text-white md:text-5xl lg:text-7xl drop-shadow-2xl"
            >
              {currentImage?.title || 'Professional Photography'}
            </motion.h1>

            {/* Dynamic Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl mb-10 mr-auto text-lg leading-relaxed text-gray-300 md:text-xl lg:text-2xl drop-shadow-lg"
            >
              {currentImage?.subtitle || 'Capturing your precious moments with artistic vision and professional excellence'}
            </motion.p>

            {/* CTA Buttons - More prominent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-start gap-4 sm:flex-row sm:justify-start"
            >
              <Link
                to="/contact"
                className="px-10 py-5 text-lg font-bold text-white transition-all duration-300 rounded-lg shadow-xl bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2"
              >
                Book Session
              </Link>
              <Link
                to="/portfolio"
                className="px-10 py-5 text-lg font-semibold text-white transition-all duration-300 border-2 rounded-lg bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 hover:border-white/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                View Work
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators - hianime style */}
      <div className="absolute z-30 transform -translate-x-1/2 bottom-12 left-1/2" role="tablist" aria-label="Carousel slides">
        <div className="flex items-center gap-2 px-4 py-2 border rounded-full bg-black/40 backdrop-blur-sm border-white/20">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-controls={`slide-${index}`}
              className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:ring-offset-2 ${
                index === currentIndex
                  ? 'w-10 h-2 bg-[var(--color-gold)]'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/75 hover:scale-125'
              }`}
              aria-label={`Go to slide ${index + 1} of ${validImages.length}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar - hianime style */}
      {isAutoPlaying && !isPaused && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-[var(--color-gold)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: autoSlideInterval / 1000,
            ease: "linear",
            repeat: Infinity
          }}
          style={{ transformOrigin: 'left' }}
        />
      )}
    </section>
  );
};

export default HeroCarousel;
