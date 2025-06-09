
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BarChart3, TrendingUp, Target } from 'lucide-react';

const AIAnalyticsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-brand-purple to-brand-blue py-20">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
                <BarChart3 className="w-12 h-12" />
                AI Analytics Dashboard
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Advanced analytics powered by artificial intelligence
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border">
                <TrendingUp className="w-12 h-12 text-brand-purple mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Performance Tracking</h3>
                <p className="text-gray-600">Monitor your SEO performance with real-time AI insights</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border">
                <Target className="w-12 h-12 text-brand-purple mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Goal Optimization</h3>
                <p className="text-gray-600">AI-driven recommendations to achieve your SEO goals</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIAnalyticsPage;
