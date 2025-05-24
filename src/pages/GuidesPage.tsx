
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GuidesPage = () => {
  const guides = [
    {
      title: "Complete SEO Gids voor Beginners",
      description: "Alles wat je moet weten om te starten met SEO - van keyword research tot technische optimalisatie.",
      duration: "45 min",
      difficulty: "Beginner",
      steps: 8
    },
    {
      title: "Lokale SEO Masterclass",
      description: "Domineer je lokale markt met deze uitgebreide gids voor lokale SEO optimalisatie.",
      duration: "30 min",
      difficulty: "Intermediate",
      steps: 6
    },
    {
      title: "Content Marketing & SEO",
      description: "Leer hoe je content creëert die zowel gebruikers als zoekmachines aanspreekt.",
      duration: "25 min",
      difficulty: "Beginner",
      steps: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-purple to-brand-blue py-20">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SEO Gidsen & Tutorials
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Stap-voor-stap gidsen om je SEO-kennis naar het volgende niveau te brengen
              </p>
            </div>
          </div>
        </section>

        {/* Guides */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              {guides.map((guide, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="lg:flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          guide.difficulty === 'Beginner' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {guide.difficulty}
                        </span>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock size={16} />
                          <span>{guide.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <CheckCircle size={16} />
                          <span>{guide.steps} stappen</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">{guide.title}</h3>
                      <p className="text-gray-600 text-lg">{guide.description}</p>
                    </div>
                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <Button className="bg-brand-purple hover:bg-brand-purple/90">
                        Start Gids <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Klaar om je SEO te verbeteren?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Zet je nieuwe kennis om in actie met SEOHelper.ai
            </p>
            <Button className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity">
              Start je gratis trial
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GuidesPage;
