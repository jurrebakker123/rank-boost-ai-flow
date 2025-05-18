
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status whenever component mounts or route changes
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();
    
    // Set up an event listener for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const handleDashboardClick = () => {
    navigate('/dashboard');
    closeMobileMenu();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl flex items-center gap-2">
            <span className="text-brand-purple font-extrabold">SEO</span>
            <span className="text-gray-800">Helper.ai</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link 
            to="/features"
            className="text-gray-700 hover:text-brand-purple transition-colors"
          >
            Features
          </Link>
          <Link 
            to="/how-it-works"
            className="text-gray-700 hover:text-brand-purple transition-colors"
          >
            How It Works
          </Link>
          <Link 
            to="/pricing"
            className="text-gray-700 hover:text-brand-purple transition-colors"
          >
            Pricing
          </Link>
          <Link 
            to="/demo"
            className="text-gray-700 hover:text-brand-purple transition-colors"
          >
            Demo
          </Link>
          
          {isAuthenticated ? (
            <Button 
              onClick={handleDashboardClick}
              className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity"
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Link 
                to="/login"
                className="text-gray-700 hover:text-brand-purple transition-colors"
              >
                Login
              </Link>
              <Link to="/login">
                <Button 
                  className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 border-t">
          <div className="container mx-auto flex flex-col space-y-4">
            <Link 
              to="/features"
              className="text-gray-700 hover:text-brand-purple transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Features
            </Link>
            <Link 
              to="/how-it-works"
              className="text-gray-700 hover:text-brand-purple transition-colors py-2"
              onClick={closeMobileMenu}
            >
              How It Works
            </Link>
            <Link 
              to="/pricing"
              className="text-gray-700 hover:text-brand-purple transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Pricing
            </Link>
            <Link 
              to="/demo"
              className="text-gray-700 hover:text-brand-purple transition-colors py-2"
              onClick={closeMobileMenu}
            >
              Demo
            </Link>
            
            {isAuthenticated ? (
              <Button 
                onClick={handleDashboardClick}
                className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity w-full"
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-gray-700 hover:text-brand-purple transition-colors py-2"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button 
                    className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
