import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Phone,
  Mail,
  Search,
  User,
  Heart,
  X,
  Home as HomeIcon,
  Building,
  Users,
  Info,
  MessageCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/properties", label: "Properties", icon: Building },
    { path: "/agents", label: "Agents", icon: Users },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: MessageCircle },
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white shadow-sm border-b"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Top bar with contact info */}
      <motion.div
        className="bg-luxury-navy text-white py-2 px-4 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <motion.div
            className="flex items-center space-x-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="flex items-center space-x-2 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="h-4 w-4 group-hover:text-luxury-gold transition-colors" />
              <span className="group-hover:text-luxury-gold transition-colors">
                (555) 123-4567
              </span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-2 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="h-4 w-4 group-hover:text-luxury-gold transition-colors" />
              <span className="group-hover:text-luxury-gold transition-colors">
                contact@premiumrealty.com
              </span>
            </motion.div>
          </motion.div>
          <motion.div
            className="text-sm"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Monday - Sunday: 8:00 AM - 9:00 PM
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Left Section - Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                className="bg-luxury-blue text-white rounded-lg p-2 group-hover:bg-blue-600 transition-colors"
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="h-6 w-6 flex items-center justify-center font-bold text-lg">
                  P
                </div>
              </motion.div>
              <motion.div
                className="text-xl font-bold text-luxury-navy"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Premium<span className="text-luxury-blue">Realty</span>
              </motion.div>
            </Link>
          </div>

          {/* Center Section - Main Navigation */}
          <div className="flex-1 flex justify-center">
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative ${
                      isActivePath(item.path)
                        ? "text-luxury-blue bg-luxury-blue/10"
                        : "text-gray-700 hover:text-luxury-blue hover:bg-luxury-blue/5"
                    }`}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </span>

                    {isActivePath(item.path) && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-1 h-1 bg-luxury-blue rounded-full"
                        layoutId="activeIndicator"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ x: "-50%" }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <motion.div
              className="hidden md:flex items-center space-x-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/favorites">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden lg:flex items-center space-x-2 hover:bg-luxury-blue/10 hover:text-luxury-blue transition-all"
                  >
                    <Heart className="h-4 w-4" />
                    <span>Favorites</span>
                  </Button>
                </motion.div>
              </Link>

              <Link to="/signin">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden lg:flex items-center space-x-2 hover:bg-luxury-blue/10 hover:text-luxury-blue transition-all"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                </motion.div>
              </Link>

              <Link to="/list-property">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-luxury-blue hover:bg-blue-600 text-white transition-all duration-300 shadow-lg hover:shadow-xl">
                    List Property
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Enhanced Mobile menu button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden p-2 hover:bg-luxury-blue/10 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <motion.div
                className="py-4 space-y-2"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ delay: 0.1 }}
              >
                {navItems.map((item, index) => (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg mx-2 font-medium transition-all ${
                        isActivePath(item.path)
                          ? "text-luxury-blue bg-luxury-blue/10"
                          : "text-gray-700 hover:text-luxury-blue hover:bg-luxury-blue/5"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                ))}

                <motion.div
                  className="pt-4 border-t border-gray-100 mx-2 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link to="/favorites">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start mb-2 hover:bg-luxury-blue/10 hover:text-luxury-blue"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Favorites
                      </Button>
                    </motion.div>
                  </Link>

                  <Link to="/signin">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start mb-2 hover:bg-luxury-blue/10 hover:text-luxury-blue"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Button>
                    </motion.div>
                  </Link>

                  <Link to="/list-property">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-luxury-blue hover:bg-blue-600 text-white transition-all duration-300">
                        List Property
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
