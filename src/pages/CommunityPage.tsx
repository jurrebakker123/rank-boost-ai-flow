
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, MessageSquare, Trophy, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunityPage = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "5,000+", label: "Community Members" },
    { icon: <MessageSquare className="w-8 h-8" />, number: "500+", label: "Discussies per maand" },
    { icon: <Trophy className="w-8 h-8" />, number: "50+", label: "SEO Experts" },
    { icon: <Calendar className="w-8 h-8" />, number: "2x", label: "Events per maand" }
  ];

  const discussions = [
    {
      title: "Beste praktijken voor lokale SEO in 2024",
      author: "Mark van der Berg",
      replies: 24,
      category: "Lokale SEO"
    },
    {
      title: "Hoe gebruik je AI voor content optimalisatie?",
      author: "Sarah Jansen",
      replies: 18,
      category: "AI & SEO"
    },
    {
      title: "Google Core Update - wat moet je weten?",
      author: "Peter de Vries",
      replies: 42,
      category: "Google Updates"
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
                SEO Community
              </h1>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Verbind met andere SEO-professionals, deel kennis en groei samen
              </p>
              <Button className="bg-white text-brand-purple hover:bg-white/90">
                Word lid van de community
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-brand-purple mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Discussions */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Recente Discussies</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {discussions.map((discussion, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-brand-purple/10 text-brand-purple px-2 py-1 rounded text-xs">
                          {discussion.category}
                        </span>
                        <span className="text-sm text-gray-500">{discussion.replies} antwoorden</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{discussion.title}</h3>
                      <p className="text-gray-600">Door {discussion.author}</p>
                    </div>
                    <Button variant="ghost" className="text-brand-purple hover:text-brand-purple/80">
                      Bekijk
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Klaar om deel te nemen?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join onze community en krijg toegang tot exclusieve SEO-inzichten
            </p>
            <Button className="bg-brand-purple hover:bg-brand-purple/90 mr-4">
              Word lid
            </Button>
            <Button variant="outline">
              Meer informatie
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityPage;
