
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Home Cook",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
    content: "The quality of produce I've received through FarmertyConnect is exceptional. Everything is so fresh and flavorful, and I love knowing exactly where my food comes from.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Restaurant Owner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
    content: "As a restaurant owner, finding reliable sources of high-quality ingredients is crucial. This platform has connected me with amazing local farmers who provide consistently excellent products.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Health Enthusiast",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100",
    content: "I've been trying to eat more locally and sustainably, and this platform makes it so easy. The transparency about farming practices helps me make informed choices about my food.",
    rating: 4,
  },
];

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Check if stats section is visible
      if (statsRef.current) {
        const top = statsRef.current.getBoundingClientRect().top;
        const isVisible = top < window.innerHeight - 100;
        if (isVisible) {
          setStatsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Products Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-muted-foreground text-lg">
                Discover fresh, seasonal products from local farmers in your area.
              </p>
            </div>
            
            <ProductGrid />
            
            <div className="text-center mt-12">
              <Button className="bg-farmgreen-500 hover:bg-farmgreen-600 text-white">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <Features />
        
        {/* Stats Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-farmgreen-50 opacity-50 transform -skew-y-6"></div>
          <div className="absolute inset-0 bg-pattern"></div>
          
          <div 
            ref={statsRef}
            className="container relative mx-auto px-4 flex flex-col items-center"
          >
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Growing Together</h2>
              <p className="text-muted-foreground text-lg">
                Join our thriving community of farmers and consumers making a difference.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {[
                { value: "5,000+", label: "Happy Customers", delay: 0 },
                { value: "500+", label: "Local Farmers", delay: 100 },
                { value: "20,000+", label: "Products Delivered", delay: 200 }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 transition-all duration-700 ease-out",
                    statsVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-8",
                    statsVisible && `transition-delay-${stat.delay}`
                  )}
                >
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-farmgreen-600">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground text-lg">
                Hear from our community of farmers and consumers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={cn(
                          "w-5 h-5", 
                          i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  
                  <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
                  
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-farmgreen-500 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:max-w-lg">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to enjoy fresh, local produce?</h2>
                  <p className="text-farmgreen-50 text-lg">
                    Join our community today and start discovering the best products from local farmers in your area.
                  </p>
                  
                  <ul className="mt-6 space-y-2">
                    {[
                      "Support local farmers and sustainable agriculture",
                      "Access fresh, seasonal products at fair prices",
                      "Know where your food comes from and how it's grown"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-farmgreen-400 rounded-full p-1 mr-3 mt-0.5">
                          <Check className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-lg min-w-[280px] md:min-w-[320px]">
                  <h3 className="text-farmgreen-800 font-medium text-lg mb-4">Get Started Today</h3>
                  
                  <div className="space-y-4">
                    <Button className="w-full bg-farmgreen-500 hover:bg-farmgreen-600 text-white">
                      Sign Up as Consumer
                    </Button>
                    
                    <Button variant="outline" className="w-full border-farmgreen-200 bg-white hover:bg-farmgreen-50 text-farmgreen-800">
                      Register as Farmer
                    </Button>
                    
                    <div className="text-xs text-center text-gray-500 mt-4">
                      Already have an account? <a href="/login" className="text-farmgreen-600 hover:underline">Sign In</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
