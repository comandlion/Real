import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Building,
  ArrowRight,
  Shield,
  CheckCircle,
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

const benefits = [
  {
    icon: CheckCircle,
    title: "Save Favorites",
    description: "Keep track of properties you love",
  },
  {
    icon: Shield,
    title: "Price Alerts",
    description: "Get notified when prices change",
  },
  {
    icon: Building,
    title: "Exclusive Access",
    description: "View premium listings first",
  },
];

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-luxury-navy mb-6">
                  Welcome to Premium Realty
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Join thousands of users who trust us to find their perfect
                  property. Sign in to unlock exclusive features and
                  personalized recommendations.
                </p>

                <motion.div
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      variants={itemVariants}
                    >
                      <div className="bg-luxury-blue/10 p-3 rounded-lg">
                        <benefit.icon className="h-6 w-6 text-luxury-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-luxury-navy mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Sign In Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  {/* Tab Switcher */}
                  <div className="flex mb-8 p-1 bg-gray-100 rounded-lg">
                    <motion.button
                      onClick={() => setIsSignUp(false)}
                      className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                        !isSignUp
                          ? "bg-white text-luxury-blue shadow-sm font-medium"
                          : "text-gray-600 hover:text-luxury-blue"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign In
                    </motion.button>
                    <motion.button
                      onClick={() => setIsSignUp(true)}
                      className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                        isSignUp
                          ? "bg-white text-luxury-blue shadow-sm font-medium"
                          : "text-gray-600 hover:text-luxury-blue"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign Up
                    </motion.button>
                  </div>

                  <motion.div
                    key={isSignUp ? "signup" : "signin"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-luxury-navy mb-2">
                      {isSignUp ? "Create your account" : "Welcome back"}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {isSignUp
                        ? "Join Premium Realty and start your property journey today"
                        : "Sign in to access your saved properties and preferences"}
                    </p>

                    {/* Social Login */}
                    <div className="space-y-3 mb-6">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full h-12 border-gray-200 hover:border-luxury-blue"
                        >
                          Continue with Google
                        </Button>
                      </motion.div>

                      <div className="grid grid-cols-2 gap-3">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full h-12 border-gray-200 hover:border-luxury-blue"
                          >
                            Facebook
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant="outline"
                            className="w-full h-12 border-gray-200 hover:border-luxury-blue"
                          >
                            Apple
                          </Button>
                        </motion.div>
                      </div>
                    </div>

                    <div className="relative mb-6">
                      <Separator />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-white px-4 text-sm text-gray-500">
                          or continue with email
                        </span>
                      </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-4">
                      {isSignUp && (
                        <div className="grid grid-cols-2 gap-4">
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="First Name"
                                className="pl-10 h-12 border-gray-200 focus:border-luxury-blue transition-colors"
                              />
                            </div>
                          </motion.div>
                          <motion.div whileFocus={{ scale: 1.02 }}>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Last Name"
                                className="pl-10 h-12 border-gray-200 focus:border-luxury-blue transition-colors"
                              />
                            </div>
                          </motion.div>
                        </div>
                      )}

                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="Email Address"
                            className="pl-10 h-12 border-gray-200 focus:border-luxury-blue transition-colors"
                          />
                        </div>
                      </motion.div>

                      {isSignUp && (
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type="tel"
                              placeholder="Phone Number"
                              className="pl-10 h-12 border-gray-200 focus:border-luxury-blue transition-colors"
                            />
                          </div>
                        </motion.div>
                      )}

                      <motion.div whileFocus={{ scale: 1.02 }}>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="pl-10 pr-10 h-12 border-gray-200 focus:border-luxury-blue transition-colors"
                          />
                          <motion.button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </motion.button>
                        </div>
                      </motion.div>

                      {isSignUp && (
                        <motion.div whileFocus={{ scale: 1.02 }}>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              className="pl-10 pr-10 h-12 border-gray-200 focus:border-luxury-blue transition-colors"
                            />
                            <motion.button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </motion.button>
                          </div>
                        </motion.div>
                      )}

                      {!isSignUp && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <label
                              htmlFor="remember"
                              className="text-sm text-gray-600"
                            >
                              Remember me
                            </label>
                          </div>
                          <Link
                            to="/forgot-password"
                            className="text-sm text-luxury-blue hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                      )}

                      {isSignUp && (
                        <div className="flex items-start space-x-2">
                          <Checkbox id="terms" className="mt-1" />
                          <label
                            htmlFor="terms"
                            className="text-sm text-gray-600"
                          >
                            I agree to the{" "}
                            <Link
                              to="/terms"
                              className="text-luxury-blue hover:underline"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="/privacy"
                              className="text-luxury-blue hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                      )}

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full h-12 bg-luxury-blue hover:bg-blue-600 text-white text-lg font-semibold">
                          {isSignUp ? "Create Account" : "Sign In"}
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </Button>
                      </motion.div>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-gray-600">
                        {isSignUp
                          ? "Already have an account?"
                          : "Don't have an account?"}{" "}
                        <motion.button
                          onClick={() => setIsSignUp(!isSignUp)}
                          className="text-luxury-blue hover:underline font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          {isSignUp ? "Sign in" : "Sign up for free"}
                        </motion.button>
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <motion.div
                className="mt-6 text-center text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    <span>Secure & Encrypted</span>
                  </div>
                  <div className="w-1 h-4 bg-gray-300 rounded"></div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Trusted by 10,000+ Users</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
