import HeroCarousel from './HeroCarousel';
import { heroCarouselData } from '../data/heroCarousel';

const Hero = () => {
  return (
    <HeroCarousel
      images={heroCarouselData}
      autoSlideInterval={6000}
    />
  );
};

export default Hero;
