
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileBarChart } from 'lucide-react';

const AIReportGenerator = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileBarChart className="w-5 h-5" />
          AI Report Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Generate comprehensive SEO reports automatically
        </p>
      </CardContent>
    </Card>
  );
};

export default AIReportGenerator;
