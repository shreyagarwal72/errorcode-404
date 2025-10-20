import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Puzzle } from '@/data/puzzles';
import { useGameState } from '@/hooks/useGameState';
import { CheckCircle2, HelpCircle } from 'lucide-react';

interface PuzzleCardProps {
  puzzle: Puzzle;
}

export const PuzzleCard = ({ puzzle }: PuzzleCardProps) => {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();
  const { solvedPuzzles, addSolvedPuzzle } = useGameState();
  
  const isSolved = solvedPuzzles.includes(puzzle.id);

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

  return (
    <Card className={`${isSolved ? 'border-primary' : 'border-border'} transition-all duration-300`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="font-nosifer text-xl">{puzzle.title}</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {puzzle.description}
            </CardDescription>
          </div>
          {isSolved && <CheckCircle2 className="text-primary h-6 w-6 animate-pulse-slow" />}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground font-medium bg-card p-4 rounded-md border border-border">
          {puzzle.question}
        </p>
        
        {!isSolved && (
          <>
            <div className="flex gap-2">
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer..."
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="bg-background border-border"
              />
              <Button onClick={handleSubmit} variant="default">
                Submit
              </Button>
            </div>
            
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHint(!showHint)}
                className="w-full"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </Button>
              
              {showHint && (
                <p className="text-sm text-muted-foreground italic bg-muted p-3 rounded-md">
                  💡 {puzzle.hint}
                </p>
              )}
            </div>
          </>
        )}
        
        {isSolved && (
          <p className="text-primary text-center font-medium">
            ✓ Solved
          </p>
        )}
      </CardContent>
    </Card>
  );
};
