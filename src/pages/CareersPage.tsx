
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CareersPage = () => {
  const benefits = [
    "Flexibel werken (remote/hybrid)",
    "Competitief salaris + bonussen",
    "Uitgebreide leer- en ontwikkelingsmogelijkheden",
    "Moderne werkplek en tools",
    "Team events en bedrijfsuitjes",
    "Pensioenregeling en ziektekostenverzekering"
  ];

  const openings = [
    {
      title: "Senior AI Developer",
      department: "Engineering",
      location: "Amsterdam / Remote",
      type: "Fulltime",
      description: "Werk mee aan de ontwikkeling van onze AI-gedreven SEO tools."
    },
    {
      title: "SEO Content Specialist",
      department: "Marketing",
      location: "Amsterdam / Remote",
      type: "Fulltime",
      description: "Creëer en optimaliseer content strategie voor onze klanten."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Amsterdam / Remote",
      type: "Fulltime",
      description: "Help onze klanten succesvol te zijn met onze SEO-tools."
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
                Werk bij SEOHelper.ai
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Help ons SEO toegankelijk te maken voor iedereen. 
                Werk met cutting-edge AI-technologie in een dynamisch team.
              </p>
            </div>
          </div>
        </section>

        {/* Why Work Here */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Waarom bij ons werken?</h2>
              <p className="text-xl text-gray-600 mb-12">
                Bij SEOHelper.ai werk je aan de toekomst van SEO. We bouwen tools die echt verschil maken 
                voor duizenden ondernemers wereldwijd.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-gray-800">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Open Posities</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {openings.map((job, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="lg:flex-1">
                      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                      <p className="text-gray-600 mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users size={16} />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <Button className="bg-brand-purple hover:bg-brand-purple/90">
                        Solliciteer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Zie je jezelf niet tussen de vacatures?</h2>
            <p className="text-xl text-gray-600 mb-8">
              We zijn altijd op zoek naar talent. Stuur ons een open sollicitatie!
            </p>
            <Button className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transition-opacity">
              Open sollicitatie
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
