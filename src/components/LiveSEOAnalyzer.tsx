
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle, Globe, Search, Zap } from 'lucide-react';

const LiveSEOAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      // Generate realistic mock data
      const mockResult = {
        overallScore: Math.floor(Math.random() * 30) + 65, // 65-95
        issues: [
          { type: 'critical', text: 'Meta description ontbreekt op 3 pagina\'s', impact: 'Hoog' },
          { type: 'warning', text: 'Title tags zijn te lang op 2 pagina\'s', impact: 'Gemiddeld' },
          { type: 'info', text: 'Alt teksten kunnen worden verbeterd', impact: 'Laag' }
        ],
        metrics: {
          titleTags: Math.floor(Math.random() * 20) + 75,
          metaDescriptions: Math.floor(Math.random() * 25) + 70,
          headingStructure: Math.floor(Math.random() * 15) + 80,
          imageOptimization: Math.floor(Math.random() * 30) + 60,
          pageSpeed: Math.floor(Math.random() * 20) + 75
        },
        recommendations: [
          'Voeg ontbrekende meta descriptions toe',
          'Optimaliseer je title tags voor betere leesbaarheid',
          'Verbeter je heading structuur (H1, H2, H3)',
          'Comprimeer je afbeeldingen voor snellere laadtijden'
        ]
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-brand-purple" />
            <Badge className="bg-brand-purple text-white">GRATIS TOOL</Badge>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Live SEO Analyzer
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Voer je website URL in en krijg binnen 30 seconden een complete SEO-analyse
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Globe className="w-6 h-6 text-brand-purple" />
                Website SEO Check
              </CardTitle>
              <CardDescription>
                Ontdek direct wat er verbeterd kan worden aan je SEO
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  placeholder="https://jouwwebsite.nl"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 text-lg py-3"
                />
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !url}
                  className="bg-gradient-to-r from-brand-purple to-brand-blue px-8 py-3"
                >
                  {isAnalyzing ? 'Analyseren...' : 'Analyseer Nu'}
                  <Search className="ml-2 w-5 h-5" />
                </Button>
              </div>

              {isAnalyzing && (
                <div className="text-center py-8">
                  <div className="animate-spin w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">We analyseren je website...</p>
                  <p className="text-sm text-gray-500 mt-2">Dit duurt ongeveer 30 seconden</p>
                </div>
              )}

              {analysisResult && (
                <div className="space-y-6 animate-fade-in">
                  {/* Overall Score */}
                  <div className="text-center p-6 bg-gradient-to-r from-brand-purple/5 to-brand-blue/5 rounded-xl">
                    <h3 className="text-2xl font-bold mb-2">SEO Score</h3>
                    <div className={`text-6xl font-bold ${getScoreColor(analysisResult.overallScore)}`}>
                      {analysisResult.overallScore}/100
                    </div>
                    <Progress value={analysisResult.overallScore} className="mt-4 h-3" />
                  </div>

                  {/* Metrics */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(analysisResult.metrics).map(([key, value]: [string, any]) => (
                      <div key={key} className="p-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className={`font-bold ${getScoreColor(value)}`}>{value}%</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    ))}
                  </div>

                  {/* Issues */}
                  <div>
                    <h4 className="text-xl font-bold mb-4">Gevonden Problemen</h4>
                    <div className="space-y-3">
                      {analysisResult.issues.map((issue: any, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border">
                          {getIssueIcon(issue.type)}
                          <div className="flex-1">
                            <p className="font-medium">{issue.text}</p>
                            <Badge variant="outline" className="mt-1">
                              Impact: {issue.impact}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="text-xl font-bold mb-4">Aanbevelingen</h4>
                    <div className="space-y-2">
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center p-6 bg-gradient-to-r from-brand-purple to-brand-blue rounded-xl text-white">
                    <h4 className="text-xl font-bold mb-2">Wil je deze problemen automatisch laten oplossen?</h4>
                    <p className="mb-4">SEOHelper.ai kan al deze verbeterpunten voor je implementeren</p>
                    <Button className="bg-white text-brand-purple hover:bg-white/90">
                      Start Nu Gratis
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

export default LiveSEOAnalyzer;
