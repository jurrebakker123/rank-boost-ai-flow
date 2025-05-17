
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-brand-purple-light/5 to-brand-blue-light/10 -z-10"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-purple/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block rounded-full bg-brand-purple/10 px-4 py-1.5 text-sm font-medium text-brand-purple mb-4">
              AI-Powered SEO Assistant
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Want to rank higher on Google <span className="gradient-text">without lifting a finger?</span>
            </h1>
            <p className="text-lg text-gray-600 md:pr-10">
              SEOHelper.ai automates your entire SEO strategy. Get AI-generated blog posts, optimization tips, and monthly reports—all personalized for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/pricing">
                <Button 
                  className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity px-8 py-6 text-lg"
                >
                  Get Started Now
                </Button>
              </Link>
              <Link to="/demo">
                <Button 
                  variant="outline" 
                  className="border-brand-purple text-brand-purple hover:bg-brand-purple/10 px-8 py-6 text-lg"
                >
                  See Demo
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">👨‍💼</div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">👩‍💼</div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">👩‍💻</div>
              </div>
              <span className="text-sm text-gray-600">Trusted by 500+ businesses worldwide</span>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-100 animate-float">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h3 className="text-lg font-semibold">SEO Report Dashboard</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Updated Today</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Keyword Rankings</span>
                    <span className="text-green-600">+12%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-brand-purple w-3/4 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Organic Traffic</span>
                    <span className="text-green-600">+18%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-brand-blue w-4/5 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between mb-2">
                  <div className="text-xs text-gray-500">Latest blog post ready</div>
                  <div className="text-xs text-brand-purple">View details →</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-purple/20 rounded-full blur-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
