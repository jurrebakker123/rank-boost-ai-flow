
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoAccessAlertProps {
  children?: React.ReactNode;
}

const NoAccessAlert: React.FC<NoAccessAlertProps> = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-4">White Label</h1>
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertTitle>
          Je hebt geen toegang tot white label functionaliteit
        </AlertTitle>
        <AlertDescription>
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
  );
};

export default NoAccessAlert;
