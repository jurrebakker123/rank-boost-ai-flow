
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, TrendingUp, BarChart3 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-brand-purple-light/5 to-brand-blue-light/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-brand-blue/15 to-brand-purple/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-brand-purple/5 to-brand-blue/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            {/* Badge */}
            <div className="animate-fade-in">
              <Badge variant="outline" className="bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 border-brand-purple/20 text-brand-purple font-medium px-4 py-2 text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                #1 AI SEO Assistent in Nederland
              </Badge>
            </div>

            {/* Main headline with gradient text */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Hoger in Google
                <span className="block bg-gradient-to-r from-brand-purple via-brand-blue to-brand-purple bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                  zonder stress
                </span>
              </h1>
            </div>

            {/* Subtitle with better spacing */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                SEOHelper.ai automatiseert je volledige SEO-strategie. 
                <span className="font-semibold text-gray-800"> AI-gegenereerde content, optimalisatie tips en rapporten</span> 
                —allemaal gepersonaliseerd voor jouw bedrijf.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Geen technische kennis vereist</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Resultaten binnen 30 dagen</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>500+ tevreden klanten</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/pricing">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold group"
                  >
                    Begin Nu Direct
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-brand-purple/30 text-brand-purple hover:bg-brand-purple/5 hover:border-brand-purple/50 px-8 py-6 text-lg font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    Bekijk Demo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Social proof */}
            <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-4 pt-6">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow-lg">👨‍💼</div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow-lg">👩‍💼</div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow-lg">👩‍💻</div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow-lg">👨‍💻</div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Vertrouwd door 500+ bedrijven</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">⭐</span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">4.9/5 gemiddelde beoordeling</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced dashboard mockup */}
          <div className="lg:w-1/2 relative animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <div className="relative max-w-lg mx-auto">
              {/* Floating cards around main dashboard */}
              <div className="absolute -top-8 -left-8 bg-white rounded-xl shadow-2xl p-4 border border-gray-100 animate-float z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Verkeer stijging</p>
                    <p className="text-2xl font-bold text-green-600">+127%</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 bg-white rounded-xl shadow-2xl p-4 border border-gray-100 animate-float z-10" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Nieuwe keywords</p>
                    <p className="text-2xl font-bold text-blue-600">+89</p>
                  </div>
                </div>
              </div>

              {/* Main dashboard */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 backdrop-blur-sm bg-white/95">
                <div className="flex justify-between items-center border-b border-gray-100 pb-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">SEO Dashboard</h3>
                    <p className="text-sm text-gray-500">Real-time overzicht</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Live
                  </Badge>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-brand-purple/5 to-brand-blue/5 p-4 rounded-xl border border-brand-purple/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-800">Organisch Verkeer</span>
                      <span className="text-green-600 font-bold">+18%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-purple to-brand-blue rounded-full w-4/5 relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-brand-blue/5 to-brand-purple/5 p-4 rounded-xl border border-brand-blue/10">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-800">Keyword Rankings</span>
                      <span className="text-green-600 font-bold">+12%</span>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-blue to-brand-purple rounded-full w-3/4 relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Volgende blog gepubliceerd in</span>
                      <span className="text-sm text-brand-purple font-medium">2 dagen →</span>
                    </div>
                    <div className="text-xs text-gray-500">AI schrijft automatisch je volgende SEO-geoptimaliseerde artikel</div>
                  </div>
                </div>
              </div>

              {/* Decorative blur elements */}
              <div className="absolute -z-10 top-20 left-20 w-32 h-32 bg-brand-purple/20 rounded-full blur-2xl"></div>
              <div className="absolute -z-10 bottom-20 right-20 w-24 h-24 bg-brand-blue/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
