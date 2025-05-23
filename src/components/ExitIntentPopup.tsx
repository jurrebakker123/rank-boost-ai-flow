
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, X, Sparkles, ArrowRight } from 'lucide-react';

const ExitIntentPopup = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (!hasShown) {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 5 && !hasShown) {
          setShowDialog(true);
          setHasShown(true);
          localStorage.setItem('exitIntentShown', new Date().toString());
        }
      };

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

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = "⚠️ Wacht even! Je bent op het punt om geweldige SEO insights mis te lopen!";
      e.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[550px] border-0 shadow-2xl">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-brand-purple to-brand-blue rounded-full flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
            Kom terug! 🚀
          </DialogTitle>
          <DialogDescription className="text-center text-lg text-gray-600 mt-2">
            Je bent op het punt om de beste SEO-tool van Nederland te verlaten! 
            <br />
            <strong>Wil je echt missen hoe wij je rankings naar de top brengen?</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6">
          <div className="bg-gradient-to-r from-brand-purple via-brand-blue to-brand-purple p-6 rounded-xl text-white text-center shadow-lg animate-gradient-x">
            <div className="flex items-center justify-center mb-3">
              <Sparkles className="h-6 w-6 mr-2" />
              <h3 className="text-2xl font-bold">Exclusieve Aanbieding!</h3>
              <Sparkles className="h-6 w-6 ml-2" />
            </div>
            <p className="text-lg mb-2">🎉 <strong>50% KORTING</strong> op je eerste 3 maanden!</p>
            <p className="text-sm mb-4">✨ + GRATIS website audit ter waarde van €297</p>
            <div className="bg-white/20 rounded-lg p-3 mb-4">
              <p className="font-bold text-yellow-300">Gebruik code: <span className="text-2xl">COMEBACK50</span></p>
              <p className="text-xs">⏰ Geldig tot middernacht!</p>
            </div>
            <div className="text-sm space-y-1">
              <p>🏆 Gemiddeld 73% meer organisch verkeer</p>
              <p>📈 Rankings verbetering binnen 30 dagen</p>
              <p>💰 Gemiddeld 4x ROI voor onze klanten</p>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>💬 Vragen? Direct contact via <a href="mailto:info@seohelperai.com" className="text-brand-purple font-medium hover:underline">info@seohelperai.com</a></p>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto order-3 sm:order-1" 
            onClick={() => setShowDialog(false)}
          >
            <X className="mr-2 h-4 w-4" /> Misschien later
          </Button>
          
          <Button 
            className="w-full sm:w-auto bg-gradient-to-r from-brand-purple to-brand-blue hover:shadow-lg transition-all order-1 sm:order-2"
            onClick={() => {
              window.location.href = '/pricing';
              setShowDialog(false);
            }}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Claim 50% korting nu!
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full sm:w-auto border-brand-purple text-brand-purple hover:bg-brand-purple/10 order-2 sm:order-3"
            onClick={() => {
              window.location.href = 'mailto:info@seohelperai.com?subject=Vraag over SEOHelper.ai&body=Hallo, ik heb een vraag over SEOHelper.ai...';
            }}
          >
            <Mail className="mr-2 h-4 w-4" /> Direct contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
