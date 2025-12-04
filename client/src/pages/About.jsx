import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Award, Users, Instagram, Facebook } from 'lucide-react';

const About = () => {
  const [aboutImage, setAboutImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${API_BASE_URL}/api/hero-images?section=about`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setAboutImage(data[0].image);
          }
        }
      } catch (error) {
        console.error('Failed to fetch about image:', error);
      }
    };
    fetchImage();
  }, []);

  const achievements = [
    { icon: Award, title: 'Award Winner', description: 'Best Wedding Photographer 2023' },
    { icon: Users, title: '500+ Clients', description: 'Happy couples and families' },
    { icon: Camera, title: '5 Years', description: 'Professional experience' },
    { icon: Heart, title: 'Passionate', description: 'About capturing moments' }
  ];

  const values = [
    {
      title: 'Authenticity',
      description: 'I believe in capturing genuine emotions and real moments, not just posed shots. Your photos should reflect who you truly are.'
    },
    {
      title: 'Quality',
      description: 'Every image is carefully edited and crafted to perfection. I use professional equipment and techniques to ensure the highest quality.'
    },
    {
      title: 'Connection',
      description: 'Building a relationship with my clients is crucial. I want you to feel comfortable and confident during your session.'
    },
    {
      title: 'Timelessness',
      description: 'My goal is to create images that will be treasured for generations, capturing moments that never go out of style.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">
                Meet JV
              </h1>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Hello! I'm JV, a passionate photographer dedicated to capturing life's most precious moments.
                  With over 5 years of experience in wedding and portrait photography, I've had the privilege
                  of documenting countless love stories and family memories.
                </p>
                <p>
                  My journey began with a simple love for storytelling through images. What started as a hobby
                  quickly became my calling, and I've been fortunate to turn my passion into a profession that
                  brings joy to others.
                </p>
                <p>
                  I believe that every moment has a story worth telling, and my mission is to preserve these
                  stories in the most beautiful way possible. Whether it's your wedding day, a family portrait
                  session, or a special event, I'm here to capture the authentic emotions and create lasting memories.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={aboutImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop"}
                  alt="JV - Photographer"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gold rounded-full opacity-30"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              My Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recognition and milestones that reflect my commitment to excellence in photography
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gray-50 rounded-lg hover:bg-gold/10 transition-colors duration-300"
                >
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              My Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide my approach to photography and client relationships
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-serif font-semibold text-gold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold mb-6">
                My Photography Philosophy
              </h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  Photography is more than just taking pictures – it's about preserving moments that matter.
                  I approach each session with the understanding that these images will be treasured for years to come.
                </p>
                <p>
                  My style is a blend of photojournalistic storytelling and artistic portraiture. I capture both
                  the big moments and the small details, creating a comprehensive narrative of your special day or session.
                </p>
                <p>
                  I believe in being unobtrusive yet present, allowing natural moments to unfold while gently
                  guiding when needed. The result is a collection of authentic, beautiful images that truly represent you.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop"
                alt="Wedding Photography"
                className="w-full h-48 object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop"
                alt="Family Portrait"
                className="w-full h-48 object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop"
                alt="Event Photography"
                className="w-full h-48 object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                alt="Nature Photography"
                className="w-full h-48 object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Follow My Journey
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Stay connected and see my latest work, behind-the-scenes moments, and photography tips
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.instagram.com/jv.envision_photography/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <Instagram className="h-8 w-8" />
              </a>
              <a
                href="https://facebook.com/jvenvision"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                <Facebook className="h-8 w-8" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
