
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Brain, Target } from 'lucide-react';

const AIKeywordResearchPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-brand-purple to-brand-blue py-20">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
                <Search className="w-12 h-12" />
                AI Keyword Research
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Discover high-impact keywords with AI-powered research tools
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Brain className="w-16 h-16 text-brand-purple mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Discovery</h3>
                <p className="text-gray-600">AI finds the best keywords for your niche</p>
              </div>
              <div className="text-center">
                <Target className="w-16 h-16 text-brand-purple mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Competition Analysis</h3>
                <p className="text-gray-600">Analyze keyword difficulty and opportunity</p>
              </div>
              <div className="text-center">
                <Search className="w-16 h-16 text-brand-purple mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Trend Insights</h3>
                <p className="text-gray-600">Stay ahead with trending keywords</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIKeywordResearchPage;
