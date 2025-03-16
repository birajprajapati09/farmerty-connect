
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const CATEGORIES = [
  "Vegetables",
  "Fruits",
  "Dairy & Eggs",
  "Meat & Poultry",
  "Bakery",
  "Pantry",
  "Beverages",
  "Seafood",
  "Herbs & Spices",
];

const Browse = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [organicOnly, setOrganicOnly] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => 
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setOrganicOnly(false);
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Browse Products</h1>
              <p className="text-muted-foreground">
                Discover fresh, locally grown products from farmers near you.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10 md:hidden border-gray-200"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Mobile */}
            {showFilters && (
              <div className="fixed inset-0 bg-white z-40 md:hidden overflow-auto p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium">Filters</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-medium mb-4">Categories</h3>
                    <div className="space-y-3">
                      {CATEGORIES.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox 
                            id={`mobile-category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                            className="text-farmgreen-500 border-gray-300"
                          />
                          <label 
                            htmlFor={`mobile-category-${category}`}
                            className="ml-2 text-sm font-medium cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Price Range</h3>
                    <Slider
                      value={priceRange}
                      max={100}
                      step={1}
                      onValueChange={setPriceRange}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Product Type</h3>
                    <div className="flex items-center">
                      <Checkbox 
                        id="mobile-organic"
                        checked={organicOnly}
                        onCheckedChange={() => setOrganicOnly(!organicOnly)}
                        className="text-farmgreen-500 border-gray-300"
                      />
                      <label 
                        htmlFor="mobile-organic"
                        className="ml-2 text-sm font-medium cursor-pointer"
                      >
                        Organic Products Only
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="w-full mb-2"
                    >
                      Clear Filters
                    </Button>
                    <Button 
                      onClick={() => setShowFilters(false)}
                      className="w-full bg-farmgreen-500 hover:bg-farmgreen-600 text-white"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 bg-white rounded-xl border border-gray-100 p-6 h-fit sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-8 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-medium mb-4">Categories</h3>
                  <div className="space-y-3">
                    {CATEGORIES.map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox 
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                          className="text-farmgreen-500 border-gray-300"
                        />
                        <label 
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-4">Price Range</h3>
                  <Slider
                    value={priceRange}
                    max={100}
                    step={1}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-4">Product Type</h3>
                  <div className="flex items-center">
                    <Checkbox 
                      id="organic"
                      checked={organicOnly}
                      onCheckedChange={() => setOrganicOnly(!organicOnly)}
                      className="text-farmgreen-500 border-gray-300"
                    />
                    <label 
                      htmlFor="organic"
                      className="ml-2 text-sm cursor-pointer"
                    >
                      Organic Products Only
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="flex-1">
              {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 100 || organicOnly || searchQuery) && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <div 
                      key={category}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-farmgreen-50 text-farmgreen-700 rounded-full text-sm"
                    >
                      {category}
                      <button onClick={() => handleCategoryChange(category)}>
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  
                  {(priceRange[0] > 0 || priceRange[1] < 100) && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-farmgreen-50 text-farmgreen-700 rounded-full text-sm">
                      ${priceRange[0]} - ${priceRange[1]}
                      <button onClick={() => setPriceRange([0, 100])}>
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                  
                  {organicOnly && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-farmgreen-50 text-farmgreen-700 rounded-full text-sm">
                      Organic Only
                      <button onClick={() => setOrganicOnly(false)}>
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                  
                  {searchQuery && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-farmgreen-50 text-farmgreen-700 rounded-full text-sm">
                      "{searchQuery}"
                      <button onClick={() => setSearchQuery("")}>
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              <ProductGrid showLoadMore={true} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Browse;
