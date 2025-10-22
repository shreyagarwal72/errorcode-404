import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skull } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 500);
  }, []);

  const handleEnter = () => {
    setVisible(false);
    setTimeout(() => navigate('/home'), 300);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden cursor-pointer" onClick={handleEnter}>
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black animate-pulse" />
        <div className="absolute inset-0 opacity-10" style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 0, 0, 0.3) 2px,
            rgba(255, 0, 0, 0.3) 4px
          )`
        }} />
      </div>
      
      <div className={`text-center space-y-16 z-10 transition-all duration-1000 px-6 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        {/* Animated skull with intense glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-red-600/30 rounded-full blur-[120px] animate-pulse-glow" />
          <Skull className="h-40 w-40 text-red-600 mx-auto animate-float drop-shadow-[0_0_60px_rgba(220,38,38,1)] relative z-10" />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-7xl md:text-9xl font-nosifer text-red-600 glitch drop-shadow-[0_0_40px_rgba(220,38,38,1)] blood-drip">
            404 SOULS
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 font-creepster animate-flicker">
            Enter the Realm of Lost Pages
          </p>
          <p className="text-base md:text-lg text-gray-500 font-creepster max-w-md mx-auto">
            Solve cryptic puzzles... Speak with spirits... Escape if you can...
          </p>
        </div>

        <div className="space-y-4 animate-float">
          <p className="text-xl text-gray-400 hover:text-red-500 transition-colors duration-300 font-creepster animate-pulse">
            Click anywhere to enter the nightmare...
          </p>
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse-glow" />
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black pointer-events-none" />
    </div>
  );
};

export default Landing;
