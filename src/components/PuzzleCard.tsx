import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Puzzle } from '@/data/puzzles';
import { useGameState } from '@/hooks/useGameState';
import { CheckCircle2, Lock } from 'lucide-react';

interface PuzzleCardProps {
  puzzle: Puzzle;
}

export const PuzzleCard = ({ puzzle }: PuzzleCardProps) => {
  const [answer, setAnswer] = useState('');
  const { toast } = useToast();
  const { solvedPuzzles, addSolvedPuzzle } = useGameState();
  
  const isSolved = solvedPuzzles.includes(puzzle.id);
  const isLocked = puzzle.id > 1 && !solvedPuzzles.includes(puzzle.id - 1);

  const handleSubmit = () => {
    if (answer.trim().toUpperCase() === puzzle.answer.toUpperCase()) {
      addSolvedPuzzle(puzzle.id);
      toast({
        title: "Puzzle Solved! 🎉",
        description: "The spirits acknowledge your wisdom.",
      });
      setAnswer('');
    } else {
      toast({
        title: "Incorrect Answer",
        description: "The spirits remain silent...",
        variant: "destructive",
      });
    }
  };

  if (isLocked) {
    return (
      <Card className="border-border opacity-60 relative overflow-hidden bg-card/30">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-black/50 backdrop-blur-sm" />
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="font-nosifer text-xl text-muted-foreground">
                {puzzle.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground/70 mt-2">
                Complete previous puzzle to unlock
              </CardDescription>
            </div>
            <Lock className="text-destructive h-8 w-8 animate-pulse drop-shadow-[0_0_10px_rgba(220,38,38,0.6)]" />
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="bg-muted/30 p-6 rounded-md border border-destructive/30 text-center">
            <p className="text-muted-foreground font-creepster text-lg">
              🔒 Locked by Dark Forces
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${isSolved ? 'border-primary shadow-[0_0_20px_rgba(255,0,0,0.3)]' : 'border-border'} transition-all duration-300 bg-card/80 backdrop-blur`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="font-nosifer text-xl text-primary drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]">
              {puzzle.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {puzzle.description}
            </CardDescription>
          </div>
          {isSolved && <CheckCircle2 className="text-primary h-6 w-6 animate-pulse-slow drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]" />}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground font-medium bg-muted/50 p-4 rounded-md border border-border shadow-inner">
          {puzzle.question}
        </p>
        
        {!isSolved && (
          <div className="flex gap-2">
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer..."
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="bg-background/50 border-border focus:border-primary transition-colors"
            />
            <Button onClick={handleSubmit} variant="default" className="shadow-[0_0_15px_rgba(255,0,0,0.3)]">
              Submit
            </Button>
          </div>
        )}
        
        {isSolved && (
          <p className="text-primary text-center font-medium text-lg drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]">
            ✓ Solved
          </p>
        )}
      </CardContent>
    </Card>
  );
};
