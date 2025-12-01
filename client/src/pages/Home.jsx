import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import HeroCarousel from '../components/features/HeroCarousel';
import { heroCarouselData } from '../data/heroCarousel';
import TestimonialCard from '../components/common/TestimonialCard';
import { testimonialsData } from '../data/testimonials';
import { instagramData } from '../data/instagram';
import { Camera, Instagram, Heart, Award, Users, Clock, Star } from 'lucide-react';

const Home = () => {
  const [recentWorkImages, setRecentWorkImages] = useState([]);

  useEffect(() => {
    const fetchRecentWork = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${API_BASE_URL}/api/hero-images?section=instagram`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setRecentWorkImages(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch recent work:', error);
      }
    };
    fetchRecentWork();
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel images={heroCarouselData} />

      {/* Services Overview Section (light) */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-2 minimal-heading">Featured Services</h2>
            <p className="max-w-2xl mx-auto minimal-subheading">
              Professional photography services tailored to capture your most precious moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 mb-2 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: 'Wedding Photography',
                description:
                  'Capturing your special day with artistic vision and attention to detail',
                features: ['Full day coverage', 'Engagement session', 'Online gallery', 'Print rights']
              },
              {
                icon: Users,
                title: 'Portrait Sessions',
                description:
                  'Professional portraits for individuals, families, and corporate needs',
                features: [
                  'Studio or location',
                  'Multiple outfit changes',
                  'Professional editing',
                  'Digital delivery'
                ]
              },
              {
                icon: Camera,
                title: 'Event Photography',
                description: 'Documenting your special events and celebrations with style',
                features: ['Corporate events', 'Birthday parties', 'Anniversaries', 'Quick turnaround']
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="minimal-card"
              >
                <div className="p-6">
                  <div className="w-12 h-12 mb-4 badge badge-gold">
                    <service.icon className="w-5 h-5" />
                    <span className="sr-only">icon</span>
                  </div>
                  <h3 className="mb-2 font-serif text-lg">{service.title}</h3>
                  <p className="mb-4 text-body">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="badge">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Work Section with tabs (light) */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-6">
            <h2 className="minimal-heading">Recent Work</h2>
            <div className="pill-tabs">
              <button className="pill-tab active">Featured</button>
              <button className="pill-tab">Latest</button>
              <button className="pill-tab">Popular</button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {(recentWorkImages.length > 0 ? recentWorkImages : instagramData).slice(0, 6).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="overflow-hidden minimal-card"
              >
                <img
                  src={post.image}
                  alt={post.title || post.caption || 'Recent work'}
                  className="object-cover w-full h-64"
                />
                <div className="p-6">
                  <h3 className="mb-2 font-serif text-lg">
                    {(post.title || post.caption || 'Untitled').split(' #')[0]}
                  </h3>
                  <div className="flex items-center gap-3 text-small">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {/* Random likes for demo if not real */}
                      {post.likes || Math.floor(Math.random() * 200) + 50}
                    </span>
                    <span className="flex items-center gap-1">
                      <Instagram className="w-4 h-4" />
                      {/* Random comments for demo if not real */}
                      {post.comments || Math.floor(Math.random() * 20) + 5}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 text-center">
            <Link to="/portfolio" className="btn-secondary">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section (light) */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="minimal-heading">Client Testimonials</h2>
            <p className="max-w-2xl mx-auto minimal-subheading">
              What clients say about their photography experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section (light) */}
      <section className="section-padding bg-gray-50">
        <div className="text-center container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 minimal-heading">Ready to Work Together?</h2>
            <p className="max-w-2xl mx-auto mb-8 minimal-subheading">
              Let's discuss your photography needs and create something beautiful together. Book your
              session today.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/contact" className="btn-primary">
                Book Session
              </Link>
              <Link to="/services" className="btn-secondary">
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
