
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="font-bold text-xl flex items-center gap-2">
            <span className="text-brand-purple font-extrabold">SEO</span>
            <span className="text-gray-800">Helper.ai</span>
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <button 
            onClick={() => scrollToSection('features')}
            className="text-gray-700 hover:text-brand-purple transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-gray-700 hover:text-brand-purple transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="text-gray-700 hover:text-brand-purple transition-colors"
          >
            Pricing
          </button>
          <button 
            onClick={() => scrollToSection('demo')}
            className="text-gray-700 hover:text-brand-purple transition-colors"
          >
            Demo
          </button>
          <Button 
            onClick={() => scrollToSection('cta')}
            className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity"
          >
            Get Started
          </Button>
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
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-brand-purple transition-colors py-2"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 hover:text-brand-purple transition-colors py-2"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-gray-700 hover:text-brand-purple transition-colors py-2"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('demo')}
              className="text-gray-700 hover:text-brand-purple transition-colors py-2"
            >
              Demo
            </button>
            <Button 
              onClick={() => scrollToSection('cta')}
              className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity w-full"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
