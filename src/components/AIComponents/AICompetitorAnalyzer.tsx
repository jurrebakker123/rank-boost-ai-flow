
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users2 } from 'lucide-react';

const AICompetitorAnalyzer = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users2 className="w-5 h-5" />
          AI Competitor Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Analyze competitor strategies with AI insights
        </p>
      </CardContent>
    </Card>
  );
};

export default AICompetitorAnalyzer;
