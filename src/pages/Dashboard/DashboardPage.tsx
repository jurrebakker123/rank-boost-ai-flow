
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Search, Clipboard, Users, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Line, Bar } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [keywordData, setKeywordData] = useState([]);
  const [trafficData, setTrafficData] = useState([]);
  const navigate = useNavigate();

  // Simulate data loading when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      // Simulate network request with a delay
      setTimeout(() => {
        // Mock data for the dashboard stats
        const dashboardStats = [
          { title: 'Totale Keywords', value: '847', icon: Search, change: '+12%', positive: true },
          { title: 'Totale Pagina\'s', value: '34', icon: Clipboard, change: '+3', positive: true },
          { title: 'Gemiddelde Positie', value: '14.3', icon: ArrowUp, change: '-2.1', positive: true },
          { title: 'Keywords in Top 10', value: '32', icon: Globe, change: '-5%', positive: false },
        ];
        
        // Mock data for keyword performance chart
        const keywordChartData = [
          { name: 'Jan', value: 30 },
          { name: 'Feb', value: 25 },
          { name: 'Mar', value: 32 },
          { name: 'Apr', value: 28 },
          { name: 'May', value: 35 },
          { name: 'Jun', value: 42 },
          { name: 'Jul', value: 38 }
        ];
        
        // Mock data for traffic overview chart
        const trafficChartData = [
          { name: 'Jan', traffic: 3000 },
          { name: 'Feb', traffic: 3500 },
          { name: 'Mar', traffic: 3200 },
          { name: 'Apr', traffic: 4000 },
          { name: 'May', traffic: 4200 },
          { name: 'Jun', traffic: 4800 },
          { name: 'Jul', traffic: 5100 }
        ];
        
        setStats(dashboardStats);
        setKeywordData(keywordChartData);
        setTrafficData(trafficChartData);
        setLoading(false);
      }, 1500); // 1.5 second delay to simulate loading
    };

    fetchDashboardData();
  }, []);

  const navigateToKeywords = () => {
    navigate('/dashboard/keywords');
  };

  const navigateToAnalyzer = () => {
    navigate('/dashboard/analyzer');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overzicht</h1>
          <p className="text-muted-foreground">Welkom bij je SEO werkruimte. We laden je gegevens...</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-16 bg-gray-100 rounded-t-lg"></CardHeader>
              <CardContent className="py-6">
                <div className="h-6 bg-gray-100 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1 animate-pulse">
            <CardHeader className="h-12 bg-gray-100 rounded-t-lg"></CardHeader>
            <CardContent>
              <div className="h-[200px] bg-gray-100 rounded-md"></div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 animate-pulse">
            <CardHeader className="h-12 bg-gray-100 rounded-t-lg"></CardHeader>
            <CardContent>
              <div className="h-[200px] bg-gray-100 rounded-md"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overzicht</h1>
        <p className="text-muted-foreground">Welkom bij je SEO werkruimte. Hier is je huidige voortgang.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.positive ? 'text-green-500' : 'text-red-500'}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} sinds vorige maand
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Keyword Prestaties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ChartContainer 
                className="h-[200px]" 
                config={{
                  keywords: { label: "Keywords", color: "#8b5cf6" }
                }}
              >
                {/* Wrap the chart components in a React Fragment */}
                <>
                  <Line 
                    data={keywordData}
                    dataKey="value"
                    name="keywords"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2, r: 4 }}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                </>
              </ChartContainer>
            </div>
            <div className="mt-4 text-right">
              <Button 
                onClick={navigateToKeywords} 
                variant="outline"
                className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90"
              >
                Ga naar Keyword Onderzoek
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Verkeer Overzicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ChartContainer 
                className="h-[200px]" 
                config={{
                  traffic: { label: "Traffic", color: "#22c55e" }
                }}
              >
                {/* Wrap the chart components in a React Fragment */}
                <>
                  <Bar 
                    data={trafficData}
                    dataKey="traffic"
                    name="traffic"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                </>
              </ChartContainer>
            </div>
            <div className="mt-4 text-right">
              <Button 
                onClick={navigateToAnalyzer} 
                variant="outline"
                className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90"
              >
                Ga naar SEO Analyzer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recente SEO Verbeteringen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <p className="font-medium">Meta Beschrijving Update</p>
                <p className="text-sm text-muted-foreground">Bijgewerkte meta beschrijvingen voor 5 pagina's</p>
              </div>
              <span className="text-xs text-muted-foreground">2 dagen geleden</span>
            </div>
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <p className="font-medium">Content Optimalisatie</p>
                <p className="text-sm text-muted-foreground">Meer keywords toegevoegd aan homepagina content</p>
              </div>
              <span className="text-xs text-muted-foreground">5 dagen geleden</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Backlink Groei</p>
                <p className="text-sm text-muted-foreground">3 nieuwe backlinks verkregen van gezaghebbende sites</p>
              </div>
              <span className="text-xs text-muted-foreground">1 week geleden</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
