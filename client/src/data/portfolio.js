// Sample portfolio data for JV Envision Photography
export const portfolioData = [
  {
    id: 1,
    category: 'weddings',
    title: 'Sarah & Michael Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
    description: 'A beautiful outdoor wedding ceremony'
  },
  {
    id: 2,
    category: 'weddings',
    title: 'Emma & David Wedding',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop',
    description: 'Elegant indoor wedding reception'
  },
  {
    id: 3,
    category: 'portraits',
    title: 'Family Portrait Session',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop',
    description: 'Natural family portraits in golden hour'
  },
  {
    id: 4,
    category: 'portraits',
    title: 'Senior Portrait',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    description: 'Professional senior graduation photos'
  },
  {
    id: 5,
    category: 'events',
    title: 'Corporate Event',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    description: 'Corporate networking event photography'
  },
  {
    id: 6,
    category: 'events',
    title: 'Birthday Celebration',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop',
    description: 'Intimate birthday party celebration'
  },
  {
    id: 7,
    category: 'nature',
    title: 'Landscape Photography',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    description: 'Breathtaking mountain landscape'
  },
  {
    id: 8,
    category: 'nature',
    title: 'Wildlife Photography',
    image: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=800&h=600&fit=crop',
    description: 'Capturing wildlife in natural habitat'
  },
  {
    id: 9,
    category: 'weddings',
    title: 'Jessica & Ryan Wedding',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
    description: 'Romantic beach wedding ceremony'
  },
  {
    id: 10,
    category: 'portraits',
    title: 'Maternity Session',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=600&fit=crop',
    description: 'Beautiful maternity photography session'
  },
  {
    id: 11,
    category: 'events',
    title: 'Graduation Ceremony',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    description: 'University graduation ceremony'
  },
  {
    id: 12,
    category: 'nature',
    title: 'Sunset Photography',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    description: 'Golden hour sunset capture'
  }
];

export const categories = [
  { id: 'all', name: 'All', count: portfolioData.length },
  { id: 'weddings', name: 'Weddings', count: portfolioData.filter(item => item.category === 'weddings').length },
  { id: 'portraits', name: 'Portraits', count: portfolioData.filter(item => item.category === 'portraits').length },
  { id: 'events', name: 'Events', count: portfolioData.filter(item => item.category === 'events').length },
  { id: 'nature', name: 'Nature', count: portfolioData.filter(item => item.category === 'nature').length }
];
