
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const AIRankTracker = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          AI Rank Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Track keyword rankings with AI predictions
        </p>
      </CardContent>
    </Card>
  );
};

export default AIRankTracker;
