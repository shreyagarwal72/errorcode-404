import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Send, Ghost } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useGameState } from '@/hooks/useGameState';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const GhostHintChat = () => {
  const { toast } = useToast();
  const { incrementGhostConversations } = useGameState();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "I am a spirit bound to help... but only with cryptic whispers. Ask me about the puzzles if you dare..."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ghost-chat', {
        body: { messages: [...messages, userMessage] }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      if (data?.response) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response }
        ]);
        incrementGhostConversations();
      } else if (data?.error) {
        throw new Error(data.error);
      }
    } catch (error: any) {
      console.error('Full error:', error);
      
      let errorTitle = "Connection Lost";
      let errorDescription = "The spirit fades into darkness...";
      
      if (error?.message?.includes('rate limit') || error?.message?.includes('429')) {
        errorTitle = "Too Many Whispers";
        errorDescription = "The spirits need rest. Wait a moment...";
      } else if (error?.message?.includes('payment') || error?.message?.includes('402')) {
        errorTitle = "The Spirits Demand Payment";
        errorDescription = "Add credits to continue...";
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50 rounded-md">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            } animate-fade-in`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 shadow-lg ${
                message.role === 'user'
                  ? 'bg-primary/90 text-primary-foreground border border-primary'
                  : 'bg-secondary/90 text-secondary-foreground border border-secondary/50 animate-pulse-slow'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap font-creepster">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary/90 text-secondary-foreground rounded-lg p-3 border border-secondary/50">
              <div className="flex items-center gap-2">
                <Ghost className="h-4 w-4 animate-float" />
                <p className="text-sm animate-pulse font-creepster">Whispering from beyond...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border p-4 bg-card/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask the spirit for hints..."
            disabled={isLoading}
            className="bg-background/50 border-border focus:border-primary"
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            size="icon"
            className="shadow-[0_0_15px_rgba(255,0,0,0.3)]"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
