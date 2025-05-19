
import React from 'react';

const Clients = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-lg font-medium text-brand-purple">Vertrouwd door bedrijven van alle groottes</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {/* Client logos - using placeholder shapes with company names for now */}
          {['TechGlobal', 'GroeneEnergie', 'MediaPuls', 'RetailGigant', 'FinancieringHub'].map((company, index) => (
            <div key={index} className="flex items-center justify-center h-12">
              <div className="bg-gray-100 px-6 py-3 rounded-md">
                <span className="text-gray-500 font-medium">{company}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <p className="text-gray-600">Wij helpen <span className="font-bold text-brand-purple">500+</span> bedrijven met het verbeteren van hun online aanwezigheid</p>
        </div>
      </div>
    </section>
  );
};

export default Clients;
