
import React from 'react';
import { Button } from '@/components/ui/button';

interface AdLandingCTAProps {
  onCtaClick: () => void;
}

const AdLandingCTA = ({ onCtaClick }: AdLandingCTAProps) => {
  return (
    <div className="bg-gradient-to-r from-brand-purple to-brand-blue rounded-2xl p-10 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Klaar om je SEO te automatiseren?
      </h2>
      <p className="text-xl max-w-2xl mx-auto mb-8">
        Schrijf je nu in en ontvang binnen 48 uur je eerste AI-gegenereerde blogartikel en SEO-aanbevelingen.
      </p>
      <Button 
        onClick={onCtaClick}
        className="bg-white text-brand-purple hover:bg-white/90 px-8 py-6 text-lg"
      >
        Bekijk de prijzen
      </Button>
      <p className="text-sm mt-4">
        Geen langdurig contract. 14 dagen niet-goed-geld-terug garantie.
      </p>
    </div>
  );
};

export default AdLandingCTA;
