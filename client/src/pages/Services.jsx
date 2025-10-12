import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesData, addOns } from '../data/services';
import { Check, Clock, Users, Camera, Star, Plus, Calendar } from 'lucide-react';

const Services = () => {
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
              Photography Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professional photography packages designed to capture your most important moments.
              Each service is tailored to meet your specific needs and budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
                  service.popular ? 'ring-2 ring-gold' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute top-0 right-0 bg-gold text-black px-4 py-2 rounded-bl-lg font-semibold text-sm">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-serif font-bold text-gray-900">{service.title}</h3>
                    <div className="text-right">
                      <div className="text-3xl font-serif font-bold text-gold">{service.price}</div>
                      <div className="text-sm text-gray-500">{service.duration}</div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  <div className="space-y-3 mb-8">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <Check className="h-5 w-5 text-gold mr-2" />
                      What's Included:
                    </h4>
                    <ul className="space-y-2">
                      {service.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start text-gray-600">
                          <Check className="h-4 w-4 text-gold mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    className={`w-full text-center py-3 rounded-lg font-semibold transition-colors duration-300 ${
                      service.popular
                        ? 'bg-gold text-black hover:bg-yellow-600'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    Book This Package
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
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
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enhance your photography experience with these optional add-ons
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-serif font-semibold text-gray-900">{addon.title}</h3>
                  <div className="text-gold font-bold">{addon.price}</div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{addon.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to book your photography session
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Package',
                description: 'Select the photography package that best fits your needs and budget.',
                icon: Star
              },
              {
                step: '02',
                title: 'Book Session',
                description: 'Contact me to discuss details and schedule your photography session.',
                icon: Calendar
              },
              {
                step: '03',
                title: 'Photo Session',
                description: 'Enjoy your photography session with professional guidance and expertise.',
                icon: Camera
              },
              {
                step: '04',
                title: 'Receive Photos',
                description: 'Get your beautifully edited photos delivered in a stunning online gallery.',
                icon: Check
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-black" />
                  </div>
                  <div className="text-sm text-gold font-semibold mb-2">{step.step}</div>
                  <h3 className="text-xl font-serif font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Common questions about my photography services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'How far in advance should I book?',
                answer: 'I recommend booking at least 3-6 months in advance for weddings and 2-4 weeks for portrait sessions. However, I can sometimes accommodate last-minute requests depending on availability.'
              },
              {
                question: 'Do you travel for destination weddings?',
                answer: 'Yes! I love destination weddings and am available to travel. Travel fees may apply for locations more than 50 miles from my base location.'
              },
              {
                question: 'How long does it take to receive photos?',
                answer: 'Portrait sessions are typically delivered within 2-3 weeks, while weddings may take 4-6 weeks due to the larger volume of images. Rush delivery is available for an additional fee.'
              },
              {
                question: 'Do you provide raw files?',
                answer: 'I deliver professionally edited high-resolution JPEG files. Raw files are not included as they represent unfinished work and don\'t reflect my artistic vision.'
              },
              {
                question: 'What if it rains on my wedding day?',
                answer: 'Don\'t worry! I\'m experienced in shooting in various weather conditions and can create beautiful images rain or shine. We\'ll have backup plans ready.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-black text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold mb-6">
              Ready to Book Your Session?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your photography needs and create something beautiful together.
              Contact me today to get started!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary"
              >
                Get Started
              </Link>
              <Link
                to="/portfolio"
                className="btn-secondary"
              >
                View My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
