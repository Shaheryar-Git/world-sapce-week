
import { Calendar, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#220536] via-[#1a0429] to-[#0f0118] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-[#9326E0]">World Space Week</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The largest annual space event on Earth, celebrating humanity's achievements 
              in space science and technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#9326E0] transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#9326E0] transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#9326E0] transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#9326E0] transition-colors duration-200">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#9326E0]">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link to="/about-association" className="text-gray-300 hover:text-white transition-colors duration-200">About WSW Association</Link></li>
              <li><Link to="/about-wsw" className="text-gray-300 hover:text-white transition-colors duration-200">About World Space Week</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-white transition-colors duration-200">WSW Events</Link></li>
              <li><Link to="/hold-event" className="text-gray-300 hover:text-white transition-colors duration-200">Hold an Event</Link></li>
              <li><Link to="/media" className="text-gray-300 hover:text-white transition-colors duration-200">Media</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#9326E0]">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/donate" className="text-gray-300 hover:text-white transition-colors duration-200">Donate</Link></li>
              <li><Link to="/become-partner" className="text-gray-300 hover:text-white transition-colors duration-200">Become a Partner</Link></li>
              <li><Link to="/about-association/sponsors" className="text-gray-300 hover:text-white transition-colors duration-200">Become a Sponsor</Link></li>
              <li><Link to="/about-association/positions" className="text-gray-300 hover:text-white transition-colors duration-200">Open Positions</Link></li>
              <li><Link to="/hold-event/media-kit" className="text-gray-300 hover:text-white transition-colors duration-200">Media Kit</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#9326E0]">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-[#9326E0] mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-300">info@worldspaceweek.org</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-[#9326E0] mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-300">+33 1 45 67 42 12</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-[#9326E0] mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-300">World Space Week Association</p>
                  <p className="text-gray-300">Paris, France</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-[#9326E0] mr-3 mt-0.5" />
                <div>
                  <p className="text-gray-300">October 4-10, {currentYear}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4 text-[#9326E0]">Stay Updated</h4>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest space news and event updates
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#220536]/50 border border-[#9326E0]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#9326E0] transition-colors duration-200"
              />
              <button className="bg-gradient-to-r from-[#9326E0] to-[#8c38c7] hover:from-[#8c38c7] hover:to-[#9326E0] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} World Space Week Association. All rights reserved.
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Established by the United Nations | Celebrating Space Since 1999
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
