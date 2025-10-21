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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/10 to-black" />
      
      <div className={`text-center space-y-12 z-10 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <Skull className="h-32 w-32 text-red-600 mx-auto animate-pulse-slow drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]" />
        
        <div className="space-y-4">
          <h1 className="text-8xl font-nosifer text-red-600 glitch drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">
            404 SOULS
          </h1>
          <p className="text-2xl text-gray-400 font-creepster animate-flicker">
            The Lost Pages Await
          </p>
        </div>

        <div className="animate-float">
          <p className="text-lg text-gray-500 hover:text-red-500 transition-colors duration-300">
            Click anywhere to enter...
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse-slow" />
    </div>
  );
};

export default Landing;
