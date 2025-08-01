import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Search, MapPin, Bed, Bath, Square, Heart, Grid, List, SlidersHorizontal, Star, Eye, Calendar, TrendingUp, Filter, ArrowRight, Home } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced mock data for property listings
const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: 2850000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Featured",
    type: "For Sale",
    yearBuilt: 2020,
    propertyType: "Villa",
    rating: 4.9,
    views: 234,
    daysOnMarket: 12,
    isNew: false,
    isFeatured: true
  },
  {
    id: 2,
    title: "Contemporary Downtown Loft",
    location: "Manhattan, NY",
    price: 1200000,
    beds: 2,
    baths: 2,
    sqft: 1800,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "New",
    type: "For Sale",
    yearBuilt: 2023,
    propertyType: "Loft",
    rating: 4.7,
    views: 189,
    daysOnMarket: 5,
    isNew: true,
    isFeatured: false
  },
  {
    id: 3,
    title: "Elegant Family Home",
    location: "Austin, TX",
    price: 3200,
    beds: 5,
    baths: 4,
    sqft: 4100,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Hot",
    type: "For Rent",
    yearBuilt: 2019,
    propertyType: "House",
    rating: 4.8,
    views: 156,
    daysOnMarket: 3,
    isNew: false,
    isFeatured: false
  },
  {
    id: 4,
    title: "Luxury Penthouse",
    location: "Miami Beach, FL",
    price: 3900000,
    beds: 3,
    baths: 3,
    sqft: 2800,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Luxury",
    type: "For Sale",
    yearBuilt: 2021,
    propertyType: "Penthouse",
    rating: 5.0,
    views: 312,
    daysOnMarket: 8,
    isNew: false,
    isFeatured: true
  },
  {
    id: 5,
    title: "Charming Suburban Home",
    location: "Portland, OR",
    price: 750000,
    beds: 4,
    baths: 3,
    sqft: 2900,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "New",
    type: "For Sale",
    yearBuilt: 2022,
    propertyType: "House",
    rating: 4.6,
    views: 98,
    daysOnMarket: 15,
    isNew: true,
    isFeatured: false
  },
  {
    id: 6,
    title: "Modern Apartment",
    location: "San Francisco, CA",
    price: 4500,
    beds: 2,
    baths: 2,
    sqft: 1400,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Available",
    type: "For Rent",
    yearBuilt: 2020,
    propertyType: "Apartment",
    rating: 4.4,
    views: 76,
    daysOnMarket: 7,
    isNew: false,
    isFeatured: false
  }
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function Properties() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const formatPrice = (price: number, type: string) => {
    if (type === "For Rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Featured": return "bg-luxury-blue";
      case "New": return "bg-emerald-500";
      case "Hot": return "bg-red-500";
      case "Luxury": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Enhanced Page Header */}
      <motion.section 
        className="bg-gradient-to-r from-luxury-navy to-luxury-blue text-white py-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Property Listings
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Browse our extensive collection of premium properties
            </p>
            
            {/* Quick stats */}
            <motion.div 
              className="mt-8 flex justify-center space-x-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury-gold">{properties.length}</div>
                <div className="text-sm text-white/80">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury-gold">3</div>
                <div className="text-sm text-white/80">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-luxury-gold">$750K</div>
                <div className="text-sm text-white/80">Avg Price</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <AnimatePresence>
            <motion.div 
              className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="bg-white rounded-2xl shadow-sm p-6 sticky top-24 border border-gray-100"
                whileHover={{ shadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-luxury-navy flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowFilters(!showFilters)} 
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </motion.button>
                </div>

                {/* Enhanced Search */}
                <motion.div 
                  className="mb-6"
                  whileFocus={{ scale: 1.02 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <Input placeholder="Enter city, neighborhood..." className="pl-10 border-gray-200 focus:border-luxury-blue transition-colors" />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </motion.div>

                {/* Enhanced Property Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <Select>
                    <SelectTrigger className="border-gray-200 hover:border-luxury-blue transition-colors">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="loft">Loft</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Enhanced Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                  </label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                  >
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={5000000}
                      min={0}
                      step={50000}
                      className="mt-2"
                    />
                  </motion.div>
                </div>

                {/* Enhanced Bedrooms */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Bedrooms</label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, '5+'].map((bed) => (
                      <motion.div key={bed} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm" className="h-10 hover:bg-luxury-blue hover:text-white hover:border-luxury-blue transition-all">
                          {bed}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Bathrooms */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Bathrooms</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, '4+'].map((bath) => (
                      <motion.div key={bath} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm" className="h-10 hover:bg-luxury-blue hover:text-white hover:border-luxury-blue transition-all">
                          {bath}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Amenities */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                  <div className="space-y-3">
                    {['Swimming Pool', 'Garage', 'Garden', 'Gym', 'Security', 'Elevator'].map((amenity) => (
                      <motion.div 
                        key={amenity} 
                        className="flex items-center space-x-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Checkbox id={amenity} />
                        <label htmlFor={amenity} className="text-sm text-gray-600 cursor-pointer">{amenity}</label>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full bg-luxury-blue hover:bg-blue-600 text-white transition-all duration-300">
                    Apply Filters
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Main Content */}
          <div className="flex-1">
            {/* Enhanced Top Bar */}
            <motion.div 
              className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-100"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <motion.span 
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Showing <span className="font-semibold text-luxury-blue">{properties.length}</span> properties
                  </motion.span>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden hover:bg-luxury-blue/10 transition-colors"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </motion.div>
                </div>

                <div className="flex items-center space-x-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 border-gray-200 hover:border-luxury-blue transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="sqft">Square Feet</SelectItem>
                    </SelectContent>
                  </Select>

                  <motion.div className="flex border rounded-lg overflow-hidden border-gray-200">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="rounded-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="rounded-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Properties Grid/List */}
            <motion.div 
              className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="wait">
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    variants={cardVariants}
                    layout
                    layoutId={`property-${property.id}`}
                    whileHover={{ 
                      y: -8,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    custom={index}
                  >
                    <Card className={`group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500 bg-white ${viewMode === 'list' ? 'flex' : ''}`}>
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-80' : ''}`}>
                        <motion.img 
                          src={property.image} 
                          alt={property.title}
                          className={`object-cover transition-transform duration-500 group-hover:scale-110 ${viewMode === 'list' ? 'w-full h-48' : 'w-full h-48'}`}
                        />
                        
                        {/* Enhanced overlays */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        
                        <div className="absolute top-3 left-3">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Badge className={`${getTagColor(property.tag)} text-white shadow-lg`}>
                              {property.tag}
                            </Badge>
                          </motion.div>
                        </div>
                        
                        <motion.div 
                          className="absolute top-3 right-3"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white text-gray-700 h-8 w-8 p-0 transition-all duration-300">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </motion.div>
                        
                        <div className="absolute bottom-3 left-3">
                          <Badge variant="secondary" className="bg-white/90 text-luxury-navy text-xs backdrop-blur-sm">
                            {property.type}
                          </Badge>
                        </div>

                        {/* Enhanced property insights overlay */}
                        <motion.div 
                          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          initial={{ x: 20 }}
                          whileHover={{ x: 0 }}
                        >
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Eye className="h-3 w-3" />
                            <span>{property.views}</span>
                            <Calendar className="h-3 w-3 ml-1" />
                            <span>{property.daysOnMarket}d</span>
                          </div>
                        </motion.div>
                      </div>
                      
                      <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="flex justify-between items-start mb-2">
                          <motion.h3 
                            className="text-lg font-semibold text-luxury-navy group-hover:text-luxury-blue transition-colors line-clamp-1"
                            whileHover={{ x: 5 }}
                          >
                            {property.title}
                          </motion.h3>
                          <motion.div 
                            className="text-lg font-bold text-luxury-blue"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {formatPrice(property.price, property.type)}
                          </motion.div>
                        </div>
                        
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700">{property.rating}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            <span>{property.views} views</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                            <Bed className="h-4 w-4 mr-1" />
                            <span>{property.beds}</span>
                          </div>
                          <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                            <Bath className="h-4 w-4 mr-1" />
                            <span>{property.baths}</span>
                          </div>
                          <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                            <Square className="h-4 w-4 mr-1" />
                            <span>{property.sqft.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* New: Market insights */}
                        <div className="mb-4 p-2 bg-gradient-to-r from-luxury-blue/5 to-blue-50 rounded-lg border border-luxury-blue/10">
                          <div className="text-xs text-gray-600 text-center">
                            Built in {property.yearBuilt} • {property.daysOnMarket} days on market
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
              </AnimatePresence>
            </motion.div>

            {/* Enhanced Pagination */}
            <motion.div 
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="hover:bg-luxury-blue hover:text-white transition-all">Previous</Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="bg-luxury-blue text-white hover:bg-blue-600">1</Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="hover:bg-luxury-blue hover:text-white transition-all">2</Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="hover:bg-luxury-blue hover:text-white transition-all">3</Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="hover:bg-luxury-blue hover:text-white transition-all">Next</Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
