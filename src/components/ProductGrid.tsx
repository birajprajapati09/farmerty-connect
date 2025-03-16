
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Skeleton } from './ui/skeleton';

// Mock product data
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Fresh Organic Strawberries",
    farmer: "Green Valley Farm",
    farmerId: "f1",
    price: 5.99,
    unit: "basket",
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 4.8,
    category: "Berries",
    organic: true,
  },
  {
    id: "2",
    name: "Heirloom Tomatoes",
    farmer: "Sunshine Organics",
    farmerId: "f2",
    price: 3.49,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 4.5,
    category: "Vegetables",
    organic: true,
  },
  {
    id: "3",
    name: "Free-Range Eggs",
    farmer: "Happy Hens Farm",
    farmerId: "f3",
    price: 4.99,
    unit: "dozen",
    image: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 4.9,
    category: "Dairy & Eggs",
    organic: true,
  },
  {
    id: "4",
    name: "Rustic Sourdough Bread",
    farmer: "Artisan Bakery",
    farmerId: "f4",
    price: 6.50,
    unit: "loaf",
    image: "https://images.unsplash.com/photo-1584997691073-91e2a8e0a9ef?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 4.7,
    category: "Bakery",
    organic: false,
  },
  {
    id: "5",
    name: "Local Honey",
    farmer: "Busy Bee Apiaries",
    farmerId: "f5",
    price: 8.99,
    unit: "jar",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 4.8,
    category: "Pantry",
    organic: true,
  },
  {
    id: "6",
    name: "Fresh Spinach",
    farmer: "Greens & More",
    farmerId: "f6",
    price: 2.99,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 4.3,
    category: "Vegetables",
    organic: true,
  },
  {
    id: "7",
    name: "Grass-Fed Ground Beef",
    farmer: "Highland Pastures",
    farmerId: "f7",
    price: 7.99,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 4.6,
    category: "Meat",
    organic: false,
  },
  {
    id: "8",
    name: "Freshly Roasted Coffee Beans",
    farmer: "Mountain Roasters",
    farmerId: "f8",
    price: 12.99,
    unit: "bag",
    image: "https://images.unsplash.com/photo-1559056211-185c446ff3d1?auto=format&fit=crop&q=80&w=400&h=400",
    rating: 4.9,
    category: "Beverages",
    organic: true,
  }
];

interface ProductGridProps {
  title?: string;
  showLoadMore?: boolean;
}

const ProductGrid = ({ title, showLoadMore = false }: ProductGridProps) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-medium mb-6">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                <Skeleton className="aspect-square w-full" />
                <div className="p-4">
                  <Skeleton className="h-5 w-4/5 mb-2" />
                  <Skeleton className="h-3 w-2/5 mb-3" />
                  <Skeleton className="h-3 w-3/5 mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-8 w-16 rounded-md" />
                  </div>
                </div>
              </div>
            ))
          : products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
      </div>
      
      {showLoadMore && products.length > 0 && (
        <div className="flex justify-center mt-12">
          <button className="px-6 py-2.5 border border-gray-200 rounded-full text-sm font-medium hover:border-farmgreen-500 hover:text-farmgreen-600 transition-all duration-200">
            Load More Products
          </button>
        </div>
      )}
      
      {/* Empty state */}
      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-50 inline-flex rounded-full p-3 mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-1">No products found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
