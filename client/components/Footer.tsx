import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-luxury-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-luxury-blue text-white rounded-lg p-2">
                <div className="h-6 w-6 flex items-center justify-center font-bold text-lg">P</div>
              </div>
              <div className="text-xl font-bold">
                Premium<span className="text-luxury-blue">Realty</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner in finding the perfect home. We provide exceptional real estate services with a commitment to excellence and client satisfaction.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-300 hover:text-luxury-blue cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-300 hover:text-luxury-blue cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-300 hover:text-luxury-blue cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-300 hover:text-luxury-blue cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-luxury-blue transition-colors">
                Home
              </Link>
              <Link to="/properties" className="block text-gray-300 hover:text-luxury-blue transition-colors">
                Properties
              </Link>
              <Link to="/agents" className="block text-gray-300 hover:text-luxury-blue transition-colors">
                Our Agents
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-luxury-blue transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-luxury-blue transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              <div className="text-gray-300">Property Buying</div>
              <div className="text-gray-300">Property Selling</div>
              <div className="text-gray-300">Property Rental</div>
              <div className="text-gray-300">Investment Consulting</div>
              <div className="text-gray-300">Market Analysis</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-luxury-blue" />
                <span className="text-gray-300">123 Main Street, City, State 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-luxury-blue" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-luxury-blue" />
                <span className="text-gray-300">contact@premiumrealty.com</span>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-sm text-gray-400">
                Monday - Sunday<br />
                8:00 AM - 9:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Premium Realty. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-luxury-blue text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-luxury-blue text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-gray-400 hover:text-luxury-blue text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
