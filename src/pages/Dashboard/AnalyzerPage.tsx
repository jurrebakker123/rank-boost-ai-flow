
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, CheckCircle, XCircle, AlertCircle, TrendingUp, FileText, Globe, Link as LinkIcon, Code } from 'lucide-react';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

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
  // Generate somewhat random but realistic looking scores based on the URL
  const urlLength = url.length;
  const domain = new URL(url).hostname;
  const hasDash = domain.includes('-');
  const hasWWW = domain.includes('www.');
  const topLevelDomain = domain.split('.').pop()?.toLowerCase() || '';
  const pathLength = new URL(url).pathname.length;
  const hasHttps = url.startsWith('https://');
  
  // Seed with domain characteristics to get consistent but different results per domain
  let seedValue = domain.length;
  for (let i = 0; i < Math.min(domain.length, 5); i++) {
    seedValue += domain.charCodeAt(i);
  }
  
  // Premium domains tend to get slightly better scores
  const isPremiumTLD = ['com', 'org', 'net', 'io', 'ai'].includes(topLevelDomain);
  const tldBonus = isPremiumTLD ? 5 : 0;
  
  // HTTPS sites get better security scores
  const httpsBonus = hasHttps ? 10 : 0;
  
  // Clean domains without dashes tend to be slightly better
  const dashPenalty = hasDash ? -5 : 0;
  
  // Very long domains might indicate keyword stuffing
  const lengthPenalty = domain.length > 20 ? -5 : 0;
  
  // Very long paths might indicate deep site structure or overly specific pages
  const pathPenalty = pathLength > 30 ? -8 : 0;
  
  const randomizer = (base: number, variation: number) => {
    // Create consistent but different randomization per URL
    const randomFactor = ((seedValue % 13) - 6) * variation / 3;
    return Math.max(15, Math.min(98, base + randomFactor));
  };
  
  // Base scores with variations based on URL characteristics
  const seoBaseScore = 70 + tldBonus + dashPenalty + lengthPenalty + pathPenalty; 
  const performanceBaseScore = 65 + (hasWWW ? -5 : 0); // WWW might add a slight redirect penalty
  const accessibilityBaseScore = 75;
  const bestPracticesBaseScore = 68 + httpsBonus;
  
  // Generate scores with some variation
  const seoScore = Math.round(randomizer(seoBaseScore, 2));
  const performanceScore = Math.round(randomizer(performanceBaseScore, 3));
  const accessibilityScore = Math.round(randomizer(accessibilityBaseScore, 1.5));
  const bestPracticesScore = Math.round(randomizer(bestPracticesBaseScore, 2));
  
  // Chart data for different metrics
  const chartData = [
    { name: "SEO", score: seoScore },
    { name: "Performance", score: performanceScore },
    { name: "Accessibility", score: accessibilityScore },
    { name: "Best Practices", score: bestPracticesScore },
  ];
  
  // Generate realistic issues based on scores
  const performanceIssues: string[] = [];
  if (performanceScore < 90) performanceIssues.push('Render-blocking resources detected');
  if (performanceScore < 80) performanceIssues.push('Images are not properly optimized');
  if (performanceScore < 70) performanceIssues.push('JavaScript files are not minified');
  if (performanceScore < 60) performanceIssues.push('CSS files could be optimized');
  if (performanceScore < 50) performanceIssues.push('Server response time is slow');
  if (performanceIssues.length === 0) performanceIssues.push('No major performance issues detected');
  
  // Content analysis - Fix: using typed status values
  const contentAnalysis: Array<{ text: string; status: 'good' | 'warning' | 'error' }> = [];
  
  // Title analysis
  contentAnalysis.push({ 
    text: 'Page has a proper title', 
    status: seedValue % 10 > 3 ? 'good' : 'warning' 
  });
  
  // Meta description
  contentAnalysis.push({ 
    text: 'Meta description quality', 
    status: seedValue % 7 > 2 ? 'good' : 'warning' 
  });
  
  // Link text quality
  contentAnalysis.push({ 
    text: 'Proper link text used', 
    status: seedValue % 8 > 3 ? 'good' : 'warning' 
  });
  
  // Headers structure
  contentAnalysis.push({ 
    text: 'Headers structure (H1, H2, H3)', 
    status: seedValue % 12 > 6 ? 'good' : seedValue % 12 > 3 ? 'warning' : 'error'
  });
  
  // Mobile friendliness
  contentAnalysis.push({ 
    text: 'Mobile-friendly design', 
    status: seedValue % 9 > 4 ? 'good' : 'warning' 
  });
  
  // Image alt text
  contentAnalysis.push({ 
    text: 'Image alt text', 
    status: seedValue % 11 > 5 ? 'good' : seedValue % 11 > 2 ? 'warning' : 'error'
  });
  
  // SSL certificate
  contentAnalysis.push({ 
    text: 'HTTPS Implementation', 
    status: hasHttps ? 'good' : 'error' 
  });
  
  // Canonical URL
  contentAnalysis.push({ 
    text: 'Canonical URL implementation', 
    status: seedValue % 8 > 4 ? 'good' : 'warning' 
  });
  
  // Generate recommendations based on scores and URL analysis
  const recommendations: {title: string, description: string}[] = [];
  
  // SEO recommendations
  if (seoScore < 90) {
    if (!hasHttps) {
      recommendations.push({
        title: 'Implement HTTPS',
        description: 'Secure your site with HTTPS to improve trust and search rankings.'
      });
    }
    
    if (hasDash) {
      recommendations.push({
        title: 'Consider Domain Improvements',
        description: 'Domains with hyphens may be seen as less trustworthy. Consider consolidating to a cleaner domain if possible.'
      });
    }
    
    if (domain.length > 15) {
      recommendations.push({
        title: 'Review Domain Length',
        description: 'Your domain is quite long. Shorter domains are easier to remember and type.'
      });
    }
  }
  
  // Performance recommendations
  if (performanceScore < 85) {
    recommendations.push({
      title: 'Optimize Images',
      description: 'Compress and properly format images to improve load time.'
    });
  }
  
  if (performanceScore < 75) {
    recommendations.push({
      title: 'Minimize JavaScript',
      description: 'Minify and defer non-critical JavaScript to improve page load performance.'
    });
  }
  
  if (performanceScore < 65) {
    recommendations.push({
      title: 'Implement Browser Caching',
      description: 'Set proper cache headers to improve load speed for returning visitors.'
    });
  }
  
  // Accessibility recommendations
  if (accessibilityScore < 85) {
    recommendations.push({
      title: 'Improve Color Contrast',
      description: 'Ensure sufficient color contrast between text and background for better readability.'
    });
  }
  
  if (accessibilityScore < 75) {
    recommendations.push({
      title: 'Add Alt Text to Images',
      description: 'Ensure all images have descriptive alt text for screen readers.'
    });
  }
  
  if (contentAnalysis.find(item => item.text.includes('Headers') && item.status !== 'good')) {
    recommendations.push({
      title: 'Fix Heading Structure',
      description: 'Use proper H1, H2, H3 heading hierarchy to structure your content for better SEO and accessibility.'
    });
  }
  
  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Maintain Current SEO Strategy',
      description: 'Your website appears to be following SEO best practices. Keep up the good work!'
    });
  }
  
  // Technical SEO issues (domain-specific)
  const technicalIssues: {severity: 'high' | 'medium' | 'low', issue: string, solution: string}[] = [];
  
  if (!hasHttps) {
    technicalIssues.push({
      severity: 'high',
      issue: 'No HTTPS implementation',
      solution: 'Implement SSL certificate and redirect all HTTP traffic to HTTPS'
    });
  }
  
  if (hasWWW) {
    technicalIssues.push({
      severity: 'low',
      issue: 'WWW subdomain usage',
      solution: 'Consider implementing a canonical redirect to consolidate domain authority'
    });
  }
  
  if (pathLength > 20) {
    technicalIssues.push({
      severity: 'medium',
      issue: 'Deep URL structure',
      solution: 'Consider flattening URL structure for key pages to improve crawlability'
    });
  }
  
  if (seedValue % 7 === 3) {
    technicalIssues.push({
      severity: 'medium',
      issue: 'Missing robots.txt file',
      solution: 'Create a robots.txt file to guide search engine crawling behavior'
    });
  }
  
  if (seedValue % 9 === 4) {
    technicalIssues.push({
      severity: 'medium',
      issue: 'Missing or incomplete sitemap.xml',
      solution: 'Generate a comprehensive XML sitemap and submit to search engines'
    });
  }
  
  if (seedValue % 12 === 2) {
    technicalIssues.push({
      severity: 'high',
      issue: 'Slow server response time',
      solution: 'Upgrade hosting or implement caching to improve TTFB (Time to First Byte)'
    });
  }
  
  // Mock API response with more comprehensive data
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
          score: contentAnalysis.find(i => i.text.includes('title'))?.status === 'good' ? 1 : 0.5,
          title: "Document has a title element",
          description: "The title gives screen reader users an overview of the page, and search engine users rely on it heavily to determine if a page is relevant to their search."
        },
        'meta-description': { 
          score: contentAnalysis.find(i => i.text.includes('Meta description'))?.status === 'good' ? 1 : 0.5,
          title: "Document has a meta description",
          description: "Meta descriptions may be included in search results to concisely summarize page content."
        },
        'link-text': { 
          score: contentAnalysis.find(i => i.text.includes('link text'))?.status === 'good' ? 1 : 0.5,
          title: "Links have descriptive text",
          description: "Link text that is descriptive helps search engines understand your content."
        },
        'heading-order': {
          score: contentAnalysis.find(i => i.text.includes('Headers'))?.status === 'good' ? 1 : 0.5,
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
          score: contentAnalysis.find(i => i.text.includes('Mobile'))?.status === 'good' ? 1 : 0.5,
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
  const [technicalIssues, setTechnicalIssues] = useState<{severity: 'high' | 'medium' | 'low', issue: string, solution: string}[]>([]);
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
    setTechnicalIssues(results.technicalIssues);
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
  
  const renderSeverityIcon = (severity: 'high' | 'medium' | 'low') => {
    if (severity === 'low') return <AlertCircle className="h-4 w-4 text-blue-500" />;
    if (severity === 'medium') return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    return <AlertCircle className="h-4 w-4 text-red-500" />;
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
                Technical SEO Issues
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Code className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Technical issues that may impact search engine crawling and indexing</p>
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
                            {issue.severity}
                          </span>
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        <span className="font-medium">Solution: </span>
                        {issue.solution}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 border rounded-md">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">No major technical issues found</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your website appears to follow technical SEO best practices. Keep up the good work!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Domain Information</CardTitle>
                <CardDescription>Basic information about the analyzed URL</CardDescription>
              </div>
              <Globe className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/30 rounded-md">
                    <div className="text-sm font-medium text-muted-foreground">Domain</div>
                    <div className="mt-1 font-medium">{new URL(url).hostname}</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-md">
                    <div className="text-sm font-medium text-muted-foreground">Protocol</div>
                    <div className="mt-1 font-medium">{new URL(url).protocol.replace(':', '')}</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-md">
                    <div className="text-sm font-medium text-muted-foreground">Path</div>
                    <div className="mt-1 font-medium">{new URL(url).pathname || '/'}</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-md">
                    <div className="text-sm font-medium text-muted-foreground">TLD</div>
                    <div className="mt-1 font-medium">
                      {new URL(url).hostname.split('.').pop()?.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <a 
                    href={`https://www.whois.com/whois/${new URL(url).hostname}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm flex items-center gap-1 text-brand-purple hover:underline"
                  >
                    <LinkIcon className="h-3 w-3" /> View WHOIS Information
                  </a>
                </div>
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
