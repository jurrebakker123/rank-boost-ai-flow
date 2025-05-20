
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const CTA = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Vul alstublieft een geldig e-mailadres in');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real implementation, you would send this to an API
      console.log('Submitted email:', email);
      console.log('Would send to info@seohelperai.com');
      
      toast({
        title: "Aanvraag ontvangen",
        description: "We hebben je aanvraag ontvangen en nemen spoedig contact met je op",
      });
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset form state after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section id="cta" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-brand-purple/90 to-brand-blue/90 rounded-2xl p-10 text-white text-center relative overflow-hidden shadow-xl">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Klaar om de SEO van je website op autopiloot te zetten?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Begin vandaag met SEOHelper.ai en ontvang binnen 48 uur je eerste AI-gegenereerde blogpost en SEO-aanbevelingen.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              {!isSubmitted ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input 
                      type="email" 
                      placeholder="Vul je e-mailadres in" 
                      className="bg-white text-gray-800 border-0 h-12" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <p className="text-red-200 text-left text-sm mt-1">{error}</p>}
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-white text-brand-purple hover:bg-gray-100 h-12" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Bezig met verzenden...' : 'Start nu'}
                  </Button>
                </div>
              ) : (
                <div className="bg-white/20 rounded-md p-4">
                  <p className="text-white">
                    Bedankt! We hebben meer informatie naar je e-mail gestuurd. Controleer je inbox om je registratie te voltooien.
                  </p>
                </div>
              )}
            </form>
            
            <p className="text-sm text-white/80 mt-6">
              Geen creditcard nodig om te beginnen. 14 dagen geld-terug garantie.
            </p>
            <p className="text-sm text-white/80 mt-2">
              Neem contact op via <a href="mailto:info@seohelperai.com" className="underline">info@seohelperai.com</a> voor vragen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
