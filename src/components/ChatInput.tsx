import { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
}

export function ChatInput({ onSend, placeholder = 'Send message to customer...' }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center gap-2 p-2 bg-dispatch-bg rounded-lg border border-dispatch-border focus-within:border-dispatch-accent-green transition-colors">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'flex-1 bg-transparent text-sm text-dispatch-text placeholder:text-dispatch-text-tertiary',
            'focus:outline-none'
          )}
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className={cn(
            'p-2 rounded-md transition-colors',
            message.trim() 
              ? 'bg-dispatch-accent-green/20 text-dispatch-accent-green hover:bg-dispatch-accent-green/30' 
              : 'text-dispatch-text-tertiary cursor-not-allowed'
          )}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
