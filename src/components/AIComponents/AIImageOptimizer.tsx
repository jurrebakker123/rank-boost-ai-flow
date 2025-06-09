
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from 'lucide-react';

const AIImageOptimizer = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image className="w-5 h-5" />
          AI Image Optimizer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Optimize images for better web performance
        </p>
      </CardContent>
    </Card>
  );
};

export default AIImageOptimizer;
