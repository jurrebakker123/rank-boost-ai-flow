
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/sonner';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Smart chatbot response system for website (limited responses)
const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Goedemorgen! ☀️";
  if (hour < 18) return "Goedemiddag! 🌤️";
  return "Goedenavond! 🌙";
};

const getInitialMessage = (): Message => ({
  text: `${getTimeBasedGreeting()} Ik ben jouw SEO Helper AI assistent. Ik kan je algemene SEO-vragen beantwoorden en je helpen bij het starten met SEO. Voor uitgebreide hulp en geavanceerde tools, meld je aan voor een van onze pakketten!`,
  isUser: false,
  timestamp: new Date()
});

// Limited website response system
const generateWebsiteResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Greeting responses
  if (message.includes('hallo') || message.includes('hi') || message.includes('hey')) {
    return `${getTimeBasedGreeting()} Leuk je te spreken! Ik kan je helpen met basis SEO-vragen. Voor uitgebreide SEO-analyse en tools heb je een abonnement nodig. Wat wil je weten over SEO?`;
  }
  
  // Pricing questions
  if (message.includes('prijs') || message.includes('kosten') || message.includes('tarief') || message.includes('abonnement')) {
    return "💰 Onze SEO Helper AI prijzen:\n\n• Starter: €49/maand - Perfect voor kleine bedrijven\n• Professional: €99/maand - Voor groeiende ondernemingen\n• Enterprise: €199/maand - Voor grote organisaties\n\nAlle pakketten bevatten AI-geschreven content, uitgebreide SEO-rapportages en 24/7 support. Meld je aan om toegang te krijgen tot alle tools!";
  }
  
  // Basic SEO information
  if (message.includes('seo') || message.includes('zoekmachine')) {
    return "🚀 SEO staat voor Search Engine Optimization en helpt je website beter vindbaar te maken in Google. Basis tips:\n\n• Gebruik relevante zoekwoorden\n• Schrijf kwalitatieve content\n• Zorg voor snelle laadtijden\n• Bouw autoriteit op\n\nVoor diepgaande SEO-analyse, keyword research en content optimalisatie heb je een SEOHelper.ai abonnement nodig. Wil je meer weten over onze tools?";
  }
  
  // Redirect to signup for detailed help
  if (message.includes('keyword') || message.includes('content') || message.includes('analyse') || message.includes('tool') || message.includes('ranking')) {
    return "🎯 Dat is een geweldige vraag! Voor uitgebreide hulp met keyword research, content optimalisatie, en SEO-analyses heb je toegang nodig tot onze professionele tools.\n\nMet een SEOHelper.ai abonnement krijg je:\n• AI-powered keyword research\n• Content optimalisatie tools\n• Ranking monitoring\n• Uitgebreide SEO-rapportages\n\nMeld je aan om direct toegang te krijgen tot alle functies!";
  }
  
  // Thank you responses
  if (message.includes('bedankt') || message.includes('dank je') || message.includes('thanks')) {
    return "😊 Graag gedaan! Voor meer uitgebreide SEO-hulp, overweeg een van onze abonnementen. Heb je nog andere algemene vragen?";
  }
  
  // Default response encouraging signup
  return "Interessante vraag! Voor gedetailleerde SEO-hulp en toegang tot onze geavanceerde tools, heb je een SEOHelper.ai abonnement nodig. Met onze tools kan ik je veel beter helpen met specifieke SEO-uitdagingen.\n\nWil je meer weten over onze pakketten en wat je er allemaal mee kunt? 🚀";
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDesktop = !useIsMobile();
  const [open, setOpen] = useState(false);

  const suggestions = [
    "Wat is SEO?",
    "Hoe kan ik mijn website verbeteren?",
    "Wat kosten jullie tools?",
    "Welke pakketten hebben jullie?",
    "Hoe meld ik me aan?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText = inputValue) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setShowSuggestions(false);

    // Simulate realistic typing delay
    const typingDelay = Math.min(messageText.length * 50 + 1000, 3000);
    
    setTimeout(() => {
      const response = generateWebsiteResponse(messageText);
      
      const botMessage: Message = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      if (!isOpen) {
        toast("💬 Nieuwe bericht van SEO Helper", {
          description: "Er is een nieuw antwoord beschikbaar in de chat.",
          action: {
            label: "Bekijk",
            onClick: () => setOpen(true)
          }
        });
      }
    }, typingDelay);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const ChatInterface = () => (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-brand-purple to-brand-blue p-4 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative">
              <Bot className="h-6 w-6 mr-2" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-medium">SEO Helper AI</h3>
              <p className="text-xs text-white/80">🟢 Online • Instant antwoord</p>
            </div>
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            message={msg.text} 
            isUser={msg.isUser} 
            timestamp={msg.timestamp} 
          />
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-gray-100 rounded-lg px-4 py-3 flex items-center space-x-1 shadow-sm">
              <Bot className="h-4 w-4 text-brand-purple mr-2" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-sm text-gray-500 ml-2">AI denkt na...</span>
            </div>
          </div>
        )}

        {showSuggestions && messages.length === 1 && (
          <div className="space-y-2 animate-fade-in">
            <p className="text-sm text-gray-500 text-center">💡 Populaire vragen:</p>
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left p-3 bg-gray-50 hover:bg-brand-purple/5 rounded-lg text-sm transition-all border border-gray-200 hover:border-brand-purple hover:shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Stel een vraag over SEO..."
            className="flex-1 border-gray-300 focus:border-brand-purple"
            disabled={isTyping}
          />
          <Button 
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="bg-brand-purple hover:bg-brand-purple/90 transition-colors"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by SEOHelper.ai • Vragen? <a href="mailto:info@seohelperai.com" className="text-brand-purple hover:underline">info@seohelperai.com</a>
        </p>
      </div>
    </div>
  );

  return (
    <>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-brand-purple to-brand-blue hover:scale-110 transition-all duration-300 animate-bounce z-50" 
              size="icon"
              onClick={() => {
                setOpen(true);
                setIsOpen(true);
              }}
            >
              <div className="relative">
                <MessageSquare className="h-7 w-7" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] h-[700px] p-0" onInteractOutside={(e) => e.preventDefault()}>
            <DialogTitle className="sr-only">SEO Helper AI Chat</DialogTitle>
            <DialogDescription className="sr-only">Chat met onze AI assistent voor SEO hulp en vragen</DialogDescription>
            <ChatInterface />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button 
              className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-brand-purple to-brand-blue hover:scale-110 transition-all duration-300 animate-bounce z-50" 
              size="icon"
              onClick={() => {
                setOpen(true);
                setIsOpen(true);
              }}
            >
              <div className="relative">
                <MessageSquare className="h-7 w-7" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh]">
            <ChatInterface />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default Chatbot;
