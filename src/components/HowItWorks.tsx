
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
            Hoe <span className="gradient-text">SEOHelper.ai</span> Werkt
          </h2>
          <p className="text-lg text-gray-600">
            Ons eenvoudige 3-stappen proces automatiseert je SEO-inspanningen en levert resultaten zonder dat er technische kennis vereist is.
          </p>
        </div>
        
        <div className="relative grid md:grid-cols-3 gap-8 md:gap-4 mt-20">
          <StepCard 
            number="1"
            title="Schrijf Je In & Vertel Ons Over Je Bedrijf" 
            description="Kies je plan en vul daarna een eenvoudig onboarding formulier in over je bedrijf, website en doelzoekwoorden."
          />
          <StepCard 
            number="2"
            title="Onze AI Gaat aan het Werk" 
            description="Onze geavanceerde AI analyseert je website en branche, en creëert vervolgens geoptimaliseerde content en bruikbare SEO-aanbevelingen."
          />
          <StepCard 
            number="3"
            title="Ontvang Maandelijks Content & Rapporten" 
            description="Elke maand krijg je verse blogposts, SEO-verbeteringen en een uitgebreid rapport geleverd in je dashboard."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
