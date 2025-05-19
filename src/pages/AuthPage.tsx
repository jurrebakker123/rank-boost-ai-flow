
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import RegistrationForm from '@/components/RegistrationForm';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

// Function to clean up auth state to prevent issues
const cleanupAuthState = () => {
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailConfirmMessage, setShowEmailConfirmMessage] = useState(false);
  
  // Login form state with demo credentials pre-filled
  const [loginEmail, setLoginEmail] = useState('demo@seohelper.ai');
  const [loginPassword, setLoginPassword] = useState('demo123');

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Redirect to dashboard or returnUrl if available
        const params = new URLSearchParams(location.search);
        const returnUrl = params.get('returnUrl');
        
        if (returnUrl) {
          navigate(returnUrl);
        } else {
          navigate('/dashboard');
        }
      }
    };
    
    checkAuth();
  }, [navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      // Clean up existing auth state to prevent issues
      cleanupAuthState();

      // Try to sign out any existing session
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      if (error) {
        // Handle email not confirmed error
        if (error.message === 'Email not confirmed') {
          setShowEmailConfirmMessage(true);
          throw new Error('Email is nog niet bevestigd. Controleer je inbox voor een bevestigingslink.');
        }
        throw error;
      }
      
      toast({
        title: "Login succesvol",
        description: "Welkom terug bij SEOHelper.ai",
        variant: "success"
      });
      
      // Check if there's a return URL in the query parameters
      const params = new URLSearchParams(location.search);
      const returnUrl = params.get('returnUrl');
      
      // Force page reload for a clean state
      if (returnUrl) {
        window.location.href = returnUrl;
      } else {
        window.location.href = '/dashboard';
      }
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Demo auto-registration feature
      if (loginEmail === 'demo@seohelper.ai' && loginPassword === 'demo123') {
        try {
          // Clean up existing auth state to prevent issues
          cleanupAuthState();
          
          // Try to register the demo account if login fails
          const { data, error: signUpError } = await supabase.auth.signUp({
            email: loginEmail,
            password: loginPassword,
            options: {
              data: {
                name: 'Demo User',
              }
            }
          });
          
          if (!signUpError) {
            toast({
              title: "Demo account aangemaakt",
              description: "Je bent automatisch ingelogd met een demo account",
              variant: "success"
            });
            
            // Force page reload for a clean state
            window.location.href = '/dashboard';
            return;
          }
        } catch (signUpError) {
          console.error('Auto-registration error:', signUpError);
        }
      }
      
      toast({
        title: "Login mislukt",
        description: error.message === 'Invalid login credentials' 
          ? 'Ongeldige inloggegevens. Controleer je e-mail en wachtwoord.' 
          : (error.message || "Er was een probleem met je login"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData: any) => {
    if (userData.password !== userData.confirmPassword) {
      toast({
        title: "Wachtwoorden komen niet overeen",
        description: "Zorg ervoor dat je wachtwoorden overeenkomen",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Clean up existing auth state to prevent issues
      cleanupAuthState();
      
      // Register user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
          }
        }
      });
      
      if (error) throw error;
      
      setShowEmailConfirmMessage(true);
      
      toast({
        title: "Registratie succesvol",
        description: "Er is een bevestigingslink naar je e-mail gestuurd. Controleer je inbox.",
        variant: "success"
      });
      
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registratie mislukt",
        description: error.message || "Er was een probleem bij het aanmaken van je account",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2 py-12">
        <Tabs defaultValue="login" className="w-full max-w-4xl">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Inloggen</TabsTrigger>
            <TabsTrigger value="register">Registreren</TabsTrigger>
          </TabsList>
          
          {showEmailConfirmMessage && (
            <Alert className="mb-6 border-blue-200 bg-blue-50 text-blue-800">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Bevestig je e-mailadres</AlertTitle>
              <AlertDescription>
                We hebben een bevestigingslink naar je e-mail gestuurd. Klik op de link in de e-mail om je account te activeren.
                Voor deze demo is e-mailverificatie niet nodig - gebruik de demo-gegevens om direct in te loggen.
              </AlertDescription>
            </Alert>
          )}
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Inloggen</CardTitle>
                <CardDescription>
                  Gebruik de demo gegevens of maak een account aan
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      placeholder="demo@seohelper.ai" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Wachtwoord</Label>
                    <Input 
                      id="login-password" 
                      type="password" 
                      placeholder="demo123" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                    <p className="text-sm text-blue-700">
                      <strong>Demo gegevens:</strong><br/>
                      Email: demo@seohelper.ai<br/>
                      Wachtwoord: demo123
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-blue"
                    disabled={isLoading}
                  >
                    {isLoading ? "Inloggen..." : "Inloggen"}
                  </Button>
                  <div className="text-center text-sm">
                    <Link to="/forgot-password" className="text-brand-purple hover:underline">
                      Wachtwoord vergeten?
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Account aanmaken</CardTitle>
                <CardDescription>
                  Vul je gegevens in om een SEOHelper.ai account aan te maken
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegistrationForm onSubmit={handleRegister} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
