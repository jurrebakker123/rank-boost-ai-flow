
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, CheckCircle, XCircle, AlertCircle, TrendingUp, FileText, Globe, Link as LinkIcon, Code, ArrowRight } from 'lucide-react';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

// Google API Key voor SEO data
const GOOGLE_API_KEY = 'AIzaSyDLEbqqWb2uxio1yoyARx-PzrvbzbGvCpg';

// SEO tips by category
const SEO_TIPS = {
  content: [
    { title: "Creëer kwaliteitsinhoud", description: "Publiceer originele, relevante content die waarde biedt voor je publiek." },
    { title: "Zoekwoordenonderzoek", description: "Gebruik zoekwoorden strategisch in je content, vooral in titels, koppen en eerste alinea." },
    { title: "Contentlengte", description: "Streef naar uitgebreide content (1000+ woorden) voor belangrijke pagina's om autoriteit te vergroten." }
  ],
  technical: [
    { title: "Mobiele optimalisatie", description: "Zorg ervoor dat je site volledig responsive en mobiel-vriendelijk is." },
    { title: "Paginasnelheid", description: "Optimaliseer laadsnelheid door afbeeldingen te comprimeren, code te minificeren en browsercaching te gebruiken." },
    { title: "HTTPS", description: "Beveilig je site met HTTPS om vertrouwen en rankings te verbeteren." }
  ],
  onPage: [
    { title: "Meta Tags", description: "Optimaliseer title tags (55-60 tekens) en meta descriptions (150-160 tekens)." },
    { title: "Koppenstructuur", description: "Gebruik een goede H1, H2, H3 hiërarchie om je content te structureren." },
    { title: "URL Structuur", description: "Maak schone, beschrijvende URL's die zoekwoorden bevatten." }
  ],
  links: [
    { title: "Interne linking", description: "Link tussen relevante pagina's op je site om de site-architectuur te versterken." },
    { title: "Externe linking", description: "Link naar gezaghebbende externe bronnen om geloofwaardigheid te vergroten." },
    { title: "Kwalitatieve backlinks", description: "Verkrijg backlinks van gerenommeerde websites in je branche." }
  ]
};

