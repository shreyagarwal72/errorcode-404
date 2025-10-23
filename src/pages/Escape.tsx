import { useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { puzzles } from '@/data/puzzles';
import { DoorOpen, Skull } from 'lucide-react';
import { JumpScare } from '@/components/JumpScare';
import { useNavigate } from 'react-router-dom';

const Escape = () => {
  const navigate = useNavigate();
  const { solvedPuzzles, setHasEscaped } = useGameState();
  const [countdown, setCountdown] = useState(5);
  const [isEscaping, setIsEscaping] = useState(false);
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState(false);
  
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
            setFlash(true);
            setTimeout(() => {
              window.location.href = 'https://nextup-archive.vercel.app';
            }, 500);
            return 0;
          }
          if (prev <= 3) {
            setShake(true);
            setTimeout(() => setShake(false), 200);
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [canEscape, setHasEscaped, isEscaping]);

  if (!canEscape) {
    navigate('/home');
    return null;
  }

  return (
    <>
      <JumpScare />
      <div className={`min-h-screen bg-black relative overflow-hidden flex items-center justify-center transition-all duration-500 ${shake ? 'animate-shake' : ''} ${flash ? 'bg-white' : ''}`}>
        {/* Animated blood-red background */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/40 via-black to-red-950/40 animate-pulse" />
        
        {/* Scan lines effect */}
        <div className="absolute inset-0 opacity-20 animate-flicker" style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 0, 0, 0.5) 2px, rgba(255, 0, 0, 0.5) 4px)`
        }} />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent/50 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-2xl w-full z-10 text-center space-y-12 px-6">
          {/* Door icon with skulls circling */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-accent/30 rounded-full blur-[120px] animate-pulse-glow" />
            <DoorOpen className="h-48 w-48 text-accent mx-auto animate-float drop-shadow-[0_0_120px_rgba(234,179,8,1)] relative z-10" />
            
            {/* Orbiting skulls */}
            {[0, 120, 240].map((rotation, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64"
                style={{
                  animation: `spin ${8 + i}s linear infinite`,
                  transform: `rotate(${rotation}deg)`
                }}
              >
                <Skull className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-8 text-primary/50 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Main title with enhanced effects */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-8xl font-nosifer text-accent glitch drop-shadow-[0_0_60px_rgba(234,179,8,1)] animate-pulse blood-drip">
              YOU ARE FREE
            </h1>
            <p className="text-3xl text-foreground font-creepster animate-flicker">
              The nightmare ends... the portal awaits...
            </p>
            <p className="text-lg text-red-500 font-creepster animate-pulse">
              Your soul returns to the realm of the living...
            </p>
          </div>

          {/* Countdown with intensity */}
          <div className="space-y-4">
            <div className={`text-9xl font-nosifer animate-pulse drop-shadow-[0_0_100px_rgba(255,0,0,1)] transition-colors duration-300 ${countdown <= 2 ? 'text-accent animate-shake' : 'text-primary'}`}>
              {countdown}
            </div>
            <p className="text-2xl font-creepster text-muted-foreground animate-flicker">
              Portal opens in {countdown}...
            </p>
          </div>

          {/* Animated dividers */}
          <div className="space-y-2">
            <div className="h-2 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse-glow" />
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
          </div>
        </div>

        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black pointer-events-none opacity-80" />
        
        {/* Flash effect for final transition */}
        {flash && (
          <div className="absolute inset-0 bg-white animate-fade-in z-50" />
        )}
      </div>
    </>
  );
};

export default Escape;
