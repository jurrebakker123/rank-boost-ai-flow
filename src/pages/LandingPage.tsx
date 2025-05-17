
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import AdLandingCTA from '@/components/AdLandingCTA';
import Pricing from '@/components/Pricing';

const LandingPage = () => {
  // Scroll naar het prijzenoverzicht
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-purple to-brand-blue py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Verbeter je Google-posities met AI
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mb-10 text-white/90">
              Met SEOHelper.ai krijg je maandelijks SEO-geoptimaliseerde blogartikelen, meta-tags en rapportages, zonder zelf iets te hoeven schrijven.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToPricing}
                className="bg-white text-brand-purple hover:bg-white/90 px-8 py-6 text-lg"
              >
                Bekijk prijzen
              </Button>
              <Link to="/demo">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  Bekijk demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Wat krijg je met <span className="text-brand-purple">SEOHelper.ai</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-geschreven blogs</h3>
              <p className="text-gray-600">
                Ontvang elke maand unieke, SEO-geoptimaliseerde blogartikelen geschreven door AI, volledig afgestemd op jouw bedrijf.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">SEO-rapportages</h3>
              <p className="text-gray-600">
                Krijg inzicht in je rankings, verkeer en verbeterpunten met maandelijkse, uitgebreide SEO-rapportages.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-brand-purple/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-chatbot</h3>
              <p className="text-gray-600">
                Voeg optioneel een slimme AI-chatbot toe aan je website die bezoekersvragen direct beantwoordt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Bewezen resultaten voor <span className="text-brand-purple">jouw bedrijf</span>
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Onze klanten zien gemiddeld binnen 3 maanden significante verbeteringen in hun Google-posities en organisch verkeer.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 text-green-500">
                    <Check size={20} />
                  </div>
                  <span>Tot 38% meer organisch verkeer</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-green-500">
                    <Check size={20} />
                  </div>
                  <span>Hogere posities voor belangrijke zoekwoorden</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-green-500">
                    <Check size={20} />
                  </div>
                  <span>Tijdsbesparing van gemiddeld 20 uur per maand</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 text-green-500">
                    <Check size={20} />
                  </div>
                  <span>Geautomatiseerde content die converteert</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button
                  onClick={scrollToPricing}
                  className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity"
                >
                  Start vandaag nog <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-500 ml-2">SEOHelper.ai Dashboard</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Organisch verkeer</span>
                      <span className="text-green-600">+38%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div className="h-full bg-brand-purple rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Keyword rankings</span>
                      <span className="text-green-600">+24%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div className="h-full bg-brand-blue rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Conversie</span>
                      <span className="text-green-600">+15%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
                  Gebaseerd op gemiddelde resultaten van onze klanten
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AdLandingCTA onCtaClick={scrollToPricing} />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <Pricing />
      </section>
    </div>
  );
};

export default LandingPage;
