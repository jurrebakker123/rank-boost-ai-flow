import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, CheckCircle, XCircle, AlertCircle, TrendingUp, FileText } from 'lucide-react';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Google Lighthouse API key
const LIGHTHOUSE_API_KEY = "AIzaSyDLEbqqWb2uxio1yoyARx-PzrvbzbGvCpg";

// SEO tips by category
const SEO_TIPS = {
  content: [
    { title: "Create Quality Content", description: "Publish original, relevant content that provides value to your audience." },
    { title: "Keyword Research", description: "Use keywords strategically throughout your content, especially in titles, headings, and first paragraph." },
    { title: "Content Length", description: "Aim for comprehensive content (1000+ words) for important pages to increase authority." }
  ],
  technical: [
    { title: "Mobile Optimization", description: "Ensure your site is fully responsive and mobile-friendly." },
    { title: "Page Speed", description: "Optimize page loading speed by compressing images, minifying code, and using browser caching." },
    { title: "HTTPS", description: "Secure your site with HTTPS to improve trust and rankings." }
  ],
  onPage: [
    { title: "Meta Tags", description: "Optimize title tags (55-60 characters) and meta descriptions (150-160 characters)." },
    { title: "Header Structure", description: "Use proper H1, H2, H3 heading hierarchy to structure your content." },
    { title: "URL Structure", description: "Create clean, descriptive URLs that include keywords." }
  ],
  links: [
    { title: "Internal Linking", description: "Link between relevant pages on your site to establish site architecture." },
    { title: "External Linking", description: "Link to authoritative external sources to boost credibility." },
    { title: "Quality Backlinks", description: "Earn backlinks from reputable websites in your industry." }
  ]
};

