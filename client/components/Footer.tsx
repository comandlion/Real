import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" }
];

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/agents", label: "Our Agents" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" }
];

const services = [
  "Property Buying",
  "Property Selling", 
  "Property Rental",
  "Investment Consulting",
  "Market Analysis"
];

const legalLinks = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/sitemap", label: "Sitemap" }
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-luxury-navy text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Enhanced Company Info */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="bg-luxury-blue text-white rounded-lg p-2"
                whileHover={{ rotate: 5 }}
              >
                <div className="h-6 w-6 flex items-center justify-center font-bold text-lg">P</div>
              </motion.div>
              <div className="text-xl font-bold">
                Premium<span className="text-luxury-blue">Realty</span>
              </div>
            </motion.div>
            
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner in finding the perfect home. We provide exceptional real estate services with a commitment to excellence and client satisfaction.
            </p>
            
            <motion.div 
              className="flex space-x-4"
              variants={containerVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="p-2 rounded-lg bg-white/10 hover:bg-luxury-blue transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    backgroundColor: "rgba(59, 130, 246, 0.8)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Quick Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-luxury-gold">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.to}>
                  <motion.div 
                    className="block text-gray-300 hover:text-luxury-blue transition-colors group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="group-hover:underline">{link.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Services */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-luxury-gold">Services</h3>
            <div className="space-y-3">
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  className="text-gray-300 hover:text-luxury-blue transition-colors cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {service}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Contact Info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-luxury-gold">Contact Info</h3>
            <div className="space-y-4">
              <motion.div 
                className="flex items-start space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <MapPin className="h-5 w-5 text-luxury-blue mt-1 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  123 Main Street, City, State 12345
                </span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Phone className="h-5 w-5 text-luxury-blue group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  (555) 123-4567
                </span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-5 w-5 text-luxury-blue group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  contact@premiumrealty.com
                </span>
              </motion.div>
            </div>
            
            <motion.div 
              className="pt-4 p-4 bg-white/5 rounded-lg border border-white/10"
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <p className="text-sm text-gray-400 mb-2 font-medium">Business Hours</p>
              <p className="text-sm text-gray-300">
                Monday - Sunday<br />
                8:00 AM - 9:00 PM
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Bar */}
        <motion.div 
          className="border-t border-gray-700 mt-12 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div 
              className="flex items-center space-x-2 text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>© 2024 Premium Realty. Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  color: ["#ef4444", "#f97316", "#ef4444"]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Heart className="h-4 w-4 fill-current" />
              </motion.div>
              <span>All rights reserved.</span>
            </motion.div>
            
            <div className="flex items-center space-x-6">
              <div className="flex space-x-6">
                {legalLinks.map((link, index) => (
                  <Link key={index} to={link.to}>
                    <motion.span 
                      className="text-gray-400 hover:text-luxury-blue text-sm transition-colors"
                      whileHover={{ y: -2 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                ))}
              </div>
              
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
