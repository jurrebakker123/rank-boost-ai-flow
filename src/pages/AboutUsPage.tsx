
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Users, Lightbulb, Award } from 'lucide-react';

const AboutUsPage = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Missie",
      description: "SEO toegankelijk maken voor iedereen, zonder technische kennis"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Een ondersteunende community van ondernemers en SEO-professionals"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovatie",
      description: "Continu verbeteren met de nieuwste AI en SEO-technologieën"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Kwaliteit",
      description: "Hoogwaardige content en tools die echte resultaten opleveren"
    }
  ];

  const team = [
    {
      name: "Alex van der Berg",
      role: "CEO & Founder",
      bio: "15+ jaar ervaring in SEO en digital marketing"
    },
    {
      name: "Sarah Jansen",
      role: "Head of AI Development",
      bio: "AI specialist met focus op content generatie"
    },
    {
      name: "Mark de Vries",
      role: "SEO Strategist",
      bio: "SEO consultant voor 100+ succesvolle projecten"
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
                Over SEOHelper.ai
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                We geloven dat elke ondernemer toegang moet hebben tot krachtige SEO-tools, 
                zonder de complexiteit van traditionele oplossingen.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Ons Verhaal</h2>
              <div className="prose prose-lg mx-auto text-gray-600">
                <p className="text-xl leading-relaxed mb-6">
                  SEOHelper.ai ontstond uit frustratie. Als ondernemers zagen we hoe moeilijk het was 
                  om goed te presteren in Google zonder dure SEO-bureaus of technische kennis.
                </p>
                <p className="text-xl leading-relaxed mb-6">
                  We besloten om AI-technologie te gebruiken om SEO eenvoudig en toegankelijk te maken 
                  voor iedereen. Onze missie is simpel: elke ondernemer moet kunnen profiteren van 
                  goede SEO, ongeacht hun technische achtergrond.
                </p>
                <p className="text-xl leading-relaxed">
                  Vandaag de dag helpen we duizenden ondernemers hun online zichtbaarheid te vergroten 
                  met AI-gegenereerde content en geautomatiseerde SEO-optimalisaties.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Onze Waarden</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="text-brand-purple mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Ons Team</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-brand-purple mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
