import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Construction, ArrowLeft, Sparkles, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface PlaceholderPageProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonAction?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

const features = [
  {
    icon: CheckCircle,
    title: "Coming Soon",
    description: "This page is in active development"
  },
  {
    icon: Sparkles,
    title: "Enhanced Features",
    description: "We're building something amazing"
  },
  {
    icon: Clock,
    title: "Stay Tuned",
    description: "Updates will be available soon"
  }
];

export function PlaceholderPage({ 
  title, 
  description, 
  buttonText = "Continue Building", 
  buttonAction = "/" 
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="shadow-xl border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <motion.div 
                className="flex justify-center mb-8"
                variants={itemVariants}
              >
                <motion.div 
                  className="bg-gradient-to-r from-luxury-blue to-blue-600 p-8 rounded-full shadow-lg"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Construction className="h-16 w-16 text-white" />
                </motion.div>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-luxury-navy mb-6"
                variants={itemVariants}
              >
                {title}
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                variants={itemVariants}
              >
                {description}
              </motion.p>

              {/* Enhanced feature grid */}
              <motion.div 
                className="grid md:grid-cols-3 gap-6 mb-8"
                variants={containerVariants}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-6 rounded-2xl bg-gradient-to-br from-luxury-blue/5 to-blue-50 border border-luxury-blue/10"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(59, 130, 246, 0.1)"
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="bg-luxury-blue/10 p-3 rounded-lg">
                        <feature.icon className="h-6 w-6 text-luxury-blue" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-luxury-navy mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="space-y-6"
                variants={itemVariants}
              >
                <p className="text-gray-500 max-w-2xl mx-auto">
                  This page is currently under development. Our team is working hard to bring you amazing features that will enhance your real estate experience.
                </p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
                  variants={containerVariants}
                >
                  <Link to={buttonAction}>
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }} 
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="bg-luxury-blue hover:bg-blue-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                        {buttonText}
                      </Button>
                    </motion.div>
                  </Link>
                  
                  <Link to="/">
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }} 
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button variant="outline" className="border-luxury-blue text-luxury-blue hover:bg-luxury-blue hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300 group">
                        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="mt-12 pt-8 border-t border-gray-200"
                variants={itemVariants}
              >
                <div className="bg-gradient-to-r from-luxury-blue/5 to-blue-50 rounded-2xl p-6 border border-luxury-blue/10">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Have a specific request for this page?</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    Continue prompting to help us build exactly what you need. We're constantly improving based on user feedback.
                  </p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional visual elements */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {[
            { label: "Development Progress", value: "75%", color: "bg-emerald-500" },
            { label: "Features Planned", value: "12+", color: "bg-blue-500" },
            { label: "User Feedback", value: "★★★★★", color: "bg-yellow-500" },
            { label: "Launch Timeline", value: "Soon", color: "bg-purple-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
              }}
            >
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <div className="w-6 h-6 bg-white/30 rounded"></div>
              </div>
              <div className="text-2xl font-bold text-luxury-navy mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      <Footer />
    </div>
  );
}
