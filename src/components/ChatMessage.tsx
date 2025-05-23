
import React from 'react';
import { cn } from '@/lib/utils';
import { Bot, User, Sparkles } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const ChatMessage = ({ message, isUser, timestamp = new Date() }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex mb-4 animate-fade-in",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex max-w-[85%]",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shadow-md",
          isUser ? "bg-gradient-to-r from-brand-purple to-brand-blue ml-3" : "bg-white border-2 border-brand-purple mr-3"
        )}>
          {isUser ? (
            <User className="h-5 w-5 text-white" />
          ) : (
            <div className="relative">
              <Bot className="h-5 w-5 text-brand-purple" />
              <Sparkles className="h-2 w-2 absolute -top-0.5 -right-0.5 text-yellow-500" />
            </div>
          )}
        </div>
        <div className={cn(
          "rounded-2xl px-4 py-3 shadow-sm border",
          isUser 
            ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white rounded-tr-md border-brand-purple" 
            : "bg-white text-gray-800 rounded-tl-md border-gray-200 shadow-md"
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          <p className={cn(
            "text-xs mt-2 opacity-70",
            isUser ? "text-white/80" : "text-gray-500"
          )}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
