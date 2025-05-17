
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    text: "Hallo! Ik ben uw SEO Helper assistent. Hoe kan ik u vandaag helpen met uw SEO vragen?",
    isUser: false,
    timestamp: new Date()
  }
];

// Predefined responses for demo purposes
const botResponses = [
  "Ik zou aanraden om uw meta-beschrijvingen te optimaliseren voor betere klikratio's.",
  "Volgens de laatste SEO trends, is het belangrijk om content te maken die specifiek op de zoekintenties van gebruikers is gericht.",
  "Probeer meer interne links toe te voegen om de structuur van uw website te verbeteren.",
  "Pagina snelheid is een belangrijke rankingfactor. Heeft u al gecontroleerd hoe snel uw pagina's laden?",
  "Overweeg het toevoegen van alt-tekst aan al uw afbeeldingen voor betere toegankelijkheid en SEO.",
  "Mobiele optimalisatie is essentieel aangezien Google mobile-first indexing gebruikt."
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isDesktop = !useIsMobile();
  const [open, setOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking and response
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * botResponses.length);
      const botMessage: Message = {
        text: botResponses[randomIndex],
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
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
            <MessageSquare className="h-5 w-5 mr-2" />
            <h3 className="font-medium">SEO Helper Assistant</h3>
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
            <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
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
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-brand-purple hover:bg-brand-purple/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-brand-purple hover:bg-brand-purple/90" 
              size="icon"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px] h-[600px] p-0">
            <ChatInterface />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button 
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-brand-purple hover:bg-brand-purple/90" 
              size="icon"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[80vh]">
            <ChatInterface />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default Chatbot;
