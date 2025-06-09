
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

const AIKeywordSuggester = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          AI Keyword Suggester
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Get AI-powered keyword suggestions for better SEO
        </p>
      </CardContent>
    </Card>
  );
};

export default AIKeywordSuggester;
