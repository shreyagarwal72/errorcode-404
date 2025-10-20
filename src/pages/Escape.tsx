import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/hooks/useGameState';
import { puzzles } from '@/data/puzzles';
import { ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';

const Escape = () => {
  const navigate = useNavigate();
  const { solvedPuzzles, ghostConversations, setHasEscaped, resetGame } = useGameState();
  
  const canEscape = solvedPuzzles.length >= puzzles.length && ghostConversations >= 3;

  useEffect(() => {
    if (canEscape) {
      setHasEscaped(true);
    }
  }, [canEscape, setHasEscaped]);

  const handleRestart = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-foreground absolute top-6 left-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {canEscape ? (
          <div className="space-y-6 animate-fade-in">
            <Sparkles className="h-24 w-24 text-primary mx-auto animate-pulse-slow" />
            <h1 className="text-6xl font-nosifer text-primary glitch">
              Freedom Achieved!
            </h1>
            <p className="text-xl text-foreground">
              Congratulations! You have solved all puzzles and spoken with the spirits.
              The portal to escape the 404 realm is now open.
            </p>
            <div className="space-y-4 bg-card p-8 rounded-lg border border-primary">
              <p className="text-muted-foreground">
                ✓ All {puzzles.length} puzzles solved
              </p>
              <p className="text-muted-foreground">
                ✓ {ghostConversations} conversations with spirits
              </p>
              <p className="text-primary text-lg font-semibold mt-4">
                You are free to leave... if you dare return to reality.
              </p>
            </div>
            <Button
              onClick={handleRestart}
              size="lg"
              variant="outline"
              className="mt-6"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Start New Journey
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-5xl font-nosifer text-primary glitch">
              The Escape Portal
            </h1>
            <p className="text-xl text-muted-foreground">
              The portal remains sealed. You must complete your trials to earn your freedom.
            </p>
            <div className="space-y-4 bg-card p-8 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <span className="text-foreground">Puzzles Solved:</span>
                <span className={solvedPuzzles.length >= puzzles.length ? 'text-primary' : 'text-muted-foreground'}>
                  {solvedPuzzles.length} / {puzzles.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Spirit Conversations:</span>
                <span className={ghostConversations >= 3 ? 'text-primary' : 'text-muted-foreground'}>
                  {ghostConversations} / 3
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Complete all challenges and speak with the spirits at least 3 times to unlock the escape.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Escape;
