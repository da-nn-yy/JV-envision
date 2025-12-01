import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  const isHome = location.pathname === '/';

  // Determine text color based on scroll state or if not on home page
  const textColorClass = scrolled || !isHome ? 'text-primary' : 'text-white';
  const logoColorClass = scrolled || !isHome ? 'text-primary' : 'text-white';
  const hoverColorClass = scrolled || !isHome ? 'hover:text-gold' : 'hover:text-gray-200';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`font-serif text-xl tracking-wide transition-colors ${logoColorClass}`}>
              JV Envision
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link transition-colors ${textColorClass} ${hoverColorClass} ${
                  location.pathname === item.path ? 'active font-medium' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-primary"
            >
              Book Session
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 transition-colors md:hidden ${textColorClass} ${hoverColorClass}`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border-t border-gray-100 md:hidden shadow-lg"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 text-sm uppercase tracking-wide transition-colors ${
                      location.pathname === item.path
                        ? 'text-gold font-semibold'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full mt-4 text-center btn-primary"
                >
                  Book Session
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
