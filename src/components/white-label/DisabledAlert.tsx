
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface DisabledAlertProps {
  children?: React.ReactNode;
}

const DisabledAlert: React.FC<DisabledAlertProps> = () => {
  return (
    <Alert>
      <Shield className="h-4 w-4" />
      <AlertTitle>
        White Label staat momenteel uit
      </AlertTitle>
      <AlertDescription>
        Schakel White Label in om content onder je eigen merk aan te bieden aan klanten.
      </AlertDescription>
    </Alert>
  );
};

export default DisabledAlert;
