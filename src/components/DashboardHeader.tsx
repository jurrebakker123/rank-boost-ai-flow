
import React from 'react';
import {
  Bell,
  User,
  Menu,
  LogOut,
  CreditCard,
  Settings,
  BadgeCheck,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  user?: any;
  subscription?: any;
  onSignOut?: () => void;
}

const DashboardHeader = ({ user, subscription, onSignOut }: DashboardHeaderProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="border-b border-border py-3 px-4 md:px-6 bg-background flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {subscription?.subscribed && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex gap-1 items-center">
            <BadgeCheck className="h-3 w-3" />
            <span className="hidden md:inline">
              {subscription.subscription_tier} Plan
            </span>
          </Badge>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">Welcome to SEOHelper.ai!</span>
                <span className="text-xs text-muted-foreground">Check out your dashboard to get started</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span className="font-medium">New SEO report available</span>
                <span className="text-xs text-muted-foreground">Your monthly SEO report is ready</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              <span>{user?.email || 'Profile'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings">
                <Settings className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            {subscription?.subscribed ? (
              <DropdownMenuItem 
                onSelect={async (e) => {
                  e.preventDefault();
                  try {
                    const supabase = (window as any).supabase;
                    if (!supabase) return;
                    
                    const { data, error } = await supabase.functions.invoke('customer-portal', {
                      body: {
                        returnUrl: `${window.location.origin}/dashboard`,
                      }
                    });
                    
                    if (error) throw error;
                    if (data?.url) {
                      window.location.href = data.url;
                    }
                  } catch (error) {
                    console.error("Error opening customer portal:", error);
                  }
                }}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                <span>Manage Subscription</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem asChild>
                <Link to="/pricing">
                  <CreditCard className="w-4 h-4 mr-2" />
                  <span>Upgrade Plan</span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={onSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
