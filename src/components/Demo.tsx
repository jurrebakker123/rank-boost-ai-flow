
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';

const Demo = () => {
  const [selectedTab, setSelectedTab] = useState("blog");

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="demo" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bekijk <span className="gradient-text">SEOHelper.ai</span> in Actie
          </h2>
          <p className="text-lg text-gray-600">
            Bekijk wat ons platform elke maand levert om je zoekpositie te verbeteren.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="blog" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="blog">Blog Content</TabsTrigger>
              <TabsTrigger value="report">SEO Rapport</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </TabsList>
            
            <TabsContent value="blog" className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4">Voorbeeld AI-Gegenereerde Blogpost</h3>
              <div className="bg-gray-50 p-6 rounded-md mb-6">
                <h4 className="text-xl font-medium mb-2">10 Essentiële SEO Strategieën voor MKB-Groei in 2025</h4>
                <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
                  <span>Leestijd: 6 min</span>
                  <span>•</span>
                  <span>SEO, MKB, Marketing</span>
                </div>
                <p className="text-gray-700 mb-4">
                  In het huidige digitale landschap is online opvallen belangrijker dan ooit voor kleine bedrijven. 
                  Met de juiste SEO-strategieën kunnen zelfs bescheiden ondernemingen indrukwekkende zichtbaarheid 
                  behalen in zoekmachines zonder een fortuin uit te geven.
                </p>
                <p className="text-gray-700 mb-4">
                  Deze uitgebreide gids verkent de 10 meest effectieve SEO-technieken die kleine bedrijven 
                  in 2025 moeten implementeren om hun organische verkeer te verhogen, rankings te verbeteren 
                  en uiteindelijk meer conversies te genereren...
                </p>
                <div className="text-brand-purple font-medium">Lees meer →</div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Opmerking:</strong> Elke blogpost wordt uniek gegenereerd voor jouw bedrijf, geoptimaliseerd voor jouw doelzoekwoorden 
                  en geformatteerd voor directe publicatie. We leveren elke maand verse content rechtstreeks 
                  aan je dashboard.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="report" className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4">Maandelijks SEO Rapport Voorbeeld</h3>
              <div className="bg-gray-50 p-6 rounded-md mb-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xl font-medium">Mei 2025 SEO Prestaties</h4>
                    <p className="text-gray-600 text-sm">Rapport voor voorbeeld-bedrijf.nl</p>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                    +12% Verbetering
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="font-medium mb-2">Verkeer Overzicht</h5>
                    <div className="h-16 bg-gray-200 rounded-md overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center text-xs">Grafiekvisualisatie</div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Best Presterende Zoekwoorden</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>"mkb marketing"</span>
                        <span className="text-green-600">Positie #4 (+2)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>"lokale seo diensten"</span>
                        <span className="text-green-600">Positie #6 (+5)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>"digitale marketing tips"</span>
                        <span className="text-amber-600">Positie #12 (-1)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Aanbevolen Acties</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      <li>Update de meta beschrijvingen op je dienstenpagina's</li>
                      <li>Voeg meer interne links toe naar je "SEO diensten" pagina</li>
                      <li>Verbeter de laadsnelheid van pagina's op mobiele apparaten</li>
                      <li>Voeg FAQ-schema toe aan je top 3 landingspagina's</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Opmerking:</strong> Elk maandelijks rapport bevat gedetailleerde statistieken, zoekwoordrangschikkingen, 
                  verkeersanalyse en concrete aanbevelingen aangepast voor jouw website. Rapporten worden 
                  geleverd als downloadbare PDF's.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="dashboard" className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-2xl font-semibold mb-4">Klant Dashboard Voorbeeld</h3>
              <div className="bg-gray-50 p-6 rounded-md mb-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-medium">Welkom terug, Bedrijfseigenaar</h4>
                    <div className="bg-brand-purple/10 text-brand-purple text-xs px-3 py-1 rounded-full font-medium">
                      Ultimate Plan
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <h5 className="font-medium mb-2">Nieuwste Blogartikelen</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>"Hoe Je Website Optimaliseren voor Spraakzoekopdrachten"</span>
                          <span className="text-brand-purple">Bekijken</span>
                        </li>
                        <li className="flex justify-between">
                          <span>"Lokale SEO-Strategieën die Bezoekers naar Je Winkel Trekken"</span>
                          <span className="text-brand-purple">Bekijken</span>
                        </li>
                        <li className="flex justify-between">
                          <span>"De Ultieme Gids voor On-Page SEO"</span>
                          <span className="text-brand-purple">Bekijken</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <h5 className="font-medium mb-2">Zoekwoorden</h5>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">seo diensten</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">mkb marketing</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">website verkeer</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">digitale marketing</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">lokaal bedrijf</span>
                        <span className="text-brand-purple text-xs">+ Zoekwoorden Bewerken</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <h5 className="font-medium mb-2">Recente SEO Rapporten</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Mei 2025 SEO Rapport</span>
                          <span className="text-brand-purple">Downloaden</span>
                        </li>
                        <li className="flex justify-between">
                          <span>April 2025 SEO Rapport</span>
                          <span className="text-brand-purple">Downloaden</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Maart 2025 SEO Rapport</span>
                          <span className="text-brand-purple">Downloaden</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <h5 className="font-medium mb-2">Account Instellingen</h5>
                      <div className="space-y-2 text-sm">
                        <div>Abonnement: Ultimate Plan</div>
                        <div>Volgende factuurdatum: 15 juni 2025</div>
                        <div className="pt-2">
                          <span className="text-brand-purple">Abonnement Beheren</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Opmerking:</strong> Je persoonlijke dashboard geeft je eenvoudig toegang tot al je SEO-content, 
                  rapporten en accountinstellingen op één plek. Je kunt alle bronnen bekijken en downloaden of 
                  wijzigingen aanbrengen in je voorkeuren wanneer je maar wilt.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <Button 
              onClick={() => scrollToSection('cta')}
              className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity px-8 py-6 text-lg"
            >
              Begin Nu met het Verbeteren van Je SEO
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
