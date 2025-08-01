import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Heart,
  Home,
  Eye,
  Star,
  Calendar,
  Bell,
  Shield,
  Camera,
  Save,
  Trash2,
  Plus,
  TrendingUp,
  Building,
  Clock,
  DollarSign,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

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

// Mock user data
const userData = {
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "(555) 123-4567",
  location: "Beverly Hills, CA",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  memberSince: "January 2023",
  verified: true
};

const userStats = [
  { icon: Heart, label: "Saved Properties", value: "12", color: "text-red-500" },
  { icon: Eye, label: "Properties Viewed", value: "45", color: "text-blue-500" },
  { icon: Home, label: "Listed Properties", value: "2", color: "text-emerald-500" },
  { icon: Star, label: "Reviews Given", value: "8", color: "text-yellow-500" }
];

const savedProperties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: "$2,850,000",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    savedDate: "2024-01-15",
    status: "Active"
  },
  {
    id: 2,
    title: "Contemporary Downtown Loft",
    location: "Manhattan, NY",
    price: "$1,200,000",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    savedDate: "2024-01-20",
    status: "Active"
  }
];

const listedProperties = [
  {
    id: 1,
    title: "Elegant Family Home",
    location: "Austin, TX",
    price: "$875,000",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    views: 156,
    inquiries: 8,
    status: "Active",
    listedDate: "2024-01-10"
  }
];

const recentActivity = [
  {
    type: "saved",
    title: "Saved Modern Luxury Villa",
    time: "2 hours ago",
    icon: Heart
  },
  {
    type: "viewed",
    title: "Viewed Downtown Penthouse",
    time: "1 day ago",
    icon: Eye
  },
  {
    type: "inquiry",
    title: "Received inquiry on Family Home",
    time: "3 days ago",
    icon: Mail
  },
  {
    type: "updated",
    title: "Updated profile information",
    time: "1 week ago",
    icon: User
  }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center space-x-6 mb-6 md:mb-0">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback className="text-xl font-semibold bg-luxury-blue text-white">
                        {userData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <motion.button
                      className="absolute bottom-0 right-0 bg-luxury-blue text-white p-2 rounded-full shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Camera className="h-4 w-4" />
                    </motion.button>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-2xl font-bold text-luxury-navy">{userData.name}</h1>
                      {userData.verified && (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {userData.email}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {userData.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Member since {userData.memberSince}
                      </div>
                    </div>
                  </div>
                </div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className={isEditing ? "border-luxury-blue text-luxury-blue" : "bg-luxury-blue hover:bg-blue-600 text-white"}
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {userStats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="bg-gray-50 p-3 rounded-full">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-luxury-navy mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white border border-gray-200 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-luxury-blue data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="favorites" className="data-[state=active]:bg-luxury-blue data-[state=active]:text-white">
                Favorites
              </TabsTrigger>
              <TabsTrigger value="listings" className="data-[state=active]:bg-luxury-blue data-[state=active]:text-white">
                My Listings
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-luxury-blue data-[state=active]:text-white">
                Settings
              </TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-luxury-blue data-[state=active]:text-white">
                Activity
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Recent Activity */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-luxury-navy mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="bg-luxury-blue/10 p-2 rounded-full">
                              <activity.icon className="h-4 w-4 text-luxury-blue" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{activity.title}</p>
                              <p className="text-sm text-gray-500">{activity.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-luxury-navy mb-4">Quick Actions</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Link to="/list-property">
                          <motion.div 
                            className="p-4 border border-gray-200 rounded-lg hover:border-luxury-blue transition-colors cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center space-x-3">
                              <Plus className="h-5 w-5 text-luxury-blue" />
                              <span className="font-medium">List New Property</span>
                            </div>
                          </motion.div>
                        </Link>
                        
                        <Link to="/properties">
                          <motion.div 
                            className="p-4 border border-gray-200 rounded-lg hover:border-luxury-blue transition-colors cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center space-x-3">
                              <Home className="h-5 w-5 text-luxury-blue" />
                              <span className="font-medium">Browse Properties</span>
                            </div>
                          </motion.div>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Account Status */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-luxury-navy mb-4">Account Status</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Email Verified</span>
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Phone Verified</span>
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Profile Complete</span>
                          <span className="text-sm font-medium text-luxury-blue">85%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notifications */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-luxury-navy">Notifications</h3>
                        <Bell className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm font-medium text-blue-900">New price alert</p>
                          <p className="text-xs text-blue-700">Property price reduced by 5%</p>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                          <p className="text-sm font-medium text-emerald-900">Listing approved</p>
                          <p className="text-xs text-emerald-700">Your property is now live</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-luxury-navy">Saved Properties</h3>
                    <Badge variant="secondary">{savedProperties.length} properties</Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedProperties.map((property) => (
                      <motion.div
                        key={property.id}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                      >
                        <img 
                          src={property.image} 
                          alt={property.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-semibold text-luxury-navy mb-2">{property.title}</h4>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-luxury-blue">{property.price}</span>
                            <Badge variant="secondary" className="text-xs">
                              {property.status}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Listings Tab */}
            <TabsContent value="listings" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-luxury-navy">My Property Listings</h3>
                    <Link to="/list-property">
                      <Button className="bg-luxury-blue hover:bg-blue-600 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Listing
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {listedProperties.map((property) => (
                      <motion.div
                        key={property.id}
                        className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-luxury-blue transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <img 
                          src={property.image} 
                          alt={property.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-luxury-navy">{property.title}</h4>
                          <div className="flex items-center text-gray-600 mb-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              <span>{property.views} views</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              <span>{property.inquiries} inquiries</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-luxury-blue mb-1">{property.price}</div>
                          <Badge variant="secondary">{property.status}</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-luxury-navy mb-6">Personal Information</h3>
                    <form className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name
                          </label>
                          <Input 
                            defaultValue="John"
                            disabled={!isEditing}
                            className="border-gray-200 focus:border-luxury-blue transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name
                          </label>
                          <Input 
                            defaultValue="Smith"
                            disabled={!isEditing}
                            className="border-gray-200 focus:border-luxury-blue transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <Input 
                          defaultValue={userData.email}
                          disabled={!isEditing}
                          className="border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input 
                          defaultValue={userData.phone}
                          disabled={!isEditing}
                          className="border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <Input 
                          defaultValue={userData.location}
                          disabled={!isEditing}
                          className="border-gray-200 focus:border-luxury-blue transition-colors"
                        />
                      </div>

                      {isEditing && (
                        <div className="flex space-x-4 pt-4">
                          <Button className="bg-luxury-blue hover:bg-blue-600 text-white">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-luxury-navy mb-6">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates via email</p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Price Alerts</p>
                          <p className="text-sm text-gray-600">Get notified of price changes</p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Listings</p>
                          <p className="text-sm text-gray-600">Alert for new properties in your area</p>
                        </div>
                        <input type="checkbox" className="toggle" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Updates</p>
                          <p className="text-sm text-gray-600">Receive promotional content</p>
                        </div>
                        <input type="checkbox" className="toggle" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-luxury-navy mb-6">Activity History</h3>
                  <div className="space-y-4">
                    {recentActivity.concat([
                      { type: "listed", title: "Listed Elegant Family Home", time: "2 weeks ago", icon: Home },
                      { type: "searched", title: "Searched properties in Austin", time: "3 weeks ago", icon: TrendingUp },
                      { type: "contacted", title: "Contacted agent for Villa tour", time: "1 month ago", icon: Phone }
                    ]).map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="bg-luxury-blue/10 p-3 rounded-full">
                          <activity.icon className="h-5 w-5 text-luxury-blue" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
