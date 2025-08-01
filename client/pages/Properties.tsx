import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Grid,
  List,
  SlidersHorizontal,
  Star,
  Eye,
  Calendar,
  TrendingUp,
  Filter,
  ArrowRight,
  Home,
  TreePine,
  Ruler,
  Building,
  Map as MapIcon,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyMap } from "@/components/PropertyMap";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced mock data with both real estate and land properties
const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: 2850000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    lotSize: "0.5 acres",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Featured",
    type: "For Sale",
    category: "real_estate" as const,
    propertyType: "Villa",
    rating: 4.9,
    views: 234,
    daysOnMarket: 12,
    yearBuilt: 2020,
    coordinates: { lat: 34.0901, lng: -118.4065 },
  },
  {
    id: 2,
    title: "Prime Development Land",
    location: "Malibu, CA",
    price: 1500000,
    sqft: 43560, // 1 acre
    lotSize: "1.0 acres",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Hot",
    type: "For Sale",
    category: "land" as const,
    propertyType: "Residential Land",
    rating: 4.7,
    views: 189,
    daysOnMarket: 5,
    coordinates: { lat: 34.0259, lng: -118.7798 },
    zoning: "Residential R1",
    buildable: true,
  },
  {
    id: 3,
    title: "Contemporary Downtown Loft",
    location: "Manhattan, NY",
    price: 1200000,
    beds: 2,
    baths: 2,
    sqft: 1800,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "New",
    type: "For Sale",
    category: "real_estate" as const,
    propertyType: "Loft",
    rating: 4.7,
    views: 189,
    daysOnMarket: 5,
    yearBuilt: 2023,
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: 4,
    title: "Commercial Land Plot",
    location: "Austin, TX",
    price: 850000,
    sqft: 21780, // 0.5 acres
    lotSize: "0.5 acres",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Investment",
    type: "For Sale",
    category: "land" as const,
    propertyType: "Commercial Land",
    rating: 4.5,
    views: 156,
    daysOnMarket: 18,
    coordinates: { lat: 30.2672, lng: -97.7431 },
    zoning: "Commercial C2",
    buildable: true,
  },
  {
    id: 5,
    title: "Luxury Penthouse",
    location: "Miami Beach, FL",
    price: 3900000,
    beds: 3,
    baths: 3,
    sqft: 2800,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Luxury",
    type: "For Sale",
    category: "real_estate" as const,
    propertyType: "Penthouse",
    rating: 5.0,
    views: 312,
    daysOnMarket: 8,
    yearBuilt: 2021,
    coordinates: { lat: 25.7617, lng: -80.1918 },
  },
  {
    id: 6,
    title: "Agricultural Land",
    location: "Napa Valley, CA",
    price: 2200000,
    sqft: 217800, // 5 acres
    lotSize: "5.0 acres",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Premium",
    type: "For Sale",
    category: "land" as const,
    propertyType: "Agricultural Land",
    rating: 4.8,
    views: 98,
    daysOnMarket: 25,
    coordinates: { lat: 38.2975, lng: -122.2869 },
    zoning: "Agricultural",
    buildable: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Properties() {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "real_estate" | "land"
  >("all");
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const formatPrice = (price: number, type: string) => {
    if (type === "For Rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const filterProperties = (category: "all" | "real_estate" | "land") => {
    if (category === "all") {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(
        properties.filter((prop) => prop.category === category),
      );
    }
    setActiveCategory(category);
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Featured":
        return "bg-luxury-blue";
      case "New":
        return "bg-emerald-500";
      case "Hot":
        return "bg-red-500";
      case "Luxury":
        return "bg-purple-500";
      case "Premium":
        return "bg-luxury-gold";
      case "Investment":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const realEstateProperties = properties.filter(
    (p) => p.category === "real_estate",
  );
  const landProperties = properties.filter((p) => p.category === "land");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Enhanced Page Header */}
      <motion.section
        className="bg-gradient-to-r from-luxury-navy to-luxury-blue text-white py-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            }}
          />
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            variants={itemVariants}
          >
            Property Listings
          </motion.h1>

          <motion.p
            className="text-xl max-w-2xl mx-auto text-center mb-8"
            variants={itemVariants}
          >
            Discover premium real estate and land opportunities
          </motion.p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            <motion.div className="text-center" variants={itemVariants}>
              <div className="text-2xl font-bold text-luxury-gold">
                {properties.length}
              </div>
              <div className="text-sm text-white/80">Total Properties</div>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <div className="text-2xl font-bold text-luxury-gold">
                {realEstateProperties.length}
              </div>
              <div className="text-sm text-white/80">Real Estate</div>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <div className="text-2xl font-bold text-luxury-gold">
                {landProperties.length}
              </div>
              <div className="text-sm text-white/80">Land Plots</div>
            </motion.div>
            <motion.div className="text-center" variants={itemVariants}>
              <div className="text-2xl font-bold text-luxury-gold">5</div>
              <div className="text-sm text-white/80">Cities</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Property Category Tabs */}
      <motion.section
        className="py-6 bg-white border-b"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            value={activeCategory}
            onValueChange={(value: any) => filterProperties(value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-luxury-blue data-[state=active]:text-white"
              >
                <Building className="h-4 w-4 mr-2" />
                All Properties ({properties.length})
              </TabsTrigger>
              <TabsTrigger
                value="real_estate"
                className="data-[state=active]:bg-luxury-blue data-[state=active]:text-white"
              >
                <Home className="h-4 w-4 mr-2" />
                Real Estate ({realEstateProperties.length})
              </TabsTrigger>
              <TabsTrigger
                value="land"
                className="data-[state=active]:bg-luxury-blue data-[state=active]:text-white"
              >
                <TreePine className="h-4 w-4 mr-2" />
                Land ({landProperties.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <AnimatePresence>
            <motion.div
              className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
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
                <motion.div className="mb-6" whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="Enter city, neighborhood..."
                      className="pl-10 border-gray-200 focus:border-luxury-blue transition-colors"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </motion.div>

                {/* Property Type Filter - Dynamic based on category */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <Select>
                    <SelectTrigger className="border-gray-200 hover:border-luxury-blue transition-colors">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {activeCategory !== "land" && (
                        <>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="loft">Loft</SelectItem>
                          <SelectItem value="penthouse">Penthouse</SelectItem>
                        </>
                      )}
                      {activeCategory !== "real_estate" && (
                        <>
                          <SelectItem value="residential_land">
                            Residential Land
                          </SelectItem>
                          <SelectItem value="commercial_land">
                            Commercial Land
                          </SelectItem>
                          <SelectItem value="agricultural_land">
                            Agricultural Land
                          </SelectItem>
                          <SelectItem value="development_land">
                            Development Land
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0].toLocaleString()} - $
                    {priceRange[1].toLocaleString()}
                  </label>
                  <motion.div whileFocus={{ scale: 1.02 }}>
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

                {/* Conditional Filters based on category */}
                {activeCategory !== "land" && (
                  <>
                    {/* Bedrooms */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Bedrooms
                      </label>
                      <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, "5+"].map((bed) => (
                          <motion.div
                            key={bed}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-10 hover:bg-luxury-blue hover:text-white hover:border-luxury-blue transition-all"
                            >
                              {bed}
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Bathrooms
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, "4+"].map((bath) => (
                          <motion.div
                            key={bath}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-10 hover:bg-luxury-blue hover:text-white hover:border-luxury-blue transition-all"
                            >
                              {bath}
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeCategory !== "real_estate" && (
                  <>
                    {/* Land-specific filters */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Land Features
                      </label>
                      <div className="space-y-3">
                        {[
                          "Buildable",
                          "Utilities Available",
                          "Road Access",
                          "Water Rights",
                          "Mineral Rights",
                        ].map((feature) => (
                          <motion.div
                            key={feature}
                            className="flex items-center space-x-2"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Checkbox id={feature} />
                            <label
                              htmlFor={feature}
                              className="text-sm text-gray-600 cursor-pointer"
                            >
                              {feature}
                            </label>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Zoning */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zoning
                      </label>
                      <Select>
                        <SelectTrigger className="border-gray-200 hover:border-luxury-blue transition-colors">
                          <SelectValue placeholder="Any Zoning" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">
                            Residential
                          </SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="agricultural">
                            Agricultural
                          </SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="mixed">Mixed Use</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full bg-luxury-blue hover:bg-blue-600 text-white transition-all duration-300">
                    Apply Filters
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Main Content */}
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
                    Showing{" "}
                    <span className="font-semibold text-luxury-blue">
                      {filteredProperties.length}
                    </span>
                    {activeCategory === "all"
                      ? " properties"
                      : activeCategory === "real_estate"
                        ? " real estate properties"
                        : " land plots"}
                  </motion.span>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
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
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-40 border-gray-200 hover:border-luxury-blue transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="sqft">Area Size</SelectItem>
                    </SelectContent>
                  </Select>

                  <motion.div className="flex border rounded-lg overflow-hidden border-gray-200">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={viewMode === "map" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("map")}
                        className="rounded-none"
                      >
                        <MapIcon className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Properties Display */}
            <AnimatePresence mode="wait">
              {viewMode === "map" ? (
                <motion.div
                  key="map"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <PropertyMap
                    properties={filteredProperties.map((prop) => ({
                      id: prop.id,
                      title: prop.title,
                      location: prop.location,
                      price: formatPrice(prop.price, prop.type),
                      lat: prop.coordinates.lat,
                      lng: prop.coordinates.lng,
                      type: prop.category,
                      propertyType: prop.propertyType,
                      image: prop.image,
                    }))}
                    height="600px"
                    className="w-full"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={viewMode}
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-6"
                  }
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProperties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      variants={itemVariants}
                      layout
                      layoutId={`property-${property.id}`}
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        transition: { duration: 0.3 },
                      }}
                      custom={index}
                    >
                      <Card
                        className={`group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500 bg-white ${viewMode === "list" ? "flex" : ""}`}
                      >
                        <div
                          className={`relative overflow-hidden ${viewMode === "list" ? "w-80" : ""}`}
                        >
                          <Link to={`/property/${property.id}`}>
                            <img
                              src={property.image}
                              alt={property.title}
                              className={`object-cover transition-transform duration-500 group-hover:scale-110 ${viewMode === "list" ? "w-full h-48" : "w-full h-48"}`}
                            />
                          </Link>

                          <div className="absolute top-3 left-3 flex space-x-2">
                            <Badge
                              className={`${getTagColor(property.tag)} text-white shadow-lg`}
                            >
                              {property.tag}
                            </Badge>
                            <Badge
                              className={`${property.category === "land" ? "bg-emerald-500" : "bg-luxury-blue"} text-white shadow-lg`}
                            >
                              {property.category === "land" ? (
                                <TreePine className="h-3 w-3 mr-1" />
                              ) : (
                                <Home className="h-3 w-3 mr-1" />
                              )}
                              {property.category === "land"
                                ? "Land"
                                : "Real Estate"}
                            </Badge>
                          </div>

                          <motion.div
                            className="absolute top-3 right-3"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="bg-white/90 hover:bg-white text-gray-700 h-8 w-8 p-0 transition-all duration-300"
                            >
                              <Heart className="h-4 w-4" />
                            </Button>
                          </motion.div>

                          <div className="absolute bottom-3 left-3">
                            <Badge
                              variant="secondary"
                              className="bg-white/90 text-luxury-navy text-xs backdrop-blur-sm"
                            >
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

                        <CardContent
                          className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <Link to={`/property/${property.id}`}>
                              <motion.h3
                                className="text-lg font-semibold text-luxury-navy hover:text-luxury-blue transition-colors line-clamp-1"
                                whileHover={{ x: 5 }}
                              >
                                {property.title}
                              </motion.h3>
                            </Link>
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
                              <span className="text-sm font-medium text-gray-700">
                                {property.rating}
                              </span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              <span>{property.views} views</span>
                            </div>
                          </div>

                          {/* Conditional property details based on category */}
                          {property.category === "real_estate" ? (
                            <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
                              <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                                <Bed className="h-4 w-4 mr-1" />
                                <span>{property.beds || "N/A"}</span>
                              </div>
                              <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                                <Bath className="h-4 w-4 mr-1" />
                                <span>{property.baths || "N/A"}</span>
                              </div>
                              <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                                <Square className="h-4 w-4 mr-1" />
                                <span>{property.sqft.toLocaleString()}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                              <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                                <Ruler className="h-4 w-4 mr-1" />
                                <span>{property.lotSize}</span>
                              </div>
                              <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                                <Square className="h-4 w-4 mr-1" />
                                <span>
                                  {property.sqft.toLocaleString()} sqft
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Enhanced market insights */}
                          <div className="mb-4 p-3 bg-gradient-to-r from-luxury-blue/5 to-blue-50 rounded-lg border border-luxury-blue/10">
                            <div className="flex items-center justify-between text-xs">
                              <div className="text-gray-600">
                                {property.category === "land"
                                  ? "Zoning"
                                  : "Built"}
                                :
                                <span className="font-medium ml-1">
                                  {property.category === "land"
                                    ? (property as any).zoning
                                    : property.yearBuilt}
                                </span>
                              </div>
                              <div className="text-gray-600">
                                {property.daysOnMarket} days on market
                              </div>
                            </div>
                          </div>

                          <Link to={`/property/${property.id}`}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
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
              )}
            </AnimatePresence>

            {/* Enhanced Pagination */}
            <motion.div
              className="mt-12 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="hover:bg-luxury-blue hover:text-white transition-all"
                  >
                    Previous
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="bg-luxury-blue text-white hover:bg-blue-600"
                  >
                    1
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="hover:bg-luxury-blue hover:text-white transition-all"
                  >
                    2
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="hover:bg-luxury-blue hover:text-white transition-all"
                  >
                    3
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="hover:bg-luxury-blue hover:text-white transition-all"
                  >
                    Next
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
