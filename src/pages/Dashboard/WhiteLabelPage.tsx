
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Palette, Shield, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Import refactored components
import NoAccessAlert from '@/components/white-label/NoAccessAlert';
import BrandingTabContent from '@/components/white-label/BrandingTabContent';
import ContentPersonalizationCard from '@/components/white-label/ContentPersonalizationCard';
import PreviewCard from '@/components/white-label/PreviewCard';
import DisabledAlert from '@/components/white-label/DisabledAlert';

const WhiteLabelPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [whiteLabelSettings, setWhiteLabelSettings] = useState({
    enabled: true,
    companyName: '',
    primaryColor: '#8B5CF6',
    secondaryColor: '#0EA5E9',
    logo: '',
    emailFooter: '',
    customDomain: '',
  });
  const { toast } = useToast();
  
  // Check if user has access to white label features
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        
        if (error) throw error;
        
        // Check if user has the Power plan which includes white label
        if (data && data.subscribed && data.subscription_tier === 'Power') {
          setHasAccess(true);
          
          // Mock fetching white label settings
          // In a real implementation, you would fetch these from a database
          setWhiteLabelSettings({
            enabled: true,
            companyName: 'Jouw Bedrijfsnaam',
            primaryColor: '#8B5CF6',
            secondaryColor: '#0EA5E9',
            logo: '',
            emailFooter: 'Powered by Jouw Bedrijf | www.jouwbedrijf.nl',
            customDomain: '',
          });
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    };
    
    checkSubscription();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWhiteLabelSettings({
      ...whiteLabelSettings,
      [name]: value,
    });
  };

  const handleToggleChange = (checked: boolean) => {
    setWhiteLabelSettings({
      ...whiteLabelSettings,
      enabled: checked,
    });
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Mock API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Instellingen opgeslagen",
        description: "Je white label instellingen zijn succesvol bijgewerkt.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        variant: "destructive",
        title: "Er is iets misgegaan",
        description: "We konden je instellingen niet opslaan. Probeer het later opnieuw.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    try {
      setIsLoading(true);
      
      // Mock file upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would upload to Supabase storage
      // and get back a URL
      const mockLogoUrl = "https://placekitten.com/200/50";
      
      setWhiteLabelSettings({
        ...whiteLabelSettings,
        logo: mockLogoUrl,
      });
      
      toast({
        title: "Logo geüpload",
        description: "Je logo is succesvol geüpload en wordt nu gebruikt in white label content.",
      });
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        variant: "destructive",
        title: "Upload mislukt",
        description: "We konden je logo niet uploaden. Controleer het bestandsformaat en probeer het opnieuw.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasAccess) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-10">
          <NoAccessAlert />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">White Label Instellingen</h1>
            <p className="text-gray-500 text-sm mt-1">
              Personaliseer hoe je content eruit ziet voor je klanten
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="white-label-toggle">White Label actief</Label>
            <Switch
              id="white-label-toggle"
              checked={whiteLabelSettings.enabled}
              onCheckedChange={handleToggleChange}
            />
          </div>
        </div>
        
        {whiteLabelSettings.enabled ? (
          <Tabs defaultValue="branding" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="branding">
                <Palette className="w-4 h-4 mr-2" />
                Branding
              </TabsTrigger>
              <TabsTrigger value="customization">
                <Shield className="w-4 h-4 mr-2" />
                Personalisatie
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Image className="w-4 h-4 mr-2" />
                Voorbeeld
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="branding">
              <BrandingTabContent 
                whiteLabelSettings={whiteLabelSettings}
                handleInputChange={handleInputChange}
                handleLogoUpload={handleLogoUpload}
              />
            </TabsContent>
            
            <TabsContent value="customization">
              <ContentPersonalizationCard />
            </TabsContent>
            
            <TabsContent value="preview">
              <PreviewCard whiteLabelSettings={whiteLabelSettings} />
            </TabsContent>
          </Tabs>
        ) : (
          <DisabledAlert />
        )}
        
        <div className="flex justify-end mt-8">
          <Button 
            onClick={handleSaveSettings} 
            disabled={isLoading}
            className="bg-gradient-to-r from-brand-purple to-brand-blue text-white"
          >
            {isLoading ? (
              <>
                <span className="mr-2">Opslaan...</span>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </>
            ) : (
              'Instellingen opslaan'
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WhiteLabelPage;
