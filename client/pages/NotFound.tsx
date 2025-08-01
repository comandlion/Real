import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="text-8xl font-bold text-luxury-blue mb-4">404</div>
          <h1 className="text-4xl font-bold text-luxury-navy mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-luxury-blue hover:bg-blue-600 text-white">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </Link>

            <Link to="/properties">
              <Button variant="outline" className="border-luxury-blue text-luxury-blue hover:bg-luxury-blue hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
