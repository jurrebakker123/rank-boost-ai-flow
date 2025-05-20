
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

interface ContentPersonalizationCardProps {
  children?: React.ReactNode;
}

const ContentPersonalizationCard: React.FC<ContentPersonalizationCardProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Personalisatie</CardTitle>
        <CardDescription>
          Pas aan hoe content wordt geleverd aan jouw klanten
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Verwijder "Powered by" vermeldingen</h3>
              <p className="text-sm text-gray-500">
                Verwijder alle verwijzingen naar ons platform in rapporten en content
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Gebruik aangepaste email templates</h3>
              <p className="text-sm text-gray-500">
                Stuur emails naar klanten vanuit je eigen email templates
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Aangepaste rapportages</h3>
              <p className="text-sm text-gray-500">
                Gebruik je eigen branding in alle rapportages die klanten ontvangen
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">White label client login</h3>
              <p className="text-sm text-gray-500">
                Laat klanten inloggen via een gepersonaliseerd dashboard
              </p>
            </div>
            <Switch defaultChecked={false} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentPersonalizationCard;
