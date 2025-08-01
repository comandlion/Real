import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Search, MapPin, Bed, Bath, Square, Heart, Star, Play, TrendingUp, Users, Award, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Mock data for featured properties
const featuredProperties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    location: "Beverly Hills, CA",
    price: "$2,850,000",
    beds: 4,
    baths: 3,
    sqft: "3,200",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Featured",
    type: "For Sale"
  },
  {
    id: 2,
    title: "Contemporary Downtown Loft",
    location: "Manhattan, NY",
    price: "$1,200,000",
    beds: 2,
    baths: 2,
    sqft: "1,800",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "New",
    type: "For Sale"
  },
  {
    id: 3,
    title: "Elegant Family Home",
    location: "Austin, TX",
    price: "$3,200/month",
    beds: 5,
    baths: 4,
    sqft: "4,100",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tag: "Hot",
    type: "For Rent"
  }
];

const stats = [
  { icon: TrendingUp, value: "2,500+", label: "Properties Sold" },
  { icon: Users, value: "1,200+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Clock, value: "24/7", label: "Support Available" }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-luxury-navy/90 to-luxury-blue/90">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-navy/80 to-luxury-blue/70" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Find Your
            <span className="block text-luxury-gold">Dream Home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover exceptional properties in prime locations with our expert real estate services
          </p>
          
          {/* Search Box */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Input 
                  placeholder="Enter location..." 
                  className="h-12 pl-10 bg-white border-gray-200"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              
              <Select>
                <SelectTrigger className="h-12 bg-white border-gray-200">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                </SelectContent>
              </Select>
              
              <Select>
                <SelectTrigger className="h-12 bg-white border-gray-200">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-500k">$0 - $500K</SelectItem>
                  <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                  <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                  <SelectItem value="2m+">$2M+</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="h-12 bg-luxury-blue hover:bg-blue-600 text-white font-semibold">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="text-gray-600">Popular:</span>
              <button className="text-luxury-blue hover:underline">Beverly Hills</button>
              <button className="text-luxury-blue hover:underline">Manhattan</button>
              <button className="text-luxury-blue hover:underline">Miami Beach</button>
              <button className="text-luxury-blue hover:underline">San Francisco</button>
            </div>
          </div>
          
          {/* Video Tour Button */}
          <div className="mt-8">
            <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/20">
              <Play className="h-5 w-5 mr-2" />
              Watch Virtual Tours
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-luxury-blue/10 p-4 rounded-full">
                    <stat.icon className="h-8 w-8 text-luxury-blue" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-luxury-navy mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-luxury-navy mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties in the most desirable locations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-luxury-blue text-white">{property.tag}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white text-gray-700">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-luxury-navy">
                      {property.type}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-luxury-navy group-hover:text-luxury-blue transition-colors">
                      {property.title}
                    </h3>
                    <div className="text-2xl font-bold text-luxury-blue">
                      {property.price}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.beds} beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.baths} baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>
                  
                  <Link to={`/property/${property.id}`}>
                    <Button className="w-full bg-luxury-blue hover:bg-blue-600 text-white">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/properties">
              <Button variant="outline" size="lg" className="border-luxury-blue text-luxury-blue hover:bg-luxury-blue hover:text-white">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-luxury-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let our expert team help you navigate the real estate market and find the property of your dreams
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-luxury-blue hover:bg-blue-600 text-white">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-luxury-navy">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
