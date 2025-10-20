import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PuzzleCard } from '@/components/PuzzleCard';
import { puzzles } from '@/data/puzzles';
import { useGameState } from '@/hooks/useGameState';
import { ArrowLeft } from 'lucide-react';

const Challenges = () => {
  const navigate = useNavigate();
  const { solvedPuzzles } = useGameState();
  const progress = (solvedPuzzles.length / puzzles.length) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
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

        <div className="text-center space-y-4">
          <h1 className="text-5xl font-nosifer text-primary glitch">
            Puzzle Challenges
          </h1>
          <p className="text-muted-foreground text-lg">
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
  );
};

export default Challenges;
