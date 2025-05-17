
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';

const KeywordResearchPage = () => {
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleResearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keyword) {
      toast({
        title: "Keyword required",
        description: "Please enter a keyword to research",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Mock research - in a real app this would call an API
    setTimeout(() => {
      const mockData = [
        { keyword: `${keyword}`, volume: Math.floor(Math.random() * 10000), difficulty: Math.floor(Math.random() * 100), cpc: (Math.random() * 5).toFixed(2) },
        { keyword: `best ${keyword}`, volume: Math.floor(Math.random() * 8000), difficulty: Math.floor(Math.random() * 100), cpc: (Math.random() * 5).toFixed(2) },
        { keyword: `${keyword} services`, volume: Math.floor(Math.random() * 5000), difficulty: Math.floor(Math.random() * 100), cpc: (Math.random() * 5).toFixed(2) },
        { keyword: `${keyword} guide`, volume: Math.floor(Math.random() * 3000), difficulty: Math.floor(Math.random() * 100), cpc: (Math.random() * 5).toFixed(2) },
        { keyword: `how to ${keyword}`, volume: Math.floor(Math.random() * 6000), difficulty: Math.floor(Math.random() * 100), cpc: (Math.random() * 5).toFixed(2) },
      ];
      
      setResults(mockData);
      setIsLoading(false);
      
      toast({
        title: "Research complete",
        description: `Found ${mockData.length} keyword suggestions`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Keyword Research</h1>
        <p className="text-muted-foreground">Discover new keywords and analyze search volume.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Research Keywords</CardTitle>
          <CardDescription>
            Enter a seed keyword to find related keywords and their metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResearch} className="flex flex-col sm:flex-row items-center gap-2">
            <Input
              placeholder="Enter a keyword (e.g., SEO, marketing)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-to-r from-brand-purple to-brand-blue"
            >
              {isLoading ? "Researching..." : "Research"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Keyword Suggestions</CardTitle>
            <CardDescription>
              Based on your search for "{keyword}"
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  <TableHead className="text-right">Monthly Volume</TableHead>
                  <TableHead className="text-right">Difficulty</TableHead>
                  <TableHead className="text-right">CPC ($)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result.keyword}</TableCell>
                    <TableCell className="text-right">{result.volume.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span>{result.difficulty}</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              result.difficulty < 30 ? "bg-green-500" : 
                              result.difficulty < 70 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${result.difficulty}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${result.cpc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KeywordResearchPage;
