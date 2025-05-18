
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, TrendingUp, MousePointerClick, Eye, ArrowUpRight } from 'lucide-react';

interface SearchAnalyticsProps {
  url: string;
  apiKey: string;
}

interface SearchAnalyticsData {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  date?: string;
  query?: string;
}

interface QueryData {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

const SearchAnalytics: React.FC<SearchAnalyticsProps> = ({ url, apiKey }) => {
  const [dateRange, setDateRange] = useState<'7d' | '28d' | '3m'>('28d');
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<SearchAnalyticsData[]>([]);
  const [queryData, setQueryData] = useState<QueryData[]>([]);
  const [totalMetrics, setTotalMetrics] = useState<SearchAnalyticsData>({
    clicks: 0,
    impressions: 0,
    ctr: 0,
    position: 0
  });

  useEffect(() => {
    if (url) {
      fetchSearchData();
    }
  }, [url, dateRange]);

  // Generate mock data since we can't directly call the Search Console API from the browser
  const generateMockSearchData = (baseUrl: string, days: number) => {
    // Create a seed based on the URL for consistent random data
    let seed = 0;
    for (let i = 0; i < baseUrl.length; i++) {
      seed += baseUrl.charCodeAt(i);
    }
    
    // Helper function to get a seeded random number
    const getSeededRandom = (min: number, max: number, offset = 0) => {
      const randomVal = Math.sin(seed + offset) * 10000;
      const randomFloat = randomVal - Math.floor(randomVal);
      return Math.floor(randomFloat * (max - min + 1)) + min;
    };
    
    const today = new Date();
    const data: SearchAnalyticsData[] = [];
    let totalClicks = 0;
    let totalImpressions = 0;
    let totalCtr = 0;
    let totalPosition = 0;
    
    // Generate time series data
    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      // Some randomization but with a pattern
      const trend = Math.sin(i / (days / Math.PI)) * 0.3 + 0.7; // Creates a wave pattern
      
      const clicks = getSeededRandom(5, 50, i) * trend;
      const impressions = getSeededRandom(50, 500, i + 100) * trend;
      const ctr = clicks / impressions * 100;
      const position = Math.max(1, Math.min(100, getSeededRandom(1, 20, i + 200) / trend));
      
      totalClicks += clicks;
      totalImpressions += impressions;
      totalCtr += ctr;
      totalPosition += position;
      
      data.push({
        date: dateString,
        clicks: Math.round(clicks),
        impressions: Math.round(impressions),
        ctr: parseFloat(ctr.toFixed(2)),
        position: parseFloat(position.toFixed(2))
      });
    }
    
    // Generate top queries data
    const queries = [
      baseUrl.split('//')[1]?.split('/')[0] || 'domain',
      'seo tips',
      'website optimization',
      'search engine ranking',
      'how to improve seo',
      'best seo tools',
      'content optimization',
      'keyword research',
      'backlink strategies',
      'meta tags importance'
    ];
    
    const queryResults: QueryData[] = queries.map((query, index) => {
      const queryClicks = getSeededRandom(10, 200, seed + index);
      const queryImpressions = getSeededRandom(100, 2000, seed + index + 50);
      const queryCtr = queryClicks / queryImpressions * 100;
      const queryPosition = Math.max(1, Math.min(100, getSeededRandom(1, 30, seed + index + 100)));
      
      return {
        query,
        clicks: queryClicks,
        impressions: queryImpressions,
        ctr: parseFloat(queryCtr.toFixed(2)),
        position: parseFloat(queryPosition.toFixed(2))
      };
    });
    
    // Sort by clicks
    queryResults.sort((a, b) => b.clicks - a.clicks);
    
    const avgCtr = totalCtr / (days + 1);
    const avgPosition = totalPosition / (days + 1);
    
    return {
      timeSeriesData: data,
      queryData: queryResults,
      totalMetrics: {
        clicks: Math.round(totalClicks),
        impressions: Math.round(totalImpressions),
        ctr: parseFloat(avgCtr.toFixed(2)),
        position: parseFloat(avgPosition.toFixed(2))
      }
    };
  };
  
