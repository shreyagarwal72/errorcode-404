import { useEffect, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { puzzles } from '@/data/puzzles';
import { DoorOpen, Skull } from 'lucide-react';
import { JumpScare } from '@/components/JumpScare';
import { useNavigate } from 'react-router-dom';

const Escape = () => {
  const navigate = useNavigate();
  const { solvedPuzzles, setHasEscaped } = useGameState();
  const [countdown, setCountdown] = useState(60);
  const [isEscaping, setIsEscaping] = useState(false);
  const [shake, setShake] = useState(false);
  const [showCrash, setShowCrash] = useState(false);
  
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
            setShowCrash(true);
            return 0;
          }
          if (prev <= 10) {
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

  // 404 Crash Screen
  if (showCrash) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 animate-flicker" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }} />
        
        <div className="text-center space-y-8 z-10 animate-glitch px-6">
          <div className="space-y-4">
            <h1 className="text-9xl font-nosifer text-red-600 drop-shadow-[0_0_60px_rgba(220,38,38,1)] animate-pulse">
              404
            </h1>
            <h2 className="text-4xl font-nosifer text-red-500 glitch">
              SYSTEM FAILURE
            </h2>
          </div>
          
          <div className="space-y-3 font-mono text-left max-w-2xl mx-auto bg-black/80 p-6 border-2 border-red-600/50 rounded">
            <p className="text-red-500 animate-flicker">ERROR: REALM_COLLAPSE_IMMINENT</p>
            <p className="text-red-400">Fatal Exception: 0x00000404</p>
            <p className="text-gray-400">Memory Dump: SOULS_CORRUPTED</p>
            <p className="text-gray-400">Stack Trace: VOID.NULL.NOWHERE</p>
            <p className="text-red-500 animate-pulse mt-4">YOU STAYED TOO LONG...</p>
            <p className="text-gray-500 text-sm mt-6">The realm consumes all who linger.</p>
          </div>

          <div className="space-y-2">
            <p className="text-red-600 font-creepster text-2xl animate-pulse">
              THE VOID CLAIMS YOU
            </p>
            <a 
              href="https://nextup-archive.vercel.app"
              className="inline-block mt-4 px-6 py-3 bg-red-600/20 border border-red-600 text-red-500 font-mono hover:bg-red-600/30 transition-all"
            >
              [ESCAPE_TO_REALITY.EXE]
            </a>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-radial from-transparent via-red-950/30 to-black pointer-events-none" />
      </div>
    );
  }

  return (
    <>
      <JumpScare />
      <div className={`min-h-screen bg-black relative overflow-hidden flex items-center justify-center transition-all duration-500 ${shake ? 'animate-shake' : ''}`}>
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

        <div className="max-w-2xl w-full z-10 text-center space-y-8 px-6">
          {/* Door icon with skulls circling */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-accent/30 rounded-full blur-[120px] animate-pulse-glow" />
            <DoorOpen className="h-32 w-32 text-accent mx-auto animate-float drop-shadow-[0_0_120px_rgba(234,179,8,1)] relative z-10" />
            
            {/* Orbiting skulls */}
            {[0, 120, 240].map((rotation, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
                style={{
                  animation: `spin ${6 + i}s linear infinite`,
                  transform: `rotate(${rotation}deg)`
                }}
              >
                <Skull className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-6 text-primary/50 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Warning Message */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-nosifer text-accent glitch drop-shadow-[0_0_60px_rgba(234,179,8,1)] animate-pulse">
              ESCAPE NOW
            </h1>
            <p className="text-2xl text-red-500 font-creepster animate-flicker">
              ⚠️ WARNING: REALM COLLAPSE IMMINENT ⚠️
            </p>
            <p className="text-lg text-foreground font-creepster">
              The digital void grows unstable...
            </p>
            <p className="text-base text-muted-foreground font-creepster max-w-lg mx-auto">
              You have solved the puzzles, but lingering here is madness. 
              The realm will crash and consume your soul if you do not leave NOW.
            </p>
          </div>

          {/* Countdown with intensity */}
          <div className="space-y-3">
            <div className={`text-8xl font-nosifer animate-pulse drop-shadow-[0_0_100px_rgba(255,0,0,1)] transition-colors duration-300 ${countdown <= 10 ? 'text-red-600 animate-shake' : 'text-accent'}`}>
              {countdown}
            </div>
            <p className="text-xl font-creepster text-muted-foreground animate-flicker">
              {countdown > 10 ? 'Seconds to escape safely...' : 'SYSTEM FAILURE IN...'}
            </p>
            {countdown <= 10 && (
              <p className="text-2xl font-nosifer text-red-500 animate-pulse">
                GET OUT! GET OUT! GET OUT!
              </p>
            )}
          </div>

          {/* Exit Button */}
          <div className="pt-4">
            <a
              href="https://nextup-archive.vercel.app"
              className="inline-block px-8 py-4 bg-accent hover:bg-accent/80 text-black font-nosifer text-xl shadow-[0_0_40px_rgba(234,179,8,0.8)] hover:shadow-[0_0_60px_rgba(234,179,8,1)] transition-all animate-pulse"
            >
              🚪 ESCAPE TO SAFETY
            </a>
          </div>

          {/* Animated dividers */}
          <div className="space-y-2 pt-4">
            <div className="h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse" />
            <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse-glow" />
          </div>
        </div>

        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black pointer-events-none opacity-80" />
      </div>
    </>
  );
};

export default Escape;
