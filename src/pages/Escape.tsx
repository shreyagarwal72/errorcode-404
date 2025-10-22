import { useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { puzzles } from '@/data/puzzles';
import { DoorOpen } from 'lucide-react';
import { JumpScare } from '@/components/JumpScare';

const Escape = () => {
  const { solvedPuzzles, setHasEscaped } = useGameState();
  const [countdown, setCountdown] = useState(3);
  const [isEscaping, setIsEscaping] = useState(false);
  
  const canEscape = solvedPuzzles.length === puzzles.length;

  useEffect(() => {
    if (canEscape && !isEscaping) {
      setHasEscaped(true);
      setIsEscaping(true);
      
      const escapeSound = new Audio('/sounds/horror-atmosphere.mp3');
      escapeSound.volume = 0.4;
      escapeSound.play().catch(() => {});

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = 'https://nextup-archive.vercel.app';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [canEscape, setHasEscaped, isEscaping]);

  if (!canEscape) {
    window.location.href = '/';
    return null;
  }

  return (
    <>
      <JumpScare />
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-black to-red-950/30 animate-pulse" />
        
        <div className="absolute inset-0 opacity-20" style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 0, 0, 0.5) 2px, rgba(255, 0, 0, 0.5) 4px)`
        }} />

        <div className="max-w-2xl w-full z-10 text-center space-y-12 px-6">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" />
            <DoorOpen className="h-48 w-48 text-accent mx-auto animate-float drop-shadow-[0_0_100px_rgba(234,179,8,1)] relative z-10" />
          </div>

          <div className="space-y-6 animate-fade-in">
            <h1 className="text-8xl font-nosifer text-accent glitch drop-shadow-[0_0_50px_rgba(234,179,8,1)] animate-pulse">
              YOU ARE FREE
            </h1>
            <p className="text-3xl text-foreground font-creepster animate-flicker">
              The nightmare ends... the portal awaits...
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-9xl font-nosifer text-primary animate-pulse drop-shadow-[0_0_80px_rgba(255,0,0,1)]">
              {countdown}
            </div>
            <p className="text-2xl font-creepster text-muted-foreground animate-flicker">
              Escaping in {countdown}...
            </p>
          </div>

          <div className="h-2 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse-glow" />
        </div>
      </div>
    </>
  );
};

export default Escape;
