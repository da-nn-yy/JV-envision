/**
 * Hero Carousel Data Configuration
 *
 * This module exports the hero carousel data for JV Envision Photography.
 * Each item includes optimized metadata for SEO, accessibility, and performance.
 *
 * @module heroCarousel
 */

// Local hero images - optimized imports
import img1 from '../assets/hero_wedding_dance.jpg';
import img2 from '../assets/hero_portraits_pink.png';
import img3 from '../assets/hero_couple_bench.png';
import img4 from '../assets/hero_event_decor.png';
import img5 from '../assets/hero_cultural_group.jpg';

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
    alt: 'Joyful wedding celebration captured by JV Envision Photography',
    description: 'Professional wedding photography services that capture the essence of your special day with artistic vision and attention to detail.'
  },
  {
    id: 2,
    image: img2,
    title: 'Portrait Sessions',
    subtitle: 'Timeless memories for generations to come',
    alt: 'Professional portrait session by JV Envision Photography',
    description: 'Create lasting memories with our professional portrait sessions, designed to capture the unique personality and connection of every subject.'
  },
  {
    id: 3,
    image: img3,
    title: 'Engagement & Couples',
    subtitle: 'Love stories captured beautifully',
    alt: 'Romantic couple photography by JV Envision Photography',
    description: 'Celebrate your love story with an intimate engagement or couple session, capturing the genuine connection between you and your partner.'
  },
  {
    id: 4,
    image: img4,
    title: 'Event Styling & Decor',
    subtitle: 'The finer details that make your event unique',
    alt: 'Beautiful event decoration details captured by JV Envision Photography',
    description: 'We capture not just the moments, but the atmosphere and details that you worked so hard to create for your special event.'
  },
  {
    id: 5,
    image: img5,
    title: 'Cultural Celebrations',
    subtitle: 'Honoring traditions and heritage',
    alt: 'Cultural group celebration captured by JV Envision Photography',
    description: 'Specializing in cultural weddings and events, we understand the importance of tradition and capture every meaningful ritual with respect.'
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
