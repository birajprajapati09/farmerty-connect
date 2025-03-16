
import { useRef, useEffect, useState } from 'react';
import { Truck, ShoppingBag, Heart, Map, MessageCircle, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature = ({ icon, title, description, delay }: FeatureProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={ref}
      className={cn(
        "bg-white rounded-2xl p-6 border border-gray-100 transition-all duration-700 ease-out",
        isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-farmgreen-50 flex items-center justify-center mb-4 text-farmgreen-600">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Fresh & Local Products",
      description: "Browse and purchase a wide variety of fresh, locally grown products directly from farmers.",
      delay: 100,
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: "Location-Based Discovery",
      description: "Find farmers and products near you with our easy-to-use location search feature.",
      delay: 200,
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Fast & Reliable Delivery",
      description: "Get your orders delivered to your doorstep quickly with our efficient delivery network.",
      delay: 300,
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Direct Communication",
      description: "Chat directly with farmers to learn more about their products and farming practices.",
      delay: 400,
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Support Local Farming",
      description: "Contribute to sustainable agriculture and help local farmers thrive in your community.",
      delay: 500,
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Transactions",
      description: "Enjoy safe and secure payments with our trusted payment processing system.",
      delay: 600,
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            Our platform makes it easy to connect farmers with consumers, providing a seamless farm-to-table experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