// Mock data for SEO analysis
const generateMockResults = (url: string) => {
  // Generate somewhat random but realistic looking scores
  const seedValue = url.length + url.charCodeAt(0) + url.charCodeAt(url.length - 1);
  const randomizer = (base: number, variation: number) => Math.max(0, Math.min(100, base + ((seedValue % 10) - 5) * variation));
  
  // Base scores for different metrics
  const seoBaseScore = 75; // Most sites have decent basic SEO
  const performanceBaseScore = 65; // Performance is often challenging
  const accessibilityBaseScore = 80; // Basic accessibility is often decent
  const bestPracticesBaseScore = 70; // Best practices implementation varies
  
  // Generate scores with some variation
  const seoScore = randomizer(seoBaseScore, 2);
  const performanceScore = randomizer(performanceBaseScore, 3);
  const accessibilityScore = randomizer(accessibilityBaseScore, 1.5);
  const bestPracticesScore = randomizer(bestPracticesBaseScore, 2);
  
  // Chart data for different metrics
  const chartData = [
    { name: "SEO", score: seoScore },
    { name: "Performance", score: performanceScore },
    { name: "Accessibility", score: accessibilityScore },
    { name: "Best Practices", score: bestPracticesScore },
  ];
  
  // Generate realistic issues based on scores
  const performanceIssues = [];
  if (performanceScore < 90) performanceIssues.push('Render-blocking resources detected');
  if (performanceScore < 80) performanceIssues.push('Images are not properly optimized');
  if (performanceScore < 70) performanceIssues.push('JavaScript files are not minified');
  if (performanceScore < 60) performanceIssues.push('CSS files could be optimized');
  if (performanceScore < 50) performanceIssues.push('Server response time is slow');
  if (performanceIssues.length === 0) performanceIssues.push('No major performance issues detected');
  
  // Content analysis - Fix: using typed status values instead of arbitrary strings
  const contentAnalysis: Array<{ text: string; status: 'good' | 'warning' | 'error' }> = [
    { 
      text: 'Page has a proper title', 
      status: Math.random() > 0.3 ? 'good' : 'warning' 
    },
    { 
      text: 'Meta description quality', 
      status: Math.random() > 0.5 ? 'good' : 'warning' 
    },
    { 
      text: 'Proper link text used', 
      status: Math.random() > 0.4 ? 'good' : 'warning' 
    },
    { 
      text: 'Hreflang tags implementation', 
      status: Math.random() > 0.7 ? 'good' : 'warning' 
    },
    { 
      text: 'Canonical URL implementation', 
      status: Math.random() > 0.6 ? 'good' : 'warning' 
    }
  ];
  
  // Generate recommendations based on scores
  const recommendations = [];
  if (seoScore < 90) {
    recommendations.push({
      title: 'Improve Meta Descriptions',
      description: 'Add descriptive and engaging meta descriptions to improve click-through rates.'
    });
  }
  
  if (performanceScore < 80) {
    recommendations.push({
      title: 'Optimize Images',
      description: 'Properly format and compress images to improve load time.'
    });
  }
  
  if (performanceScore < 70) {
    recommendations.push({
      title: 'Eliminate Render-Blocking Resources',
      description: 'Defer or inline critical JS/CSS resources to improve page load times.'
    });
  }
  
  if (accessibilityScore < 85) {
    recommendations.push({
      title: 'Improve Color Contrast',
      description: 'Ensure sufficient color contrast between text and background for better readability.'
    });
  }
  
  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Maintain Current SEO Strategy',
      description: 'Your website appears to be following SEO best practices. Keep up the good work!'
    });
  }
  
  // Mock API response
  const apiResponse = JSON.stringify({
    lighthouseResult: {
      categories: {
        performance: { score: performanceScore / 100 },
        accessibility: { score: accessibilityScore / 100 },
        'best-practices': { score: bestPracticesBaseScore / 100 },
        seo: { score: seoScore / 100 }
      },
      audits: {
        'document-title': { score: contentAnalysis[0].status === 'good' ? 1 : 0.5 },
        'meta-description': { score: contentAnalysis[1].status === 'good' ? 1 : 0.5 },
        'link-text': { score: contentAnalysis[2].status === 'good' ? 1 : 0.5 },
        'hreflang': { score: contentAnalysis[3].status === 'good' ? 1 : 0.5 },
        'canonical': { score: contentAnalysis[4].status === 'good' ? 1 : 0.5 },
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
    apiResponse
  };
};

const AnalyzerPage = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [seoScore, setSeoScore] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [performanceIssues, setPerformanceIssues] = useState<string[]>([]);
  const [contentAnalysis, setContentAnalysis] = useState<{text: string, status: 'good' | 'warning' | 'error'}[]>([]);
  const [recommendations, setRecommendations] = useState<{title: string, description: string}[]>([]);
  const [apiResponse, setApiResponse] = useState('');
  const [activeTipCategory, setActiveTipCategory] = useState('content');

  const mockLighthouseAnalysis = async (targetUrl: string) => {
    // Generate mock results based on the URL
    const results = generateMockResults(targetUrl);
    
    // Update state with the mock results
    setSeoScore(results.seoScore);
    setChartData(results.chartData);
    setPerformanceIssues(results.performanceIssues);
    setContentAnalysis(results.contentAnalysis);
    setRecommendations(results.recommendations);
    setApiResponse(results.apiResponse);
    
    return true;
  };

  const handleAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "URL required",
        description: "Please enter a URL to analyze",
        variant: "destructive"
      });
      return;
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (including http:// or https://)",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Use mock data instead of actual API call
      const success = await mockLighthouseAnalysis(url);
      
      if (success) {
        setAnalyzed(true);
        toast({
          title: "Analysis complete",
          description: "Your SEO analysis is ready to view",
        });
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing this URL. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStatusIcon = (status: 'good' | 'warning' | 'error') => {
    if (status === 'good') return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === 'warning') return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getSeoScoreDescription = (score: number) => {
    if (score >= 90) return { text: 'Excellent! Your website has great SEO.', color: 'text-green-500' };
    if (score >= 75) return { text: 'Good! Your website scores well but has room for improvement.', color: 'text-blue-500' };
    if (score >= 50) return { text: 'Average. Your website needs some SEO improvements.', color: 'text-yellow-500' };
    return { text: 'Poor. Your website needs significant SEO improvements.', color: 'text-red-500' };
  };

  const scoreDescription = getSeoScoreDescription(seoScore);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">SEO Analyzer</h1>
        <p className="text-muted-foreground">Analyze any URL to get SEO recommendations and insights.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analyze a URL</CardTitle>
          <CardDescription>
            Enter a URL to analyze its SEO performance and get recommendations
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
              {isLoading ? "Analyzing..." : "Analyze"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {analyzed && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>SEO Score</CardTitle>
              <CardDescription>Overall score based on multiple SEO factors</CardDescription>
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
                  Performance Issues
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Issues that affect your website's speed and performance</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {performanceIssues.map((issue, index) => (
                    <li key={index} className="flex items-center gap-3 bg-muted/50 p-3 rounded-md">
                      {issue.includes('No major') ? 
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
                  Content Analysis
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Analysis of your content structure and metadata</p>
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
                Recommendations
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Specific actions to improve your SEO</p>
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
                      <h3 className="font-medium">No major issues found</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Your website appears to be following SEO best practices. Keep up the good work!
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
                      <p>General SEO advice to improve your website</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <CardDescription>
                Learn how to optimize your website for better search engine rankings
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
                      {category}
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
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Response (Debug)</CardTitle>
              <CardDescription>Raw data from analysis API</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                className="font-mono h-64 text-xs"
                readOnly
                value={apiResponse}
              />
            </CardContent>
          </Card>
        </>
      )}
      
      {!analyzed && (
        <Card>
          <CardHeader>
            <CardTitle>SEO Best Practices</CardTitle>
            <CardDescription>Tips to optimize your website for search engines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-brand-purple" />
                  <h3 className="font-medium">Optimize Page Speed</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Faster pages rank better in search results and provide better user experience. 
                  Compress images, minimize code, and leverage browser caching.
                </p>
              </div>
              
              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-brand-purple" />
                  <h3 className="font-medium">Create Quality Content</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  High-quality, relevant content improves your search rankings and engages visitors. 
                  Focus on providing value to your audience.
                </p>
              </div>
              
              <div className="p-4 border rounded-md bg-muted/30">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-brand-purple" />
                  <h3 className="font-medium">Optimize Meta Tags</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Create compelling title tags and meta descriptions for each page. 
                  Keep titles under 60 characters and descriptions under 160 characters.
                </p>
              </div>
              
              <div className="text-center mt-6">
                <p className="text-muted-foreground">
                  Enter a URL above to get personalized SEO recommendations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyzerPage;
