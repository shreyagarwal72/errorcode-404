import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PuzzleCard } from '@/components/PuzzleCard';
import { puzzles } from '@/data/puzzles';
import { useGameState } from '@/hooks/useGameState';
import { ArrowLeft } from 'lucide-react';
import { JumpScare } from '@/components/JumpScare';

const Challenges = () => {
  const navigate = useNavigate();
  const { solvedPuzzles } = useGameState();
  const progress = (solvedPuzzles.length / puzzles.length) * 100;

  return (
    <>
      <JumpScare />
      <div className="min-h-screen bg-background p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/5 via-transparent to-red-950/5" />
        <div className="max-w-4xl mx-auto space-y-6 z-10 relative">
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

          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-6xl font-nosifer text-primary glitch drop-shadow-[0_0_25px_rgba(185,28,28,0.7)]">
              Puzzle Challenges
            </h1>
            <p className="text-muted-foreground text-xl font-creepster">
              Solve all puzzles to unlock the escape path
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="bg-muted rounded-full h-4 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {solvedPuzzles.length} of {puzzles.length} puzzles solved
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {puzzles.map((puzzle) => (
              <PuzzleCard key={puzzle.id} puzzle={puzzle} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Challenges;
