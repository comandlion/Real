import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home, ArrowLeft, Search, MapPin, Building } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const quickLinks = [
  {
    to: "/",
    label: "Homepage",
    icon: Home,
    description: "Return to our main page",
  },
  {
    to: "/properties",
    label: "Browse Properties",
    icon: Building,
    description: "Explore available listings",
  },
  {
    to: "/contact",
    label: "Contact Us",
    icon: MapPin,
    description: "Get help from our team",
  },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          {/* Animated 404 */}
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.div
              className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-luxury-blue to-blue-600 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              404
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-luxury-navy mb-6"
            variants={itemVariants}
          >
            Oops! Page Not Found
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            The page you're looking for seems to have moved or doesn't exist.
            But don't worry, we'll help you find what you're looking for!
          </motion.p>

          {/* Search suggestion */}
          <motion.div
            className="mb-12 max-w-md mx-auto"
            variants={itemVariants}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search for properties, locations..."
                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luxury-blue focus:border-transparent transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <motion.button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-luxury-blue text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
          </motion.div>

          {/* Quick action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            variants={itemVariants}
          >
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-luxury-blue hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <Home className="h-5 w-5 mr-2" />
                  Return to Home
                </Button>
              </motion.div>
            </Link>

            <Link to="/properties">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-luxury-blue text-luxury-blue hover:bg-luxury-blue hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300 group"
                >
                  <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Browse Properties
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Quick links grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
          >
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.to}>
                <motion.div
                  className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-luxury-blue/10 p-3 rounded-lg group-hover:bg-luxury-blue/20 transition-colors">
                      <link.icon className="h-6 w-6 text-luxury-blue" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-luxury-navy mb-2 group-hover:text-luxury-blue transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Help section */}
          <motion.div
            className="bg-gradient-to-r from-luxury-blue/5 to-blue-50 rounded-2xl p-8 border border-luxury-blue/10"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-luxury-navy mb-4">
              Still can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you navigate and find exactly
              what you need.
            </p>
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-luxury-blue text-luxury-blue hover:bg-luxury-blue hover:text-white transition-all duration-300"
                >
                  Contact Support
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default NotFound;
