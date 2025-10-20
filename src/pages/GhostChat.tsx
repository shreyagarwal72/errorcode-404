import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { SoundManager } from '@/components/SoundManager';
import { useGameState } from '@/hooks/useGameState';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Send, Ghost } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GhostChat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { incrementGhostConversations } = useGameState();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome, mortal... I am a spirit trapped in the 404 realm. Ask me anything about this cursed place, or simply chat if you dare..."
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

      if (error) throw error;

      if (data?.response) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.response }
        ]);
        incrementGhostConversations();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Connection Lost",
        description: "The spirit's voice fades...",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SoundManager soundPath="/sounds/ghost-chat.wav" volume={0.2} />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Ghost className="h-16 w-16 text-primary animate-float" />
            </div>
            <h1 className="text-5xl font-nosifer text-primary glitch">
              Spirit Communication
            </h1>
            <p className="text-muted-foreground">
              Speak with the lost souls of the 404 realm
            </p>
          </div>

          <Card className="h-[500px] flex flex-col bg-card border-border">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-secondary-foreground rounded-lg p-4">
                    <p className="text-sm animate-pulse">The spirit is thinking...</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message to the spirit..."
                  disabled={isLoading}
                  className="bg-background border-border"
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default GhostChat;
