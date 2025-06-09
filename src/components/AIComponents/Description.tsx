
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

const AIContentOptimizer = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          AI Content Optimizer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Optimize your content for better search rankings
        </p>
      </CardContent>
    </Card>
  );
};

export default AIContentOptimizer;
