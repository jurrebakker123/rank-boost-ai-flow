
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, PenTool, Clock, Target } from 'lucide-react';

const AIContentDemo = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    
    setIsGenerating(true);
    
    // Simulate AI content generation with realistic delay
    setTimeout(() => {
      const mockContent = {
        title: `Alles wat je moet weten over ${topic}: Complete gids voor 2024`,
        metaTitle: `${topic} gids 2024 | Expert tips en strategieën`,
        metaDescription: `Ontdek alles over ${topic} in onze uitgebreide gids. Praktische tips, voorbeelden en strategieën voor succes in 2024.`,
        content: `# Alles wat je moet weten over ${topic}: Complete gids voor 2024

## Inleiding

${topic} is een essentieel onderwerp dat steeds belangrijker wordt in de huidige digitale wereld. In deze uitgebreide gids bespreken we alles wat je moet weten om succesvol te zijn.

## Wat is ${topic}?

${topic} omvat verschillende aspecten die cruciaal zijn voor moderne bedrijven. Het gaat om meer dan alleen de technische aspecten - het is een complete strategie.

## Waarom is ${topic} belangrijk?

Er zijn verschillende redenen waarom ${topic} zo belangrijk is geworden:

- **Verhoogde zichtbaarheid**: Door ${topic} toe te passen, vergroot je je online zichtbaarheid aanzienlijk
- **Betere resultaten**: Bedrijven die investeren in ${topic} zien gemiddeld 40% betere resultaten
- **Concurrentievoordeel**: Met de juiste ${topic} strategie blijf je voor op je concurrenten

## Praktische tips voor ${topic}

### 1. Begin met de basis
Start altijd met een solide fundament. Bij ${topic} betekent dit dat je eerst je doelen helder moet hebben.

### 2. Gebruik de juiste tools
Er zijn verschillende tools beschikbaar die je kunnen helpen bij ${topic}. Kies de tools die het beste passen bij jouw situatie.

### 3. Meet en optimaliseer
Continue verbetering is essentieel. Meet regelmatig je resultaten en optimaliseer waar nodig.

## Conclusie

${topic} is een krachtige manier om je doelen te bereiken. Met de juiste aanpak en consistente uitvoering kun je geweldige resultaten behalen.

*Dit artikel is gegenereerd door SEOHelper.ai - de AI-powered SEO assistent die je helpt bij het creëren van geoptimaliseerde content.*`,
        keywords: [
          `${topic} gids`,
          `${topic} 2024`,
          `${topic} tips`,
          `${topic} strategie`,
          `${topic} voor beginners`
        ],
        wordCount: 387,
        readingTime: 2,
        seoScore: Math.floor(Math.random() * 15) + 85
      };
      
      setGeneratedContent(mockContent);
      setIsGenerating(false);
    }, 4000);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-brand-blue" />
            <Badge className="bg-brand-blue text-white">AI POWERED</Badge>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            AI Content Generator Demo
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Zie hoe onze AI binnen 60 seconden een compleet SEO-geoptimaliseerd artikel schrijft
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <PenTool className="w-6 h-6 text-brand-blue" />
                AI Blog Generator
              </CardTitle>
              <CardDescription>
                Voer een onderwerp in en zie onze AI aan het werk
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Bijv. social media marketing, SEO tips, content strategie..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1 text-lg py-3"
                />
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic}
                  className="bg-gradient-to-r from-brand-blue to-brand-purple px-8 py-3"
                >
                  {isGenerating ? 'Genereert...' : 'Genereer Artikel'}
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>
              </div>

              {isGenerating && (
                <div className="text-center py-12">
                  <div className="relative">
                    <div className="animate-spin w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full mx-auto mb-6"></div>
                    <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-brand-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI aan het werk...</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>🔍 Keyword research wordt uitgevoerd</p>
                    <p>📝 Content structuur wordt opgesteld</p>
                    <p>✨ SEO-geoptimaliseerd artikel wordt geschreven</p>
                    <p>🎯 Meta tags worden gegenereerd</p>
                  </div>
                </div>
              )}

              {generatedContent && (
                <div className="space-y-6 animate-fade-in">
                  {/* Stats */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{generatedContent.wordCount}</div>
                      <div className="text-sm text-gray-600">Woorden</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{generatedContent.readingTime} min</div>
                      <div className="text-sm text-gray-600">Leestijd</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{generatedContent.seoScore}%</div>
                      <div className="text-sm text-gray-600">SEO Score</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{generatedContent.keywords.length}</div>
                      <div className="text-sm text-gray-600">Keywords</div>
                    </div>
                  </div>

                  {/* Generated Content Preview */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Meta Information */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          SEO Meta Tags
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-500">Title Tag</div>
                            <div className="text-blue-600">{generatedContent.metaTitle}</div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-500">Meta Description</div>
                            <div className="text-gray-700">{generatedContent.metaDescription}</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Target Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {generatedContent.keywords.map((keyword: string, index: number) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Artikel Preview
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 h-80 overflow-y-auto">
                        <Textarea
                          value={generatedContent.content}
                          readOnly
                          className="border-0 bg-transparent resize-none h-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center p-6 bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl text-white">
                    <h4 className="text-xl font-bold mb-2">Indrukwekkend, toch?</h4>
                    <p className="mb-4">Dit is slechts een voorbeeld. Met SEOHelper.ai krijg je elke maand professionele artikelen zoals deze, automatisch gepubliceerd op je website.</p>
                    <Button className="bg-white text-brand-blue hover:bg-white/90">
                      Start Mijn Gratis Trial
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIContentDemo;
