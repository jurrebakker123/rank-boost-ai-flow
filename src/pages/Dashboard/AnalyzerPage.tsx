
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const AnalyzerPage = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "URL required",
        description: "Please enter a URL to analyze",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Mock analysis - in a real app this would call an API
    setTimeout(() => {
      setIsLoading(false);
      setAnalyzed(true);
      toast({
        title: "Analysis complete",
        description: "Your SEO analysis is ready to view",
      });
    }, 3000);
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
                  <div className="text-3xl font-bold">87</div>
                  <div className="text-sm">/ 100</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Your website scores well but has room for improvement
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
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span>Page load speed is too slow (4.2s)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    <span>Images are not optimized</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                    <span>Mobile responsiveness needs improvement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Good keyword density</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                    <span>Meta description could be improved</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Appropriate heading structure</span>
                  </li>
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
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">Optimize Images</h3>
                  <p className="text-sm text-muted-foreground">Compress and resize images to improve load time by up to 40%</p>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">Enable Browser Caching</h3>
                  <p className="text-sm text-muted-foreground">Set caching headers to reduce load times for returning visitors</p>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium">Improve Meta Description</h3>
                  <p className="text-sm text-muted-foreground">Rewrite your meta description to include primary keywords and improve click-through rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AnalyzerPage;
