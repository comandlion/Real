import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, MapPin, Bed, Bath, Square, Heart, Star, Play, TrendingUp, Users, Award, Clock, ArrowRight, Filter, Eye } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

// Enhanced mock data with more details
const featuredProperties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: "$2,850,000",
    beds: 4,
    baths: 3,
    sqft: "3,200",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Featured",
    type: "For Sale",
    rating: 4.9,
    views: 234,
    daysOnMarket: 12
  },
  {
    id: 2,
    title: "Contemporary Downtown Loft",
    location: "Manhattan, NY",
    price: "$1,200,000",
    beds: 2,
    baths: 2,
    sqft: "1,800",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "New",
    type: "For Sale",
    rating: 4.7,
    views: 189,
    daysOnMarket: 5
  },
  {
    id: 3,
    title: "Elegant Family Home",
    location: "Austin, TX",
    price: "$3,200/month",
    beds: 5,
    baths: 4,
    sqft: "4,100",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Hot",
    type: "For Rent",
    rating: 4.8,
    views: 156,
    daysOnMarket: 3
  }
];

const stats = [
  { icon: TrendingUp, value: "2,500+", label: "Properties Sold", color: "bg-emerald-500" },
  { icon: Users, value: "1,200+", label: "Happy Clients", color: "bg-blue-500" },
  { icon: Award, value: "15+", label: "Years Experience", color: "bg-purple-500" },
  { icon: Clock, value: "24/7", label: "Support Available", color: "bg-orange-500" }
];

// Animation variants
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.3
    }
  }
};

export default function Index() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-navy/85 to-luxury-blue/75" />
        
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            Find Your
            <motion.span 
              className="block text-luxury-gold"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Dream Home
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Discover exceptional properties in prime locations with our expert real estate services
          </motion.p>
          
          {/* Enhanced Search Box */}
          <motion.div 
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto shadow-2xl"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <motion.div 
                className="relative"
                whileFocus={{ scale: 1.05 }}
              >
                <Input 
                  placeholder="Enter location..." 
                  className="h-12 pl-10 bg-white border-gray-200 focus:border-luxury-blue transition-colors"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <motion.div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  animate={{ 
                    scale: isSearchFocused ? 1.1 : 1,
                    color: isSearchFocused ? "#3b82f6" : "#9ca3af"
                  }}
                >
                  <MapPin className="h-5 w-5" />
                </motion.div>
              </motion.div>
              
              <Select>
                <SelectTrigger className="h-12 bg-white border-gray-200 hover:border-luxury-blue transition-colors">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="h-12 bg-white border-gray-200 hover:border-luxury-blue transition-colors">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-500k">$0 - $500K</SelectItem>
                  <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                  <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                  <SelectItem value="2m+">$2M+</SelectItem>
                </SelectContent>
              </Select>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="h-12 w-full bg-luxury-blue hover:bg-blue-600 text-white font-semibold transition-all duration-300">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              className="flex flex-wrap gap-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-gray-600">Popular:</span>
              {["Beverly Hills", "Manhattan", "Miami Beach", "San Francisco"].map((location, index) => (
                <motion.button 
                  key={location}
                  className="text-luxury-blue hover:underline transition-colors"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  {location}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Enhanced Video Tour Button */}
          <motion.div 
            className="mt-8"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/20 transition-all duration-300">
                <Play className="h-5 w-5 mr-2" />
                Watch Virtual Tours
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-4">
                  <motion.div 
                    className={`${stat.color} p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </motion.div>
                </div>
                <motion.div 
                  className="text-3xl font-bold text-luxury-navy mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-luxury-navy mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties in the most desirable locations
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                variants={cardVariants}
                whileHover="hover"
                custom={index}
              >
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Animated overlays */}
                    <motion.div 
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    <div className="absolute top-4 left-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge className="bg-luxury-blue text-white shadow-lg">{property.tag}</Badge>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="absolute top-4 right-4"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white text-gray-700 transition-all duration-300">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-white/90 text-luxury-navy backdrop-blur-sm">
                        {property.type}
                      </Badge>
                    </div>

                    {/* New: Property insights overlay */}
                    <motion.div 
                      className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ x: 20 }}
                      whileHover={{ x: 0 }}
                    >
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Eye className="h-3 w-3" />
                        <span>{property.views} views</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <motion.h3 
                        className="text-xl font-semibold text-luxury-navy group-hover:text-luxury-blue transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {property.title}
                      </motion.h3>
                      <motion.div 
                        className="text-2xl font-bold text-luxury-blue"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {property.price}
                      </motion.div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.location}</span>
                    </div>

                    {/* Enhanced property details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Bed className="h-4 w-4 mr-1" />
                          <span>{property.beds} beds</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Bath className="h-4 w-4 mr-1" />
                          <span>{property.baths} baths</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Square className="h-4 w-4 mr-1" />
                          <span>{property.sqft} sqft</span>
                        </div>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 mr-1 fill-current" />
                          <span className="font-medium">{property.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* New: Days on market indicator */}
                    <div className="mb-4 p-2 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500 text-center">
                        {property.daysOnMarket} days on market • {property.views} views
                      </div>
                    </div>
                    
                    <Link to={`/property/${property.id}`}>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full bg-luxury-blue hover:bg-blue-600 text-white transition-all duration-300 group">
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/properties">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="border-luxury-blue text-luxury-blue hover:bg-luxury-blue hover:text-white transition-all duration-300 group">
                  View All Properties
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-20 bg-gradient-to-r from-luxury-navy to-luxury-blue overflow-hidden relative">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse" 
          }}
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Find Your Perfect Home?
          </motion.h2>
          
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let our expert team help you navigate the real estate market and find the property of your dreams
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-luxury-gold hover:bg-yellow-500 text-luxury-navy font-semibold transition-all duration-300">
                Schedule Consultation
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-luxury-navy transition-all duration-300">
                Contact Us Today
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
