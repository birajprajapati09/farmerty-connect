import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="relative rounded-full bg-farmgreen-500 w-9 h-9 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6.5C9.5 6.5 7.5 7.67 7.5 10C7.5 13 10 16 12 17.5C14 16 16.5 13 16.5 10C16.5 7.67 14.5 6.5 12 6.5Z" fill="currentColor"/>
                  <path d="M12 2C7.58 2 4 5.58 4 10C4 16.42 12 22 12 22C12 22 20 16.42 20 10C20 5.58 16.42 2 12 2ZM12 19.5C10.43 18.28 6 14.39 6 10C6 6.69 8.69 4 12 4C15.31 4 18 6.69 18 10C18 14.39 13.57 18.28 12 19.5Z" fill="currentColor"/>
                </svg>
              </span>
              <span className="font-semibold text-lg text-farmgreen-900">SABJIBAZAR</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Connecting farmers directly with consumers. 
              Fresh produce from farm to table.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-500 hover:text-farmgreen-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-farmgreen-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-farmgreen-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/browse" className="text-muted-foreground text-sm hover:text-farmgreen-600 transition-colors">Browse Products</Link></li>
              <li><Link to="/farmers" className="text-muted-foreground text-sm hover:text-farmgreen-600 transition-colors">Find Farmers</Link></li>
              <li><Link to="/how-it-works" className="text-muted-foreground text-sm hover:text-farmgreen-600 transition-colors">How It Works</Link></li>
              <li><Link to="/about" className="text-muted-foreground text-sm hover:text-farmgreen-600 transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-muted-foreground text-sm hover:text-farmgreen-600 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-muted-foreground text-sm hover:text-farmgreen-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-muted-foreground text-sm hover:text-farmgreen-600 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-muted-foreground text-sm hover:text-farmgreen-600 transition-colors">Returns & Refunds</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Get Updates</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest products and offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-l-md text-sm flex-1 focus:outline-none focus:ring-1 focus:ring-farmgreen-500 focus:border-farmgreen-500" 
              />
              <button className="bg-farmgreen-500 hover:bg-farmgreen-600 text-white px-4 py-2 rounded-r-md text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} SABJIBAZAR. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-muted-foreground text-sm hover:text-farmgreen-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-muted-foreground text-sm hover:text-farmgreen-600 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-muted-foreground text-sm hover:text-farmgreen-600 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
