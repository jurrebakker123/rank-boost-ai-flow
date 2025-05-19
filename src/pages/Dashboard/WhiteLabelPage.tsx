import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield, Palette, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

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
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold mb-4">White Label</h1>
            <Alert className="mb-4">
              <Shield className="h-4 w-4" />
              <AlertTitle>Je hebt geen toegang tot white label functionaliteit</AlertTitle>
              <AlertDescription className="mt-2">
                Upgrade naar het Power abonnement om white label functionaliteit te gebruiken en 
                content onder je eigen merk aan klanten te leveren.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => window.location.href = '/pricing'} 
              className="bg-gradient-to-r from-brand-purple to-brand-blue text-white mt-4"
            >
              Upgrade naar Power
            </Button>
          </div>
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
              <div className="grid md:grid-cols-2 gap-8">
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
                        value={whiteLabelSettings.companyName}
                        onChange={handleInputChange}
                        placeholder="Jouw Bedrijfsnaam"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emailFooter">Email Footer</Label>
                      <Input
                        id="emailFooter"
                        name="emailFooter"
                        value={whiteLabelSettings.emailFooter}
                        onChange={handleInputChange}
                        placeholder="Powered by Jouw Bedrijf | www.jouwbedrijf.nl"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Logo</CardTitle>
                    <CardDescription>
                      Upload je bedrijfslogo om te gebruiken in white label rapportages
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {whiteLabelSettings.logo && (
                      <div className="mb-4 p-4 border border-gray-200 rounded-md bg-gray-50 flex justify-center">
                        <img 
                          src={whiteLabelSettings.logo} 
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
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-8 h-8 rounded-full border border-gray-200" 
                          style={{ backgroundColor: whiteLabelSettings.primaryColor }}
                        />
                        <Input
                          id="primaryColor"
                          name="primaryColor"
                          type="color"
                          value={whiteLabelSettings.primaryColor}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secundaire kleur</Label>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-8 h-8 rounded-full border border-gray-200" 
                          style={{ backgroundColor: whiteLabelSettings.secondaryColor }}
                        />
                        <Input
                          id="secondaryColor"
                          name="secondaryColor"
                          type="color"
                          value={whiteLabelSettings.secondaryColor}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
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
                        value={whiteLabelSettings.customDomain}
                        onChange={handleInputChange}
                        placeholder="dashboard.jouwbedrijf.nl"
                      />
                      <p className="text-xs text-gray-500">
                        Je moet een CNAME record aanmaken bij je DNS provider.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="customization">
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
            </TabsContent>
            
            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle>Preview van White Label Content</CardTitle>
                  <CardDescription>
                    Zo ziet je gepersonaliseerde content eruit voor klanten
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b flex items-center justify-between">
                      {whiteLabelSettings.logo ? (
                        <img 
                          src={whiteLabelSettings.logo} 
                          alt={whiteLabelSettings.companyName} 
                          className="h-8"
                        />
                      ) : (
                        <h3 className="font-bold text-lg">{whiteLabelSettings.companyName || "Jouw Bedrijf"}</h3>
                      )}
                      
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white">
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2" style={{ color: whiteLabelSettings.primaryColor }}>
                          SEO Rapport voor Client Website
                        </h2>
                        <p className="text-sm text-gray-500">Gegenereerd op {new Date().toLocaleDateString()}</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                          <h4 className="font-medium text-sm text-gray-500">Totaal bezoekers</h4>
                          <p className="text-2xl font-bold">1.245</p>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                          <h4 className="font-medium text-sm text-gray-500">Tijd op pagina</h4>
                          <p className="text-2xl font-bold">2:34</p>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                          <h4 className="font-medium text-sm text-gray-500">Bouncepercentage</h4>
                          <p className="text-2xl font-bold">42%</p>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 mb-6">
                        <h3 className="font-medium mb-2" style={{ color: whiteLabelSettings.secondaryColor }}>
                          Google rankings voor top keywords
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>zakelijke website bouwen</span>
                            <span className="font-bold">#3</span>
                          </div>
                          <div className="flex justify-between">
                            <span>wordpress website kosten</span>
                            <span className="font-bold">#5</span>
                          </div>
                          <div className="flex justify-between">
                            <span>webdesign amsterdam</span>
                            <span className="font-bold">#8</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-400 text-center">
                        {whiteLabelSettings.emailFooter || 
                         `Powered by ${whiteLabelSettings.companyName || "Jouw Bedrijf"} | www.jouwbedrijf.nl`}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Alert className="mb-8">
            <Shield className="h-4 w-4" />
            <AlertTitle>White Label staat momenteel uit</AlertTitle>
            <AlertDescription className="mt-2">
              Schakel White Label in om content onder je eigen merk aan te bieden aan klanten.
            </AlertDescription>
          </Alert>
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
