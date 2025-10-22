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
import { JumpScare } from '@/components/JumpScare';

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
      let errorDescription = "The spirit's voice fades into darkness...";
      
      if (error?.message?.includes('rate limit') || error?.message?.includes('429')) {
        errorTitle = "Too Many Whispers";
        errorDescription = "The spirits need time to rest. Try again in a moment...";
      } else if (error?.message?.includes('payment') || error?.message?.includes('402')) {
        errorTitle = "The Spirits Demand Payment";
        errorDescription = "Add credits to continue communicating with the dead...";
      } else if (error?.message?.includes('LOVABLE_API_KEY')) {
        errorTitle = "Dark Magic Misconfigured";
        errorDescription = "The ritual cannot be completed. Contact the realm keeper.";
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
    <>
      <SoundManager soundPath="/sounds/ghost-chat.wav" volume={0.2} />
      <JumpScare />
      <div className="min-h-screen bg-background p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-transparent to-purple-950/10" />
        <div className="max-w-3xl mx-auto space-y-6 z-10 relative">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/home')}
              className="text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          <div className="text-center space-y-2 animate-fade-in">
            <div className="flex justify-center">
              <Ghost className="h-20 w-20 text-secondary animate-float drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]" />
            </div>
            <h1 className="text-6xl font-nosifer text-secondary glitch drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              Spirit Communication
            </h1>
            <p className="text-muted-foreground text-lg font-creepster">
              Speak with the lost souls of the 404 realm
            </p>
          </div>

          <Card className="h-[500px] flex flex-col bg-card/80 backdrop-blur border-2 border-primary/30 shadow-[0_0_40px_rgba(255,0,0,0.2)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } animate-fade-in`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 shadow-lg ${
                      message.role === 'user'
                        ? 'bg-primary/90 text-primary-foreground border border-primary shadow-[0_0_15px_rgba(255,0,0,0.3)]'
                        : 'bg-secondary/90 text-secondary-foreground border border-secondary/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] animate-pulse-slow'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap font-creepster">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/90 text-secondary-foreground rounded-lg p-4 border border-secondary/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    <div className="flex items-center gap-2">
                      <Ghost className="h-4 w-4 animate-float" />
                      <p className="text-sm animate-pulse font-creepster">The spirit whispers from beyond...</p>
                    </div>
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
