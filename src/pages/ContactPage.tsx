
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      info: "info@seohelperai.com",
      description: "Voor algemene vragen en support"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefoon",
      info: "+31 20 123 4567",
      description: "Bereikbaar ma-vr 9:00-17:00"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Adres",
      info: "Amsterdam, Nederland",
      description: "Bezoek op afspraak"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Support Chat",
      info: "Direct contact",
      description: "24/7 beschikbaar in je dashboard"
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
                Neem Contact Op
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Heb je vragen over onze SEO-tools? Ons team staat klaar om je te helpen.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Stuur ons een bericht</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Voornaam</label>
                      <Input placeholder="Je voornaam" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Achternaam</label>
                      <Input placeholder="Je achternaam" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="je@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Onderwerp</label>
                    <Input placeholder="Waar gaat je bericht over?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bericht</label>
                    <Textarea 
                      placeholder="Beschrijf je vraag of opmerking..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full bg-brand-purple hover:bg-brand-purple/90">
                    Verstuur Bericht
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold mb-8">Contactgegevens</h2>
                <div className="space-y-6">
                  {contactInfo.map((contact, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="text-brand-purple">
                        {contact.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{contact.title}</h3>
                        <p className="text-gray-800 mb-1">{contact.info}</p>
                        <p className="text-gray-600 text-sm">{contact.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold mb-3">Snelle Support Nodig?</h3>
                  <p className="text-gray-600 mb-4">
                    Voor urgente technische vragen kun je direct chatten via je dashboard.
                  </p>
                  <Button variant="outline" className="w-full">
                    Ga naar Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
