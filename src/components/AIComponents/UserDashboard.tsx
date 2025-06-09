
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';

const AISchemaGenerator = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          AI Schema Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Generate structured data markup automatically
        </p>
      </CardContent>
    </Card>
  );
};

export default AISchemaGenerator;
