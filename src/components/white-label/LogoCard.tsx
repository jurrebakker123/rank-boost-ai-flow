
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface LogoCardProps {
  logo: string;
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LogoCard = ({ logo, handleLogoUpload }: LogoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Logo</CardTitle>
        <CardDescription>
          Upload je bedrijfslogo om te gebruiken in white label rapportages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {logo && (
          <div className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50 flex justify-center">
            <img 
              src={logo} 
              alt="Bedrijfslogo" 
              className="max-h-12"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="logo">Logo uploaden</Label>
          <Input
            id="logo"
            type="file"
            accept="image/png, image/jpeg, image/svg+xml"
            onChange={handleLogoUpload}
          />
          <p className="text-xs text-gray-500">
            Aanbevolen formaat: PNG of SVG, 200x50 pixels
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogoCard;
