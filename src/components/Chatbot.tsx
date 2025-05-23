
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/sonner';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    text: "👋 Hallo! Ik ben jouw persoonlijke SEO Helper AI assistent. Ik kan je helpen met alles rondom SEO - van keyword research tot content optimalisatie. Waar kan ik je mee helpen?",
    isUser: false,
    timestamp: new Date()
  }
];

// Enhanced bot responses with more specific SEO advice
const botResponses = [
  "🎯 Voor jouw website zou ik aanraden om te focussen op long-tail keywords zoals 'SEO optimalisatie voor kleine bedrijven'. Deze hebben vaak minder concurrentie maar wel hoge conversie.",
  "📊 Uit mijn analyse blijkt dat je meta-descriptions gemiddeld te kort zijn. Probeer ze tussen de 150-160 karakters te houden voor optimale klikratio's in Google.",
  "⚡ Pagina snelheid is cruciaal! Ik zie dat je website 3.2 seconden laadt. Met afbeelding optimalisatie kunnen we dit naar onder de 2 seconden brengen - dat kan je rankings met 15-20% verbeteren.",
  "🔗 Interne linkbuilding is een ondergewaardeerde SEO tactiek. Door strategisch linken tussen je blogposts kun je je 'page authority' significant verhogen.",
  "📱 Google gebruikt mobile-first indexing. Jouw mobiele score is 84/100 - goed, maar met enkele CSS aanpassingen kunnen we naar 95+ gaan.",
  "🎨 Alt-teksten voor afbeeldingen zijn niet alleen goed voor toegankelijkheid, maar ook voor SEO. 73% van je afbeeldingen mist nog beschrijvende alt-teksten.",
  "📈 Content clusters werken fantastisch voor SEO. Maak een hoofdpagina over 'SEO strategie' en link daar alle gerelateerde blogposts aan - dit verhoogt je topical authority.",
  "🎪 Schema markup kan je CTR in Google met 30% verhogen. Voor lokale bedrijven is LocalBusiness schema een absolute must-have.",
  "⭐ Featured snippets zijn goud waard! Door je content te structureren met H2 vragen en directe antwoorden kun je position zero claimen.",
  "🚀 Core Web Vitals zijn sinds 2021 een ranking factor. LCP, FID en CLS scores optimaliseren kan direct impact hebben op je posities.",
];

// Smart keyword detection for more relevant responses
const seoKeywords = {
  "ranking": 0,
  "google": 1, 
  "snelheid": 2,
  "links": 3,
  "mobiel": 4,
  "afbeelding": 5,
  "content": 6,
  "schema": 7,
  "snippet": 8,
  "vitals": 9
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDesktop = !useIsMobile();
  const [open, setOpen] = useState(false);

  const suggestions = [
    "Hoe kan ik mijn rankings verbeteren?",
    "Tips voor betere pagina snelheid",
    "Wat zijn de beste SEO tools?",
    "Hoe schrijf ik SEO content?"
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

    // Enhanced response selection logic
    setTimeout(() => {
      const lowerCaseInput = messageText.toLowerCase();
      let responseIndex = Math.floor(Math.random() * botResponses.length);
      
      // Check for keyword matches for more relevant responses
      for (const [keyword, index] of Object.entries(seoKeywords)) {
        if (lowerCaseInput.includes(keyword)) {
          responseIndex = index;
          break;
        }
      }
      
      const botMessage: Message = {
        text: botResponses[responseIndex],
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
    }, 1500 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
              <p className="text-xs text-white/80">Altijd online • Instant antwoord</p>
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
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-3 flex items-center space-x-1">
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
          <div className="space-y-2">
            <p className="text-sm text-gray-500 text-center">💡 Populaire vragen:</p>
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors border border-gray-200 hover:border-brand-purple"
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
            placeholder="Stel een SEO vraag..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="bg-brand-purple hover:bg-brand-purple/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by SEOHelper.ai • Vragen? <a href="mailto:info@seohelperai.com" className="text-brand-purple">info@seohelperai.com</a>
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
              className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-brand-purple to-brand-blue hover:scale-110 transition-all duration-300 animate-bounce" 
              size="icon"
              onClick={() => {
                setOpen(true);
                setIsOpen(true);
              }}
            >
              <div className="relative">
                <MessageSquare className="h-7 w-7" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] h-[700px] p-0" onInteractOutside={(e) => e.preventDefault()}>
            <ChatInterface />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button 
              className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-brand-purple to-brand-blue hover:scale-110 transition-all duration-300 animate-bounce" 
              size="icon"
              onClick={() => {
                setOpen(true);
                setIsOpen(true);
              }}
            >
              <div className="relative">
                <MessageSquare className="h-7 w-7" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
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
