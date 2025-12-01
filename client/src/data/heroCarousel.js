/**
 * Hero Carousel Data Configuration
 *
 * This module exports the hero carousel data for JV Envision Photography.
 * Each item includes optimized metadata for SEO, accessibility, and performance.
 *
 * @module heroCarousel
 */

// Local hero images - optimized imports
import img1 from '../assets/Screenshot 2025-11-11 225649.png';
import img2 from '../assets/Screenshot 2025-11-11 225709.png';
import img3 from '../assets/Screenshot 2025-11-11 225728.png';
import img4 from '../assets/Screenshot 2025-11-11 225745.png';
import img5 from '../assets/Screenshot 2025-11-11 225758.png';

/**
 * Hero carousel data for JV Envision Photography
 *
 * @type {Array<Object>}
 * @property {number} id - Unique identifier for each carousel item
 * @property {string} image - Imported image asset
 * @property {string} title - Main heading for the carousel slide
 * @property {string} subtitle - Supporting text describing the service
 * @property {string} alt - Accessible alt text for screen readers
 * @property {string} description - Extended description for SEO (optional)
 */
export const heroCarouselData = [
  {
    id: 1,
    image: img1,
    title: 'Elegant Wedding Photography',
    subtitle: 'Capturing your special day with artistic vision',
    alt: 'Elegant wedding moment captured by JV Envision Photography',
    description: 'Professional wedding photography services that capture the essence of your special day with artistic vision and attention to detail.'
  },
  {
    id: 2,
    image: img2,
    title: 'Family Portrait Sessions',
    subtitle: 'Timeless memories for generations to come',
    alt: 'Family portrait session outdoors by JV Envision Photography',
    description: 'Create lasting family memories with our professional portrait sessions, designed to capture the love and connection between family members.'
  },
  {
    id: 3,
    image: img3,
    title: 'Destination Weddings',
    subtitle: 'Adventure and romance captured beautifully',
    alt: 'Destination wedding photography by JV Envision Photography',
    description: 'Travel with us to capture your destination wedding, combining adventure and romance in stunning locations around the world.'
  },
  {
    id: 4,
    image: img4,
    title: 'Senior Portrait Photography',
    subtitle: 'Celebrating life\'s milestones with style',
    alt: 'Senior portrait photography session by JV Envision Photography',
    description: 'Celebrate your high school graduation with a professional senior portrait session that reflects your unique personality and style.'
  },
  {
    id: 5,
    image: img5,
    title: 'Maternity Photography',
    subtitle: 'The beauty of new life and love',
    alt: 'Maternity photography session capturing the beauty of pregnancy',
    description: 'Capture the beautiful journey of pregnancy with our intimate maternity photography sessions that celebrate the miracle of new life.'
  }
];

/**
 * Default configuration for the hero carousel
 */
export const carouselConfig = {
  autoSlideInterval: 6000, // 6 seconds
  transitionDuration: 800, // milliseconds
  pauseOnHover: true,
  pauseOnInteraction: true,
  resumeAfterPause: 10000 // 10 seconds
};