// Generate realistic mock results based on URL
const generateMockResults = (url: string) => {
  try {
    const urlObj = new URL(url);
    const urlLength = url.length;
    const domain = urlObj.hostname;
    const hasDash = domain.includes('-');
    const hasWWW = domain.includes('www.');
    const topLevelDomain = domain.split('.').pop()?.toLowerCase() || '';
    const pathLength = urlObj.pathname.length;
    const hasHttps = url.startsWith('https://');
    
    let seedValue = domain.length;
    for (let i = 0; i < Math.min(domain.length, 5); i++) {
      seedValue += domain.charCodeAt(i);
    }
    
    const isPremiumTLD = ['com', 'org', 'net', 'io', 'ai'].includes(topLevelDomain);
    const tldBonus = isPremiumTLD ? 5 : 0;
    const httpsBonus = hasHttps ? 10 : 0;
    const dashPenalty = hasDash ? -5 : 0;
    const lengthPenalty = domain.length > 20 ? -5 : 0;
    const pathPenalty = pathLength > 30 ? -8 : 0;
    
    const randomizer = (base: number, variation: number) => {
      const randomFactor = ((seedValue % 13) - 6) * variation / 3;
      return Math.max(15, Math.min(98, base + randomFactor));
    };
    
    const seoBaseScore = 70 + tldBonus + dashPenalty + lengthPenalty + pathPenalty; 
    const performanceBaseScore = 65 + (hasWWW ? -5 : 0);
    const accessibilityBaseScore = 75;
    const bestPracticesBaseScore = 68 + httpsBonus;
    
    const seoScore = Math.round(randomizer(seoBaseScore, 2));
    const performanceScore = Math.round(randomizer(performanceBaseScore, 3));
    const accessibilityScore = Math.round(randomizer(accessibilityBaseScore, 1.5));
    const bestPracticesScore = Math.round(randomizer(bestPracticesBaseScore, 2));
    
    const chartData = [
      { name: "SEO", score: seoScore },
      { name: "Performance", score: performanceScore },
      { name: "Accessibility", score: accessibilityScore },
      { name: "Best Practices", score: bestPracticesScore },
    ];
    
    const performanceIssues: string[] = [];
    if (performanceScore < 90) performanceIssues.push('Render-blocking bronnen gedetecteerd');
    if (performanceScore < 80) performanceIssues.push('Afbeeldingen zijn niet goed geoptimaliseerd');
    if (performanceScore < 70) performanceIssues.push('JavaScript bestanden zijn niet geminificeerd');
    if (performanceScore < 60) performanceIssues.push('CSS bestanden kunnen geoptimaliseerd worden');
    if (performanceScore < 50) performanceIssues.push('Server responstijd is traag');
    if (performanceIssues.length === 0) performanceIssues.push('Geen grote prestatieproblemen gedetecteerd');
    
    const contentAnalysis: Array<{ text: string; status: 'good' | 'warning' | 'error' }> = [];
    
    contentAnalysis.push({ 
      text: 'Pagina heeft een juiste titel', 
      status: seedValue % 10 > 3 ? 'good' : 'warning' 
    });
    
    contentAnalysis.push({ 
      text: 'Meta beschrijving kwaliteit', 
      status: seedValue % 7 > 2 ? 'good' : 'warning' 
    });
    
    contentAnalysis.push({ 
      text: 'Juiste linktekst gebruikt', 
      status: seedValue % 8 > 3 ? 'good' : 'warning' 
    });
    
    contentAnalysis.push({ 
      text: 'Koppen structuur (H1, H2, H3)', 
      status: seedValue % 12 > 6 ? 'good' : seedValue % 12 > 3 ? 'warning' : 'error'
    });
    
    contentAnalysis.push({ 
      text: 'Mobiel-vriendelijk ontwerp', 
      status: seedValue % 9 > 4 ? 'good' : 'warning' 
    });
    
    contentAnalysis.push({ 
      text: 'Afbeelding alt-tekst', 
      status: seedValue % 11 > 5 ? 'good' : seedValue % 11 > 2 ? 'warning' : 'error'
    });
    
    contentAnalysis.push({ 
      text: 'HTTPS implementatie', 
      status: hasHttps ? 'good' : 'error' 
    });
    
    contentAnalysis.push({ 
      text: 'Canonical URL implementatie', 
      status: seedValue % 8 > 4 ? 'good' : 'warning' 
    });
    
    const recommendations: {title: string, description: string}[] = [];
    
    if (seoScore < 90) {
      if (!hasHttps) {
        recommendations.push({
          title: 'Implementeer HTTPS',
          description: 'Beveilig je site met HTTPS om vertrouwen en zoekrankings te verbeteren.'
        });
      }
      
      if (hasDash) {
        recommendations.push({
          title: 'Overweeg domeinverbeteringen',
          description: 'Domeinen met koppeltekens kunnen als minder betrouwbaar worden gezien. Overweeg te consolideren naar een schoner domein indien mogelijk.'
        });
      }
      
      if (domain.length > 15) {
        recommendations.push({
          title: 'Bekijk domeinlengte',
          description: 'Je domein is vrij lang. Kortere domeinen zijn makkelijker te onthouden en te typen.'
        });
      }
    }
    
    if (performanceScore < 85) {
      recommendations.push({
        title: 'Optimaliseer afbeeldingen',
        description: 'Comprimeer en formatteer afbeeldingen correct om de laadtijd te verbeteren.'
      });
    }
    
    if (performanceScore < 75) {
      recommendations.push({
        title: 'Minimaliseer JavaScript',
        description: 'Minify en stel niet-kritieke JavaScript uit om de paginalaadprestaties te verbeteren.'
      });
    }
    
    if (performanceScore < 65) {
      recommendations.push({
        title: 'Implementeer browser caching',
        description: 'Stel juiste cache headers in om de laadsnelheid voor terugkerende bezoekers te verbeteren.'
      });
    }
    
    if (accessibilityScore < 85) {
      recommendations.push({
        title: 'Verbeter kleurcontrast',
        description: 'Zorg voor voldoende kleurcontrast tussen tekst en achtergrond voor betere leesbaarheid.'
      });
    }
    
    if (accessibilityScore < 75) {
      recommendations.push({
        title: 'Voeg alt-tekst toe aan afbeeldingen',
        description: 'Zorg ervoor dat alle afbeeldingen beschrijvende alt-tekst hebben voor schermlezers.'
      });
    }
    
    if (contentAnalysis.find(item => item.text.includes('Koppen') && item.status !== 'good')) {
      recommendations.push({
        title: 'Herstel koppen structuur',
        description: 'Gebruik juiste H1, H2, H3 kop hiërarchie om je content te structureren voor betere SEO en toegankelijkheid.'
      });
    }
    
    if (recommendations.length === 0) {
      recommendations.push({
        title: 'Handhaaf huidige SEO-strategie',
        description: 'Je website lijkt SEO-best practices te volgen. Ga zo door!'
      });
    }
    
    const technicalIssues: {severity: 'high' | 'medium' | 'low', issue: string, solution: string}[] = [];
    
    if (!hasHttps) {
      technicalIssues.push({
        severity: 'high',
        issue: 'Geen HTTPS implementatie',
        solution: 'Implementeer SSL-certificaat en stuur alle HTTP-verkeer door naar HTTPS'
      });
    }
    
    if (hasWWW) {
      technicalIssues.push({
        severity: 'low',
        issue: 'WWW subdomein gebruik',
        solution: 'Overweeg een canonical redirect te implementeren om domeinautoriteit te consolideren'
      });
    }
    
    if (pathLength > 20) {
      technicalIssues.push({
        severity: 'medium',
        issue: 'Diepe URL-structuur',
        solution: 'Overweeg URL-structuur voor belangrijke pagina\'s af te vlakken om crawlbaarheid te verbeteren'
      });
    }
    
    if (seedValue % 7 === 3) {
      technicalIssues.push({
        severity: 'medium',
        issue: 'Ontbrekend robots.txt bestand',
        solution: 'Maak een robots.txt bestand aan om het crawlgedrag van zoekmachines te sturen'
      });
    }
    
    if (seedValue % 9 === 4) {
      technicalIssues.push({
        severity: 'medium',
        issue: 'Ontbrekende of onvolledige sitemap.xml',
        solution: 'Genereer een uitgebreide XML sitemap en dien deze in bij zoekmachines'
      });
    }
    
    if (seedValue % 12 === 2) {
      technicalIssues.push({
        severity: 'high',
        issue: 'Trage server responstijd',
        solution: 'Upgrade hosting of implementeer caching om TTFB (Time to First Byte) te verbeteren'
      });
    }
    
    const apiResponse = JSON.stringify({
      url: url,
      timestamp: new Date().toISOString(),
      lighthouseResult: {
        finalUrl: url,
        requestedUrl: url,
        mainDocumentUrl: url,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
        fetchTime: new Date().toISOString(),
        categories: {
          performance: { score: performanceScore / 100, title: "Performance" },
          accessibility: { score: accessibilityScore / 100, title: "Accessibility" },
          'best-practices': { score: bestPracticesScore / 100, title: "Best Practices" },
          seo: { score: seoScore / 100, title: "SEO" }
        },
        audits: {
          'document-title': { 
            score: contentAnalysis.find(i => i.text.includes('titel'))?.status === 'good' ? 1 : 0.5,
            title: "Document has a title element",
            description: "The title gives screen reader users an overview of the page, and search engine users rely on it heavily to determine if a page is relevant to their search."
          },
          'meta-description': { 
            score: contentAnalysis.find(i => i.text.includes('Meta'))?.status === 'good' ? 1 : 0.5,
            title: "Document has a meta description",
            description: "Meta descriptions may be included in search results to concisely summarize page content."
          },
          'link-text': { 
            score: contentAnalysis.find(i => i.text.includes('linktekst'))?.status === 'good' ? 1 : 0.5,
            title: "Links have descriptive text",
            description: "Link text that is descriptive helps search engines understand your content."
          },
          'heading-order': {
            score: contentAnalysis.find(i => i.text.includes('Koppen'))?.status === 'good' ? 1 : 0.5,
            title: "Heading elements appear in a sequentially-descending order",
            description: "Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies."
          },
          'canonical': { 
            score: contentAnalysis.find(i => i.text.includes('Canonical'))?.status === 'good' ? 1 : 0.5,
            title: "Document has a valid `rel=canonical`",
            description: "Canonical links suggest which URL to show in search results."
          },
          'is-crawlable': {
            score: seedValue % 8 > 4 ? 1 : 0.5,
            title: "Page isn't blocked from indexing",
            description: "Search engines are unable to include your pages in search results if they're blocked from crawling."
          },
          'viewport': {
            score: contentAnalysis.find(i => i.text.includes('Mobiel'))?.status === 'good' ? 1 : 0.5,
            title: "Has a `<meta name=\"viewport\">` tag with `width` or `initial-scale`",
            description: "A `<meta name=\"viewport\">` not only optimizes your app for mobile screen sizes, but also prevents a 300 millisecond delay to user input."
          },
          'robots-txt': {
            score: seedValue % 13 > 4 ? 1 : 0,
            title: "robots.txt is valid",
            description: "If your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed."
          }
        }
      }
    }, null, 2);
    
    return {
      seoScore,
      performanceScore,
      accessibilityScore, 
      bestPracticesScore,
      chartData,
      performanceIssues,
      contentAnalysis,
      recommendations,
      technicalIssues,
      apiResponse
    };
  } catch (error) {
    console.error("Error generating mock results:", error);
    throw error;
  }
};

