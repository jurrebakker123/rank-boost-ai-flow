
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  blogs: number;
  popular?: boolean;
  features: PlanFeature[];
  buttonText: string;
}

const PricingCard = ({ plan, onSelect }: { plan: PricingPlan, onSelect: () => void }) => (
  <div className={`bg-white rounded-xl shadow-sm border ${plan.popular ? 'border-brand-purple' : 'border-gray-100'} p-6 flex flex-col relative`}>
    {plan.popular && (
      <div className="absolute top-0 right-0 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
        MOST POPULAR
      </div>
    )}
    <h3 className="text-xl font-bold">{plan.name}</h3>
    <div className="mt-4 mb-6">
      <span className="text-3xl font-bold">{plan.price}</span>
      <span className="text-gray-600 text-sm">/month</span>
    </div>
    <p className="text-brand-purple font-medium mb-6">
      {plan.blogs} {plan.blogs === 1 ? 'blog post' : 'blog posts'} per month
    </p>
    <div className="space-y-3 mb-8 flex-grow">
      {plan.features.map((feature, index) => (
        <div key={index} className="flex items-center">
          <span className={`mr-3 ${feature.included ? 'text-green-500' : 'text-gray-300'}`}>
            <Check size={16} />
          </span>
          <span className={feature.included ? 'text-gray-800' : 'text-gray-400'}>
            {feature.text}
          </span>
        </div>
      ))}
    </div>
    <Button 
      onClick={onSelect}
      className={plan.popular ? 
        'bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity w-full' : 
        'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200 w-full'
      }
    >
      {plan.buttonText}
    </Button>
  </div>
);

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const plans: PricingPlan[] = [
    {
      name: "Basic",
      price: "€19",
      blogs: 1,
      features: [
        { text: "1 SEO Blog Post", included: true },
        { text: "Basic SEO Tips", included: true },
        { text: "SEO Checklist", included: true },
        { text: "Meta Tags Generation", included: false },
        { text: "Monthly SEO Report", included: false },
        { text: "GMB Post Suggestions", included: false },
        { text: "Strategy Tips", included: false },
        { text: "Premium Support", included: false },
      ],
      buttonText: "Choose Basic"
    },
    {
      name: "Pro",
      price: "€39",
      blogs: 3,
      features: [
        { text: "3 SEO Blog Posts", included: true },
        { text: "Advanced SEO Tips", included: true },
        { text: "SEO Checklist", included: true },
        { text: "Meta Tags Generation", included: true },
        { text: "Small SEO Fixes", included: true },
        { text: "GMB Post Suggestions", included: false },
        { text: "Strategy Tips", included: false },
        { text: "Premium Support", included: false },
      ],
      buttonText: "Choose Pro"
    },
    {
      name: "Ultimate",
      price: "€59",
      blogs: 9,
      popular: true,
      features: [
        { text: "9 SEO Blog Posts", included: true },
        { text: "Advanced SEO Tips", included: true },
        { text: "SEO Checklist", included: true },
        { text: "Meta Tags Generation", included: true },
        { text: "Monthly SEO Report", included: true },
        { text: "GMB Post Suggestions", included: true },
        { text: "Priority Website Scan", included: true },
        { text: "Email Support", included: true },
      ],
      buttonText: "Choose Ultimate"
    },
    {
      name: "Power",
      price: "€99",
      blogs: 20,
      features: [
        { text: "20 SEO Blog Posts", included: true },
        { text: "Advanced SEO Tips", included: true },
        { text: "SEO Checklist", included: true },
        { text: "Meta Tags Generation", included: true },
        { text: "Monthly SEO Report", included: true },
        { text: "GMB Post Suggestions", included: true },
        { text: "Strategy Tips", included: true },
        { text: "Premium Support Dashboard", included: true },
      ],
      buttonText: "Choose Power"
    },
  ];

  const handleSelect = (planName: string) => {
    setSelectedPlan(planName);
    // In a real implementation, this would navigate to sign up with the selected plan
    console.log(`Selected plan: ${planName}`);
    
    // Scroll to CTA section
    const ctaSection = document.getElementById('cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that best fits your business needs. All plans include our core SEO automation features.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              onSelect={() => handleSelect(plan.name)} 
            />
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-600">
          <p>All plans include a 14-day money-back guarantee. No long-term contracts. Cancel anytime.</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
