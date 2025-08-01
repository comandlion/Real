import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Eye,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Car,
  Wifi,
  Dumbbell,
  Shield,
  TreePine,
  Waves,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  Camera,
  Navigation,
  Home,
  Ruler,
  Zap,
  Building,
  Map as MapIcon,
  Box,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyMap } from "@/components/PropertyMap";
import { Property3DViewer } from "@/components/Property3DViewer";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Enhanced mock property data with map coordinates and 3D info
const propertyData = {
  1: {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    address: "123 Sunset Boulevard, Beverly Hills, CA 90210",
    price: 2850000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    lotSize: "0.5 acres",
    yearBuilt: 2020,
    propertyType: "Villa",
    category: "real_estate" as const,
    rating: 4.9,
    views: 234,
    daysOnMarket: 12,
    status: "For Sale",
    coordinates: { lat: 34.0901, lng: -118.4065 },
    dimensions: { width: 60, length: 80, height: 25 },
    description:
      "Stunning modern villa nestled in the prestigious Beverly Hills neighborhood. This architectural masterpiece combines contemporary design with luxurious amenities, offering panoramic city views and unparalleled privacy. Features include a gourmet kitchen, spa-like bathrooms, and expansive outdoor entertainment areas.",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { icon: Car, name: "2-Car Garage" },
      { icon: Waves, name: "Swimming Pool" },
      { icon: Dumbbell, name: "Home Gym" },
      { icon: TreePine, name: "Garden" },
      { icon: Shield, name: "Security System" },
      { icon: Wifi, name: "High-Speed Internet" },
    ],
    features: [
      "Gourmet kitchen with premium appliances",
      "Master suite with walk-in closet",
      "Spa-like bathrooms with marble finishes",
      "Open-concept living and dining areas",
      "Floor-to-ceiling windows",
      "Smart home automation system",
      "Wine cellar and entertainment room",
      "Outdoor kitchen and barbecue area",
    ],
    agent: {
      name: "Sarah Johnson",
      title: "Senior Real Estate Agent",
      phone: "(555) 123-4567",
      email: "sarah.johnson@premiumrealty.com",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.8,
      sales: 150,
    },
    neighborhood: {
      walkScore: 85,
      crimeRate: "Low",
      schools: "Excellent",
      shopping: "High-end boutiques nearby",
      dining: "Michelin-starred restaurants",
    },
  },
  2: {
    id: 2,
    title: "Prime Development Land",
    location: "Malibu, CA",
    address: "456 Pacific Coast Highway, Malibu, CA 90265",
    price: 1500000,
    sqft: 43560, // 1 acre
    lotSize: "1.0 acres",
    yearBuilt: null,
    propertyType: "Residential Land",
    category: "land" as const,
    rating: 4.7,
    views: 189,
    daysOnMarket: 5,
    status: "For Sale",
    coordinates: { lat: 34.0259, lng: -118.7798 },
    dimensions: { width: 200, length: 218 },
    description:
      "Exceptional oceanfront development opportunity in prestigious Malibu. This prime parcel offers stunning Pacific Ocean views and approved plans for a luxury residence. Perfect for creating your dream coastal estate with private beach access.",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { icon: Waves, name: "Ocean Access" },
      { icon: TreePine, name: "Natural Landscape" },
      { icon: Navigation, name: "Private Road" },
      { icon: Zap, name: "Utilities Available" },
    ],
    features: [
      "Oceanfront location with 150ft of beach frontage",
      "Approved architectural plans included",
      "All utilities available at property line",
      "Private gated access",
      "Spectacular sunset views",
      "Protected cove location",
      "Development rights included",
      "Environmental clearances obtained",
    ],
    agent: {
      name: "Michael Chen",
      title: "Land Development Specialist",
      phone: "(555) 234-5678",
      email: "michael.chen@premiumrealty.com",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      rating: 4.9,
      sales: 89,
    },
    landInfo: {
      zoning: "Residential R1",
      soilType: "Sandy loam, excellent drainage",
      topography: "Gently sloping toward ocean",
      buildableArea: 0.8, // acres
      maxHeight: 35, // feet
      setbacks: { front: 25, rear: 15, side: 10 },
    },
  },
};

