
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const PricingPage = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if there's a checkout success or cancellation query parameter
    const params = new URLSearchParams(window.location.search);
    const checkoutSuccess = params.get('checkout_success');
    const checkoutCancelled = params.get('checkout_cancelled');
    const portalSession = params.get('portal_session');
    
    // Show appropriate toasts based on query parameters
    if (checkoutSuccess === 'true') {
      toast({
        title: 'Betaling succesvol',
        description: 'Bedankt voor je aankoop! Je abonnement is nu actief.',
        variant: 'default',
      });
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (checkoutCancelled === 'true') {
      toast({
        title: 'Checkout geannuleerd',
        description: 'Je aankoop is niet voltooid. Je kunt het later opnieuw proberen.',
        variant: 'default',
      });
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (portalSession) {
      toast({
        title: 'Abonnementsbeheer',
        description: 'Je hebt je abonnement succesvol bijgewerkt.',
        variant: 'default',
      });
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
