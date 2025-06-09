
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Zap, Target, Gauge } from 'lucide-react';

const AIOptimizationPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-brand-purple to-brand-blue py-20">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
                <Zap className="w-12 h-12" />
                AI Website Optimization
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Optimize your website performance with intelligent AI recommendations
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Gauge className="w-16 h-16 text-brand-purple mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Performance Optimization</h3>
                <p className="text-gray-600">Improve site speed and user experience</p>
              </div>
              <div className="text-center">
                <Target className="w-16 h-16 text-brand-purple mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">SEO Enhancement</h3>
                <p className="text-gray-600">Optimize for better search rankings</p>
              </div>
              <div className="text-center">
                <Zap className="w-16 h-16 text-brand-purple mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Auto-Optimization</h3>
                <p className="text-gray-600">Automated improvements with AI</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIOptimizationPage;
