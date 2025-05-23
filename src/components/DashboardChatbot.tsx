
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

// Smart chatbot response system for dashboard (full access)
const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Goedemorgen! ☀️";
  if (hour < 18) return "Goedemiddag! 🌤️";
  return "Goedenavond! 🌙";
};

const getInitialMessage = (): Message => ({
  text: `${getTimeBasedGreeting()} Ik ben jouw persoonlijke SEO Helper AI assistent. Ik kan je helpen met alles rondom SEO - van keyword research tot content optimalisatie, technische SEO, en het gebruik van alle dashboard tools. Waar kan ik je mee helpen?`,
  isUser: false,
  timestamp: new Date()
});

// Enhanced AI response system with full access for dashboard users
const generateDashboardResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Greeting responses
  if (message.includes('hallo') || message.includes('hi') || message.includes('hey')) {
    return `${getTimeBasedGreeting()} Welkom terug in je SEOHelper.ai dashboard! Ik kan je helpen met al je SEO-tools en -strategieën. Heb je een specifieke vraag over keyword research, content optimalisatie, ranking monitoring, of een andere SEO-functie?`;
  }
  
  // SEO keyword analysis - FULL ACCESS
  if (message.includes('keyword') || message.includes('zoekwoord')) {
    return "🎯 **Uitgebreide Keyword Research Strategie:**\n\n**Primaire Tools in je dashboard:**\n• Keyword Research Tool - Vind long-tail keywords met hoog potentieel\n• Competitor Keyword Analysis - Zie welke keywords je concurrenten gebruiken\n• Keyword Difficulty Checker - Bepaal welke keywords realistisch zijn\n\n**Geavanceerde tips:**\n• Focus op buyer-intent keywords (commercial investigation)\n• Gebruik semantische keywords voor topical authority\n• Monitor keyword cannibalization in je content\n• Optimaliseer voor voice search queries\n\n**Dashboard acties:**\n1. Ga naar Keywords tab\n2. Voer je hoofdkeyword in\n3. Analyseer search volume en competition\n4. Exporteer keyword lists voor content planning\n\nWil je dat ik je door een specifieke keyword strategie leid?";
  }
  
  // Content optimization - FULL ACCESS
  if (message.includes('content') || message.includes('tekst') || message.includes('blog') || message.includes('schrijven')) {
    return "📝 **Complete Content Optimalisatie Gids:**\n\n**Dashboard Content Tools:**\n• AI Content Generator - Creëer SEO-geoptimaliseerde artikelen\n• Content Analyzer - Scan bestaande content voor verbeteringen\n• Meta Description Generator - Perfecte meta descriptions\n• Title Tag Optimizer - Klikbare, SEO-vriendelijke titels\n\n**Geavanceerde content strategie:**\n• Gebruik de EEAT framework (Experience, Expertise, Authority, Trust)\n• Implementeer topical clusters voor authority building\n• Optimaliseer voor featured snippets met structured data\n• Gebruik LSI keywords voor semantic SEO\n\n**Content workflow in dashboard:**\n1. Keyword research → Content ideas\n2. AI Content Generator → Draft creation\n3. Content Analyzer → Optimization\n4. Rank Tracking → Performance monitoring\n\nWelk type content wil je optimaliseren?";
  }
  
  // Technical SEO - FULL ACCESS
  if (message.includes('snelheid') || message.includes('pagina') || message.includes('laden') || message.includes('technisch')) {
    return "⚡ **Technische SEO Masterclass:**\n\n**Dashboard Technical Tools:**\n• Site Speed Analyzer - Gedetailleerde performance insights\n• Mobile-First Checker - Mobile optimization score\n• Core Web Vitals Monitor - Real-time vitals tracking\n• Schema Markup Generator - Structured data implementation\n\n**Geavanceerde optimalisaties:**\n• **Core Web Vitals optimization:**\n  - LCP < 2.5s (Largest Contentful Paint)\n  - FID < 100ms (First Input Delay)\n  - CLS < 0.1 (Cumulative Layout Shift)\n\n• **Advanced techniques:**\n  - Implement critical CSS inlining\n  - Use preload/prefetch for key resources\n  - Optimize JavaScript with code splitting\n  - Implement service workers for caching\n\n**Dashboard workflow:**\n1. Run Site Speed Analyzer\n2. Identify bottlenecks\n3. Implement fixes\n4. Monitor improvements in real-time\n\nWil je een specifieke technical audit van je site?";
  }
  
  // Ranking and analytics - FULL ACCESS
  if (message.includes('ranking') || message.includes('positie') || message.includes('google') || message.includes('analytics')) {
    return "📈 **Geavanceerde Ranking Strategie:**\n\n**Dashboard Ranking Tools:**\n• Rank Tracker - Daily position monitoring\n• SERP Feature Tracker - Featured snippets, PAA boxes\n• Competitor Ranking Analysis - See competitor movements\n• Local Ranking Tracker - Local pack positions\n\n**Advanced ranking factors:**\n• **Content Quality Signals:**\n  - User engagement metrics (CTR, dwell time)\n  - Content depth and comprehensiveness\n  - Topical authority and expertise\n\n• **Technical Ranking Factors:**\n  - Page experience signals\n  - Mobile-first indexing optimization\n  - Core Web Vitals performance\n  - Structured data implementation\n\n**Ranking acceleration tactics:**\n1. **Quick wins:** Optimize title tags en meta descriptions\n2. **Medium term:** Build topical clusters\n3. **Long term:** Establish domain authority\n\n**Dashboard actie plan:**\n1. Set up keyword tracking\n2. Monitor weekly ranking changes\n3. Correlate ranking drops with technical issues\n4. Optimize based on data insights\n\nVoor welke keywords wil je je rankings verbeteren?";
  }
  
  // Link building - FULL ACCESS
  if (message.includes('link') || message.includes('backlink') || message.includes('linkbuilding')) {
    return "🔗 **Advanced Link Building Masterclass:**\n\n**Dashboard Link Tools:**\n• Backlink Analyzer - Complete link profile audit\n• Link Opportunity Finder - High-quality prospect discovery\n• Anchor Text Optimizer - Natural anchor text distribution\n• Disavow Tool Integration - Clean up toxic links\n\n**High-ROI link building strategies:**\n\n• **Resource Page Link Building:**\n  - Find industry resource pages\n  - Create linkable assets (tools, guides)\n  - Outreach with value-first approach\n\n• **Broken Link Building:**\n  - Find broken links on relevant sites\n  - Create replacement content\n  - Reach out with helpful solution\n\n• **Digital PR & HARO:**\n  - Respond to journalist queries\n  - Create newsworthy content\n  - Build relationships with journalists\n\n**Link quality assessment:**\n• Domain Authority (DA) > 30\n• Relevant niche/industry\n• Natural link placement\n• Diverse link types (dofollow/nofollow)\n\n**Dashboard workflow:**\n1. Audit current backlink profile\n2. Identify link opportunities\n3. Execute outreach campaigns\n4. Monitor new link acquisitions\n\nWelke link building strategie wil je implementeren?";
  }
  
  // Dashboard specific help
  if (message.includes('dashboard') || message.includes('tool') || message.includes('hoe gebruik')) {
    return "🛠️ **Complete Dashboard Gids:**\n\n**Hoofdfuncties:**\n\n📊 **Analytics Dashboard:**\n• Real-time SEO metrics\n• Traffic trends en conversions\n• Keyword performance tracking\n• Competitor comparison charts\n\n🔍 **SEO Tools Suite:**\n• **Site Analyzer:** Complete SEO audit\n• **Keyword Research:** Advanced keyword discovery\n• **Rank Tracking:** Daily position monitoring\n• **Content Tools:** AI-powered content creation\n• **Backlink Tools:** Link building & analysis\n\n⚙️ **Advanced Features:**\n• White-label reporting voor klanten\n• API access voor automatisering\n• Team collaboration tools\n• Custom alerts en notifications\n\n**Getting started workflow:**\n1. **Setup:** Voeg je website toe\n2. **Audit:** Run complete SEO scan\n3. **Keywords:** Set up tracking voor belangrijke terms\n4. **Content:** Plan content calendar\n5. **Monitor:** Daily performance tracking\n\n**Pro tips:**\n• Gebruik de AI Content Generator voor snelle content\n• Set up custom alerts voor ranking changes\n• Export data voor client rapportages\n\nWelke tool wil je als eerste gebruiken?";
  }
  
  // Competition analysis - FULL ACCESS
  if (message.includes('concurrent') || message.includes('analyse') || message.includes('onderzoek') || message.includes('spy')) {
    return "🔍 **Geavanceerde Concurrentie Analyse:**\n\n**Dashboard Competitor Tools:**\n• Competitor Site Analyzer - Complete SEO audit van concurrenten\n• Keyword Gap Analysis - Vind keywords die je concurrenten wel ranken\n• Content Gap Finder - Ontdek content opportunities\n• Backlink Gap Analysis - Zie wie linkt naar concurrenten\n\n**Advanced competitor research:**\n\n**Content Intelligence:**\n• Analyseer top-performing content\n• Identify content formats die werken\n• Find viral content patterns\n• Reverse engineer content strategy\n\n**Technical Competitive Analysis:**\n• Site speed comparison\n• Mobile optimization scores\n• Core Web Vitals benchmark\n• Schema markup usage\n\n**SERP Competitive Intelligence:**\n• Featured snippet opportunities\n• People Also Ask optimization\n• Local pack presence\n• Video/image search presence\n\n**Actionable insights framework:**\n1. **Identify:** Top 5 organic competitors\n2. **Analyze:** Their content & keyword strategy\n3. **Gap Analysis:** Find opportunities they miss\n4. **Execute:** Create better content\n5. **Monitor:** Track competitive movements\n\n**Dashboard workflow:**\n1. Input competitor domains\n2. Run comprehensive analysis\n3. Export opportunity reports\n4. Create action plans\n\nWelke concurrent wil je analyseren?";
  }
  
  // Local SEO - FULL ACCESS
  if (message.includes('lokaal') || message.includes('google my business') || message.includes('maps') || message.includes('local')) {
    return "📍 **Complete Local SEO Strategie:**\n\n**Dashboard Local SEO Tools:**\n• Local Rank Tracker - Monitor local pack positions\n• GMB Optimizer - Google My Business optimization\n• Citation Builder - Consistent NAP across directories\n• Review Manager - Monitor en respond to reviews\n\n**Advanced Local SEO tactics:**\n\n**Google My Business Optimization:**\n• Complete alle business information\n• Upload high-quality photos (products, team, location)\n• Post regular updates en offers\n• Respond to all reviews (positive & negative)\n• Use Google Posts voor events en news\n\n**Local Content Strategy:**\n• Create location-specific landing pages\n• Write about local events en news\n• Feature local partnerships\n• Include local schema markup\n• Optimize for 'near me' searches\n\n**Citation & Directory Strategy:**\n• Ensure consistent NAP (Name, Address, Phone)\n• List in industry-specific directories\n• Build local business partnerships\n• Get listed in local chambers of commerce\n\n**Advanced local ranking factors:**\n• Proximity to searcher\n• Relevance to search query\n• Prominence (reviews, links, citations)\n• Click-through rates from local pack\n• Website authority signals\n\n**Dashboard implementation:**\n1. Set up local keyword tracking\n2. Monitor Google My Business insights\n3. Track citation consistency\n4. Monitor competitor local presence\n\nIn welke stad/regio wil je je local SEO verbeteren?";
  }
  
  // Thank you responses
  if (message.includes('bedankt') || message.includes('dank je') || message.includes('thanks')) {
    return "😊 Heel graag gedaan! Ik ben er altijd om je te helpen met je SEO-strategie. Als je meer vragen hebt over het dashboard, tools, of specifieke SEO-tactieken, laat het me weten. Samen maken we jouw website een SEO-succes! 🚀";
  }
  
  // Default intelligent response with full context
  const responses = [
    "Interessante vraag! Als dashboard gebruiker kan ik je uitgebreide hulp geven. Gaat je vraag over:\n\n🎯 Keyword research & analysis\n📝 Content optimalisatie\n📈 Ranking improvements\n🔗 Link building strategies\n⚡ Technical SEO\n🔍 Competitor analysis\n\nVertel me meer details en ik geef je een complete strategie!",
    "Perfect! Ik kan je helpen met geavanceerde SEO-tactieken. Met toegang tot alle dashboard tools kunnen we:\n\n• Deep-dive keyword analysis\n• Complete content optimization\n• Technical SEO audits\n• Competitor intelligence\n• Link building campaigns\n\nWat is je grootste SEO-uitdaging op dit moment?",
    "Geweldig dat je je SEO wilt verbeteren! Met je dashboard access kunnen we alles optimaliseren:\n\n📊 Data-driven decisions maken\n🎯 Geavanceerde keyword strategies\n📝 AI-powered content creation\n🔍 Diepgaande concurrent analyse\n\nWaar wil je mee beginnen? Ik help je stap-voor-stap!",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const DashboardChatbot = () => {
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
    "Uitgebreide keyword research strategie",
    "Advanced content optimalisatie tips",
    "Technical SEO audit uitvoeren",
    "Competitor analysis dashboard",
    "Link building masterclass"
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
    const typingDelay = Math.min(messageText.length * 30 + 1500, 4000);
    
    setTimeout(() => {
      const response = generateDashboardResponse(messageText);
      
      const botMessage: Message = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      if (!isOpen) {
        toast("🤖 SEO Expert AI", {
          description: "Nieuw antwoord van je persoonlijke SEO assistent.",
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
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative">
              <Bot className="h-6 w-6 mr-2" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-medium">SEO Expert AI</h3>
              <p className="text-xs text-white/80">🟢 Dashboard Mode • Volledige toegang</p>
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
              <Bot className="h-4 w-4 text-green-600 mr-2" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-sm text-gray-500 ml-2">AI Expert analyseert...</span>
            </div>
          </div>
        )}

        {showSuggestions && messages.length === 1 && (
          <div className="space-y-2 animate-fade-in">
            <p className="text-sm text-gray-500 text-center">🚀 Geavanceerde SEO hulp:</p>
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left p-3 bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 rounded-lg text-sm transition-all border border-green-200 hover:border-green-400 hover:shadow-md"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Vraag alles over SEO - ik heb volledige toegang tot alle tools..."
            className="flex-1 border-green-300 focus:border-green-500"
            disabled={isTyping}
          />
          <Button 
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">
          🚀 SEO Expert Mode • Volledige dashboard toegang • <a href="mailto:info@seohelperai.com" className="text-green-600 hover:underline">info@seohelperai.com</a>
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
              className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-green-600 to-blue-600 hover:scale-110 transition-all duration-300 z-50" 
              size="icon"
              onClick={() => {
                setOpen(true);
                setIsOpen(true);
              }}
            >
              <div className="relative">
                <MessageSquare className="h-7 w-7" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px] h-[700px] p-0" onInteractOutside={(e) => e.preventDefault()}>
            <DialogTitle className="sr-only">SEO Expert AI Dashboard Chat</DialogTitle>
            <DialogDescription className="sr-only">Chat met je persoonlijke SEO expert AI assistent voor geavanceerde SEO hulp</DialogDescription>
            <ChatInterface />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button 
              className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-green-600 to-blue-600 hover:scale-110 transition-all duration-300 z-50" 
              size="icon"
              onClick={() => {
                setOpen(true);
                setIsOpen(true);
              }}
            >
              <div className="relative">
                <MessageSquare className="h-7 w-7" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
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

export default DashboardChatbot;
