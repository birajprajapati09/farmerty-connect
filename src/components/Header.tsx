
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, ShoppingBag, User, LogOut, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out w-full",
        isScrolled ? "bg-white/90 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative rounded-full bg-farmgreen-500 w-9 h-9 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-all duration-300">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6.5C9.5 6.5 7.5 7.67 7.5 10C7.5 13 10 16 12 17.5C14 16 16.5 13 16.5 10C16.5 7.67 14.5 6.5 12 6.5Z" fill="currentColor"/>
              <path d="M12 2C7.58 2 4 5.58 4 10C4 16.42 12 22 12 22C12 22 20 16.42 20 10C20 5.58 16.42 2 12 2ZM12 19.5C10.43 18.28 6 14.39 6 10C6 6.69 8.69 4 12 4C15.31 4 18 6.69 18 10C18 14.39 13.57 18.28 12 19.5Z" fill="currentColor"/>
            </svg>
          </span>
          <span className={cn(
            "font-semibold text-lg transition-colors duration-300",
            isScrolled ? "text-farmgreen-900" : "text-farmgreen-800"
          )}>FarmertyConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-x-8">
          <Link to="/browse" className="text-foreground/80 hover:text-foreground transition-colors duration-200">Browse</Link>
          <Link to="/farmers" className="text-foreground/80 hover:text-foreground transition-colors duration-200">Farmers</Link>
          <Link to="/how-it-works" className="text-foreground/80 hover:text-foreground transition-colors duration-200">How It Works</Link>
          <Link to="/about" className="text-foreground/80 hover:text-foreground transition-colors duration-200">About</Link>
          {user?.role === 'farmer' && (
            <Link to="/add-product" className="text-farmgreen-600 font-medium hover:text-farmgreen-700 transition-colors duration-200">
              Add Product
            </Link>
          )}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" aria-label="Cart" className="relative hover:bg-farmgreen-100">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-farmgreen-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </Button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-sm text-right hidden lg:block">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5 border-farmgreen-200 hover:bg-farmgreen-50 text-foreground"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-1" /> Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5 border-farmgreen-200 hover:bg-farmgreen-50 text-foreground"
                onClick={() => navigate('/sign-in')}
              >
                <User className="h-4 w-4 mr-1" /> Sign In
              </Button>
              
              <Button 
                size="sm" 
                className="bg-farmgreen-500 hover:bg-farmgreen-600 text-white"
                onClick={() => navigate('/sign-up')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center justify-center rounded-full w-10 h-10 hover:bg-black/5 transition-colors"
        >
          {isMenuOpen ? 
            <X className="h-6 w-6 text-foreground" /> : 
            <Menu className="h-6 w-6 text-foreground" />
          }
        </button>

        {/* Mobile Menu */}
        <div className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col transition-transform duration-300 ease-in-out pt-20 px-6",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <nav className="flex flex-col gap-y-8 items-center text-lg pt-10">
            <Link to="/browse" onClick={() => setIsMenuOpen(false)} className="text-foreground/80 hover:text-foreground transition-colors duration-200">Browse</Link>
            <Link to="/farmers" onClick={() => setIsMenuOpen(false)} className="text-foreground/80 hover:text-foreground transition-colors duration-200">Farmers</Link>
            <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)} className="text-foreground/80 hover:text-foreground transition-colors duration-200">How It Works</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-foreground/80 hover:text-foreground transition-colors duration-200">About</Link>
            {user?.role === 'farmer' && (
              <Link 
                to="/add-product" 
                onClick={() => setIsMenuOpen(false)} 
                className="text-farmgreen-600 font-medium hover:text-farmgreen-700 flex items-center gap-1.5"
              >
                <PlusCircle className="h-5 w-5" />
                Add Product
              </Link>
            )}
          </nav>
          
          <div className="flex flex-col gap-4 mt-10 w-full">
            {user ? (
              <>
                <div className="text-center mb-2">
                  <p className="font-medium text-base">{user.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-farmgreen-200 hover:bg-farmgreen-50 text-foreground"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="w-full border-farmgreen-200 hover:bg-farmgreen-50 text-foreground"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/sign-in');
                  }}
                >
                  <User className="h-4 w-4 mr-2" /> Sign In
                </Button>
                
                <Button 
                  className="w-full bg-farmgreen-500 hover:bg-farmgreen-600 text-white"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/sign-up');
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
