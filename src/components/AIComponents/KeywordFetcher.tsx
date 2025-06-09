import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface KeywordInsight {
  keyword: string;
  volume: number;
  difficulty: string;
  trend: string;
}

const KeywordInsightFetcher = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [insights, setInsights] = useState<KeywordInsight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchKeywordInsights = async () => {
    setLoading(true);
    setError(null);

    // Mock data for demonstration
    const mockInsights: KeywordInsight[] = [
      { keyword: `${keyword} tips`, volume: 2500, difficulty: 'low', trend: 'up' },
      { keyword: `${keyword} guide`, volume: 1800, difficulty: 'medium', trend: 'stable' },
      { keyword: `best ${keyword}`, volume: 3200, difficulty: 'high', trend: 'down' },
    ];

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setInsights(mockInsights);
    setLoading(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyVariant = (difficulty: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (difficulty.toLowerCase()) {
      case 'low': return 'secondary';
      case 'medium': return 'outline';
      case 'high': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-brand-purple mb-4">
          Unlock Keyword Insights
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Enter a keyword to discover its search volume, difficulty, and trend.
        </p>

        <div className="flex items-center justify-center max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Enter keyword (e.g., 'SEO')"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="rounded-r-none shadow-sm focus-visible:ring-brand-purple"
          />
          <Button
            onClick={fetchKeywordInsights}
            disabled={loading}
            className="rounded-l-none bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/90 hover:to-brand-blue/90"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2"><Search /></span>
                Searching...
              </>
            ) : (
              <>
                Search <Search className="ml-2" />
              </>
            )}
          </Button>
        </div>

        {error && (
          <div className="mt-4 text-red-500">Error: {error}</div>
        )}
      </div>
      
      {insights.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.map((insight, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-brand-purple">
                    {insight.keyword}
                  </CardTitle>
                  <Badge 
                    variant={getDifficultyVariant(insight.difficulty)}
                    className={getDifficultyColor(insight.difficulty)}
                  >
                    {insight.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Search Volume: {insight.volume}
                  <br />
                  Trend: {insight.trend}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {loading && insights.length === 0 && (
        <div className="text-center mt-8">
          <span className="animate-spin text-4xl text-brand-purple"><Search /></span>
          <p className="text-lg text-muted-foreground mt-2">Fetching keyword insights...</p>
        </div>
      )}

      {!loading && insights.length === 0 && keyword.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-lg text-muted-foreground">No insights found for "{keyword}". Try a different keyword.</p>
        </div>
      )}
    </section>
  );
};

export default KeywordInsightFetcher;
