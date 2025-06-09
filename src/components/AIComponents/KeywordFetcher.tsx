
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const AIMetaGenerator = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          AI Meta Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Generate meta titles and descriptions automatically
        </p>
      </CardContent>
    </Card>
  );
};

export default AIMetaGenerator;
