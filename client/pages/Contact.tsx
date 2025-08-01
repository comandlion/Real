import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  Building,
  Users,
  Award,
  CheckCircle
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

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our experts",
    contact: "(555) 123-4567",
    action: "Call Now"
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message",
    contact: "contact@premiumrealty.com",
    action: "Send Email"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our team",
    contact: "Available 24/7",
    action: "Start Chat"
  }
];

const officeStats = [
  { icon: Building, value: "5", label: "Office Locations" },
  { icon: Users, value: "50+", label: "Expert Agents" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: CheckCircle, value: "2500+", label: "Happy Clients" }
];

export default function Contact() {
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
            Get in Touch
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Ready to find your dream property? Our expert team is here to help you every step of the way.
          </motion.p>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            variants={containerVariants}
          >
            {officeStats.map((stat, index) => (
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

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-luxury-navy mb-4">
              How Can We Help You?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the most convenient way to reach out to our team
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-6">
                      <div className="bg-luxury-blue/10 p-4 rounded-full">
                        <method.icon className="h-8 w-8 text-luxury-blue" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-luxury-navy mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <p className="font-medium text-luxury-blue mb-6">{method.contact}</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-luxury-blue hover:bg-blue-600 text-white">
                        {method.action}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Office Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-luxury-navy mb-6">
                    Send Us a Message
                  </h3>
                  
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input 
                          placeholder="First Name" 
                          className="border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <Input 
                          placeholder="Last Name" 
                          className="border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </motion.div>
                    </div>
                    
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input 
                        placeholder="Email Address" 
                        type="email"
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

                    <Select>
                      <SelectTrigger className="border-gray-200 hover:border-luxury-blue transition-colors">
                        <SelectValue placeholder="How can we help you?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buying">Buying a Property</SelectItem>
                        <SelectItem value="selling">Selling a Property</SelectItem>
                        <SelectItem value="renting">Renting a Property</SelectItem>
                        <SelectItem value="investment">Investment Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Textarea 
                        placeholder="Tell us more about what you're looking for..."
                        rows={4}
                        className="border-gray-200 focus:border-luxury-blue transition-colors"
                      />
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-luxury-blue hover:bg-blue-600 text-white py-3 text-lg">
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Office Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Main Office */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-luxury-navy mb-6">
                    Main Office
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-5 w-5 text-luxury-blue mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">123 Main Street<br />Beverly Hills, CA 90210</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Phone className="h-5 w-5 text-luxury-blue mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">(555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Mail className="h-5 w-5 text-luxury-blue mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">contact@premiumrealty.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Clock className="h-5 w-5 text-luxury-blue mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">Business Hours</p>
                        <p className="text-gray-600">
                          Monday - Friday: 8:00 AM - 8:00 PM<br />
                          Saturday - Sunday: 9:00 AM - 6:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-4 text-luxury-blue" />
                      <p className="text-lg font-medium">Interactive Map</p>
                      <p className="text-sm">Find us in Beverly Hills</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-luxury-blue/5 to-blue-50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-luxury-navy mb-2">
                    24/7 Emergency Support
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    For urgent property matters outside business hours
                  </p>
                  <p className="font-medium text-luxury-blue">(555) 911-HELP</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
