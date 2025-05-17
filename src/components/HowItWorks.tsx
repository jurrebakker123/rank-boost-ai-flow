
import React from 'react';

const StepCard = ({ 
  number, 
  title, 
  description 
}: { 
  number: string, 
  title: string, 
  description: string 
}) => (
  <div className="relative flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center text-white text-xl font-bold mb-6 z-10">
      {number}
    </div>
    {/* Connector line */}
    <div className="absolute top-8 left-1/2 h-0.5 bg-gradient-to-r from-brand-purple to-brand-blue w-full -translate-x-1/2 z-0 hidden md:block"></div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How <span className="gradient-text">SEOHelper.ai</span> Works
          </h2>
          <p className="text-lg text-gray-600">
            Our simple 3-step process automates your SEO efforts and delivers results without any technical knowledge required.
          </p>
        </div>
        
        <div className="relative grid md:grid-cols-3 gap-8 md:gap-4 mt-20">
          <StepCard 
            number="1"
            title="Sign Up & Tell Us About Your Business" 
            description="Choose your plan, then complete a simple onboarding form about your business, website, and target keywords."
          />
          <StepCard 
            number="2"
            title="Our AI Gets to Work" 
            description="Our advanced AI analyzes your website and industry, then creates optimized content and actionable SEO recommendations."
          />
          <StepCard 
            number="3"
            title="Receive Content & Reports Monthly" 
            description="Each month, get fresh blog posts, SEO improvements, and a comprehensive report delivered to your dashboard."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