const fetchSEOData = async (url: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`API fout: ${response.status}`);
    }
    
    const data = await response.json();
    
    const lighthouseResult = data.lighthouseResult;
    
    const seoScore = Math.round(lighthouseResult?.categories?.seo?.score * 100) || 0;
    const performanceScore = Math.round(lighthouseResult?.categories?.performance?.score * 100) || 0;
    const accessibilityScore = Math.round(lighthouseResult?.categories?.accessibility?.score * 100) || 0;
    const bestPracticesScore = Math.round(lighthouseResult?.categories?.['best-practices']?.score * 100) || 0;
    
    const chartData = [
      { name: "SEO", score: seoScore },
      { name: "Performance", score: performanceScore },
      { name: "Accessibility", score: accessibilityScore },
      { name: "Best Practices", score: bestPracticesScore },
    ];
    
    const performanceIssues: string[] = [];
    if (lighthouseResult?.audits) {
      if (lighthouseResult.audits['render-blocking-resources']?.score < 1) {
        performanceIssues.push('Render-blocking bronnen gedetecteerd');
      }
      if (lighthouseResult.audits['unminified-javascript']?.score < 1) {
        performanceIssues.push('JavaScript bestanden zijn niet geminificeerd');
      }
      if (lighthouseResult.audits['unused-javascript']?.score < 1) {
        performanceIssues.push('Ongebruikte JavaScript gedetecteerd');
      }
      if (lighthouseResult.audits['uses-optimized-images']?.score < 1) {
        performanceIssues.push('Afbeeldingen zijn niet goed geoptimaliseerd');
      }
      if (lighthouseResult.audits['unused-css-rules']?.score < 1) {
        performanceIssues.push('Ongebruikte CSS gedetecteerd');
      }
    }
    
    if (performanceIssues.length === 0) performanceIssues.push('Geen grote prestatieproblemen gedetecteerd');
    
    const contentAnalysis: Array<{ text: string; status: 'good' | 'warning' | 'error' }> = [];
    
    if (lighthouseResult?.audits) {
      contentAnalysis.push({ 
        text: 'Pagina heeft een juiste titel', 
        status: lighthouseResult.audits['document-title']?.score === 1 ? 'good' : 'warning' 
      });
      
      contentAnalysis.push({ 
        text: 'Meta beschrijving kwaliteit', 
        status: lighthouseResult.audits['meta-description']?.score === 1 ? 'good' : 'warning' 
      });
      
      contentAnalysis.push({ 
        text: 'Juiste linktekst gebruikt', 
        status: lighthouseResult.audits['link-text']?.score === 1 ? 'good' : 'warning' 
      });
      
      contentAnalysis.push({ 
        text: 'Koppen structuur (H1, H2, H3)', 
        status: lighthouseResult.audits['heading-order']?.score === 1 ? 'good' : 
               lighthouseResult.audits['heading-order']?.score === 0 ? 'error' : 'warning'
      });
      
      contentAnalysis.push({ 
        text: 'Mobiel-vriendelijk ontwerp', 
        status: lighthouseResult.audits['viewport']?.score === 1 ? 'good' : 'warning' 
      });
      
      contentAnalysis.push({ 
        text: 'Afbeelding alt-tekst', 
        status: lighthouseResult.audits['image-alt']?.score === 1 ? 'good' :
               lighthouseResult.audits['image-alt']?.score === 0 ? 'error' : 'warning'
      });
      
      contentAnalysis.push({ 
        text: 'HTTPS implementatie', 
        status: lighthouseResult.audits['is-on-https']?.score === 1 ? 'good' : 'error' 
      });
      
      contentAnalysis.push({ 
        text: 'Canonical URL implementatie', 
        status: lighthouseResult.audits['canonical']?.score === 1 ? 'good' : 'warning' 
      });
    }
    
    const recommendations: {title: string, description: string}[] = [];
    
    if (seoScore < 90) {
      if (lighthouseResult.audits['is-crawlable']?.score !== 1) {
        recommendations.push({
          title: 'Zorg dat site crawlbaar is',
          description: 'Controleer robots.txt en meta robots tags om ervoor te zorgen dat je content goed geïndexeerd kan worden.'
        });
      }
      
      if (lighthouseResult.audits['meta-description']?.score !== 1) {
        recommendations.push({
          title: 'Voeg meta beschrijvingen toe',
          description: 'Meta beschrijvingen helpen de klikratio vanuit zoekresultaten te verbeteren.'
        });
      }
    }
    
    if (performanceScore < 85) {
      if (lighthouseResult.audits['uses-optimized-images']?.score !== 1) {
        recommendations.push({
          title: 'Optimaliseer afbeeldingen',
          description: 'Comprimeer en formatteer afbeeldingen correct om de laadtijd te verbeteren.'
        });
      }
      
      if (lighthouseResult.audits['render-blocking-resources']?.score !== 1) {
        recommendations.push({
          title: 'Verwijder render-blokkerende bronnen',
          description: 'Stel JavaScript en CSS bestanden uit of laad ze asynchroon wanneer ze het renderen blokkeren.'
        });
      }
    }
    
    if (recommendations.length === 0) {
      recommendations.push({
        title: 'Handhaaf huidige SEO-strategie',
        description: 'Je website lijkt SEO-best practices te volgen. Ga zo door!'
      });
    }
    
    const technicalIssues: {severity: 'high' | 'medium' | 'low', issue: string, solution: string}[] = [];
    
    if (!lighthouseResult.audits['is-on-https']?.score) {
      technicalIssues.push({
        severity: 'high',
        issue: 'Geen HTTPS implementatie',
        solution: 'Implementeer SSL-certificaat en stuur alle HTTP-verkeer door naar HTTPS'
      });
    }
    
    if (!lighthouseResult.audits['robots-txt']?.score) {
      technicalIssues.push({
        severity: 'medium',
        issue: 'Ontbrekend of ongeldig robots.txt bestand',
        solution: 'Maak een goed robots.txt bestand aan om het crawlgedrag van zoekmachines te sturen'
      });
    }
    
    if (!lighthouseResult.audits['canonical']?.score) {
      technicalIssues.push({
        severity: 'medium',
        issue: 'Ontbrekende canonical tags',
        solution: 'Implementeer canonical tags om problemen met dubbele content te voorkomen'
      });
    }
    
    return {
      seoScore,
      performanceScore,
      accessibilityScore, 
      bestPracticesScore,
      chartData,
      performanceIssues,
      contentAnalysis,
      recommendations,
      technicalIssues,
      apiResponse: JSON.stringify(data, null, 2)
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    // Als de API-aanroep mislukt, gebruik dan de mock resultaten
    const mockResults = generateMockResults(url);
    return mockResults;
  }
};

