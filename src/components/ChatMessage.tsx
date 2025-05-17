
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const ChatMessage = ({ message, isUser, timestamp = new Date() }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[75%] rounded-lg px-4 py-2",
        isUser 
          ? "bg-brand-purple text-white rounded-br-none" 
          : "bg-gray-100 text-gray-800 rounded-bl-none"
      )}>
        <p className="text-sm">{message}</p>
        <p className="text-xs mt-1 opacity-70">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
