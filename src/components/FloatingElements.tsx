
import React from 'react';
import { Sparkles, TrendingUp, Zap, BarChart3, Target, Rocket } from 'lucide-react';

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary floating icons with enhanced animations */}
      <div className="absolute top-20 left-10 animate-float opacity-30">
        <div className="relative">
          <Sparkles className="h-8 w-8 text-brand-purple" />
          <div className="absolute inset-0 animate-ping">
            <Sparkles className="h-8 w-8 text-brand-purple/50" />
          </div>
        </div>
      </div>
      
      <div className="absolute top-40 right-20 animate-float opacity-25" style={{ animationDelay: '1s' }}>
        <div className="relative">
          <TrendingUp className="h-10 w-10 text-brand-blue" />
          <div className="absolute inset-0 animate-ping" style={{ animationDelay: '0.5s' }}>
            <TrendingUp className="h-10 w-10 text-brand-blue/40" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-32 left-16 animate-float opacity-30" style={{ animationDelay: '2s' }}>
        <Zap className="h-9 w-9 text-brand-purple" />
      </div>
      
      <div className="absolute top-60 left-1/3 animate-float opacity-25" style={{ animationDelay: '0.5s' }}>
        <BarChart3 className="h-7 w-7 text-brand-blue" />
      </div>
      
      <div className="absolute bottom-48 right-1/4 animate-float opacity-30" style={{ animationDelay: '1.5s' }}>
        <Target className="h-8 w-8 text-brand-purple" />
      </div>

      <div className="absolute top-3/4 left-1/4 animate-float opacity-25" style={{ animationDelay: '3s' }}>
        <Rocket className="h-6 w-6 text-brand-blue" />
      </div>

      <div className="absolute top-1/3 right-1/3 animate-float opacity-20" style={{ animationDelay: '2.5s' }}>
        <Sparkles className="h-5 w-5 text-brand-purple" />
      </div>
      
      {/* Enhanced gradient orbs with better positioning */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-brand-purple/15 to-brand-blue/15 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-brand-blue/12 to-brand-purple/12 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      
      {/* Moving gradient lines */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-brand-purple/10 to-transparent animate-pulse-slow opacity-50"></div>
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-blue/10 to-transparent animate-pulse-slow opacity-50" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default FloatingElements;
