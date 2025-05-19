
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const faqs: FAQItem[] = [
    {
      question: "Hoe creëert SEOHelper.ai blogcontent?",
      answer: "Onze AI-technologie analyseert je bedrijf, industrie en doelzoekwoorden om unieke, SEO-geoptimaliseerde blogposts te genereren die specifiek op jouw behoeften zijn afgestemd. De content is geschreven om aantrekkelijk te zijn voor lezers en bevat tegelijkertijd de juiste zoekwoorden en structuur om zoekrangschikkingen te verbeteren."
    },
    {
      question: "Heb ik technische SEO-kennis nodig om deze service te gebruiken?",
      answer: "Helemaal niet! SEOHelper.ai is ontworpen voor ondernemers zonder technische SEO-expertise. Alles is geautomatiseerd en gepresenteerd in een gemakkelijk te begrijpen formaat. Je verstrekt tijdens de setup eenvoudigweg basisinformatie over je bedrijf, en ons systeem doet de rest."
    },
    {
      question: "Kan ik de blogartikelen bewerken voordat ik ze publiceer?",
      answer: "Absoluut! Alle blogcontent wordt geleverd via je dashboard waar je deze kunt bekijken, downloaden en wijzigen voordat je publiceert. Hoewel de content klaar is voor direct gebruik, heb je altijd de mogelijkheid om je persoonlijke touch of specifieke details toe te voegen."
    },
    {
      question: "Hoe vaak ontvang ik nieuwe content en rapporten?",
      answer: "Contentlevering hangt af van je abonnementsplan. Abonnees van het Basis-plan ontvangen 1 blogartikel per maand, terwijl hogere abonnementen meerdere artikelen ontvangen. SEO-rapporten worden maandelijks geleverd aan Pro-abonnees en hoger. Alle content en rapporten zijn toegankelijk via je dashboard zodra ze klaar zijn."
    },
    {
      question: "Kan ik mijn abonnementsplan later wijzigen?",
      answer: "Ja, je kunt je abonnement op elk moment upgraden, downgraden of annuleren via je dashboard. Wijzigingen aan je plan worden van kracht aan het begin van je volgende factureringsperiode."
    },
    {
      question: "Is er een minimale contractperiode?",
      answer: "Nee, we binden je niet aan langetermijncontracten. Alle plannen worden maandelijks gefactureerd en je kunt op elk moment opzeggen. We bieden ook een 14-dagen geld-terug garantie als je niet tevreden bent met onze service."
    },
    {
      question: "Zal de content origineel en uniek zijn voor mijn bedrijf?",
      answer: "Ja, alle content die door SEOHelper.ai wordt gemaakt is 100% origineel en speciaal geschreven voor jouw bedrijf op basis van de informatie die je tijdens de onboarding verstrekt. Elk stuk content is afgestemd op jouw branche, doelzoekwoorden en merkstem."
    },
    {
      question: "Hoe lang duurt het voordat ik resultaten zie van SEO?",
      answer: "SEO is een langetermijnstrategie die doorgaans binnen 3-6 maanden betekenisvolle resultaten laat zien. Hoewel sommige verbeteringen eerder merkbaar kunnen zijn, zal consistent publiceren van content en het implementeren van onze aanbevelingen gedurende enkele maanden de beste resultaten opleveren voor je zoekrangschikkingen en verkeer."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Veelgestelde <span className="gradient-text">Vragen</span>
          </h2>
          <p className="text-lg text-gray-600">
            Alles wat je moet weten over SEOHelper.ai en hoe het je bedrijf kan helpen.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
