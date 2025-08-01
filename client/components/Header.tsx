import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, Phone, Mail, Search, User, Heart } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-luxury-navy text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>contact@premiumrealty.com</span>
            </div>
          </div>
          <div className="text-sm">
            Monday - Sunday: 8:00 AM - 9:00 PM
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-luxury-blue text-white rounded-lg p-2">
              <div className="h-6 w-6 flex items-center justify-center font-bold text-lg">P</div>
            </div>
            <div className="text-xl font-bold text-luxury-navy">
              Premium<span className="text-luxury-blue">Realty</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-luxury-blue font-medium transition-colors">
              Home
            </Link>
            <Link to="/properties" className="text-gray-700 hover:text-luxury-blue font-medium transition-colors">
              Properties
            </Link>
            <Link to="/agents" className="text-gray-700 hover:text-luxury-blue font-medium transition-colors">
              Agents
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-luxury-blue font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-luxury-blue font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
            <Button className="bg-luxury-blue hover:bg-blue-600 text-white hidden md:block">
              List Property
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-luxury-blue font-medium">
                Home
              </Link>
              <Link to="/properties" className="text-gray-700 hover:text-luxury-blue font-medium">
                Properties
              </Link>
              <Link to="/agents" className="text-gray-700 hover:text-luxury-blue font-medium">
                Agents
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-luxury-blue font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-luxury-blue font-medium">
                Contact
              </Link>
              <div className="pt-4 border-t">
                <Button variant="ghost" className="w-full justify-start mb-2">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </Button>
                <Button variant="ghost" className="w-full justify-start mb-2">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button className="w-full bg-luxury-blue hover:bg-blue-600 text-white">
                  List Property
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
