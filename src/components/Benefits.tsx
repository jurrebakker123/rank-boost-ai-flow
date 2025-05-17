
import React from 'react';
import { ArrowRight, Search, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Benefits = () => {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why choose <span className="gradient-text">SEOHelper.ai?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We make SEO accessible to everyone. No technical knowledge required, just results that help you get more visitors and customers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-10">
            <div className="flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-xl flex items-center justify-center">
                  <Search className="text-brand-purple w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Higher Google Rankings</h3>
                <p className="text-gray-600">
                  Our AI technology analyzes your website and industry to help you rank higher in search results for your key search terms.
                </p>
              </div>
            </div>
            
            <div className="flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-xl flex items-center justify-center">
                  <Star className="text-brand-purple w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI-Generated Content</h3>
                <p className="text-gray-600">
                  Get professional, SEO-optimized blog posts tailored to your business and target keywords - without writing anything yourself.
                </p>
              </div>
            </div>
            
            <div className="flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-xl flex items-center justify-center">
                  <Users className="text-brand-purple w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">More Visitors and Customers</h3>
                <p className="text-gray-600">
                  With better rankings and relevant content, you'll attract more visitors who are genuinely interested in what you have to offer.
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/how-it-works">
                <Button variant="outline" className="text-brand-purple border-brand-purple">
                  Discover how it works <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 ml-0 md:ml-10">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="text-sm text-gray-500 ml-2">SEOHelper.ai Dashboard</div>
                </div>
                <div className="h-1 bg-gray-100 w-full mb-6"></div>
                
                <div className="space-y-5">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Website Ranking</span>
                      <span className="text-green-600">+28%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full bg-brand-purple rounded-full w-4/5"></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Organic Traffic</span>
                      <span className="text-green-600">+64%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full bg-brand-blue rounded-full w-2/3"></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Content Performance</span>
                      <span className="text-green-600">+42%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue rounded-full w-3/5"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-500 bg-gray-50 py-2 rounded-md">
                Last update: today 10:24
              </div>
            </div>
            
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-gradient-to-r from-brand-purple/30 to-brand-blue/30 blur-sm"></div>
            <div className="absolute -z-10 -top-4 -left-4 w-24 h-24 rounded-full bg-brand-purple/20 blur-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
