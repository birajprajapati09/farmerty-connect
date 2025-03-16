
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-farmgreen-50 to-white">
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(156, 163, 175, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </div>
      
      <div className={cn(
        "absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-farmgreen-100/40 via-farmgreen-50/20 to-transparent transform-gpu",
        "transition-transform duration-1000 ease-out",
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )} />

      <div className="max-w-3xl z-10">
        <div className={cn(
          "inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm text-sm mb-6",
          "transition-all duration-700 delay-200",
          isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
        )}>
          <span className="flex h-2 w-2 rounded-full bg-farmgreen-500 mr-2"></span>
          <span className="text-gray-600">Direct from local farms to your table</span>
        </div>
        
        <h1 className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6",
          "bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600",
          "transition-all duration-700 delay-300",
          isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
        )}>
          Fresh Farm Produce <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-farmgreen-600 to-farmgreen-400">
            Delivered to Your Doorstep
          </span>
        </h1>
        
        <p className={cn(
          "text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto",
          "transition-all duration-700 delay-400",
          isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
        )}>
          Support local farmers while enjoying fresh, seasonal, and sustainable food. 
          Browse products from farms near you and get them delivered with just a few clicks.
        </p>
        
        <div className={cn(
          "flex flex-col sm:flex-row items-center justify-center gap-4 mb-12",
          "transition-all duration-700 delay-500",
          isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
        )}>
          <Button size="lg" className="bg-farmgreen-500 hover:bg-farmgreen-600 text-white w-full sm:w-auto">
            Browse Products <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="border-farmgreen-200 hover:bg-farmgreen-50 w-full sm:w-auto">
            Find Local Farmers
          </Button>
        </div>
        
        <div className={cn(
          "relative max-w-md mx-auto",
          "transition-all duration-700 delay-600",
          isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
        )}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for fresh products..."
              className="w-full h-12 pl-12 pr-4 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-farmgreen-500 focus:border-transparent shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <div className="absolute -bottom-6 left-0 right-0 text-xs text-center text-muted-foreground">
            Popular searches: Organic vegetables, Free-range eggs, Seasonal fruits
          </div>
        </div>
      </div>
      
      <div className={cn(
        "absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent pointer-events-none",
        "transition-all duration-1000 delay-700",
        isLoaded ? "opacity-100" : "opacity-0"
      )} />
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-8 animate-bounce">
        <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
