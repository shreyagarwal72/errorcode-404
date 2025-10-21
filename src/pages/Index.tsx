import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGameState } from '@/hooks/useGameState';
import { puzzles } from '@/data/puzzles';
import { Ghost, Puzzle, DoorOpen, Skull, Lock } from 'lucide-react';
import { JumpScare } from '@/components/JumpScare';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const { solvedPuzzles, ghostConversations } = useGameState();

  const handleGhostChatClick = () => {
    if (solvedPuzzles.length < puzzles.length) {
      toast.error('Complete all puzzles first to unlock Ghost Chat!', {
        description: `${solvedPuzzles.length}/${puzzles.length} puzzles solved`
      });
      return;
    }
    navigate('/ghost-chat');
  };

  const handleEscapeClick = () => {
    if (solvedPuzzles.length < puzzles.length || ghostConversations < 3) {
      toast.error('Complete all requirements to unlock the Escape Portal!', {
        description: `Puzzles: ${solvedPuzzles.length}/${puzzles.length} | Ghost Chats: ${ghostConversations}/3`
      });
      return;
    }
    navigate('/escape');
  };

  const isGhostChatLocked = solvedPuzzles.length < puzzles.length;
  const isEscapeLocked = solvedPuzzles.length < puzzles.length || ghostConversations < 3;

  return (
    <>
      <JumpScare />
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/5 via-transparent to-red-950/5" />
        <div className="max-w-4xl w-full space-y-8 z-10">
          <div className="text-center space-y-4 animate-fade-in">
            <Skull className="h-24 w-24 text-primary mx-auto animate-pulse-slow drop-shadow-[0_0_30px_rgba(185,28,28,0.5)]" />
            <h1 className="text-8xl font-nosifer text-primary glitch drop-shadow-[0_0_25px_rgba(185,28,28,0.7)]">
              404 SOULS
            </h1>
            <p className="text-2xl text-muted-foreground font-creepster animate-flicker">
              You are trapped in the realm of lost pages. Solve puzzles, speak with ghosts, and find your escape.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
            <Card 
              className="cursor-pointer hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(185,28,28,0.3)] bg-card/50 backdrop-blur border-2" 
              onClick={() => navigate('/challenges')}
            >
              <CardHeader>
                <Puzzle className="h-14 w-14 text-primary mx-auto mb-2 drop-shadow-[0_0_15px_rgba(185,28,28,0.5)]" />
                <CardTitle className="text-center font-nosifer text-xl">Puzzle Challenges</CardTitle>
                <CardDescription className="text-center font-creepster text-base">
                  Test your mind with cryptic riddles
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-bold text-primary">
                  {solvedPuzzles.length} / {puzzles.length} solved
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all duration-300 bg-card/50 backdrop-blur border-2 ${
                isGhostChatLocked 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:border-secondary hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]'
              }`}
              onClick={handleGhostChatClick}
            >
              <CardHeader>
                <div className="relative">
                  <Ghost className={`h-14 w-14 mx-auto mb-2 ${isGhostChatLocked ? 'text-muted' : 'text-secondary animate-float drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]'}`} />
                  {isGhostChatLocked && <Lock className="h-6 w-6 text-red-600 absolute top-0 right-1/3" />}
                </div>
                <CardTitle className="text-center font-nosifer text-xl">Ghost Chat</CardTitle>
                <CardDescription className="text-center font-creepster text-base">
                  {isGhostChatLocked ? 'Complete puzzles to unlock' : 'Communicate with lost spirits'}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-bold text-secondary">
                  {ghostConversations} conversations
                </p>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all duration-300 bg-card/50 backdrop-blur border-2 ${
                isEscapeLocked 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:border-accent hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]'
              }`}
              onClick={handleEscapeClick}
            >
              <CardHeader>
                <div className="relative">
                  <DoorOpen className={`h-14 w-14 mx-auto mb-2 ${isEscapeLocked ? 'text-muted' : 'text-accent drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]'}`} />
                  {isEscapeLocked && <Lock className="h-6 w-6 text-red-600 absolute top-0 right-1/3" />}
                </div>
                <CardTitle className="text-center font-nosifer text-xl">Escape Portal</CardTitle>
                <CardDescription className="text-center font-creepster text-base">
                  {isEscapeLocked ? 'Complete all trials to unlock' : 'Find your way back to reality'}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className={`text-lg font-bold ${isEscapeLocked ? 'text-red-600' : 'text-accent'}`}>
                  {isEscapeLocked ? 'Locked' : 'Unlocked!'}
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
