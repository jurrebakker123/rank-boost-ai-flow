
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { toast } from '@/hooks/use-toast';
import Chatbot from '@/components/Chatbot';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      // Voor nu accepteren we alle gebruikers als geauthenticeerd voor een betere demo ervaring
      // In een echte omgeving zou je hier een echte authenticatiecheck doen
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      
      if (!authStatus) {
        // Automatisch authenticeren voor demo doeleinden
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        setIsAuthenticated(true);
        setIsLoading(false);
      }
    };
    
    // Execute immediately instead of using timeout
    checkAuth();
    
    // Add event listener for storage changes
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
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
