import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skull, Ghost, Flame } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showGhosts, setShowGhosts] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 500);
    setTimeout(() => setShowGhosts(true), 1500);
    
    // Play ambient sound
    const ambientSound = new Audio('/sounds/whisper.mp3');
    ambientSound.volume = 0.3;
    ambientSound.loop = true;
    ambientSound.play().catch(() => {});
    
    return () => {
      ambientSound.pause();
    };
  }, []);

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => navigate('/home'), 800);
  };

  return (
    <div className={`min-h-screen bg-black flex items-center justify-center relative overflow-hidden cursor-pointer transition-all duration-1000 ${fadeOut ? 'opacity-0 scale-95' : ''}`} onClick={handleEnter}>
      {/* Animated background with blood effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/30 to-black animate-pulse" />
        <div className="absolute inset-0 opacity-15 animate-flicker" style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 0, 0, 0.4) 2px,
            rgba(255, 0, 0, 0.4) 4px
          )`
        }} />
      </div>

      {/* Floating ghost spirits */}
      {showGhosts && (
        <>
          {[...Array(5)].map((_, i) => (
            <Ghost
              key={i}
              className="absolute text-red-600/30 animate-float"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + (i % 3) * 30}%`,
                width: `${40 + i * 10}px`,
                height: `${40 + i * 10}px`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${4 + i}s`
              }}
            />
          ))}
        </>
      )}

      {/* Floating candle flames */}
      {visible && (
        <>
          {[...Array(8)].map((_, i) => (
            <Flame
              key={i}
              className="absolute text-accent/40 animate-flicker"
              style={{
                left: `${5 + i * 12}%`,
                bottom: `${10 + (i % 2) * 15}%`,
                width: `${20 + i * 3}px`,
                height: `${20 + i * 3}px`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </>
      )}
      
      <div className={`text-center space-y-16 z-10 transition-all duration-1000 px-6 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        {/* Animated skull with intense glow and orbiting elements */}
        <div className="relative animate-scale-in">
          <div className="absolute inset-0 bg-red-600/40 rounded-full blur-[140px] animate-pulse-glow" />
          
          {/* Rotating ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-red-600/20 rounded-full animate-spin-slow" />
          
          <Skull className="h-40 w-40 text-red-600 mx-auto animate-float drop-shadow-[0_0_80px_rgba(220,38,38,1)] relative z-10" />
          
          {/* Small orbiting skulls */}
          {[0, 90, 180, 270].map((rotation, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
              style={{
                animation: `spin ${6 + i}s linear infinite reverse`,
                transform: `rotate(${rotation}deg)`
              }}
            >
              <Skull className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-6 text-red-600/40 animate-pulse" />
            </div>
          ))}
        </div>
        
        <div className="space-y-6">
          <h1 className="text-7xl md:text-9xl font-nosifer text-red-600 glitch drop-shadow-[0_0_50px_rgba(220,38,38,1)] blood-drip animate-pulse">
            404 SOULS
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 font-creepster animate-flicker">
            Enter the Realm of Lost Pages
          </p>
          <p className="text-base md:text-lg text-gray-500 font-creepster max-w-md mx-auto animate-fade-in">
            Solve cryptic puzzles... Speak with spirits... Escape if you can...
          </p>
          <div className="flex gap-4 justify-center items-center text-red-600/50 animate-float">
            <Skull className="h-4 w-4" />
            <span className="text-sm font-creepster">12 Souls Trapped</span>
            <Skull className="h-4 w-4" />
          </div>
        </div>

        <div className="space-y-4 animate-float">
          <p className="text-xl text-gray-400 hover:text-red-500 transition-colors duration-300 font-creepster animate-pulse">
            Click anywhere to enter the nightmare...
          </p>
          <div className="space-y-2">
            <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse-glow" />
            <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-red-600/50 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Animated corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-red-600/30 animate-pulse" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-red-600/30 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-red-600/30 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-red-600/30 animate-pulse" />

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse" />
      
      {/* Enhanced vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black pointer-events-none opacity-90" />
    </div>
  );
};

export default Landing;
