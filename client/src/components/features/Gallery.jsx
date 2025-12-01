import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = ({ images, categories, selectedCategory, onCategoryChange }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(image => image.category === selectedCategory);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 text-sm uppercase tracking-wide transition-all duration-300 border ${
                selectedCategory === category.id
                  ? 'border-black text-black bg-white'
                  : 'border-gray-300 text-gray-600 hover:border-black hover:text-black'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="wait">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden transition-all duration-300 cursor-pointer glass-card hover:scale-105"
                onClick={() => openLightbox(image, index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.image}
                    alt={image.title}
                    className="object-cover w-full h-80"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-serif text-lg">{image.title}</h3>
                  <p className="text-small">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-6xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute right-0 z-10 text-white transition-colors -top-12 hover:text-gold"
                >
                  <X size={32} />
                </button>

                {/* Navigation Buttons */}
                {filteredImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute z-10 text-white transition-colors transform -translate-y-1/2 left-4 top-1/2 hover:text-gold"
                    >
                      <ChevronLeft size={32} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute z-10 text-white transition-colors transform -translate-y-1/2 right-4 top-1/2 hover:text-gold"
                    >
                      <ChevronRight size={32} />
                    </button>
                  </>
                )}

                {/* Image */}
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />

                {/* Image Info */}
                <div className="absolute p-4 text-white rounded-lg bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm">
                  <h3 className="mb-2 font-serif text-xl font-semibold">{selectedImage.title}</h3>
                  <p className="text-gray-200">{selectedImage.description}</p>
                  <p className="mt-2 text-sm text-gray-400">
                    {currentIndex + 1} of {filteredImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
