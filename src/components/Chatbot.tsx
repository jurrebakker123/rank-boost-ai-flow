
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

// Smart chatbot response system
const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Goedemorgen! ☀️";
  if (hour < 18) return "Goedemiddag! 🌤️";
  return "Goedenavond! 🌙";
};

const getInitialMessage = (): Message => ({
  text: `${getTimeBasedGreeting()} Ik ben jouw persoonlijke SEO Helper AI assistent. Ik kan je helpen met alles rondom SEO - van keyword research tot content optimalisatie. Waar kan ik je mee helpen?`,
  isUser: false,
  timestamp: new Date()
});

// Enhanced AI response system with context awareness
const generateSmartResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Greeting responses
  if (message.includes('hallo') || message.includes('hi') || message.includes('hey')) {
    return `${getTimeBasedGreeting()} Leuk je te spreken! Ik ben hier om je te helpen met al je SEO-vragen. Heb je een specifieke vraag over zoekmachine optimalisatie?`;
  }
  
  // SEO keyword analysis
  if (message.includes('keyword') || message.includes('zoekwoord')) {
    return "🎯 Voor effectieve keyword research raad ik aan:\n\n• Focus op long-tail keywords (3-4 woorden)\n• Gebruik tools zoals Google Keyword Planner\n• Analyseer je concurrentie\n• Zoek naar 'People Also Ask' suggesties\n\nWil je dat ik je help met keyword research voor een specifiek onderwerp?";
  }
  
  // Content optimization
  if (message.includes('content') || message.includes('tekst') || message.includes('blog')) {
    return "📝 Voor SEO-geoptimaliseerde content:\n\n• Schrijf voor je doelgroep, niet voor Google\n• Gebruik je hoofdkeyword in de titel en meta description\n• Structureer met H1, H2, H3 headers\n• Voeg relevante interne en externe links toe\n• Zorg voor unieke, waardevolle content\n\nOver welk onderwerp wil je content schrijven?";
  }
  
  // Technical SEO
  if (message.includes('snelheid') || message.includes('pagina') || message.includes('laden')) {
    return "⚡ Pagina snelheid is cruciaal voor SEO! Tips:\n\n• Optimaliseer afbeeldingen (WebP format)\n• Gebruik browser caching\n• Minimaliseer CSS en JavaScript\n• Kies een snelle hosting provider\n• Gebruik een CDN\n\nJe huidige laadtijd zou onder de 3 seconden moeten zijn. Wil je dat ik je website analyseer?";
  }
  
  // Local SEO
  if (message.includes('lokaal') || message.includes('google my business') || message.includes('maps')) {
    return "📍 Voor lokale SEO:\n\n• Claim je Google My Business profiel\n• Verzamel lokale reviews\n• Gebruik lokale keywords\n• Zorg voor consistente NAP (Naam, Adres, Telefoon)\n• Maak lokale content\n\nIn welke plaats wil je beter gevonden worden?";
  }
  
  // Ranking questions
  if (message.includes('ranking') || message.includes('positie') || message.includes('google')) {
    return "📈 Om je rankings te verbeteren:\n\n• Analyseer je huidige posities\n• Verbeter je on-page SEO\n• Bouw kwaliteitsvolle backlinks\n• Optimaliseer voor mobile-first\n• Monitor je Core Web Vitals\n\nVoor welke zoekwoorden wil je hoger ranken?";
  }
  
  // Competition analysis
  if (message.includes('concurrent') || message.includes('analyse') || message.includes('onderzoek')) {
    return "🔍 Concurrentieanalyse is essentieel:\n\n• Identificeer je top 5 concurrenten\n• Analyseer hun beste content\n• Bekijk hun backlink profiel\n• Onderzoek hun keyword strategie\n• Vind content gaps\n\nWie zijn je belangrijkste concurrenten?";
  }
  
  // Link building
  if (message.includes('link') || message.includes('backlink')) {
    return "🔗 Voor effectieve linkbuilding:\n\n• Creëer waardevolle, linkbare content\n• Gebruik guest posting strategisch\n• Bouw relaties met andere websites\n• Claim unlinked mentions\n• Focus op kwaliteit boven kwantiteit\n\nWil je dat ik je help met een linkbuilding strategie?";
  }
  
  // Pricing/cost questions
  if (message.includes('prijs') || message.includes('kosten') || message.includes('tarief')) {
    return "💰 Onze SEO Helper AI prijzen:\n\n• Starter: €49/maand - Perfect voor kleine bedrijven\n• Professional: €99/maand - Voor groeiende ondernemingen\n• Enterprise: €199/maand - Voor grote organisaties\n\nAlle pakketten bevatten AI-geschreven content, SEO-rapportages en 24/7 support. Welk pakket past het best bij jou?";
  }
  
  // Help with tools
  if (message.includes('tool') || message.includes('software')) {
    return "🛠️ Essentiële SEO tools die ik aanbeveel:\n\n• Google Search Console (gratis)\n• Google Analytics (gratis)\n• Ahrefs of SEMrush (betaald)\n• Screaming Frog (gratis versie)\n• PageSpeed Insights (gratis)\n\nMet SEOHelper.ai krijg je toegang tot onze eigen AI-powered SEO suite. Wil je meer weten over onze tools?";
  }
  
  // General questions about SEO
  if (message.includes('seo') || message.includes('zoekmachine')) {
    return "🚀 SEO (Search Engine Optimization) draait om:\n\n• Je website vindbaar maken in Google\n• Meer organisch verkeer genereren\n• Je online zichtbaarheid vergroten\n• Relevante bezoekers aantrekken\n• Je business laten groeien\n\nWat wil je specifiek weten over SEO? Ik help je graag verder!";
  }
  
  // Thank you responses
  if (message.includes('bedankt') || message.includes('dank je') || message.includes('thanks')) {
    return "😊 Graag gedaan! Ik help je altijd graag met SEO-vragen. Heb je nog andere vragen over zoekmachine optimalisatie? Ik sta 24/7 voor je klaar!";
  }
  
  // Default intelligent response
  const responses = [
    "Dat is een interessante vraag! Kun je me wat meer details geven zodat ik je beter kan helpen? Gaat het over keyword research, content optimalisatie, technische SEO, of iets anders?",
    "Ik begrijp je vraag, maar om je de beste SEO-advies te geven heb ik wat meer context nodig. Kun je uitleggen waar je precies mee worstelt?",
    "Super dat je je SEO wilt verbeteren! Om je gericht te kunnen helpen, vertel me eens: wat is je grootste uitdaging op dit moment?",
    "Goed dat je bezig bent met SEO! Elke situatie is uniek. Kun je me wat meer vertellen over je website en doelen?",
    "Ik help je graag! Om het beste advies te geven: gaat dit over een nieuwe website, bestaande site, lokaal bedrijf, of e-commerce? Hoe meer details, hoe beter ik kan helpen!"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
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
    "Hoe kan ik mijn rankings verbeteren?",
    "Tips voor betere pagina snelheid",
    "Wat zijn de beste SEO tools?",
    "Hoe schrijf ik SEO content?",
    "Lokale SEO tips",
    "Keyword research hulp"
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
      const response = generateSmartResponse(messageText);
      
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
            placeholder="Stel een SEO vraag..."
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
