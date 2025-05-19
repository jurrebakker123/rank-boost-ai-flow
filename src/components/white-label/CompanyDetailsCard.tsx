
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CompanyDetailsCardProps {
  companyName: string;
  emailFooter: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CompanyDetailsCard = ({
  companyName,
  emailFooter,
  handleInputChange
}: CompanyDetailsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bedrijfsgegevens</CardTitle>
        <CardDescription>
          Stel je bedrijfsnaam in en hoe deze wordt weergegeven in white label content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Bedrijfsnaam</Label>
          <Input
            id="companyName"
            name="companyName"
            value={companyName}
            onChange={handleInputChange}
            placeholder="Jouw Bedrijfsnaam"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emailFooter">Email Footer</Label>
          <Input
            id="emailFooter"
            name="emailFooter"
            value={emailFooter}
            onChange={handleInputChange}
            placeholder="Powered by Jouw Bedrijf | www.jouwbedrijf.nl"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyDetailsCard;
