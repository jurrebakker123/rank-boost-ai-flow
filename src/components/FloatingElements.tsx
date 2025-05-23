
import React from 'react';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating sparkles */}
      <div className="absolute top-20 left-10 animate-float">
        <Sparkles className="h-6 w-6 text-brand-purple/30" />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <TrendingUp className="h-8 w-8 text-brand-blue/30" />
      </div>
      <div className="absolute bottom-32 left-16 animate-float" style={{ animationDelay: '2s' }}>
        <Zap className="h-7 w-7 text-brand-purple/30" />
      </div>
      <div className="absolute top-60 left-1/3 animate-float" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="h-5 w-5 text-brand-blue/30" />
      </div>
      <div className="absolute bottom-48 right-1/4 animate-float" style={{ animationDelay: '1.5s' }}>
        <TrendingUp className="h-6 w-6 text-brand-purple/30" />
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default FloatingElements;
