import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/jv.envision_photography' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/jvenvision' },
    { name: 'Email', icon: Mail, href: 'mailto:envision.JVphotography@gmail.com' }
  ];

  const quickLinks = [
    { name: 'Work', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-2xl font-serif text-black tracking-wide">JV Envision</span>
            </div>
            <p className="text-body mb-8 max-w-md">
              Professional photography services specializing in weddings, portraits, and special events.
              Capturing authentic moments with artistic vision.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm uppercase tracking-wide font-medium mb-6 text-black">Navigation</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-small hover:text-black transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm uppercase tracking-wide font-medium mb-6 text-black">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-600" />
                <span className="text-small">+1 443-538-0867</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-600" />
                <span className="text-small">envision.JVphotography@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-gray-600 mt-1" />
                <span className="text-small">
                  DC, Virginia, Columbia,<br />
                  Maryland 21046
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="minimal-divider">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-8">
            <p className="text-small">
              © {currentYear} JV Envision Photography. All rights reserved.
            </p>
            <div className="flex space-x-8 text-small">
              <Link to="/privacy" className="hover:text-black transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-black transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
