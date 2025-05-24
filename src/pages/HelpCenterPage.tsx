
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, MessageCircle, Book, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HelpCenterPage = () => {
  const categories = [
    {
      icon: <Book className="w-8 h-8" />,
      title: "Getting Started",
      description: "Leer de basis van SEOHelper.ai",
      articles: 12
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Account & Billing",
      description: "Vragen over je account en facturering",
      articles: 8
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Features & Tools",
      description: "Alles over onze SEO-tools",
      articles: 15
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Hoe kunnen we je helpen?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Zoek in onze kennisbank of neem contact op met ons support team
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Zoek naar artikelen..."
                  className="pl-10 py-3 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Populaire Categorieën</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-brand-purple mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <p className="text-sm text-brand-purple">{category.articles} artikelen</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Kun je het antwoord niet vinden?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Ons support team staat klaar om je te helpen
            </p>
            <Button className="bg-brand-purple hover:bg-brand-purple/90">
              Neem contact op
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenterPage;
