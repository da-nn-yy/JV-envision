import HeroCarousel from './HeroCarousel';
import { heroCarouselData } from '../data/heroCarousel';
import { useHeroImages } from '../hooks/useHeroImages';

const Hero = () => {
  const { images: heroImages, loading, error } = useHeroImages();

  // Use API images if available, otherwise fall back to local images
  const imagesToUse = heroImages.length > 0 ? heroImages : heroCarouselData;

  // Show loading state if fetching from API
  if (loading && heroImages.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading images...</p>
        </div>
      </div>
    );
  }

  // Show error state if API fails but we have fallback
  if (error && heroImages.length === 0) {
    console.warn('Failed to load hero images from API, using local images:', error);
  }

  return (
    <HeroCarousel
      images={imagesToUse}
      autoSlideInterval={6000}
    />
  );
};

export default Hero;
