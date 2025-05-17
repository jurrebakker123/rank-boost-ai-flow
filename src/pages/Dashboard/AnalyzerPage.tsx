
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

// Google Lighthouse API key
const LIGHTHOUSE_API_KEY = "AIzaSyDLEbqqWb2uxio1yoyARx-PzrvbzbGvCpg";

const AnalyzerPage = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [seoScore, setSeoScore] = useState(0);
  const [performanceIssues, setPerformanceIssues] = useState<string[]>([]);
  const [contentAnalysis, setContentAnalysis] = useState<{text: string, status: 'good' | 'warning' | 'error'}[]>([]);
  const [recommendations, setRecommendations] = useState<{title: string, description: string}[]>([]);
  const [apiResponse, setApiResponse] = useState('');

  const runLighthouseAnalysis = async (targetUrl: string) => {
    try {
      const encodedUrl = encodeURIComponent(targetUrl);
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&key=${LIGHTHOUSE_API_KEY}&category=performance&category=seo&category=best-practices&strategy=mobile`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
      
      if (data.error) {
        throw new Error(data.error.message || 'Error running analysis');
      }
      
      // Extract SEO score
      const seoScore = Math.round(data.lighthouseResult?.categories?.seo?.score * 100) || 0;
      setSeoScore(seoScore);
      
      // Extract performance issues
      const issues = [];
      const audits = data.lighthouseResult?.audits || {};
      
      if (audits['render-blocking-resources']?.score < 1) {
        issues.push('Render-blocking resources detected');
      }
      
      if (audits['unminified-css']?.score < 1) {
        issues.push('CSS files are not minified');
      }
      
      if (audits['unminified-javascript']?.score < 1) {
        issues.push('JavaScript files are not minified');
      }
      
      if (audits['unused-javascript']?.score < 1) {
        issues.push('Unused JavaScript detected');
      }
      
      if (audits['unused-css-rules']?.score < 1) {
        issues.push('Unused CSS rules detected');
      }
      
      if (audits['uses-optimized-images']?.score < 1) {
        issues.push('Images are not optimized');
      }
      
      if (audits['total-byte-weight']?.score < 0.5) {
        issues.push('Page size is too large');
      }
      
      if (issues.length === 0) {
        issues.push('No major performance issues detected');
      }
      
      setPerformanceIssues(issues);
      
      // Extract content analysis
      const contentItems = [];
      
      if (audits['document-title']?.score === 1) {
        contentItems.push({ text: 'Page has a proper title', status: 'good' });
      } else {
        contentItems.push({ text: 'Page title needs improvement', status: 'warning' });
      }
      
      if (audits['meta-description']?.score === 1) {
        contentItems.push({ text: 'Good meta description', status: 'good' });
      } else {
        contentItems.push({ text: 'Meta description could be improved', status: 'warning' });
      }
      
      if (audits['link-text']?.score === 1) {
        contentItems.push({ text: 'Proper link text used', status: 'good' });
      } else {
        contentItems.push({ text: 'Link text needs improvement', status: 'warning' });
      }
      
      if (audits['hreflang']?.score === 1) {
        contentItems.push({ text: 'Hreflang tags properly implemented', status: 'good' });
      } else if (audits['hreflang']?.score === 0) {
        contentItems.push({ text: 'Missing hreflang tags', status: 'warning' });
      }
      
      if (audits['canonical']?.score === 1) {
        contentItems.push({ text: 'Canonical URL properly implemented', status: 'good' });
      } else if (audits['canonical']?.score === 0) {
        contentItems.push({ text: 'Missing canonical URL', status: 'warning' });
      }
      
      setContentAnalysis(contentItems);
      
      // Generate recommendations
      const recs = [];
      
      if (audits['render-blocking-resources']?.score < 1) {
        recs.push({
          title: 'Eliminate Render-Blocking Resources',
          description: 'Defer or inline critical JS/CSS resources to improve page load times.'
        });
      }
      
      if (audits['uses-optimized-images']?.score < 1) {
        recs.push({
          title: 'Optimize Images',
          description: 'Properly format and compress images to improve load time.'
        });
      }
      
      if (audits['uses-text-compression']?.score < 1) {
        recs.push({
          title: 'Enable Text Compression',
          description: 'Enable GZIP compression on your server to reduce transfer size.'
        });
      }
      
      if (audits['meta-description']?.score < 1) {
        recs.push({
          title: 'Improve Meta Description',
          description: 'Add a descriptive and engaging meta description to improve click-through rates.'
        });
      }
      
      setRecommendations(recs);
      
      return true;
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: 'Analysis Error',
        description: error instanceof Error ? error.message : 'Failed to analyze the URL',
        variant: 'destructive'
      });
      return false;
    }
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
      const success = await runLighthouseAnalysis(url);
      
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
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center">
                <div className="relative w-32 h-32 rounded-full flex items-center justify-center border-8 border-brand-purple">
                  <div className="text-3xl font-bold">{seoScore}</div>
                  <div className="text-sm">/ 100</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {seoScore >= 90 ? 'Excellent! Your website has great SEO.' :
                   seoScore >= 75 ? 'Good! Your website scores well but has room for improvement.' :
                   seoScore >= 50 ? 'Average. Your website needs some SEO improvements.' :
                   'Poor. Your website needs significant SEO improvements.'}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {performanceIssues.map((issue, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {contentAnalysis.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${
                        item.status === 'good' ? 'bg-green-500' : 
                        item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.length > 0 ? recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <h3 className="font-medium">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                )) : (
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium">No major issues found</h3>
                    <p className="text-sm text-muted-foreground">Your website appears to be following SEO best practices. Keep up the good work!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Response (Debug)</CardTitle>
              <CardDescription>Raw data from Google Lighthouse API</CardDescription>
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
    </div>
  );
};

export default AnalyzerPage;
