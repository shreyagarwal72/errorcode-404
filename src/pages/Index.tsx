import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SoundManager } from '@/components/SoundManager';
import { useGameState } from '@/hooks/useGameState';
import { puzzles } from '@/data/puzzles';
import { Ghost, Puzzle, DoorOpen, Skull } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { solvedPuzzles, ghostConversations } = useGameState();

  return (
    <>
      <SoundManager soundPath="/sounds/ambient.wav" volume={0.15} />
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center space-y-4">
            <Skull className="h-20 w-20 text-primary mx-auto animate-pulse-slow" />
            <h1 className="text-7xl font-nosifer text-primary glitch">
              404 SOULS
            </h1>
            <p className="text-xl text-muted-foreground font-creepster">
              You are trapped in the realm of lost pages. Solve puzzles, speak with ghosts, and find your escape.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:border-primary transition-all duration-300 hover:scale-105" onClick={() => navigate('/challenges')}>
              <CardHeader>
                <Puzzle className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-center font-nosifer">Puzzle Challenges</CardTitle>
                <CardDescription className="text-center">
                  Test your mind with cryptic riddles
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  {solvedPuzzles.length} / {puzzles.length} solved
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-secondary transition-all duration-300 hover:scale-105" onClick={() => navigate('/ghost-chat')}>
              <CardHeader>
                <Ghost className="h-12 w-12 text-secondary mx-auto mb-2 animate-float" />
                <CardTitle className="text-center font-nosifer">Ghost Chat</CardTitle>
                <CardDescription className="text-center">
                  Communicate with lost spirits
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  {ghostConversations} conversations
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-accent transition-all duration-300 hover:scale-105" onClick={() => navigate('/escape')}>
              <CardHeader>
                <DoorOpen className="h-12 w-12 text-accent mx-auto mb-2" />
                <CardTitle className="text-center font-nosifer">Escape Portal</CardTitle>
                <CardDescription className="text-center">
                  Find your way back to reality
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  {solvedPuzzles.length >= puzzles.length && ghostConversations >= 3 ? 'Unlocked!' : 'Locked'}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center space-y-4 mt-8">
            <Button
              onClick={() => navigate('/challenges')}
              size="lg"
              className="font-creepster text-lg"
            >
              Begin Your Journey
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
