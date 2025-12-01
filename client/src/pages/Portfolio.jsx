import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Gallery from '../components/features/Gallery';
import { portfolioData, categories as staticCategories } from '../data/portfolio';
import { Camera, Filter } from 'lucide-react';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [images, setImages] = useState(portfolioData);
  const [dynamicCategories, setDynamicCategories] = useState(staticCategories);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
        // Fetch both gallery and portfolio sections if possible, or just gallery for now
        const response = await fetch(`${API_BASE_URL}/api/hero-images?section=gallery`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // Transform API data to match Gallery component structure
            const formattedImages = data.map(img => ({
              id: img.id,
              image: img.image,
              title: img.title,
              category: img.category || 'uncategorized',
              description: img.description || img.subtitle
            }));
            setImages(formattedImages);
          }
        }
      } catch (error) {
        console.error('Failed to fetch portfolio images:', error);
      }
    };
    fetchImages();
  }, []);

  // Fixed categories as requested
  const fixedCategories = [
    { id: 'all', name: 'All' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'portraits', name: 'Portraits' },
    { id: 'events', name: 'Events' },
    { id: 'nature', name: 'Nature' }
  ];

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Camera className="h-10 w-10 text-gold" />
              <h1 className="text-5xl font-serif font-bold text-gray-900">
                Portfolio
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore my collection of wedding photography, portraits, events, and nature shots.
              Each image tells a unique story and captures the essence of life's most precious moments.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {[
              { number: '200+', label: 'Weddings Captured' },
              { number: '500+', label: 'Happy Clients' },
              { number: '5', label: 'Years Experience' },
              { number: '1000+', label: 'Photos Delivered' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-serif font-bold text-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery
        images={images}
        categories={fixedCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              My Photography Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From initial consultation to final delivery, here's how I ensure your
              photography experience is seamless and enjoyable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'We discuss your vision, preferences, and requirements to create a personalized photography plan.'
              },
              {
                step: '02',
                title: 'Planning',
                description: 'Location scouting, timeline creation, and detailed preparation to ensure everything runs smoothly.'
              },
              {
                step: '03',
                title: 'Photography',
                description: 'Professional, unobtrusive photography capturing every important moment with artistic excellence.'
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'Carefully edited photos delivered in a beautiful online gallery within 2-3 weeks.'
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-serif font-bold text-black">{process.step}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold mb-3">{process.title}</h3>
                <p className="text-gray-600 leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-gray-800 to-black text-white relative overflow-hidden">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold mb-6">
              Love What You See?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's create beautiful memories together. Contact me to discuss your photography needs
              and book your session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-300"
              >
                Book Session
              </Link>
              <Link
                to="/services"
                className="btn-secondary px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-300"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
