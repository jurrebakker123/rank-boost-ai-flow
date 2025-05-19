
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CustomDomainCardProps {
  customDomain: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomDomainCard = ({
  customDomain,
  handleInputChange
}: CustomDomainCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Domain</CardTitle>
        <CardDescription>
          Gebruik een eigen domein voor je dashboard (Premium feature)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customDomain">Custom Domain</Label>
          <Input
            id="customDomain"
            name="customDomain"
            value={customDomain}
            onChange={handleInputChange}
            placeholder="dashboard.jouwbedrijf.nl"
          />
          <p className="text-xs text-gray-500">
            Je moet een CNAME record aanmaken bij je DNS provider.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomDomainCard;
