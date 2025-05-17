
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

const RankTrackingPage = () => {
  const [website, setWebsite] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trackedKeywords, setTrackedKeywords] = useState<any[]>([]);

  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!website) {
      toast({
        title: "Website URL required",
        description: "Please enter a website URL to track",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Mock tracking - in a real app this would call an API
    setTimeout(() => {
      // Generate mock data for the last 30 days
      const mockKeywords = [
        {
          keyword: "SEO services",
          currentRank: 8,
          previousRank: 12,
          bestRank: 7,
          history: Array.from({ length: 30 }, (_, i) => ({
            date: `${i + 1}/5`,
            position: Math.floor(Math.random() * 10) + 5
          }))
        },
        {
          keyword: "Digital marketing agency",
          currentRank: 15,
          previousRank: 18,
          bestRank: 14,
          history: Array.from({ length: 30 }, (_, i) => ({
            date: `${i + 1}/5`,
            position: Math.floor(Math.random() * 10) + 14
          }))
        },
        {
          keyword: "SEO tools",
          currentRank: 4,
          previousRank: 7,
          bestRank: 3,
          history: Array.from({ length: 30 }, (_, i) => ({
            date: `${i + 1}/5`,
            position: Math.floor(Math.random() * 5) + 2
          }))
        },
        {
          keyword: "Keyword research",
          currentRank: 22,
          previousRank: 15,
          bestRank: 12,
          history: Array.from({ length: 30 }, (_, i) => ({
            date: `${i + 1}/5`,
            position: Math.floor(Math.random() * 15) + 12
          }))
        }
      ];
      
      setTrackedKeywords(mockKeywords);
      setIsLoading(false);
      
      toast({
        title: "Website added",
        description: `Now tracking rankings for ${website}`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rank Tracking</h1>
        <p className="text-muted-foreground">Monitor your keyword rankings over time.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Website to Track</CardTitle>
          <CardDescription>
            Enter your website URL to start tracking keyword rankings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddWebsite} className="flex flex-col sm:flex-row items-center gap-2">
            <Input
              placeholder="https://example.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-to-r from-brand-purple to-brand-blue"
            >
              {isLoading ? "Adding..." : "Track Website"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {trackedKeywords.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>
                Ranking position trends for top keywords
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trackedKeywords[0].history}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis reversed domain={[1, 'dataMax']} />
                    <Tooltip labelFormatter={(value) => `Date: ${value}`} formatter={(value) => [`Position: ${value}`, 'Rank']} />
                    <Legend />
                    <Line type="monotone" dataKey="position" stroke="#8884d8" name="Rank Position" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tracked Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead className="text-right">Current Rank</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead className="text-right">Best Rank</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trackedKeywords.map((keyword, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{keyword.keyword}</TableCell>
                      <TableCell className="text-right">#{keyword.currentRank}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          {keyword.currentRank < keyword.previousRank ? (
                            <span className="flex items-center text-green-500">
                              <ArrowUp className="h-4 w-4 mr-1" />
                              {keyword.previousRank - keyword.currentRank}
                            </span>
                          ) : keyword.currentRank > keyword.previousRank ? (
                            <span className="flex items-center text-red-500">
                              <ArrowDown className="h-4 w-4 mr-1" />
                              {keyword.currentRank - keyword.previousRank}
                            </span>
                          ) : (
                            <span className="flex items-center text-gray-500">
                              <Minus className="h-4 w-4 mr-1" />
                              0
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">#{keyword.bestRank}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default RankTrackingPage;
