
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Loader2, AlertCircle, Tag } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  priceId: string; // Stripe Price ID
  description?: string;
  blogs: number;
  popular?: boolean;
  features: PlanFeature[];
  buttonText: string;
  whiteLabel?: boolean; // New property to indicate white label support
  target?: string; // Target audience
}

const PricingCard = ({ 
  plan, 
  onSelect, 
  isProcessing,
  currentSubscription
}: { 
  plan: PricingPlan, 
  onSelect: () => void,
  isProcessing: boolean,
  currentSubscription: string | null
}) => {
  const isCurrentPlan = currentSubscription === plan.name;
  
  return (
    <div className={`bg-white rounded-xl shadow-sm border ${isCurrentPlan ? 'border-green-500' : plan.popular ? 'border-brand-purple' : 'border-gray-100'} p-6 flex flex-col relative`}>
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          MOST POPULAR
        </div>
      )}
      {isCurrentPlan && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          JE HUIDIGE PLAN
        </div>
      )}
      {plan.whiteLabel && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg flex items-center">
          <Tag size={12} className="mr-1" />
          WHITE LABEL
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
        {plan.target && (
          <div className="mt-4 pt-2 border-t border-gray-100">
            <div className="flex items-center text-brand-purple">
              <span className="text-sm">➤ {plan.target}</span>
            </div>
          </div>
        )}
      </div>
      <Button 
        onClick={onSelect}
        disabled={isProcessing || isCurrentPlan}
        className={isCurrentPlan ? 
          'bg-green-100 text-green-700 hover:bg-green-100 cursor-default w-full' : 
          plan.popular ? 
          'bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity w-full' : 
          'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200 w-full'
        }
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verwerken...
          </>
        ) : isCurrentPlan ? (
          'Je huidige plan'
        ) : (
          plan.buttonText
        )}
      </Button>
    </div>
  );
};

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (session) {
        // Check subscription status
        try {
          const { data, error } = await supabase.functions.invoke('check-subscription');
          
          if (error) throw error;
          
          if (data && data.subscribed && data.subscription_tier) {
            setCurrentSubscription(data.subscription_tier);
          }
        } catch (error) {
          console.error('Error checking subscription:', error);
        }
      }
    };
    
    checkAuth();
  }, []);
  
  const plans: PricingPlan[] = [
    {
      name: "Basic",
      price: "€29",
      priceId: "price_basic", // Voeg hier je echte Stripe Price ID toe
      blogs: 1,
      target: "Perfect instapmodel",
      features: [
        { text: "1 AI Blog Post", included: true },
        { text: "SEO Checklist", included: true },
        { text: "Basic SEO Tips", included: true },
        { text: "Meta Tags Generation", included: false },
        { text: "Kleine SEO-optimalisaties", included: false },
        { text: "Maandelijkse SEO Rapportage", included: false },
        { text: "Google Mijn Bedrijf Posts", included: false },
        { text: "Priority Website Scan", included: false },
      ],
      buttonText: "Kies Basic"
    },
    {
      name: "Pro",
      price: "€69",
      priceId: "price_pro", // Voeg hier je echte Stripe Price ID toe
      description: "Voor de actieve ondernemer",
      blogs: 3,
      popular: true,
      target: "Populairst voor ZZP'ers",
      features: [
        { text: "3 AI Blog Posts", included: true },
        { text: "Advanced SEO Tips", included: true },
        { text: "SEO Checklist", included: true },
        { text: "Meta Tags Generation", included: true },
        { text: "Kleine SEO-optimalisaties", included: true },
        { text: "Maandelijkse SEO Rapportage", included: false },
        { text: "Google Mijn Bedrijf Posts", included: false },
        { text: "Priority Website Scan", included: false },
      ],
      buttonText: "Kies Pro"
    },
    {
      name: "Ultimate",
      price: "€129",
      priceId: "price_ultimate", // Voeg hier je echte Stripe Price ID toe
      description: "Alles wat een klein bedrijf nodig heeft",
      blogs: 9,
      target: "Serieuze bedrijven met groeiambitie",
      features: [
        { text: "9 AI Blog Posts", included: true },
        { text: "Alles uit Pro", included: true },
        { text: "Maandelijkse SEO Rapportage", included: true },
        { text: "Google Mijn Bedrijf Posts", included: true },
        { text: "Priority Website Scan", included: true },
        { text: "E-mail Support", included: true },
        { text: "Strategie Tips", included: false },
        { text: "White Label Reseller-optie", included: false },
      ],
      buttonText: "Kies Ultimate"
    },
    {
      name: "Power",
      price: "€249",
      priceId: "price_power", // Voeg hier je echte Stripe Price ID toe
      description: "Voor bureaus / heavy content",
      blogs: 20,
      whiteLabel: true, // Enable white labeling for Power plan
      target: "Voor agencies of grotere klanten",
      features: [
        { text: "20 AI Blog Posts", included: true },
        { text: "Alles uit Ultimate", included: true },
        { text: "Strategie Tips", included: true },
        { text: "Premium Dashboard", included: true },
        { text: "White Label Reseller-optie", included: true },
      ],
      buttonText: "Kies Power"
    },
  ];

  const handleSelect = async (planName: string) => {
    try {
      // Check if user is authenticated
      if (!isAuthenticated) {
        // Redirect to auth page with return URL
        window.location.href = `/login?returnUrl=${encodeURIComponent(window.location.pathname)}#pricing`;
        return;
      }

      setSelectedPlan(planName);
      setIsProcessing(true);

      const selectedPlan = plans.find(p => p.name === planName);
      if (!selectedPlan) {
        throw new Error("Plan not found");
      }

      // Call Stripe checkout edge function
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: selectedPlan.priceId,
          successUrl: `${window.location.origin}/dashboard?checkout_success=true`,
          cancelUrl: `${window.location.origin}/pricing?checkout_cancelled=true`,
        }
      });

      if (error) throw error;
      if (!data?.url) throw new Error("No checkout URL returned");

      // Redirect to Stripe checkout
      window.location.href = data.url;

    } catch (error) {
      console.error('Error starting checkout:', error);
      toast({
        title: "Er is een probleem opgetreden",
        description: "We konden de checkout niet starten. Probeer het later opnieuw.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      setIsProcessing(true);
      
      // Call customer portal edge function
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        body: {
          returnUrl: `${window.location.origin}/pricing`,
        }
      });

      if (error) throw error;
      if (!data?.url) throw new Error("No portal URL returned");

      // Redirect to Stripe customer portal
      window.location.href = data.url;

    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Er is een probleem opgetreden",
        description: "We konden het abonnementsbeheer niet openen. Probeer het later opnieuw.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {!supabase && (
          <Alert className="mb-8 border-yellow-300 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle>Supabase connection not configured</AlertTitle>
            <AlertDescription>
              To enable subscription functionality, please connect this application to Supabase via the integration.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Choose the plan that best fits your business needs. All plans include our core SEO automation features.
          </p>
          
          {/* Show subscription management button if user has active subscription */}
          {currentSubscription && (
            <div className="mb-8">
              <Button 
                onClick={handleManageSubscription}
                disabled={isProcessing}
                variant="outline"
                className="border-brand-purple text-brand-purple hover:bg-brand-purple/10"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Laden...
                  </>
                ) : (
                  'Beheer je abonnement'
                )}
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              onSelect={() => handleSelect(plan.name)}
              isProcessing={isProcessing && selectedPlan === plan.name}
              currentSubscription={currentSubscription}
            />
          ))}
        </div>
        
        {/* White Label Feature Highlight (Only shown when any plan has white label enabled) */}
        {plans.some(plan => plan.whiteLabel) && (
          <div className="mt-12 p-6 bg-white rounded-xl border border-blue-300 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500/10 p-3 rounded-full">
                <Tag className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">White Label voor Agencies</h3>
                <p className="text-gray-700 mb-4">Perfect voor bureaus die SEO content onder eigen naam willen aanbieden aan klanten. Breid je dienstenpakket uit met een volledig white-label oplossing.</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Jouw branding op alle content</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Doorverkoop mogelijkheid aan klanten</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Beheer meerdere eindklanten</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Aangepaste rapporten met jouw logo</span>
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
