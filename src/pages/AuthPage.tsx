
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import RegistrationForm from '@/components/RegistrationForm';
import { createClient } from '@supabase/supabase-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Initialize Supabase client with proper error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a placeholder client or null if credentials are missing
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) return;
      
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
    
    if (!supabase) {
      toast({
        title: "Configuration Error",
        description: "Supabase connection is not configured. Please connect to Supabase via the integration.",
        variant: "destructive",
      });
      return;
    }
    
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
    if (!supabase) {
      toast({
        title: "Configuration Error",
        description: "Supabase connection is not configured. Please connect to Supabase via the integration.",
        variant: "destructive",
      });
      return;
    }
    
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
        {!supabase && (
          <Alert className="mb-6 max-w-4xl border-yellow-300 bg-yellow-50">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertTitle>Supabase connection not configured</AlertTitle>
            <AlertDescription>
              Authentication functionality requires a Supabase connection. Please connect this application to Supabase via the integration.
            </AlertDescription>
          </Alert>
        )}
        
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
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      placeholder="mail@example.com" 
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
                      placeholder="••••••••" 
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-blue"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                  <div className="text-center text-sm">
                    <Link to="/forgot-password" className="text-brand-purple hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Create Account</CardTitle>
                <CardDescription>
                  Fill in your details to create an SEOHelper.ai account
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
