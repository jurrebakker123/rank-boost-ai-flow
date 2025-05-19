
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Settings, Plus, FileText, Tag, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button"; // Add this import

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  active_until: string | null;
  features?: {
    whiteLabel?: boolean;
    chatbot?: boolean;
    prioritySupport?: boolean;
  };
}

const DashboardSidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        if (error) {
          console.error('Error fetching subscription:', error);
        } else {
          setSubscription(data);
        }
      } catch (error) {
        console.error('Error invoking check-subscription:', error);
      }
    };

    fetchUser();
    fetchSubscription();
  }, []);

  const getLinkClass = (path: string) => {
    return `flex items-center px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${location.pathname === path ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''}`;
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r dark:border-gray-700 h-full">
      <div className="p-4">
        <Link to="/" className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
          <Home className="w-6 h-6 mr-2" />
          Dashboard
        </Link>
      </div>

      <div className="mt-6">
        <div className="px-4 text-sm text-gray-500 dark:text-gray-400">Menu</div>
        <nav className="mt-2 space-y-1">
          <Link to="/dashboard" className={getLinkClass('/dashboard')}>
            <Home className="w-5 h-5 mr-3" />
            <span>Overzicht</span>
          </Link>
          <Link to="/dashboard/blogs" className={getLinkClass('/dashboard/blogs')}>
            <FileText className="w-5 h-5 mr-3" />
            <span>Blog Posts</span>
          </Link>
        {subscription?.features?.chatbot && (
          <Link to="/dashboard/chatbot" className={getLinkClass('/dashboard/chatbot')}>
            <MessageSquare className="w-5 h-5 mr-3" />
            <span>AI Chatbot</span>
          </Link>
        )}
          <Link to="/dashboard/users" className={getLinkClass('/dashboard/users')}>
            <Users className="w-5 h-5 mr-3" />
            <span>Gebruikers</span>
          </Link>
          {user && subscription?.features?.whiteLabel && (
            <Link to="/dashboard/white-label" className={getLinkClass('/dashboard/white-label')}>
              <Tag className="w-5 h-5 mr-3" />
              <span>White Label</span>
            </Link>
          )}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-full rounded-md border border-input bg-background px-2 text-sm font-medium ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:bg-popover data-[state=open]:text-foreground">
              <Avatar className="mr-2 h-5 w-5">
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>{user ? user.email : 'Account'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>Mijn Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link to="/dashboard/settings" className="w-full h-full block">
                Instellingen
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Uitloggen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardSidebar;
