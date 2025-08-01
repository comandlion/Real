import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Search, 
  Star, 
  Phone, 
  Mail, 
  MessageCircle,
  Award,
  TrendingUp,
  Users,
  Clock,
  MapPin,
  Building,
  Filter
} from "lucide-react";

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

const agents = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    specialization: "Luxury Properties",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 127,
    sales: 156,
    experience: 8,
    phone: "(555) 123-4567",
    email: "sarah.johnson@premiumrealty.com",
    languages: ["English", "Spanish"],
    areas: ["Beverly Hills", "West Hollywood", "Santa Monica"],
    description: "Specializing in luxury properties with over 8 years of experience in the premium market."
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Investment Property Specialist",
    specialization: "Commercial & Investment",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 94,
    sales: 132,
    experience: 6,
    phone: "(555) 234-5678",
    email: "michael.chen@premiumrealty.com",
    languages: ["English", "Mandarin"],
    areas: ["Downtown LA", "Century City", "Culver City"],
    description: "Expert in commercial properties and investment opportunities throughout Los Angeles."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "First-Time Buyer Specialist",
    specialization: "Residential Properties",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 203,
    sales: 89,
    experience: 4,
    phone: "(555) 345-6789",
    email: "emily.rodriguez@premiumrealty.com",
    languages: ["English", "Spanish", "French"],
    areas: ["Pasadena", "Glendale", "Burbank"],
    description: "Dedicated to helping first-time buyers navigate the home buying process with ease."
  },
  {
    id: 4,
    name: "David Thompson",
    title: "Luxury Home Expert",
    specialization: "High-End Estates",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 78,
    sales: 201,
    experience: 12,
    phone: "(555) 456-7890",
    email: "david.thompson@premiumrealty.com",
    languages: ["English", "Italian"],
    areas: ["Malibu", "Manhattan Beach", "Palos Verdes"],
    description: "Premier agent for luxury estates and waterfront properties along the coast."
  },
  {
    id: 5,
    name: "Lisa Wang",
    title: "Relocation Specialist",
    specialization: "Corporate Relocations",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 156,
    sales: 98,
    experience: 7,
    phone: "(555) 567-8901",
    email: "lisa.wang@premiumrealty.com",
    languages: ["English", "Mandarin", "Korean"],
    areas: ["Irvine", "Newport Beach", "Huntington Beach"],
    description: "Specializing in corporate relocations and helping families find their perfect new home."
  },
  {
    id: 6,
    name: "Robert Garcia",
    title: "New Construction Expert",
    specialization: "New Developments",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 67,
    sales: 45,
    experience: 3,
    phone: "(555) 678-9012",
    email: "robert.garcia@premiumrealty.com",
    languages: ["English", "Spanish"],
    areas: ["Playa Vista", "El Segundo", "Marina del Rey"],
    description: "Expert in new construction properties and modern developments in emerging neighborhoods."
  }
];

const teamStats = [
  { icon: Users, value: "50+", label: "Expert Agents" },
  { icon: Award, value: "2,500+", label: "Properties Sold" },
  { icon: TrendingUp, value: "98%", label: "Client Satisfaction" },
  { icon: Clock, value: "24/7", label: "Support Available" }
];

export default function Agents() {
  return (
    <div className="min-h-screen bg-white">
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
              backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
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
            Meet Our Expert Team
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Our experienced agents are dedicated to helping you find the perfect property and navigate your real estate journey.
          </motion.p>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            variants={containerVariants}
          >
            {teamStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-3">
                  <div className="bg-luxury-gold p-3 rounded-full">
                    <stat.icon className="h-6 w-6 text-luxury-navy" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-luxury-gold">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Search and Filters */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Input 
                  placeholder="Search agents by name, specialization, or area..." 
                  className="pl-10 border-gray-200 focus:border-luxury-blue transition-colors"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <Select>
                <SelectTrigger className="w-full md:w-48 border-gray-200 hover:border-luxury-blue transition-colors">
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  <SelectItem value="luxury">Luxury Properties</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="w-full md:w-48 border-gray-200 hover:border-luxury-blue transition-colors">
                  <SelectValue placeholder="Area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="beverly-hills">Beverly Hills</SelectItem>
                  <SelectItem value="santa-monica">Santa Monica</SelectItem>
                  <SelectItem value="malibu">Malibu</SelectItem>
                  <SelectItem value="downtown">Downtown LA</SelectItem>
                </SelectContent>
              </Select>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-luxury-blue hover:bg-blue-600 text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-4">
              Our Expert Agents
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get to know our team of dedicated professionals who are ready to help you achieve your real estate goals.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={agent.image} 
                      alt={agent.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-luxury-blue text-white">
                        {agent.specialization}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{agent.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-luxury-navy mb-1">
                      {agent.name}
                    </h3>
                    <p className="text-luxury-blue font-medium mb-3">{agent.title}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {agent.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <div className="flex items-center text-gray-500 mb-1">
                          <Award className="h-3 w-3 mr-1" />
                          <span>Experience</span>
                        </div>
                        <div className="font-medium">{agent.experience} years</div>
                      </div>
                      <div>
                        <div className="flex items-center text-gray-500 mb-1">
                          <Building className="h-3 w-3 mr-1" />
                          <span>Sales</span>
                        </div>
                        <div className="font-medium">{agent.sales} properties</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">Service Areas</div>
                      <div className="flex flex-wrap gap-1">
                        {agent.areas.slice(0, 2).map((area, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                        {agent.areas.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{agent.areas.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full bg-luxury-blue hover:bg-blue-600 text-white text-sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Call {agent.phone}
                        </Button>
                      </motion.div>
                      
                      <div className="flex gap-2">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full hover:bg-luxury-blue hover:text-white">
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full hover:bg-luxury-blue hover:text-white">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-luxury-navy to-luxury-blue text-white">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work with Our Team?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with one of our expert agents today and take the first step towards finding your perfect property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-luxury-gold hover:bg-yellow-500 text-luxury-navy font-semibold">
                Schedule Consultation
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-luxury-navy">
                View All Properties
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