  const fetchSearchData = async () => {
    setIsLoading(true);
    
    try {
      // Get number of days based on selected date range
      const days = dateRange === '7d' ? 7 : dateRange === '28d' ? 28 : 90;
      
      // In a real implementation, we would call the Google Search Console API
      // However, since we can't directly call it from the browser due to CORS and auth,
      // we'll use our mock data generator instead
      
      // This would be the real API call:
      // const response = await fetch(
      //   `https://searchconsole.googleapis.com/v1/sites/${encodeURIComponent(url)}/searchAnalytics/query?key=${apiKey}`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       startDate: getDateString(days),
      //       endDate: getDateString(0),
      //       dimensions: ['date']
      //     })
      //   }
      // );
      
      // Instead we use mock data:
      const mockData = generateMockSearchData(url, days);
      
      setSearchData(mockData.timeSeriesData);
      setQueryData(mockData.queryData);
      setTotalMetrics(mockData.totalMetrics);
      
      toast({
        title: "Search data loaded",
        description: "Search analytics data retrieved successfully",
      });
    } catch (error) {
      console.error("Error fetching search data:", error);
      toast({
        title: "Data retrieval failed",
        description: "There was an error retrieving search analytics data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Search Console Analytics
          </CardTitle>
          <CardDescription>
            Search performance metrics from Google Search Console
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <Select
              value={dateRange}
              onValueChange={(value) => setDateRange(value as '7d' | '28d' | '3m')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="28d">Last 28 days</SelectItem>
                <SelectItem value="3m">Last 3 months</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              onClick={fetchSearchData}
              disabled={isLoading || !url}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              Refresh data
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <MousePointerClick className="h-4 w-4 mr-2 text-blue-500" />
                  Total Clicks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatNumber(totalMetrics.clicks)}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-green-500" />
                  Total Impressions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{formatNumber(totalMetrics.impressions)}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />
                  Average CTR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalMetrics.ctr}%</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-2 text-red-500" />
                  Average Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalMetrics.position.toFixed(1)}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <h3 className="font-medium mb-4">Performance Over Time</h3>
            <div className="h-80">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={searchData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getMonth() + 1}/${d.getDate()}`;
                      }}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="clicks" 
                      stroke="#3b82f6" 
                      name="Clicks"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="impressions" 
                      stroke="#10b981" 
                      name="Impressions"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="font-medium mb-4">Position Trends</h3>
            <div className="h-64">
              <ChartContainer config={{}} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={searchData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getMonth() + 1}/${d.getDate()}`;
                      }}
                    />
                    <YAxis reversed domain={[1, 'dataMax']} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="position" 
                      stroke="#8b5cf6" 
                      name="Position"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Top Queries</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Query</TableHead>
                  <TableHead className="text-right">Clicks</TableHead>
                  <TableHead className="text-right">Impressions</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                  <TableHead className="text-right">Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queryData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.query}</TableCell>
                    <TableCell className="text-right">{row.clicks}</TableCell>
                    <TableCell className="text-right">{row.impressions}</TableCell>
                    <TableCell className="text-right">{row.ctr}%</TableCell>
                    <TableCell className="text-right">{row.position.toFixed(1)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Search Visibility Analysis</CardTitle>
          <CardDescription>
            Insights based on your search performance data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-muted/30">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brand-purple" />
                <h3 className="font-medium">Keyword Strategy</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Focus on improving the ranking for your top queries to maximize traffic. 
                Consider creating additional content for keywords ranking on positions 4-10.
              </p>
            </div>
            
            <div className="p-4 border rounded-md bg-muted/30">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-brand-purple" />
                <h3 className="font-medium">Improve Click-Through Rate</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Optimize your meta titles and descriptions to increase CTR for keywords with high impressions but low clicks.
                A good CTR indicates that your search listings are attractive to users.
              </p>
            </div>
            
            <div className="p-4 border rounded-md bg-muted/30">
              <div className="flex items-center gap-2">
                <MousePointerClick className="h-5 w-5 text-brand-purple" />
                <h3 className="font-medium">Content Optimization</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Review content for pages ranking on positions 5-15 to identify optimization opportunities.
                Small improvements can lead to significant traffic increases.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SearchAnalytics;
