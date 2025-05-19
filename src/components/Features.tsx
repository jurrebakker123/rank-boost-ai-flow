
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
            Jouw Complete <span className="gradient-text">SEO Oplossing</span>
          </h2>
          <p className="text-lg text-gray-600">
            We analyseren je SEO niet alleen - we verbeteren het. Zonder enige moeite van jouw kant.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon="📝"
            title="AI-Gegenereerde Blog Content" 
            description="Ontvang unieke SEO-geoptimaliseerde blogposts geschreven door AI, op maat voor jouw bedrijf en doelzoekwoorden."
          />
          <FeatureCard 
            icon="📊"
            title="Maandelijkse SEO Rapporten" 
            description="Ontvang uitgebreide PDF-rapporten met SEO-tips, zoekwoordadvies en pagina-gezondheidsanalyse."
          />
          <FeatureCard 
            icon="🏷️"
            title="Meta Tag Suggesties" 
            description="Genereer automatisch geoptimaliseerde meta titels en beschrijvingen op basis van je content."
          />
          <FeatureCard 
            icon="🔍"
            title="Google Mijn Bedrijf Posts" 
            description="Ontvang maandelijkse postvoorstellen voor Google Mijn Bedrijf om je lokale aanwezigheid te versterken."
          />
          <FeatureCard 
            icon="🖥️"
            title="Klant Dashboard" 
            description="Toegang tot je content, rapporten en instellingen via een intuïtief zelfservice portaal."
          />
          <FeatureCard 
            icon="📲"
            title="Mobiele Optimalisatie" 
            description="Ontvang tips om je mobiele sitesnelheid en prestaties te verbeteren voor betere rankings."
          />
          <FeatureCard 
            icon="🚀"
            title="Zoekwoordstrategie" 
            description="Krijg data-gedreven zoekwoordsuggesties om te richten op de zoekopdrachten die het meest belangrijk zijn."
          />
          <FeatureCard 
            icon="🔄"
            title="Eenvoudig Abonnementsbeheer" 
            description="Upgrade, downgrade of update je plan op elk moment via je dashboard."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
