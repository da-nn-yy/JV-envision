import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

// Local fallback images
import img1 from '../assets/461536396_939926458181536_7671039877354462553_n.jpg';
import img2 from '../assets/461604277_939926484848200_7841378582899541348_n.jpg';
import img3 from '../assets/461724997_939926404848208_1948535839748304294_n.jpg';
import img4 from '../assets/461768881_939926504848198_1174208919682756014_n.jpg';
import img5 from '../assets/461774174_939926364848212_5235190980017089231_n.jpg';
import img6 from '../assets/462125915_988534479951844_4076670015032483735_n.jpg';

const HeroCarousel = ({ autoSlideInterval = 5000 }) => {
  const defaultImages = [
    { id: 1, image: img1, title: 'Elegant Wedding Photography', subtitle: 'Capturing your special day with artistic vision', alt: 'Elegant wedding moment' },
    { id: 2, image: img2, title: 'Family Portrait Sessions', subtitle: 'Timeless memories for generations to come', alt: 'Family portrait outdoors' },
    { id: 3, image: img3, title: 'Destination Weddings', subtitle: 'Adventure and romance captured beautifully', alt: 'Destination wedding scene' },
    { id: 4, image: img4, title: 'Senior Portrait Photography', subtitle: "Celebrating life's milestones with style", alt: 'Senior portrait session' },
    { id: 5, image: img5, title: 'Maternity Photography', subtitle: 'The beauty of new life and love', alt: 'Maternity photography session' },
    { id: 6, image: img6, title: 'Event Photography', subtitle: "Documenting life's celebrations", alt: 'Event and celebration photo' }
  ];

  const images = defaultImages; // Force local images to ensure visibility
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for next/right, -1 for prev/left

  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval, isAutoPlaying]);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative flex items-center justify-start min-h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={images?.[currentIndex]?.image || 'https://via.placeholder.com/2560x1440?text=Image+unavailable'}
              alt={images?.[currentIndex]?.alt || 'Hero image'}
              decoding="async"
              loading="eager"
              className="absolute inset-0 z-0 w-full h-full object-cover"
            />
            {/* Gradient overlay (hianime-like) */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-20 h-20 top-20 left-10 glass-card float-animation"
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
        >
          <Heart className="w-5 h-5 text-yellow-500 m-3.5" />
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute z-20 p-3 transition-all duration-300 transform -translate-y-1/2 rounded-full left-4 top-1/2 glass-button hover:scale-110"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute z-20 p-3 transition-all duration-300 transform -translate-y-1/2 rounded-full right-4 top-1/2 glass-button hover:scale-110"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Content */}
      <div className="relative z-20 container-custom">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto md:mx-0 text-left"
        >
          {/* Text container aligned to gradient side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="p-8 md:p-12 mb-8 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl max-w-2xl"
          >
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-6 minimal-heading glass-text"
            >
              JV Envision Photography
            </motion.h1>

            {/* Dynamic Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-4 font-serif text-3xl font-semibold md:text-4xl text-white"
            >
              {images[currentIndex].title}
            </motion.h2>

            {/* Dynamic Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mb-8 text-lg text-gray-200"
            >
              {images[currentIndex].subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-4 mt-12 sm:flex-row"
            >
              <Link
                to="/contact"
                className="px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-lg btn-primary hover:scale-105"
              >
                Book Session
              </Link>
              <Link
                to="/portfolio"
                className="px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-lg btn-secondary hover:scale-105"
              >
                View Work
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="grid grid-cols-2 gap-6 mt-16 md:grid-cols-4"
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
                transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                className="p-6 text-center glass-card"
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

      {/* Debug overlay removed after verification */}

      {/* Slide Indicators */}
      <div className="absolute z-20 transform -translate-x-1/2 bottom-8 left-1/2">
        <div className="flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-yellow-500 scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="absolute z-20 transform -translate-x-1/2 bottom-8 left-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-white bg-opacity-50"
        />
      </motion.div>
    </section>
  );
};

export default HeroCarousel;
