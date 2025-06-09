
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

const AIContentGenerator = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5" />
          AI Content Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          Generate high-quality content using AI technology
        </p>
        <Button className="bg-brand-purple hover:bg-brand-purple/90">
          Generate Content
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIContentGenerator;
