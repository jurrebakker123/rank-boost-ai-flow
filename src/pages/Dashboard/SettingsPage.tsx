
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  const userFromStorage = JSON.parse(localStorage.getItem('user') || '{}');
  
  const [name, setName] = useState(userFromStorage.name || '');
  const [email, setEmail] = useState(userFromStorage.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [notifications, setNotifications] = useState({
    email: true,
    rankings: true,
    reports: true,
    tips: false
  });
  
  const [apiKey, setApiKey] = useState('');
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      // Update the user in localStorage
      const updatedUser = {
        ...userFromStorage,
        name,
        email
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setIsLoading(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated",
      });
    }, 1000);
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are the same",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setPassword('');
      setConfirmPassword('');
      
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed",
      });
    }, 1000);
  };
  
  const handleUpdateNotifications = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved",
    });
  };
  
  const generateApiKey = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Generate a mock API key
      const mockApiKey = 'seo-' + Math.random().toString(36).substring(2, 15) + 
                         Math.random().toString(36).substring(2, 15);
      
      setApiKey(mockApiKey);
      setApiKeyVisible(true);
      setIsLoading(false);
      
      toast({
        title: "API key generated",
        description: "Your new API key has been created",
      });
    }, 1500);
  };
  
  const deleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setIsLoading(true);
      
      setTimeout(() => {
        // Clear all localStorage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        
        setIsLoading(false);
        
        toast({
          title: "Account deleted",
          description: "Your account has been permanently deleted",
        });
        
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <form onSubmit={handleUpdateProfile}>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-brand-purple to-brand-blue"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={deleteAccount}
                  disabled={isLoading}
                >
                  Delete Account
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="password" className="mt-6">
          <Card>
            <form onSubmit={handleChangePassword}>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  disabled={isLoading || !password || password !== confirmPassword}
                  className="bg-gradient-to-r from-brand-purple to-brand-blue"
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications about your account
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={() => handleUpdateNotifications('email')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ranking-notifications">Ranking Changes</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when your keyword rankings change significantly
                  </p>
                </div>
                <Switch
                  id="ranking-notifications"
                  checked={notifications.rankings}
                  onCheckedChange={() => handleUpdateNotifications('rankings')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="report-notifications">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly performance report emails
                  </p>
                </div>
                <Switch
                  id="report-notifications"
                  checked={notifications.reports}
                  onCheckedChange={() => handleUpdateNotifications('reports')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="tips-notifications">SEO Tips & Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Get the latest SEO tips, trends and tool updates
                  </p>
                </div>
                <Switch
                  id="tips-notifications"
                  checked={notifications.tips}
                  onCheckedChange={() => handleUpdateNotifications('tips')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage your API keys and integration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {apiKey ? (
                <div className="space-y-2">
                  <Label htmlFor="api-key">Your API Key</Label>
                  <div className="flex">
                    <Input
                      id="api-key"
                      type={apiKeyVisible ? "text" : "password"}
                      value={apiKey}
                      readOnly
                      className="font-mono"
                    />
                    <Button
                      variant="outline"
                      className="ml-2"
                      onClick={() => setApiKeyVisible(!apiKeyVisible)}
                    >
                      {apiKeyVisible ? "Hide" : "Show"}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Keep this key secret! Don't share it with others.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>
                    Generate an API key to integrate SEOHelper.ai with your applications and services.
                  </p>
                  <Button
                    onClick={generateApiKey}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-brand-purple to-brand-blue"
                  >
                    {isLoading ? "Generating..." : "Generate API Key"}
                  </Button>
                </div>
              )}
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-2">API Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to use our API to integrate with your applications.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-brand-purple hover:underline"
                >
                  View API Documentation
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