const similarProperties = [
  {
    id: 3,
    title: "Contemporary Downtown Loft",
    location: "Manhattan, NY",
    price: 1200000,
    beds: 2,
    baths: 2,
    sqft: 1800,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Elegant Family Home",
    location: "Austin, TX",
    price: 875000,
    beds: 4,
    baths: 3,
    sqft: 2900,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    title: "Commercial Land Plot",
    location: "Phoenix, AZ",
    price: 750000,
    sqft: 21780, // 0.5 acres
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
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

export default function PropertyDetail() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const property = propertyData[id as keyof typeof propertyData];

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-luxury-navy mb-4">
            Property Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The property you're looking for doesn't exist.
          </p>
          <Link to="/properties">
            <Button className="bg-luxury-blue hover:bg-blue-600 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length,
    );
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const isLandProperty = property.category === "land";

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Back Navigation */}
      <motion.div
        className="bg-gray-50 py-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/properties"
            className="flex items-center text-gray-600 hover:text-luxury-blue transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Property Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  className={`${isLandProperty ? "bg-emerald-500" : "bg-luxury-blue"} text-white`}
                >
                  {isLandProperty ? (
                    <TreePine className="h-3 w-3 mr-1" />
                  ) : (
                    <Home className="h-3 w-3 mr-1" />
                  )}
                  {isLandProperty ? "Land" : "Real Estate"}
                </Badge>
                <Badge variant="secondary">{property.status}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.address}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{property.views} views</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{property.daysOnMarket} days on market</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                  <span>{property.rating}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl md:text-4xl font-bold text-luxury-blue mb-2">
                {formatPrice(property.price)}
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white border border-gray-200 p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-luxury-blue data-[state=active]:text-white"
              >
                <Building className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="3d"
                className="data-[state=active]:bg-luxury-blue data-[state=active]:text-white"
              >
                <Box className="h-4 w-4 mr-2" />
                3D View
              </TabsTrigger>
              <TabsTrigger
                value="map"
                className="data-[state=active]:bg-luxury-blue data-[state=active]:text-white"
              >
                <MapIcon className="h-4 w-4 mr-2" />
                Location
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="data-[state=active]:bg-luxury-blue data-[state=active]:text-white"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Image Gallery */}
                  <Card className="overflow-hidden">
                    <div className="relative">
                      <motion.img
                        key={currentImageIndex}
                        src={property.images[currentImageIndex]}
                        alt={property.title}
                        className="w-full h-96 object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Image Navigation */}
                      <div className="absolute inset-0 flex items-center justify-between p-4">
                        <motion.button
                          onClick={prevImage}
                          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </motion.button>
                        <motion.button
                          onClick={nextImage}
                          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </motion.button>
                      </div>

                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {property.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentImageIndex
                                ? "bg-white"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Property Stats */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-luxury-navy mb-4">
                        Property Details
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {!isLandProperty && property.beds && (
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Bed className="h-8 w-8 text-luxury-blue mx-auto mb-2" />
                            <div className="text-2xl font-bold text-luxury-navy">
                              {property.beds}
                            </div>
                            <div className="text-sm text-gray-600">
                              Bedrooms
                            </div>
                          </div>
                        )}
                        {!isLandProperty && property.baths && (
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Bath className="h-8 w-8 text-luxury-blue mx-auto mb-2" />
                            <div className="text-2xl font-bold text-luxury-navy">
                              {property.baths}
                            </div>
                            <div className="text-sm text-gray-600">
                              Bathrooms
                            </div>
                          </div>
                        )}
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <Square className="h-8 w-8 text-luxury-blue mx-auto mb-2" />
                          <div className="text-2xl font-bold text-luxury-navy">
                            {property.sqft.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            {isLandProperty ? "Total Area" : "Sq Ft"}
                          </div>
                        </div>
                        {property.yearBuilt && (
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Calendar className="h-8 w-8 text-luxury-blue mx-auto mb-2" />
                            <div className="text-2xl font-bold text-luxury-navy">
                              {property.yearBuilt}
                            </div>
                            <div className="text-sm text-gray-600">
                              Year Built
                            </div>
                          </div>
                        )}
                        {isLandProperty && property.lotSize && (
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Ruler className="h-8 w-8 text-luxury-blue mx-auto mb-2" />
                            <div className="text-2xl font-bold text-luxury-navy">
                              {property.lotSize}
                            </div>
                            <div className="text-sm text-gray-600">
                              Lot Size
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Description */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-luxury-navy mb-4">
                        Description
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {property.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-luxury-navy mb-3">
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {property.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-luxury-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-600 text-sm">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-luxury-navy mb-3">
                            Property Info
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Property Type:
                              </span>
                              <span className="font-medium">
                                {property.propertyType}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Category:</span>
                              <span className="font-medium">
                                {isLandProperty ? "Land" : "Real Estate"}
                              </span>
                            </div>
                            {property.lotSize && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Lot Size:</span>
                                <span className="font-medium">
                                  {property.lotSize}
                                </span>
                              </div>
                            )}
                            {property.yearBuilt && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Year Built:
                                </span>
                                <span className="font-medium">
                                  {property.yearBuilt}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <span className="font-medium">
                                {property.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Amenities */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-luxury-navy mb-4">
                        {isLandProperty ? "Land Features" : "Amenities"}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {property.amenities.map((amenity, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                            whileHover={{
                              scale: 1.02,
                              backgroundColor: "#f0f8ff",
                            }}
                          >
                            <amenity.icon className="h-5 w-5 text-luxury-blue" />
                            <span className="text-gray-700 text-sm">
                              {amenity.name}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Agent Card */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-luxury-navy mb-4">
                        Contact Agent
                      </h3>
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={property.agent.image}
                          alt={property.agent.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-luxury-navy">
                            {property.agent.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {property.agent.title}
                          </p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm font-medium">
                              {property.agent.rating}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">
                              ({property.agent.sales} sales)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button className="w-full bg-luxury-blue hover:bg-blue-600 text-white">
                            <Phone className="h-4 w-4 mr-2" />
                            Call {property.agent.phone}
                          </Button>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full border-luxury-blue text-luxury-blue hover:bg-luxury-blue hover:text-white"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email Agent
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Info */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-luxury-navy mb-4">
                        Quick Info
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Property ID:</span>
                          <span className="font-medium">
                            PR{property.id.toString().padStart(6, "0")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Price per sq ft:
                          </span>
                          <span className="font-medium">
                            ${Math.round(property.price / property.sqft)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last updated:</span>
                          <span className="font-medium">2 days ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* 3D View Tab */}
            <TabsContent value="3d" className="space-y-6">
              <Property3DViewer
                propertyType={property.category}
                propertySubType={property.propertyType}
                title={property.title}
                dimensions={property.dimensions}
                features={property.features}
                className="w-full"
              />

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-luxury-navy mb-4">
                    3D Visualization Guide
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-luxury-blue/10 rounded-full flex items-center justify-center">
                        <Box className="h-4 w-4 text-luxury-blue" />
                      </div>
                      <div>
                        <div className="font-medium">Interactive Model</div>
                        <div className="text-gray-600">
                          Click and drag to rotate
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-luxury-blue/10 rounded-full flex items-center justify-center">
                        <Eye className="h-4 w-4 text-luxury-blue" />
                      </div>
                      <div>
                        <div className="font-medium">Multiple Views</div>
                        <div className="text-gray-600">
                          Switch between perspectives
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-luxury-blue/10 rounded-full flex items-center justify-center">
                        <Zap className="h-4 w-4 text-luxury-blue" />
                      </div>
                      <div>
                        <div className="font-medium">Real-time Rendering</div>
                        <div className="text-gray-600">
                          High-quality 3D graphics
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Map Tab */}
            <TabsContent value="map" className="space-y-6">
              <PropertyMap
                properties={[
                  {
                    id: property.id,
                    title: property.title,
                    location: property.location,
                    price: formatPrice(property.price),
                    lat: property.coordinates.lat,
                    lng: property.coordinates.lng,
                    type: property.category,
                    propertyType: property.propertyType,
                    image: property.images[0],
                  },
                ]}
                center={[property.coordinates.lat, property.coordinates.lng]}
                zoom={15}
                height="500px"
                className="w-full"
              />

              {/* Neighborhood Info */}
              {!isLandProperty && property.neighborhood && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-luxury-navy mb-4">
                      Neighborhood
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-luxury-navy mb-3">
                          Walkability & Safety
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Walk Score</span>
                            <div className="flex items-center">
                              <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                                <div
                                  className="h-2 bg-emerald-500 rounded-full"
                                  style={{
                                    width: `${property.neighborhood.walkScore}%`,
                                  }}
                                ></div>
                              </div>
                              <span className="font-medium">
                                {property.neighborhood.walkScore}
                              </span>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Crime Rate:</span>
                            <span className="font-medium text-emerald-600">
                              {property.neighborhood.crimeRate}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-luxury-navy mb-3">
                          Local Amenities
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Schools:</span>
                            <span className="font-medium">
                              {property.neighborhood.schools}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shopping:</span>
                            <span className="font-medium">
                              {property.neighborhood.shopping}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Dining:</span>
                            <span className="font-medium">
                              {property.neighborhood.dining}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-luxury-navy mb-4">
                      Send Message
                    </h3>
                    <form className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input placeholder="First Name" />
                        <Input placeholder="Last Name" />
                      </div>
                      <Input placeholder="Email Address" type="email" />
                      <Input placeholder="Phone Number" type="tel" />
                      <Textarea
                        placeholder={`I'm interested in ${property.title}. Please contact me with more information.`}
                        rows={4}
                      />
                      <Button className="w-full bg-luxury-blue hover:bg-blue-600 text-white">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-luxury-navy mb-4">
                      Schedule Viewing
                    </h3>
                    <div className="space-y-4">
                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                        <Play className="h-4 w-4 mr-2" />
                        Virtual Tour
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule In-Person Visit
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Camera className="h-4 w-4 mr-2" />
                        Request More Photos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Similar Properties */}
        <motion.div className="mt-12" variants={itemVariants}>
          <h2 className="text-2xl font-bold text-luxury-navy mb-6">
            Similar Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((similar) => (
              <Link key={similar.id} to={`/property/${similar.id}`}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={similar.image}
                    alt={similar.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-luxury-navy mb-2">
                      {similar.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{similar.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-lg font-bold text-luxury-blue">
                        {formatPrice(similar.price)}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        {similar.beds && <span>{similar.beds} beds</span>}
                        {similar.baths && <span>{similar.baths} baths</span>}
                        <span>{similar.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
}
