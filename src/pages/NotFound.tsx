
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      
      <main className="min-h-screen flex items-center justify-center bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-farmgreen-200 rounded-full animate-ping opacity-25"></div>
              <div className="relative bg-white rounded-full w-full h-full flex items-center justify-center border-4 border-farmgreen-100">
                <span className="text-4xl font-bold text-farmgreen-600">404</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
            
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-farmgreen-500 hover:bg-farmgreen-600 text-white">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-farmgreen-200 hover:bg-farmgreen-50">
                <Link to="/browse">
                  Browse Products
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NotFound;
