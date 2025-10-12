import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
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
            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">
              Contact Me
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to capture your special moments? I'd love to hear from you! 
              Whether you're planning a wedding, need family portraits, or have any photography questions, 
              let's start the conversation.
            </p>
          </motion.div>

          {/* Quick Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {[
              {
                icon: Phone,
                title: 'Call Me',
                info: '(555) 123-4567',
                description: 'Available Mon-Fri 9AM-6PM',
                href: 'tel:+15551234567'
              },
              {
                icon: Mail,
                title: 'Email Me',
                info: 'hello@jvenvision.com',
                description: 'I respond within 24 hours',
                href: 'mailto:hello@jvenvision.com'
              },
              {
                icon: MapPin,
                title: 'Visit Me',
                info: 'Creative City, CC',
                description: 'Serving the greater area',
                href: null
              },
              {
                icon: Clock,
                title: 'Response Time',
                info: 'Within 24 Hours',
                description: 'Usually much faster!',
                href: null
              }
            ].map((contact, index) => {
              const Icon = contact.icon;
              const content = (
                <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold mb-2">{contact.title}</h3>
                  <p className="text-gray-900 font-medium mb-1">{contact.info}</p>
                  <p className="text-sm text-gray-600">{contact.description}</p>
                </div>
              );

              return contact.href ? (
                <a key={index} href={contact.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* Location Section */}
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
              My Location
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Based in Creative City, I serve clients throughout the region and beyond
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-semibold mb-6">Service Areas</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-gray-700">Creative City & Surrounding Areas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-gray-700">Destination Weddings Worldwide</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-gray-700">Travel fees apply beyond 50 miles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span className="text-gray-700">Flexible scheduling available</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Travel Information</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  I love traveling for destination weddings and special events! 
                  Travel fees are calculated based on distance and accommodation needs. 
                  Contact me for a personalized quote for your location.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Placeholder for map - in a real implementation, you'd use Google Maps or similar */}
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">Creative City, CC 12345</p>
                  <p className="text-xs mt-2">Map integration would go here</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Connect With Me
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Follow my journey and see my latest work on social media
            </p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="https://instagram.com/jvenvision"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Instagram</span>
                </div>
              </a>
              <a
                href="https://facebook.com/jvenvision"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Facebook</span>
                </div>
              </a>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
              <h3 className="text-xl font-serif font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-600 mb-6">
                Follow me on social media to see my latest work, behind-the-scenes content, 
                and photography tips. I love connecting with clients and fellow photography enthusiasts!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://instagram.com/jvenvision"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Follow on Instagram
                </a>
                <a
                  href="https://facebook.com/jvenvision"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-300"
                >
                  Like on Facebook
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
