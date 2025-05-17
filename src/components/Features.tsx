
import React from 'react';

const FeatureCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 rounded-lg bg-brand-purple/10 flex items-center justify-center mb-4">
      <span className="text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Complete <span className="gradient-text">SEO Solution</span>
          </h2>
          <p className="text-lg text-gray-600">
            We don't just analyze your SEO – we improve it. With zero effort from your side.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon="📝"
            title="AI-Generated Blog Content" 
            description="Get unique SEO-optimized blog posts written by AI, tailored to your business and target keywords."
          />
          <FeatureCard 
            icon="📊"
            title="Monthly SEO Reports" 
            description="Receive comprehensive PDF reports with SEO tips, keyword advice, and page health analysis."
          />
          <FeatureCard 
            icon="🏷️"
            title="Meta Tag Suggestions" 
            description="Automatically generate optimized meta titles and descriptions based on your content."
          />
          <FeatureCard 
            icon="🔍"
            title="Google My Business Posts" 
            description="Get monthly post suggestions for Google My Business to boost your local presence."
          />
          <FeatureCard 
            icon="🖥️"
            title="Customer Dashboard" 
            description="Access your content, reports, and settings through an intuitive self-service portal."
          />
          <FeatureCard 
            icon="📲"
            title="Mobile Optimization" 
            description="Receive tips to improve your mobile site speed and performance for better rankings."
          />
          <FeatureCard 
            icon="🚀"
            title="Keyword Strategy" 
            description="Get data-driven keyword suggestions to target the searches that matter most."
          />
          <FeatureCard 
            icon="🔄"
            title="Easy Subscription Management" 
            description="Upgrade, downgrade, or update your plan anytime through your dashboard."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
