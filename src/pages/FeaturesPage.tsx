
import React from 'react';
import Navbar from '@/components/Navbar';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
