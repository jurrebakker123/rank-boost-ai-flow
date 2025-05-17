
import React from 'react';
import Navbar from '@/components/Navbar';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const FAQPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
