import { Button } from '@/components/ui/button';
import { PuzzleCard } from '@/components/PuzzleCard';
import { puzzles } from '@/data/puzzles';
import { useGameState } from '@/hooks/useGameState';
import { DoorOpen } from 'lucide-react';
import { JumpScare } from '@/components/JumpScare';
import { HintButton } from '@/components/HintButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const { solvedPuzzles } = useGameState();
  const progress = (solvedPuzzles.length / puzzles.length) * 100;
  const isEscapeUnlocked = solvedPuzzles.length === puzzles.length;
  const isHintUnlocked = solvedPuzzles.length >= 3;

  const handleEscapeClick = () => {
    if (!isEscapeUnlocked) {
      toast.error('Complete all puzzles to unlock the Escape Portal!', {
        description: `${solvedPuzzles.length}/${puzzles.length} puzzles solved`
      });
      return;
    }
    navigate('/escape');
  };

  return (
    <>
      <JumpScare />
      <HintButton isUnlocked={isHintUnlocked} />
      <div className="min-h-screen bg-background p-6 relative overflow-hidden vignette">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 via-transparent to-red-950/10 animate-pulse-slow" />
        
        <div className="max-w-4xl mx-auto space-y-8 z-10 relative">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-7xl md:text-8xl font-nosifer text-primary glitch blood-drip drop-shadow-[0_0_30px_rgba(255,0,0,0.9)]">
              404 SOULS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-creepster animate-flicker max-w-2xl mx-auto">
              Trapped in the realm of lost pages. Solve all puzzles to escape this nightmare...
            </p>
            
            <div className="max-w-md mx-auto space-y-3">
              <div className="bg-muted/50 rounded-full h-6 overflow-hidden border border-primary/30 shadow-inner">
                <div
                  className="bg-gradient-to-r from-destructive to-primary h-full transition-all duration-500 shadow-[0_0_20px_rgba(255,0,0,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-muted-foreground font-creepster">
                  {solvedPuzzles.length} of {puzzles.length} puzzles solved
                </p>
                {isHintUnlocked && (
                  <p className="text-secondary font-creepster animate-pulse">
                    💀 Hints Unlocked
                  </p>
                )}
              </div>
            </div>

            {isEscapeUnlocked && (
              <Button
                onClick={handleEscapeClick}
                size="lg"
                className="font-creepster text-lg shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:shadow-[0_0_50px_rgba(234,179,8,0.9)] animate-pulse-glow bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <DoorOpen className="mr-2 h-5 w-5 animate-shake" />
                ESCAPE NOW!
              </Button>
            )}
          </div>

          <div className="grid gap-6 animate-slide-up">
            {puzzles.map((puzzle) => (
              <PuzzleCard key={puzzle.id} puzzle={puzzle} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
