
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Wand2, FileText, Target } from 'lucide-react';

const AIContentStudioPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-brand-purple to-brand-blue py-20">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
                <Wand2 className="w-12 h-12" />
                AI Content Studio
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Create, optimize, and manage your content with AI-powered tools
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <FileText className="w-16 h-16 text-brand-purple mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Content Generation</h3>
                <p className="text-gray-600">AI-powered content creation</p>
              </div>
              <div className="text-center">
                <Target className="w-16 h-16 text-brand-purple mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">SEO Optimization</h3>
                <p className="text-gray-600">Optimize for search engines</p>
              </div>
              <div className="text-center">
                <Wand2 className="w-16 h-16 text-brand-purple mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Suggestions</h3>
                <p className="text-gray-600">Get AI-powered recommendations</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIContentStudioPage;
