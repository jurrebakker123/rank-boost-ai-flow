
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600">
                Laatst bijgewerkt: 15 maart 2024
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2>1. Inleiding</h2>
              <p>
                SEOHelper.ai ("wij", "ons", "onze") respecteert uw privacy en is toegewijd aan het beschermen van uw persoonlijke gegevens. 
                Dit privacy beleid legt uit hoe wij uw persoonlijke gegevens verzamelen, gebruiken en beschermen wanneer u onze website en services gebruikt.
              </p>

              <h2>2. Welke gegevens verzamelen wij</h2>
              <p>Wij verzamelen verschillende soorten informatie:</p>
              <ul>
                <li><strong>Accountgegevens:</strong> Naam, e-mailadres, wachtwoord</li>
                <li><strong>Betalingsgegevens:</strong> Via onze betalingsverwerker (Stripe)</li>
                <li><strong>Gebruiksgegevens:</strong> Hoe u onze service gebruikt</li>
                <li><strong>Website gegevens:</strong> URL's en SEO-data van uw websites</li>
              </ul>

              <h2>3. Hoe wij uw gegevens gebruiken</h2>
              <p>Wij gebruiken uw gegevens voor:</p>
              <ul>
                <li>Het leveren van onze SEO-services</li>
                <li>Facturering en betalingsverwerking</li>
                <li>Klantenservice en support</li>
                <li>Verbetering van onze diensten</li>
                <li>Communicatie over updates en aanbiedingen</li>
              </ul>

              <h2>4. Gegevens delen</h2>
              <p>
                Wij verkopen of verhuren uw persoonlijke gegevens nooit aan derden. 
                Wij delen alleen gegevens met vertrouwde partners die ons helpen onze services te leveren:
              </p>
              <ul>
                <li>Supabase (database hosting)</li>
                <li>Stripe (betalingsverwerking)</li>
                <li>OpenAI (AI content generatie)</li>
              </ul>

              <h2>5. Gegevensbeveiliging</h2>
              <p>
                Wij nemen passende technische en organisatorische maatregelen om uw persoonlijke gegevens te beschermen tegen 
                ongeautoriseerde toegang, wijziging, openbaarmaking of vernietiging.
              </p>

              <h2>6. Uw rechten</h2>
              <p>U heeft het recht om:</p>
              <ul>
                <li>Toegang te vragen tot uw persoonlijke gegevens</li>
                <li>Correctie van onjuiste gegevens te verzoeken</li>
                <li>Verwijdering van uw gegevens te verzoeken</li>
                <li>Bezwaar te maken tegen verwerking van uw gegevens</li>
                <li>Uw gegevens over te dragen naar een andere service</li>
              </ul>

              <h2>7. Cookies</h2>
              <p>
                Wij gebruiken cookies om uw ervaring te verbeteren en onze service te analyseren. 
                U kunt cookies uitschakelen in uw browserinstellingen.
              </p>

              <h2>8. Contact</h2>
              <p>
                Voor vragen over dit privacy beleid kunt u contact met ons opnemen via{' '}
                <a href="mailto:privacy@seohelperai.com" className="text-brand-purple">
                  privacy@seohelperai.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
