
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorsCardProps {
  primaryColor: string;
  secondaryColor: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorsCard = ({
  primaryColor,
  secondaryColor,
  handleInputChange
}: ColorsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kleuren</CardTitle>
        <CardDescription>
          Pas de kleuren aan zodat ze bij je huisstijl passen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="primaryColor">Primaire kleur</Label>
          <div 
            className="w-8 h-8 rounded-full border border-gray-200" 
            style={{ backgroundColor: primaryColor }}
          />
          <Input
            id="primaryColor"
            name="primaryColor"
            type="color"
            value={primaryColor}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="secondaryColor">Secundaire kleur</Label>
          <div 
            className="w-8 h-8 rounded-full border border-gray-200" 
            style={{ backgroundColor: secondaryColor }}
          />
          <Input
            id="secondaryColor"
            name="secondaryColor"
            type="color"
            value={secondaryColor}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorsCard;
