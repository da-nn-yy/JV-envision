import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="glass-card p-6 hover:scale-105 transition-all duration-300"
    >
      {/* Rating Stars */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-gold text-gold" />
        ))}
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 mb-6 leading-relaxed">
        "{testimonial.text}"
      </blockquote>

      {/* Client Info */}
      <div className="flex items-center space-x-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-gold font-medium">{testimonial.event}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
