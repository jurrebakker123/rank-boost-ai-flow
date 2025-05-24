
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Code, Key, Globe, Shield } from 'lucide-react';

const APIDocumentationPage = () => {
  const endpoints = [
    {
      method: "GET",
      endpoint: "/api/v1/reports",
      description: "Haal SEO-rapporten op"
    },
    {
      method: "POST",
      endpoint: "/api/v1/content/generate",
      description: "Genereer nieuwe blog content"
    },
    {
      method: "GET",
      endpoint: "/api/v1/keywords",
      description: "Krijg keyword suggesties"
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
                API Documentatie
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Integreer SEOHelper.ai in je eigen applicaties met onze krachtige API
              </p>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Aan de slag</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-brand-purple mb-4">
                    <Key className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">API Key verkrijgen</h3>
                  <p className="text-gray-600">
                    Genereer je API key in je dashboard onder 'API Instellingen'
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-brand-purple mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Authenticatie</h3>
                  <p className="text-gray-600">
                    Gebruik Bearer token authenticatie in je API requests
                  </p>
                </div>
              </div>

              {/* Base URL */}
              <div className="bg-gray-50 p-6 rounded-xl mb-12">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Base URL
                </h3>
                <code className="bg-gray-800 text-green-400 px-4 py-2 rounded block">
                  https://api.seohelper.ai/v1
                </code>
              </div>

              {/* Endpoints */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Code className="w-6 h-6" />
                  Endpoints
                </h3>
                <div className="space-y-4">
                  {endpoints.map((endpoint, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex items-center gap-4 mb-2">
                        <span className={`px-3 py-1 rounded text-sm font-medium ${
                          endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-gray-800 font-mono">{endpoint.endpoint}</code>
                      </div>
                      <p className="text-gray-600">{endpoint.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example */}
              <div className="bg-gray-800 text-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Voorbeeld Request</h3>
                <pre className="text-green-400 text-sm overflow-x-auto">
{`curl -X GET "https://api.seohelper.ai/v1/reports" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default APIDocumentationPage;
