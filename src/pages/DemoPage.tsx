
import React from 'react';
import Navbar from '@/components/Navbar';
import Demo from '@/components/Demo';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const DemoPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Demo />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default DemoPage;
