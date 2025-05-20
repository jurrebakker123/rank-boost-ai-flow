
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, X } from 'lucide-react';

const ExitIntentPopup = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Only set up the listener if we haven't shown the popup yet
    if (!hasShown) {
      const handleMouseLeave = (e: MouseEvent) => {
        // Only trigger when mouse moves to the top of the page (likely going to address bar)
        if (e.clientY <= 5 && !hasShown) {
          setShowDialog(true);
          setHasShown(true);
          
          // Set a cookie or localStorage to prevent showing too often
          localStorage.setItem('exitIntentShown', new Date().toString());
        }
      };

      // Check if we should show the popup (not shown in the last 24 hours)
      const lastShown = localStorage.getItem('exitIntentShown');
      const shouldShow = !lastShown || 
        (new Date().getTime() - new Date(lastShown).getTime() > 24 * 60 * 60 * 1000);
      
      if (shouldShow) {
        document.addEventListener('mouseleave', handleMouseLeave);
      }

      return () => {
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [hasShown]);

  // Also handle the beforeunload event for when users actually try to leave
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // This text won't actually display in most modern browsers for security reasons
      // But the dialog will still appear
      const message = "Kom terug! Wilt u echt deze pagina verlaten?";
      e.returnValue = message; // Standard for most browsers
      return message; // For older browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Kom terug!</DialogTitle>
          <DialogDescription className="text-center text-lg">
            Wilt u echt weggaan? Wij kunnen uw SEO-scores aanzienlijk verbeteren!
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <div className="bg-gradient-to-r from-brand-purple to-brand-blue p-6 rounded-lg text-white text-center">
            <h3 className="text-xl font-bold mb-2">Speciale aanbieding</h3>
            <p>Ontvang 10% korting op uw eerste maand als u nu inschrijft!</p>
            <p className="text-sm mt-2">Gebruik code: <span className="font-bold">COMEBACK10</span></p>
            <p className="text-xs mt-4">Neem contact op via <a href="mailto:info@seohelperai.com" className="underline">info@seohelperai.com</a></p>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={() => setShowDialog(false)}
          >
            <X className="mr-2 h-4 w-4" /> Nu niet
          </Button>
          <Button 
            className="w-full sm:w-auto bg-brand-purple hover:bg-brand-purple/90"
            onClick={() => {
              window.location.href = '/pricing';
              setShowDialog(false);
            }}
          >
            Bekijk de aanbiedingen
          </Button>
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => {
              window.location.href = 'mailto:info@seohelperai.com';
            }}
          >
            <Mail className="mr-2 h-4 w-4" /> Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
