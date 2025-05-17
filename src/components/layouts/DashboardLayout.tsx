
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { toast } from '@/hooks/use-toast';
import Chatbot from '@/components/Chatbot';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with proper error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a placeholder client when credentials are missing
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  
  // Check if Supabase is configured
  useEffect(() => {
    if (!supabase) {
      toast({
        title: "Configuration Error",
        description: "Supabase credentials are missing. Please connect to Supabase via the integration.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
  }, [navigate]);
  
  // Check if user is authenticated
  useEffect(() => {
    if (!supabase) return;
    
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        setIsLoading(false);
        return;
      }
      
      setIsAuthenticated(true);
      setUser(session.user);
      
      // Check subscription status
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        
        if (error) {
          console.error("Error checking subscription:", error);
        } else if (data) {
          setSubscription(data);
          
          // Show a toast on successful checkout
          const params = new URLSearchParams(window.location.search);
          if (params.get('checkout_success') === 'true') {
            toast({
              title: "Checkout successful!",
              description: "Your subscription has been activated.",
            });
            
            // Remove query parameter
            navigate('/dashboard', { replace: true });
          }
        }
      } catch (error) {
        console.error("Error invoking check-subscription:", error);
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
    
    // Subscribe to auth changes
    if (supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true);
          setUser(session.user);
          
          // Check subscription status after login
          try {
            const { data } = await supabase.functions.invoke('check-subscription');
            if (data) {
              setSubscription(data);
            }
          } catch (error) {
            console.error("Error checking subscription:", error);
          }
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setUser(null);
          setSubscription(null);
          navigate('/login');
        }
      });
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, [navigate]);

  // If Supabase is not configured, show a message
  if (!supabase) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-700 mb-3">Configuration Error</h2>
          <p className="text-gray-700 mb-4">
            Supabase connection information is missing. To use this application, you need to connect it to Supabase.
          </p>
          <p className="text-sm text-gray-600">
            Please ensure you've connected to Supabase via the integration and set the required environment variables.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Navigation is already handled in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader 
              user={user} 
              subscription={subscription}
              onSignOut={async () => {
                if (supabase) {
                  await supabase.auth.signOut();
                }
                navigate('/');
              }}
            />
            <main className="flex-1 p-4 md:p-6 overflow-auto">
              <Outlet />
            </main>
          </div>
          <Chatbot />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
