import type { Message } from '@/types';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversationThreadProps {
  messages: Message[];
  customerInitial?: string;
}

export function ConversationThread({ messages, customerInitial = 'C' }: ConversationThreadProps) {
  if (messages.length === 0) {
    return (
      <div className="bg-dispatch-bg rounded-lg p-4 border border-dispatch-border">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-4 h-4 text-dispatch-accent-green" />
          <h4 className="text-sm font-semibold text-dispatch-text">Conversation</h4>
        </div>
        <p className="text-sm text-dispatch-text-secondary text-center py-4">
          No conversation yet. Agent will initiate contact shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-dispatch-bg rounded-lg p-4 border border-dispatch-border">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-4 h-4 text-dispatch-accent-green" />
        <h4 className="text-sm font-semibold text-dispatch-text">Conversation</h4>
      </div>

      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.sender === 'agent' ? 'flex-row' : 'flex-row-reverse'
            )}
          >
            {/* Avatar */}
            <div className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0',
              message.sender === 'agent' 
                ? 'bg-dispatch-accent-green/20' 
                : 'bg-dispatch-status-blue/20'
            )}>
              {message.sender === 'agent' ? (
                <Bot className="w-3.5 h-3.5 text-dispatch-accent-green" />
              ) : (
                <span className="text-xs font-semibold text-dispatch-status-blue">
                  {customerInitial}
                </span>
              )}
            </div>

            {/* Message Bubble */}
            <div className={cn(
              'max-w-[80%] rounded-lg px-3 py-2',
              message.sender === 'agent'
                ? 'bg-dispatch-card border border-dispatch-border rounded-tl-none'
                : 'bg-dispatch-status-blue/10 border border-dispatch-status-blue/20 rounded-tr-none'
            )}>
              <p className={cn(
                'text-sm leading-relaxed',
                message.sender === 'agent' ? 'text-dispatch-text' : 'text-dispatch-text'
              )}>
                {message.content}
              </p>
              <span className={cn(
                'text-[10px] mt-1 block',
                message.sender === 'agent' ? 'text-dispatch-text-tertiary' : 'text-dispatch-status-blue/70'
              )}>
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
