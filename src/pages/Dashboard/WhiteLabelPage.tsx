
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import NoAccessAlert from '@/components/white-label/NoAccessAlert';
import DisabledAlert from '@/components/white-label/DisabledAlert';
import BrandingTabContent from '@/components/white-label/BrandingTabContent';
import ContentPersonalizationCard from '@/components/white-label/ContentPersonalizationCard';
import CustomDomainCard from '@/components/white-label/CustomDomainCard';

// Define the type for the WhiteLabel settings
interface WhiteLabelSettings {
  enabled: boolean;
  companyName: string;
  domainName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;
  favicon: string;
  emailFooter: string;
}

const initialSettings: WhiteLabelSettings = {
  enabled: false,
  companyName: '',
  domainName: '',
  primaryColor: '#9b87f5',
  secondaryColor: '#6E59A5',
  accentColor: '#0EA5E9',
  logo: '',
  favicon: '',
  emailFooter: 'Powered by Your Company'
};

const WhiteLabelPage = () => {
  // Mock subscription info - In a real app, this would come from your auth system
  const [subscription, setSubscription] = useState({
    plan: 'basic', // 'basic', 'pro', 'ultimate', 'power'
    hasWhiteLabel: false,
  });
  
  const [whiteLabelSettings, setWhiteLabelSettings] = useState<WhiteLabelSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState('branding');

  const handleEnableWhiteLabel = () => {
    setWhiteLabelSettings({ ...whiteLabelSettings, enabled: true });
    toast({
      title: "White Label ingeschakeld",
      description: "U kunt nu uw branding aanpassen."
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setWhiteLabelSettings({
      ...whiteLabelSettings,
      [name]: value
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would upload this to your server/storage
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setWhiteLabelSettings({
            ...whiteLabelSettings,
            logo: event.target.result.toString()
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to your database
    toast({
      title: "Instellingen opgeslagen",
      description: "Uw white label instellingen zijn succesvol opgeslagen."
    });
  };

  // Display the no access card if user doesn't have the right subscription
  if (!subscription.hasWhiteLabel) {
    return <NoAccessAlert />;
  }

  // Display the disabled alert if white label is not enabled yet
  if (!whiteLabelSettings.enabled) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold mb-4">White Label</h1>
        <DisabledAlert />
        <Button 
          onClick={handleEnableWhiteLabel} 
          className="bg-gradient-to-r from-brand-purple to-brand-blue text-white mt-4"
        >
          Schakel White Label in
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">White Label</h1>
        <Button 
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-brand-purple to-brand-blue text-white mt-2 md:mt-0"
        >
          Instellingen opslaan
        </Button>
      </div>
      
      <Tabs defaultValue="branding" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full md:w-auto mb-6">
          <TabsTrigger value="branding" className="flex-1 md:flex-none">Branding</TabsTrigger>
          <TabsTrigger value="content" className="flex-1 md:flex-none">Content</TabsTrigger>
          <TabsTrigger value="domains" className="flex-1 md:flex-none">Domeinen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="branding">
          <BrandingTabContent 
            whiteLabelSettings={whiteLabelSettings} 
            handleInputChange={handleInputChange}
            handleLogoUpload={handleLogoUpload}
          />
        </TabsContent>
        
        <TabsContent value="content">
          <div className="grid md:grid-cols-2 gap-8">
            <ContentPersonalizationCard />
          </div>
        </TabsContent>
        
        <TabsContent value="domains">
          <div className="grid md:grid-cols-2 gap-8">
            <CustomDomainCard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhiteLabelPage;
