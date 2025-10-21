import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/hooks/useGameState';
import { puzzles } from '@/data/puzzles';
import { ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';
import { JumpScare } from '@/components/JumpScare';

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
    navigate('/home');
  };

  return (
    <>
      <JumpScare />
      <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 via-transparent to-amber-950/10" />
        <div className="max-w-2xl w-full space-y-8 text-center z-10 relative">
        <Button
          variant="ghost"
          onClick={() => navigate('/home')}
          className="text-foreground absolute top-6 left-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {canEscape ? (
          <div className="space-y-6 animate-fade-in">
            <div className="relative animate-float">
              <Sparkles className="h-32 w-32 text-accent mx-auto drop-shadow-[0_0_50px_rgba(234,179,8,1)] animate-spin" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full animate-pulse-slow" />
            </div>
            <h1 className="text-7xl font-nosifer text-accent glitch drop-shadow-[0_0_30px_rgba(234,179,8,0.8)] animate-pulse-slow">
              Freedom Achieved!
            </h1>
            <p className="text-2xl text-foreground font-creepster animate-flicker">
              Congratulations! You have solved all puzzles and spoken with the spirits.
              The portal to escape the 404 realm is now open.
            </p>
            <div className="space-y-4 bg-card/50 backdrop-blur p-8 rounded-lg border-2 border-accent shadow-[0_0_30px_rgba(234,179,8,0.3)]">
              <p className="text-lg text-foreground font-creepster">
                ✓ All {puzzles.length} puzzles solved
              </p>
              <p className="text-lg text-foreground font-creepster">
                ✓ {ghostConversations} conversations with spirits
              </p>
              <p className="text-accent text-2xl font-bold mt-6 animate-pulse-slow drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
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
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-6xl font-nosifer text-destructive glitch drop-shadow-[0_0_25px_rgba(220,38,38,0.7)]">
              The Escape Portal
            </h1>
            <p className="text-2xl text-muted-foreground font-creepster">
              The portal remains sealed. You must complete your trials to earn your freedom.
            </p>
            <div className="space-y-4 bg-card/50 backdrop-blur p-8 rounded-lg border-2 border-border shadow-[0_0_20px_rgba(185,28,28,0.2)]">
              <div className="flex items-center justify-between text-lg">
                <span className="text-foreground font-creepster">Puzzles Solved:</span>
                <span className={`font-bold ${solvedPuzzles.length >= puzzles.length ? 'text-primary' : 'text-muted-foreground'}`}>
                  {solvedPuzzles.length} / {puzzles.length}
                </span>
              </div>
              <div className="flex items-center justify-between text-lg">
                <span className="text-foreground font-creepster">Spirit Conversations:</span>
                <span className={`font-bold ${ghostConversations >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {ghostConversations} / 3
                </span>
              </div>
            </div>
            <p className="text-base text-destructive italic font-creepster animate-pulse">
              Complete all challenges and speak with the spirits at least 3 times to unlock the escape.
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Escape;
