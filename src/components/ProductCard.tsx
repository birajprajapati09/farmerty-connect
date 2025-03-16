
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  farmer: string;
  farmerId: string;
  price: number;
  unit: string;
  image: string;
  rating: number;
  category: string;
  organic: boolean;
}

const ProductCard = ({
  id,
  name,
  farmer,
  farmerId,
  price,
  unit,
  image,
  rating,
  category,
  organic,
}: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    toast("Added to cart", {
      description: `${name} has been added to your cart`,
      action: {
        label: "View Cart",
        onClick: () => console.log("View cart clicked"),
      },
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast(isFavorite ? "Removed from favorites" : "Added to favorites", {
      description: `${name} has been ${isFavorite ? "removed from" : "added to"} your favorites`,
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-100">
      {/* Image */}
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={image} 
          alt={name}
          className={cn(
            "object-cover w-full h-full transition-all duration-500",
            "group-hover:scale-105",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
        )}
        
        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-700">
            {category}
          </span>
        </div>
        
        {/* Organic Badge */}
        {organic && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-farmgreen-100 text-farmgreen-700">
              Organic
            </span>
          </div>
        )}
        
        {/* Favorite Button */}
        <button 
          onClick={handleToggleFavorite}
          className="absolute right-3 bottom-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-transform duration-300 hover:scale-110"
        >
          <Heart className={cn(
            "w-4 h-4 transition-colors",
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
          )} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <Link to={`/products/${id}`} className="block">
          <h3 className="font-medium text-base mb-1 hover:text-farmgreen-600 transition-colors line-clamp-1">{name}</h3>
        </Link>
        
        <Link to={`/farmers/${farmerId}`} className="text-xs text-muted-foreground hover:text-farmgreen-600 transition-colors">
          by {farmer}
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={cn(
                  "w-3.5 h-3.5", 
                  i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : 
                  i < rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
        </div>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-medium text-base">${price.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground ml-1">/ {unit}</span>
          </div>
          
          <Button 
            size="sm" 
            variant="outline"
            className="h-8 px-3 border-farmgreen-200 hover:bg-farmgreen-50 hover:border-farmgreen-300 transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3.5 w-3.5 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
