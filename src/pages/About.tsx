import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building,
  Users,
  Trophy,
  Heart,
  Star,
  MapPin,
  Phone,
  Mail,
  Award,
  Target,
  Shield,
  TrendingUp,
  Calendar,
  Home,
  Briefcase,
  Globe,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { icon: Building, value: "500+", label: "Properties Sold" },
    { icon: Users, value: "1,200+", label: "Happy Clients" },
    { icon: Trophy, value: "15", label: "Years Experience" },
    { icon: Award, value: "25+", label: "Industry Awards" },
  ];

  const teamMembers = [
    {
      name: "Sarah Mitchell",
      role: "CEO & Principal Broker",
      experience: "15+ years",
      specialization: "Luxury Properties",
      image: "/placeholder.svg",
      bio: "Leading Premium Realty with a vision for exceptional service and market expertise.",
    },
    {
      name: "Michael Chen",
      role: "Senior Agent",
      experience: "12+ years",
      specialization: "Commercial Real Estate",
      image: "/placeholder.svg",
      bio: "Specializing in commercial properties and investment opportunities.",
    },
    {
      name: "Emily Rodriguez",
      role: "Residential Specialist",
      experience: "8+ years",
      specialization: "First-Time Buyers",
      image: "/placeholder.svg",
      bio: "Helping families find their dream homes with personalized guidance.",
    },
    {
      name: "David Thompson",
      role: "Market Analyst",
      experience: "10+ years",
      specialization: "Market Research",
      image: "/placeholder.svg",
      bio: "Providing data-driven insights for informed real estate decisions.",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description: "We conduct business with the highest ethical standards and transparency.",
    },
    {
      icon: Heart,
      title: "Client-Focused",
      description: "Your goals and satisfaction are at the center of everything we do.",
    },
    {
      icon: TrendingUp,
      title: "Excellence",
      description: "We strive for excellence in every transaction and interaction.",
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "We deliver measurable results that exceed expectations.",
    },
  ];

  const achievements = [
    { year: "2023", achievement: "Top Real Estate Agency - Metro Awards" },
    { year: "2022", achievement: "Customer Service Excellence Award" },
    { year: "2021", achievement: "Fastest Growing Agency - Regional Recognition" },
    { year: "2020", achievement: "Digital Innovation in Real Estate Award" },
  ];

  const services = [
    "Residential Sales & Purchases",
    "Commercial Real Estate",
    "Property Investment Consulting",
    "Market Analysis & Valuation",
    "Property Management",
    "Relocation Services",
    "First-Time Buyer Programs",
    "Luxury Property Specialists",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-navy to-luxury-blue opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-luxury-gold text-luxury-navy px-4 py-2 text-sm font-medium">
              <Star className="h-4 w-4 mr-2" />
              Established 2009
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About Premium
              <span className="text-luxury-gold"> Realty</span>
            </h1>
            
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              For over 15 years, we've been transforming the real estate experience through 
              innovation, integrity, and an unwavering commitment to our clients' success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/properties">
                <Button size="lg" className="bg-luxury-gold hover:bg-yellow-500 text-luxury-navy font-semibold">
                  View Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-luxury-navy">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-blue/10 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-luxury-blue" />
                </div>
                <div className="text-3xl font-bold text-luxury-navy mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-luxury-blue/10 text-luxury-blue">
                <Building className="h-4 w-4 mr-2" />
                Our Story
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-6">
                Building Dreams, Creating Legacies
              </h2>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2009 by Sarah Mitchell, Premium Realty began with a simple mission: 
                  to revolutionize the real estate experience through personalized service, 
                  cutting-edge technology, and unwavering integrity.
                </p>
                
                <p>
                  What started as a small boutique agency has grown into one of the region's 
                  most trusted real estate firms, but we've never lost sight of our core values. 
                  Every client relationship is built on trust, expertise, and a genuine commitment 
                  to achieving their real estate goals.
                </p>
                
                <p>
                  Today, Premium Realty stands as a beacon of excellence in the industry, 
                  recognized for our innovative approach, market expertise, and the exceptional 
                  results we deliver for our clients.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-luxury-blue to-luxury-navy rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-luxury-blue/20"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-luxury-gold/10 text-luxury-gold">
              <Heart className="h-4 w-4 mr-2" />
              Our Values
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-6">
              What Drives Us Every Day
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our values aren't just words on a wall—they're the foundation of every 
              interaction and the driving force behind our success.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-luxury-blue/10 rounded-full mb-4">
                      <value.icon className="h-6 w-6 text-luxury-blue" />
                    </div>
                    <h3 className="text-xl font-semibold text-luxury-navy mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-luxury-blue/10 text-luxury-blue">
              <Users className="h-4 w-4 mr-2" />
              Our Team
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-6">
              Meet the Experts
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of real estate professionals brings decades of combined 
              experience and a passion for helping clients achieve their property goals.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gradient-to-br from-luxury-blue to-luxury-navy">
                    <div className="w-full h-full bg-[url('/placeholder.svg')] bg-cover bg-center"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-luxury-navy mb-1">
                      {member.name}
                    </h3>
                    <p className="text-luxury-blue font-medium mb-2">{member.role}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {member.experience}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {member.specialization}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <Badge className="mb-4 bg-luxury-gold/10 text-luxury-gold">
                <Globe className="h-4 w-4 mr-2" />
                Our Services
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-6">
                Comprehensive Real Estate Solutions
              </h2>
              
              <p className="text-gray-600 mb-8">
                From first-time homebuyers to seasoned investors, we offer a full suite 
                of real estate services tailored to your unique needs and goals.
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-success-green flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="p-6 bg-gradient-to-br from-luxury-blue to-luxury-navy text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Home className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Personalized Approach</h3>
                    <p className="text-blue-100">Tailored strategies for every client</p>
                  </div>
                </div>
                <p className="text-blue-100">
                  We understand that every real estate journey is unique. Our personalized 
                  approach ensures you receive the attention and expertise you deserve.
                </p>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-luxury-gold to-yellow-500 text-luxury-navy">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Market Expertise</h3>
                    <p className="text-yellow-800">Deep local market knowledge</p>
                  </div>
                </div>
                <p className="text-yellow-800">
                  Our team's extensive market knowledge and data-driven insights give you 
                  a competitive advantage in today's dynamic real estate market.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-luxury-blue/10 text-luxury-blue">
              <Trophy className="h-4 w-4 mr-2" />
              Recognition
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-6">
              Awards & Achievements
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence has been recognized by industry leaders 
              and satisfied clients throughout our journey.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-2xl font-bold text-luxury-blue mb-2">
                    {achievement.year}
                  </div>
                  <p className="text-gray-700 font-medium">
                    {achievement.achievement}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-luxury-navy to-luxury-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Real Estate Journey?
            </h2>
            
            <p className="text-xl text-gray-200 mb-8">
              Let our experienced team guide you through every step of your real estate experience. 
              Contact us today to get started.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-luxury-gold hover:bg-yellow-500 text-luxury-navy font-semibold">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us Today
                </Button>
              </Link>
              <Link to="/properties">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-luxury-navy">
                  <Building className="mr-2 h-5 w-5" />
                  Browse Properties
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