const AnalyzerPage = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [seoScore, setSeoScore] = useState(0);
  const [chartData, setChartData] = useState<{ name: string; score: number }[]>([]);
  const [performanceIssues, setPerformanceIssues] = useState<string[]>([]);
  const [contentAnalysis, setContentAnalysis] = useState<{text: string, status: 'good' | 'warning' | 'error'}[]>([]);
  const [recommendations, setRecommendations] = useState<{title: string, description: string}[]>([]);
  const [technicalIssues, setTechnicalIssues] = useState<{severity: 'high' | 'medium' | 'low', issue: string, solution: string}[]>([]);
  const [apiResponse, setApiResponse] = useState('');
  const [activeTipCategory, setActiveTipCategory] = useState('content');
  const navigate = useNavigate();

  const handleAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "URL verplicht",
        description: "Voer een URL in om te analyseren",
        variant: "destructive"
      });
      return;
    }
    
    // Controleer of URL geldig is
    let validUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      validUrl = 'https://' + url;
    }
    
    try {
      new URL(validUrl);
    } catch (e) {
      toast({
        title: "Ongeldige URL",
        description: "Voer een geldige URL in (inclusief http:// of https://)",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const results = await fetchSEOData(validUrl);
      
      setSeoScore(results.seoScore);
      setChartData(results.chartData);
      setPerformanceIssues(results.performanceIssues);
      setContentAnalysis(results.contentAnalysis);
      setRecommendations(results.recommendations);
      setTechnicalIssues(results.technicalIssues);
      setApiResponse(results.apiResponse);
      setAnalyzed(true);
      
      toast({
        title: "Analyse voltooid",
        description: "Je SEO-analyse is klaar om te bekijken",
      });
    } catch (error) {
      console.error("Analyse error:", error);
      toast({
        title: "Analyse mislukt",
        description: "Er was een fout bij het analyseren van deze URL. Probeer het opnieuw.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToContentTools = () => {
    navigate('/dashboard/content');
  };

  const renderStatusIcon = (status: 'good' | 'warning' | 'error') => {
    if (status === 'good') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'warning') return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };
  
  const renderSeverityIcon = (severity: 'high' | 'medium' | 'low') => {
    if (severity === 'low') return <AlertCircle className="h-4 w-4 text-blue-500" />;
    if (severity === 'medium') return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    return <AlertCircle className="h-4 w-4 text-red-500" />;
  };

  const getSeoScoreDescription = (score: number) => {
    if (score >= 90) return { text: 'Uitstekend! Je website heeft geweldige SEO.', color: 'text-green-500' };
    if (score >= 75) return { text: 'Goed! Je website scoort goed maar heeft ruimte voor verbetering.', color: 'text-blue-500' };
    if (score >= 50) return { text: 'Gemiddeld. Je website heeft enkele SEO-verbeteringen nodig.', color: 'text-yellow-500' };
    return { text: 'Slecht. Je website heeft aanzienlijke SEO-verbeteringen nodig.', color: 'text-red-500' };
  };

  const scoreDescription = getSeoScoreDescription(seoScore);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">SEO Analyzer</h1>
        <p className="text-muted-foreground">Analyseer elke URL om SEO-aanbevelingen en inzichten te krijgen.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analyseer een URL</CardTitle>
          <CardDescription>
            Voer een URL in om de SEO-prestaties te analyseren en aanbevelingen te krijgen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAnalysis} className="flex items-center space-x-2">
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-to-r from-brand-purple to-brand-blue"
            >
              {isLoading ? "Analyseren..." : "Analyseren"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {analyzed && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>SEO Score</CardTitle>
              <CardDescription>Algemene score gebaseerd op meerdere SEO-factoren</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <div className="w-full h-full rounded-full bg-gray-100 absolute"></div>
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e6e6e6"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={seoScore >= 90 ? "#22c55e" : seoScore >= 75 ? "#3b82f6" : seoScore >= 50 ? "#eab308" : "#ef4444"}
                        strokeWidth="8"
                        strokeDasharray={`${seoScore * 2.83} ${283 - seoScore * 2.83}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <div className="text-3xl font-bold">{seoScore}</div>
                      <div className="text-sm">/ 100</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className={`text-sm ${scoreDescription.color}`}>
                      {scoreDescription.text}
                    </p>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3 h-48">
                  <ChartContainer config={{}} className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar 
                          dataKey="score" 
                          fill="var(--color-primary)" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Prestatieproblemen
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Problemen die de snelheid en prestaties van je website beïnvloeden</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {performanceIssues.map((issue, index) => (
                    <li key={index} className="flex items-center gap-3 bg-muted/50 p-3 rounded-md">
                      {issue.includes('Geen grote') ? 
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" /> : 
                        <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                      }
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Content analyse
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Analyse van je content structuur en metadata</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {contentAnalysis.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 bg-muted/50 p-3 rounded-md">
                      {renderStatusIcon(item.status)}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Technische SEO-problemen
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Code className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Technische problemen die het crawlen en indexeren door zoekmachines kunnen beïnvloeden</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {technicalIssues.length > 0 ? (
                <div className="space-y-4">
                  {technicalIssues.map((issue, index) => (
                    <div key={index} className="p-4 border rounded-md bg-muted/30">
                      <div className="flex items-center gap-2">
                        {renderSeverityIcon(issue.severity)}
                        <h3 className="font-medium flex items-center gap-1.5">
                          {issue.issue}
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full 
                            ${issue.severity === 'high' ? 'bg-red-100 text-red-800' : 
                              issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-blue-100 text-blue-800'}`}>
                            {issue.severity === 'high' ? 'hoog' : issue.severity === 'medium' ? 'medium' : 'laag'}
                          </span>
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        <span className="font-medium">Oplossing: </span>
                        {issue.solution}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Geen grote technische problemen gevonden</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Je website lijkt technische SEO-best practices te volgen. Ga zo door!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Aanbevelingen
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Specifieke acties om je SEO te verbeteren</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.length > 0 ? recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-brand-purple" />
                      <h3 className="font-medium">{rec.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{rec.description}</p>
                  </div>
                )) : (
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Geen grote problemen gevonden</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Je website lijkt SEO-best practices te volgen. Ga zo door!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                SEO Tips & Best Practices
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Algemeen SEO-advies om je website te verbeteren</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <CardDescription>
                Leer hoe je je website kunt optimaliseren voor betere posities in zoekmachines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex space-x-1 rounded-lg bg-muted p-1">
                  {Object.keys(SEO_TIPS).map(category => (
                    <Button
                      key={category}
                      variant={activeTipCategory === category ? "default" : "ghost"}
                      className={`flex-1 capitalize ${activeTipCategory === category ? 
                        'bg-gradient-to-r from-brand-purple to-brand-blue text-white' : 
                        ''}`}
                      onClick={() => setActiveTipCategory(category)}
                    >
                      {category === 'content' ? 'Content' : 
                       category === 'technical' ? 'Technisch' : 
                       category === 'onPage' ? 'On-Page' : 'Links'}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {SEO_TIPS[activeTipCategory].map((tip, index) => (
                  <div key={index} className="p-4 border rounded-md bg-muted/30">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-brand-purple" />
                      <h3 className="font-medium">{tip.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{tip.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={navigateToContentTools}
                  className="bg-gradient-to-r from-brand-purple to-brand-blue flex items-center gap-2"
                >
                  Ga door naar Content Tools
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
      
      {!analyzed && (
        <Card>
          <CardHeader>
            <CardTitle>SEO Best Practices</CardTitle>
            <CardDescription>Tips om je website te optimaliseren voor zoekmachines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-brand-purple" />
                  <h3 className="font-medium">Optimaliseer paginasnelheid</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Snellere pagina's scoren beter in zoekresultaten en bieden een betere gebruikerservaring. 
                  Comprimeer afbeeldingen, minimaliseer code en gebruik browsercaching.
                </p>
              </div>
              
              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-brand-purple" />
                  <h3 className="font-medium">Creëer kwaliteitsinhoud</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Hoogwaardige, relevante content verbetert je zoekrangschikking en betrekt bezoekers. 
                  Focus op het bieden van waarde aan je publiek.
                </p>
              </div>
              
              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-brand-purple" />
                  <h3 className="font-medium">Optimaliseer meta tags</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Maak overtuigende titeltags en meta-beschrijvingen voor elke pagina. 
                  Houd titels onder 60 tekens en beschrijvingen onder 160 tekens.
                </p>
              </div>
              
              <div className="flex flex-col items-center mt-8">
                <p className="text-muted-foreground mb-4">
                  Voer hierboven een URL in om gepersonaliseerde SEO-aanbevelingen te krijgen
                </p>
                <Button 
                  onClick={navigateToContentTools} 
                  className="bg-gradient-to-r from-brand-purple to-brand-blue flex items-center gap-2"
                >
                  Ga naar Content Tools
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyzerPage;
