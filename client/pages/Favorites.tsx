import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Eye,
  Calendar,
  Trash2,
  Filter,
  Grid,
  List,
  SortAsc,
  HeartOff,
  Search,
  Plus,
} from "lucide-react";
import { useState } from "react";

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

// Mock favorites data
const favoriteProperties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: 2850000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Featured",
    type: "For Sale",
    rating: 4.9,
    views: 234,
    daysOnMarket: 12,
    savedDate: "2024-01-15",
    priceHistory: [
      { date: "2024-01-01", price: 2900000 },
      { date: "2024-01-15", price: 2850000 },
    ],
  },
  {
    id: 2,
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
    rating: 4.7,
    views: 189,
    daysOnMarket: 5,
    savedDate: "2024-01-20",
    priceHistory: [{ date: "2024-01-20", price: 1200000 }],
  },
  {
    id: 3,
    title: "Elegant Family Home",
    location: "Austin, TX",
    price: 3200,
    beds: 5,
    baths: 4,
    sqft: 4100,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Hot",
    type: "For Rent",
    rating: 4.8,
    views: 156,
    daysOnMarket: 3,
    savedDate: "2024-01-22",
    priceHistory: [{ date: "2024-01-22", price: 3200 }],
  },
];

export default function Favorites() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [favorites, setFavorites] = useState(favoriteProperties);

  const formatPrice = (price: number, type: string) => {
    if (type === "For Rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((prop) => prop.id !== id));
  };

  const getPriceChange = (property: any) => {
    if (property.priceHistory.length < 2) return null;
    const current =
      property.priceHistory[property.priceHistory.length - 1].price;
    const previous =
      property.priceHistory[property.priceHistory.length - 2].price;
    const change = current - previous;
    const percentage = ((change / previous) * 100).toFixed(1);
    return { change, percentage };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
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
            className="text-4xl md:text-5xl font-bold mb-4"
            variants={itemVariants}
          >
            Your Favorite Properties
          </motion.h1>

          <motion.p className="text-xl max-w-2xl" variants={itemVariants}>
            Keep track of properties you love and never miss out on your dream
            home.
          </motion.p>

          <motion.div
            className="mt-8 flex items-center space-x-6"
            variants={itemVariants}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-luxury-gold">
                {favorites.length}
              </div>
              <div className="text-sm text-white/80">Saved Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-luxury-gold">3</div>
              <div className="text-sm text-white/80">Price Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-luxury-gold">24h</div>
              <div className="text-sm text-white/80">Last Updated</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favorites.length > 0 ? (
          <>
            {/* Controls */}
            <motion.div
              className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-100"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    Showing{" "}
                    <span className="font-semibold text-luxury-blue">
                      {favorites.length}
                    </span>{" "}
                    saved properties
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 border-gray-200 hover:border-luxury-blue transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Recently Saved</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-lg overflow-hidden border-gray-200">
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
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Properties Grid/List */}
            <AnimatePresence mode="wait">
              <motion.div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={viewMode}
              >
                {favorites.map((property, index) => {
                  const priceChange = getPriceChange(property);

                  return (
                    <motion.div
                      key={property.id}
                      variants={itemVariants}
                      layout
                      whileHover={{
                        y: -8,
                        scale: 1.02,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <Card
                        className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white ${viewMode === "list" ? "flex" : ""}`}
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

                          <div className="absolute top-3 left-3">
                            <Badge className="bg-luxury-blue text-white shadow-lg">
                              {property.tag}
                            </Badge>
                          </div>

                          <div className="absolute top-3 right-3 flex space-x-2">
                            <motion.button
                              onClick={() => removeFavorite(property.id)}
                              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <HeartOff className="h-4 w-4" />
                            </motion.button>
                            <motion.button
                              className="bg-white/90 text-gray-700 p-2 rounded-lg hover:bg-white transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Share2 className="h-4 w-4" />
                            </motion.button>
                          </div>

                          <div className="absolute bottom-3 left-3">
                            <Badge
                              variant="secondary"
                              className="bg-white/90 text-luxury-navy text-xs backdrop-blur-sm"
                            >
                              {property.type}
                            </Badge>
                          </div>

                          {/* Price change indicator */}
                          {priceChange && (
                            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                              <div
                                className={`text-xs font-medium ${priceChange.change > 0 ? "text-red-600" : "text-emerald-600"}`}
                              >
                                {priceChange.change > 0 ? "+" : ""}
                                {priceChange.percentage}%
                              </div>
                            </div>
                          )}
                        </div>

                        <CardContent
                          className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <Link to={`/property/${property.id}`}>
                              <h3 className="text-lg font-semibold text-luxury-navy hover:text-luxury-blue transition-colors line-clamp-1">
                                {property.title}
                              </h3>
                            </Link>
                            <div className="text-lg font-bold text-luxury-blue">
                              {formatPrice(property.price, property.type)}
                            </div>
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
                            <div className="text-xs text-gray-500">
                              Saved{" "}
                              {new Date(
                                property.savedDate,
                              ).toLocaleDateString()}
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

                          {/* Market insights */}
                          <div className="mb-4 p-3 bg-gradient-to-r from-luxury-blue/5 to-blue-50 rounded-lg border border-luxury-blue/10">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center text-gray-600">
                                <Eye className="h-3 w-3 mr-1" />
                                <span>{property.views} views</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{property.daysOnMarket} days</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Link
                              to={`/property/${property.id}`}
                              className="flex-1"
                            >
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Button className="w-full bg-luxury-blue hover:bg-blue-600 text-white">
                                  View Details
                                </Button>
                              </motion.div>
                            </Link>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeFavorite(property.id)}
                                className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* Empty State */
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-8 rounded-full">
                <Heart className="h-16 w-16 text-gray-400" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-luxury-navy mb-4">
              No Favorite Properties Yet
            </h2>

            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start exploring properties and save the ones you love. Your
              favorites will appear here for easy access.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/properties">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-luxury-blue hover:bg-blue-600 text-white">
                    <Search className="h-4 w-4 mr-2" />
                    Browse Properties
                  </Button>
                </motion.div>
              </Link>

              <Link to="/agents">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-luxury-blue text-luxury-blue hover:bg-luxury-blue hover:text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Get Recommendations
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
