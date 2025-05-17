
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ContentToolsPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  
  const [generatingTitle, setGeneratingTitle] = useState(false);
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  
  const handleAnalyzeContent = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content) {
      toast({
        title: "Content required",
        description: "Please enter content to analyze",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Mock analysis - in a real app this would call an API
    setTimeout(() => {
      // Generate mock analysis results
      const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
      const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
      const keywordDensity = focusKeyword ? 
        (content.toLowerCase().split(focusKeyword.toLowerCase()).length - 1) / wordCount * 100 
        : 0;
      
      // Random scores
      const readabilityScore = Math.floor(Math.random() * 30) + 70; // 70-100
      const seoScore = Math.floor(Math.random() * 40) + 60; // 60-100
      
      // Mock suggestions
      const suggestions = [
        "Consider adding more subheadings to break up your content",
        "The first paragraph should contain your focus keyword",
        "Add more transition words to improve readability",
        "Your content could benefit from more internal links"
      ];
      
      setAnalysisResults({
        wordCount,
        readingTime,
        keywordDensity: keywordDensity.toFixed(2),
        readabilityScore,
        seoScore,
        suggestions
      });
      
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: "Your content has been analyzed",
      });
    }, 2000);
  };
  
  const handleGenerateTitles = () => {
    if (!focusKeyword) {
      toast({
        title: "Keyword required",
        description: "Please enter a focus keyword to generate titles",
        variant: "destructive"
      });
      return;
    }
    
    setGeneratingTitle(true);
    
    // Mock title generation - in a real app this would call an API
    setTimeout(() => {
      const mockTitles = [
        `Ultimate Guide to ${focusKeyword}: Everything You Need to Know`,
        `10 Proven ${focusKeyword} Strategies for 2023`,
        `How to Master ${focusKeyword} in Just 30 Days`,
        `The Complete ${focusKeyword} Framework for Beginners`,
        `Why ${focusKeyword} Matters: Key Insights for Success`
      ];
      
      setGeneratedTitles(mockTitles);
      setGeneratingTitle(false);
      
      toast({
        title: "Titles generated",
        description: `Generated ${mockTitles.length} title suggestions`,
      });
    }, 2000);
  };
  
  const useGeneratedTitle = (title: string) => {
    setTitle(title);
    toast({
      title: "Title applied",
      description: "The selected title has been added to your content",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Tools</h1>
        <p className="text-muted-foreground">Optimize your content for search engines and readers.</p>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="editor">Content Editor</TabsTrigger>
          <TabsTrigger value="title-generator">Title Generator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor">
          <Card>
            <form onSubmit={handleAnalyzeContent}>
              <CardHeader>
                <CardTitle>Content Editor & Analyzer</CardTitle>
                <CardDescription>
                  Write or paste your content for SEO analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Enter your content title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Focus Keyword</label>
                  <Input
                    placeholder="Primary keyword for your content"
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    placeholder="Write or paste your content here..."
                    className="min-h-[200px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-brand-purple to-brand-blue"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Content"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {analysisResults && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Content Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-md flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">Word Count</span>
                    <span className="text-2xl font-bold">{analysisResults.wordCount}</span>
                  </div>
                  <div className="p-4 border rounded-md flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">Reading Time</span>
                    <span className="text-2xl font-bold">{analysisResults.readingTime} min</span>
                  </div>
                  <div className="p-4 border rounded-md flex flex-col items-center">
                    <span className="text-sm text-muted-foreground">Keyword Density</span>
                    <span className="text-2xl font-bold">{analysisResults.keywordDensity}%</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Readability Score</span>
                      <span className="text-sm font-medium">{analysisResults.readabilityScore}/100</span>
                    </div>
                    <Progress value={analysisResults.readabilityScore} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">SEO Score</span>
                      <span className="text-sm font-medium">{analysisResults.seoScore}/100</span>
                    </div>
                    <Progress value={analysisResults.seoScore} className="h-2" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Suggestions for Improvement</h3>
                  <ul className="space-y-2">
                    {analysisResults.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 mt-2 rounded-full bg-brand-purple" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="title-generator">
          <Card>
            <CardHeader>
              <CardTitle>SEO Title Generator</CardTitle>
              <CardDescription>
                Generate engaging and SEO-friendly titles for your content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Focus Keyword</label>
                <Input
                  placeholder="Enter your primary keyword"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleGenerateTitles} 
                disabled={generatingTitle}
                className="bg-gradient-to-r from-brand-purple to-brand-blue"
              >
                {generatingTitle ? "Generating..." : "Generate Titles"}
              </Button>
            </CardContent>
            
            {generatedTitles.length > 0 && (
              <CardFooter className="flex flex-col items-start">
                <h3 className="text-lg font-medium mb-4">Generated Title Suggestions</h3>
                <div className="space-y-3 w-full">
                  {generatedTitles.map((title, index) => (
                    <div key={index} className="p-3 border rounded-md flex justify-between items-center">
                      <p className="pr-4">{title}</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => useGeneratedTitle(title)}
                      >
                        Use
                      </Button>
                    </div>
                  ))}
                </div>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentToolsPage;
