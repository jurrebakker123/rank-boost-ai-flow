
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Algemene Voorwaarden
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
              <h2>1. Acceptatie van voorwaarden</h2>
              <p>
                Door gebruik te maken van SEOHelper.ai accepteert u deze algemene voorwaarden. 
                Als u niet akkoord gaat met deze voorwaarden, gebruik dan onze service niet.
              </p>

              <h2>2. Beschrijving van de service</h2>
              <p>
                SEOHelper.ai biedt AI-gedreven SEO-tools en services, inclusief:
              </p>
              <ul>
                <li>Geautomatiseerde content generatie</li>
                <li>SEO-analyse en rapportage</li>
                <li>Keyword research tools</li>
                <li>Website optimalisatie suggesties</li>
              </ul>

              <h2>3. Account registratie</h2>
              <p>
                Om onze service te gebruiken moet u een account aanmaken. U bent verantwoordelijk voor:
              </p>
              <ul>
                <li>Het verstrekken van juiste en volledige informatie</li>
                <li>Het bijhouden van de veiligheid van uw account</li>
                <li>Alle activiteiten onder uw account</li>
              </ul>

              <h2>4. Abonnementen en betalingen</h2>
              <ul>
                <li>Abonnementen worden maandelijks gefactureerd</li>
                <li>Betalingen worden automatisch verwerkt via Stripe</li>
                <li>U kunt uw abonnement op elk moment opzeggen</li>
                <li>Bij opzegging heeft u toegang tot het einde van de betaalde periode</li>
                <li>Terugbetalingen zijn mogelijk binnen 14 dagen na aankoop</li>
              </ul>

              <h2>5. Gebruik van de service</h2>
              <p>U mag onze service niet gebruiken voor:</p>
              <ul>
                <li>Illegale activiteiten</li>
                <li>Spam of misleidende content</li>
                <li>Schending van intellectuele eigendomsrechten</li>
                <li>Verstoring van onze service of servers</li>
              </ul>

              <h2>6. Intellectueel eigendom</h2>
              <p>
                De content die door onze AI wordt gegenereerd voor uw gebruik is uw eigendom. 
                Onze software, algoritmes en platform blijven ons eigendom.
              </p>

              <h2>7. Garanties en aansprakelijkheid</h2>
              <p>
                Wij bieden onze service "as is" zonder garanties. Wij zijn niet aansprakelijk voor:
              </p>
              <ul>
                <li>Indirecte schade of winstderving</li>
                <li>Dataloss of service onderbrekingen</li>
                <li>SEO-resultaten (deze kunnen variëren)</li>
              </ul>

              <h2>8. Wijzigingen</h2>
              <p>
                Wij behouden ons het recht voor om deze voorwaarden te wijzigen. 
                Wijzigingen worden via e-mail gecommuniceerd.
              </p>

              <h2>9. Beëindiging</h2>
              <p>
                Wij kunnen uw account beëindigen bij schending van deze voorwaarden. 
                U kunt uw account op elk moment sluiten via uw dashboard.
              </p>

              <h2>10. Contact</h2>
              <p>
                Voor vragen over deze voorwaarden kunt u contact opnemen via{' '}
                <a href="mailto:legal@seohelperai.com" className="text-brand-purple">
                  legal@seohelperai.com
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

export default TermsOfServicePage;
