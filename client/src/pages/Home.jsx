import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import TestimonialCard from '../components/TestimonialCard';
import { testimonialsData } from '../data/testimonials';
import { instagramData } from '../data/instagram';
import { Camera, Instagram, Heart, Award, Users, Clock, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Services Overview Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="minimal-heading mb-4">
              Photography Services
            </h2>
            <p className="minimal-subheading max-w-2xl mx-auto">
              Professional photography services tailored to capture your most precious moments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Heart,
                title: 'Wedding Photography',
                description: 'Capturing your special day with artistic vision and attention to detail',
                features: ['Full day coverage', 'Engagement session', 'Online gallery', 'Print rights']
              },
              {
                icon: Users,
                title: 'Portrait Sessions',
                description: 'Professional portraits for individuals, families, and corporate needs',
                features: ['Studio or location', 'Multiple outfit changes', 'Professional editing', 'Digital delivery']
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
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 glass-card mx-auto mb-6 flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-serif font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="text-sm text-gray-500 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="minimal-heading mb-4">
              Why Choose JV Envision?
            </h2>
            <p className="minimal-subheading max-w-2xl mx-auto">
              Experience the difference that professional expertise and artistic vision can make
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Award Winning',
                description: 'Recognized for excellence in wedding and portrait photography'
              },
              {
                icon: Clock,
                title: 'Quick Delivery',
                description: 'Fast turnaround times without compromising on quality'
              },
              {
                icon: Users,
                title: 'Personal Touch',
                description: 'Dedicated attention to each client and their unique needs'
              },
              {
                icon: Star,
                title: '5-Star Reviews',
                description: 'Consistently rated excellent by our satisfied clients'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 glass-card mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-serif font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Preview Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="minimal-heading mb-4">
              Recent Work
            </h2>
            <p className="minimal-subheading max-w-2xl mx-auto">
              A selection of recent photography projects and behind-the-scenes moments
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {instagramData.slice(0, 6).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card cursor-pointer overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-small">{post.caption}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/portfolio"
              className="btn-secondary"
            >
              View Full Portfolio
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gradient-to-br from-white to-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="minimal-heading mb-4">
              Client Testimonials
            </h2>
            <p className="minimal-subheading max-w-2xl mx-auto">
              What clients say about their photography experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="minimal-heading mb-6">
              Ready to Work Together?
            </h2>
            <p className="minimal-subheading mb-8 max-w-2xl mx-auto">
              Let's discuss your photography needs and create something beautiful together.
              Book your session today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary"
              >
                Book Session
              </Link>
              <Link
                to="/services"
                className="btn-secondary"
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

export default Home;
