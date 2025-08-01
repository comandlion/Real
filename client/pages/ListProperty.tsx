import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Upload,
  MapPin,
  Home,
  DollarSign,
  Bed,
  Bath,
  Square,
  Calendar,
  Camera,
  Plus,
  X,
  CheckCircle,
  Star,
  Shield,
  TrendingUp,
  Users,
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

const steps = [
  {
    id: 1,
    title: "Property Details",
    description: "Basic information about your property",
  },
  {
    id: 2,
    title: "Features & Amenities",
    description: "Highlight what makes it special",
  },
  { id: 3, title: "Photos & Media", description: "Showcase your property" },
  { id: 4, title: "Pricing & Availability", description: "Set your terms" },
];

const amenitiesList = [
  "Swimming Pool",
  "Garage",
  "Garden",
  "Gym",
  "Security System",
  "Elevator",
  "Balcony",
  "Fireplace",
  "Air Conditioning",
  "Heating",
  "Dishwasher",
  "Laundry",
];

const whyChooseUs = [
  {
    icon: TrendingUp,
    title: "Maximum Exposure",
    description: "Your listing reaches thousands of qualified buyers",
  },
  {
    icon: Star,
    title: "Expert Support",
    description: "Professional photography and marketing assistance",
  },
  {
    icon: Shield,
    title: "Secure Process",
    description: "Protected transactions with verified buyers",
  },
  {
    icon: Users,
    title: "Dedicated Agent",
    description: "Personal agent to guide you through every step",
  },
];

export default function ListProperty() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-luxury-navy to-luxury-blue text-white py-20 relative overflow-hidden"
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
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            List Your Property
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Reach thousands of qualified buyers and sell your property faster
            with our premium listing service.
          </motion.p>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            variants={containerVariants}
          >
            {whyChooseUs.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-3">
                  <div className="bg-luxury-gold p-3 rounded-full">
                    <feature.icon className="h-6 w-6 text-luxury-navy" />
                  </div>
                </div>
                <div className="text-sm font-medium text-luxury-gold mb-1">
                  {feature.title}
                </div>
                <div className="text-xs text-white/80">
                  {feature.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step.id
                      ? "bg-luxury-blue text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </motion.div>

                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-24 mx-4 ${
                      currentStep > step.id ? "bg-luxury-blue" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-luxury-navy mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              {/* Step 1: Property Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Title
                    </label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        placeholder="e.g., Modern Luxury Villa in Beverly Hills"
                        className="border-gray-200 focus:border-luxury-blue transition-colors"
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          placeholder="Enter full address"
                          className="pl-10 border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </motion.div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type
                      </label>
                      <Select>
                        <SelectTrigger className="border-gray-200 hover:border-luxury-blue transition-colors">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                          <SelectItem value="loft">Loft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Listing Type
                      </label>
                      <Select>
                        <SelectTrigger className="border-gray-200 hover:border-luxury-blue transition-colors">
                          <SelectValue placeholder="For Sale / Rent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">For Sale</SelectItem>
                          <SelectItem value="rent">For Rent</SelectItem>
                          <SelectItem value="lease">For Lease</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bedrooms
                      </label>
                      <div className="relative">
                        <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="0"
                          className="pl-10 border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bathrooms
                      </label>
                      <div className="relative">
                        <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="0"
                          className="pl-10 border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Square Feet
                      </label>
                      <div className="relative">
                        <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="0"
                          className="pl-10 border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year Built
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="2020"
                          className="pl-10 border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Description
                    </label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Textarea
                        placeholder="Describe your property in detail..."
                        rows={4}
                        className="border-gray-200 focus:border-luxury-blue transition-colors"
                      />
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Step 2: Features & Amenities */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-luxury-navy mb-4">
                      Select Amenities
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {amenitiesList.map((amenity) => (
                        <motion.div
                          key={amenity}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedAmenities.includes(amenity)
                              ? "border-luxury-blue bg-luxury-blue/5 text-luxury-blue"
                              : "border-gray-200 hover:border-luxury-blue/50"
                          }`}
                          onClick={() => toggleAmenity(amenity)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={selectedAmenities.includes(amenity)}
                              onChange={() => {}}
                            />
                            <span className="text-sm">{amenity}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Features
                    </label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Textarea
                        placeholder="List any other special features or amenities..."
                        rows={3}
                        className="border-gray-200 focus:border-luxury-blue transition-colors"
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Neighborhood Highlights
                    </label>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Textarea
                        placeholder="Describe the neighborhood, nearby schools, shopping, etc..."
                        rows={3}
                        className="border-gray-200 focus:border-luxury-blue transition-colors"
                      />
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Step 3: Photos & Media */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-luxury-navy mb-4">
                      Upload Property Photos
                    </h3>

                    <motion.div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-luxury-blue transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">
                        Drop photos here or click to upload
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Upload high-quality photos to showcase your property
                      </p>
                      <Button
                        variant="outline"
                        className="hover:border-luxury-blue hover:text-luxury-blue"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Photos
                      </Button>
                    </motion.div>

                    <div className="text-sm text-gray-500 mt-2">
                      • Upload at least 5 high-quality photos • Include
                      exterior, interior, and key feature shots • Maximum 20
                      photos, 5MB each
                    </div>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Uploaded Photos ({uploadedImages.length})
                      </h4>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                        {uploadedImages.map((image, index) => (
                          <motion.div
                            key={index}
                            className="relative group"
                            whileHover={{ scale: 1.05 }}
                          >
                            <img
                              src={image}
                              alt={`Property ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <motion.button
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X className="h-3 w-3" />
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Pricing & Availability */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <Input
                            type="number"
                            placeholder="2,850,000"
                            className="pl-10 border-gray-200 focus:border-luxury-blue transition-colors"
                          />
                        </motion.div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Type
                      </label>
                      <Select>
                        <SelectTrigger className="border-gray-200 hover:border-luxury-blue transition-colors">
                          <SelectValue placeholder="Select pricing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Price</SelectItem>
                          <SelectItem value="negotiable">Negotiable</SelectItem>
                          <SelectItem value="monthly">Per Month</SelectItem>
                          <SelectItem value="weekly">Per Week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available From
                      </label>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          type="date"
                          className="border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </motion.div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lease Duration (if rental)
                      </label>
                      <Select>
                        <SelectTrigger className="border-gray-200 hover:border-luxury-blue transition-colors">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6months">6 Months</SelectItem>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="2years">2 Years</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Information
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          placeholder="Contact Name"
                          className="border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input
                          placeholder="Phone Number"
                          type="tel"
                          className="border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </motion.div>
                    </div>
                  </div>

                  <div className="bg-luxury-blue/5 p-6 rounded-lg border border-luxury-blue/20">
                    <h4 className="font-semibold text-luxury-navy mb-2">
                      Listing Summary
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Property Type:</span>
                        <span className="ml-2 font-medium">Villa</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <span className="ml-2 font-medium">$2,850,000</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Bedrooms:</span>
                        <span className="ml-2 font-medium">4</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Bathrooms:</span>
                        <span className="ml-2 font-medium">3</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          className="flex justify-between mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-8"
            >
              Previous
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={currentStep === steps.length ? undefined : nextStep}
              className={`px-8 ${
                currentStep === steps.length
                  ? "bg-emerald-500 hover:bg-emerald-600"
                  : "bg-luxury-blue hover:bg-blue-600"
              } text-white`}
            >
              {currentStep === steps.length ? "Publish Listing" : "Next Step"}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
