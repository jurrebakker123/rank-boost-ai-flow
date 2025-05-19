
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

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: "Welcome back to SEOHelper.ai",
        variant: "success"
      });
      
      // Check if there's a return URL in the query parameters
      const params = new URLSearchParams(location.search);
      const returnUrl = params.get('returnUrl');
      
      if (returnUrl) {
        navigate(returnUrl);
      } else {
        navigate('/dashboard');
      }
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Demo auto-registration feature
      if (loginEmail === 'demo@seohelper.ai' && loginPassword === 'demo123') {
        try {
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
              title: "Demo account created",
              description: "You've been automatically logged in with a demo account",
              variant: "success"
            });
            navigate('/dashboard');
            return;
          }
        } catch (signUpError) {
          console.error('Auto-registration error:', signUpError);
        }
      }
      
      toast({
        title: "Login failed",
        description: error.message || "There was a problem with your login",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData: any) => {
    if (userData.password !== userData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
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
      
      toast({
        title: "Registration successful",
        description: "Welcome to SEOHelper.ai",
        variant: "success"
      });
      
      // Check if there's a return URL in the query parameters
      const params = new URLSearchParams(location.search);
      const returnUrl = params.get('returnUrl');
      
      if (returnUrl) {
        navigate(returnUrl);
      } else {
        navigate('/dashboard');
      }
      
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: error.message || "There was a problem creating your account",
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
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
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
                    <Label htmlFor="login-password">Password</Label>
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
