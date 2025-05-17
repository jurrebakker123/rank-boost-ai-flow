
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Search, Clipboard, Users, Globe } from 'lucide-react';

const DashboardPage = () => {
  // Mock data for the dashboard
  const stats = [
    { title: 'Total Keywords', value: '847', icon: Search, change: '+12%', positive: true },
    { title: 'Total Pages', value: '34', icon: Clipboard, change: '+3', positive: true },
    { title: 'Average Position', value: '14.3', icon: ArrowUp, change: '-2.1', positive: true },
    { title: 'Keywords in Top 10', value: '32', icon: Globe, change: '-5%', positive: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to your SEO workspace. Here's your current progress.</p>
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
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Keyword Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border border-dashed rounded-md">
              Chart placeholder (Keyword Rankings Over Time)
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border border-dashed rounded-md">
              Chart placeholder (Website Traffic)
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent SEO Improvements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <p className="font-medium">Meta Description Update</p>
                <p className="text-sm text-muted-foreground">Updated meta descriptions for 5 pages</p>
              </div>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
            <div className="p-4 border-b flex justify-between items-center">
              <div>
                <p className="font-medium">Content Optimization</p>
                <p className="text-sm text-muted-foreground">Added more keywords to homepage content</p>
              </div>
              <span className="text-xs text-muted-foreground">5 days ago</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Backlink Growth</p>
                <p className="text-sm text-muted-foreground">Gained 3 new backlinks from high-authority sites</p>
              </div>
              <span className="text-xs text-muted-foreground">1 week ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
