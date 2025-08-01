import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonAction?: string;
}

export function PlaceholderPage({ 
  title, 
  description, 
  buttonText = "Continue Building", 
  buttonAction = "/" 
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="shadow-lg border-0">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-luxury-blue/10 p-6 rounded-full">
                <Construction className="h-16 w-16 text-luxury-blue" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-luxury-navy mb-4">
              {title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {description}
            </p>
            
            <div className="space-y-4">
              <p className="text-gray-500">
                This page is currently under development. Our team is working hard to bring you amazing features.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link to={buttonAction}>
                  <Button className="bg-luxury-blue hover:bg-blue-600 text-white">
                    {buttonText}
                  </Button>
                </Link>
                
                <Link to="/">
                  <Button variant="outline" className="border-luxury-blue text-luxury-blue hover:bg-luxury-blue hover:text-white">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-400">
                Have a specific request for this page? Continue prompting to help us build exactly what you need.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
