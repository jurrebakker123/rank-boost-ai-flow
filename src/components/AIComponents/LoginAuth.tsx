
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const AISEOAnalyzer = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          AI SEO Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Analyze your website's SEO performance with AI
        </p>
      </CardContent>
    </Card>
  );
};

export default AISEOAnalyzer;
