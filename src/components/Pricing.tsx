
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, MessageSquare } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  description?: string;
  blogs: number;
  popular?: boolean;
  features: PlanFeature[];
  buttonText: string;
}

const PricingCard = ({ 
  plan, 
  onSelect, 
  chatbotEnabled, 
  chatbotPrice 
}: { 
  plan: PricingPlan, 
  onSelect: () => void,
  chatbotEnabled: boolean,
  chatbotPrice: string
}) => (
  <div className={`bg-white rounded-xl shadow-sm border ${plan.popular ? 'border-brand-purple' : 'border-gray-100'} p-6 flex flex-col relative`}>
    {plan.popular && (
      <div className="absolute top-0 right-0 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
        MOST POPULAR
      </div>
    )}
    <h3 className="text-xl font-bold">{plan.name}</h3>
    {plan.description && (
      <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
    )}
    <div className="mt-4 mb-3">
      <span className="text-3xl font-bold">{plan.price}</span>
      <span className="text-gray-600 text-sm">/month</span>
    </div>
    
    {/* Chatbot add-on display */}
    {chatbotEnabled && (
      <div className="text-gray-600 text-sm mb-3 italic">
        + {chatbotPrice} for AI Chatbot
      </div>
    )}
    
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
  const [chatbotEnabled, setChatbotEnabled] = useState(false);
  const chatbotPrice = "€9";
  
  const plans: PricingPlan[] = [
    {
      name: "Basic",
      price: "$24",
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
      price: "$49",
      description: "Voor de actieve ondernemer",
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
      price: "$79",
      description: "Alles wat een klein bedrijf nodig heeft",
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
      price: "$119",
      description: "Voor bureaus / heavy content",
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
    console.log(`Selected plan: ${planName}, Chatbot enabled: ${chatbotEnabled}`);
    
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
          <p className="text-lg text-gray-600 mb-8">
            Choose the plan that best fits your business needs. All plans include our core SEO automation features.
          </p>
          
          {/* Chatbot add-on toggle */}
          <div className="flex items-center justify-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm mb-8 max-w-md mx-auto">
            <div className="flex items-center space-x-2">
              <Switch 
                id="chatbot-toggle" 
                checked={chatbotEnabled}
                onCheckedChange={setChatbotEnabled}
              />
              <Label htmlFor="chatbot-toggle" className="font-medium">Add AI Chatbot</Label>
            </div>
            <div className="flex items-center text-brand-purple">
              <MessageSquare className="w-5 h-5 mr-2" />
              <span>{chatbotPrice}/month</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              onSelect={() => handleSelect(plan.name)} 
              chatbotEnabled={chatbotEnabled}
              chatbotPrice={chatbotPrice}
            />
          ))}
        </div>
        
        {/* AI Chatbot Feature Highlight */}
        {chatbotEnabled && (
          <div className="mt-12 p-6 bg-white rounded-xl border border-brand-purple/30 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="bg-brand-purple/10 p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-brand-purple" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI Chatbot for Your Website</h3>
                <p className="text-gray-700 mb-4">Supercharge your website with an AI-powered chatbot that answers visitor questions instantly. Trained on your site's content.</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Easy installation via simple script</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Custom branding options</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Visitor question analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>No coding required</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-12 text-center text-gray-600">
          <p>All plans include a 14-day money-back guarantee. No long-term contracts. Cancel anytime.</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
