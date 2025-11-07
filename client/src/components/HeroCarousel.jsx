import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Camera, Sparkles, Heart, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { heroCarouselData, carouselConfig } from '../data/heroCarousel';

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
  // Validate and ensure images array is not empty
  const validImages = Array.isArray(images) && images.length > 0 ? images : heroCarouselData;

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
          img.src = typeof item.image === 'string' ? item.image : item.image.src || item.image;
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]));
          };
          img.onerror = () => {
            console.warn(`Failed to load image at index ${index}`);
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
  const imageSrc = currentImage?.image?.src || currentImage?.image || '';

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
      className="relative flex items-center justify-start min-h-screen overflow-hidden"
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
              className="absolute inset-0 z-0 w-full h-full object-cover"
              style={{
                filter: loadedImages.has(currentIndex) ? 'none' : 'blur(10px)',
                transition: 'filter 0.3s ease-in-out'
              }}
            />
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            {/* Subtle vignette effect */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.2) 100%)'
              }}
            ></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-20 h-20 top-20 left-10 glass-card float-animation"
          aria-hidden="true"
        >
          <Camera className="w-8 h-8 m-6 text-yellow-500" />
        </motion.div>

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-16 h-16 top-40 right-20 glass-card float-animation"
          aria-hidden="true"
        >
          <Sparkles className="w-6 h-6 m-5 text-yellow-500" />
        </motion.div>

        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute w-12 h-12 bottom-40 left-20 glass-card float-animation"
          aria-hidden="true"
        >
          <Heart className="w-5 h-5 text-yellow-500 m-3.5" />
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute z-30 p-3 transition-all duration-300 transform -translate-y-1/2 rounded-full left-4 top-1/2 glass-button hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        aria-label="Previous image"
        aria-controls="carousel-content"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute z-30 p-3 transition-all duration-300 transform -translate-y-1/2 rounded-full right-4 top-1/2 glass-button hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        aria-label="Next image"
        aria-controls="carousel-content"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={() => {
          setIsAutoPlaying(!isAutoPlaying);
          setIsPaused(!isAutoPlaying);
        }}
        className="absolute z-30 p-3 transition-all duration-300 transform rounded-full top-4 right-4 glass-button hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
        aria-pressed={isAutoPlaying}
      >
        {isAutoPlaying ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Content */}
      <div id="carousel-content" className="relative z-20 container-custom px-4 md:px-6">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto md:mx-0 text-left"
        >
          {/* Text container with enhanced glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="p-8 md:p-12 mb-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl max-w-2xl shadow-2xl"
          >
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="mb-6 minimal-heading glass-text text-4xl md:text-5xl lg:text-6xl"
            >
              JV Envision Photography
            </motion.h1>

            {/* Dynamic Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="mb-4 font-serif text-3xl font-semibold md:text-4xl lg:text-5xl text-white leading-tight"
            >
              {currentImage?.title || 'Professional Photography'}
            </motion.h2>

            {/* Dynamic Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              className="mb-8 text-lg md:text-xl text-gray-200 leading-relaxed"
            >
              {currentImage?.subtitle || 'Capturing your precious moments'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-start gap-4 mt-12 sm:flex-row"
            >
              <Link
                to="/contact"
                className="px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-lg btn-primary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                Book Session
              </Link>
              <Link
                to="/portfolio"
                className="px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-lg btn-secondary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                View Work
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4 md:gap-6 mt-12 md:mt-16 md:grid-cols-4"
            role="group"
            aria-label="Photography statistics"
          >
            {[
              { number: '200+', label: 'Weddings' },
              { number: '500+', label: 'Happy Clients' },
              { number: '5', label: 'Years Experience' },
              { number: '1000+', label: 'Photos Delivered' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                className="p-6 text-center glass-card hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-2 font-serif text-2xl font-bold text-white md:text-3xl">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators - Fixed positioning */}
      <div className="absolute z-30 transform -translate-x-1/2 bottom-8 left-1/2" role="tablist" aria-label="Carousel slides">
        <div className="flex space-x-3">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-controls={`slide-${index}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
                index === currentIndex
                  ? 'bg-yellow-500 scale-125 w-8'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1} of ${validImages.length}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && !isPaused && (
        <motion.div
          className="absolute z-30 bottom-0 left-0 right-0 h-1 bg-yellow-500/30"
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
