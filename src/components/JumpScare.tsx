import { useEffect, useState } from 'react';
import { Ghost, Skull, Eye, Flame, Zap, Moon, BrainCircuit, AlertTriangle, type LucideIcon } from 'lucide-react';

const scareIcons: LucideIcon[] = [Ghost, Skull, Eye, Flame, Zap, Moon, BrainCircuit, AlertTriangle];
const scareTexts = [
  'THEY ARE WATCHING',
  'YOU CANNOT ESCAPE',
  'TURN AROUND',
  'RUN',
  'IT SEES YOU',
  'TOO LATE',
  'HELLO',
];

const scareTypes = ['icon', 'text', 'blood', 'invert'] as const;

export const JumpScare = () => {
  const [show, setShow] = useState(false);
  const [IconComponent, setIconComponent] = useState<LucideIcon>(() => scareIcons[0]);
  const [scareText, setScareText] = useState('');
  const [scareType, setScareType] = useState<typeof scareTypes[number]>('icon');

  useEffect(() => {
    const triggerScare = () => {
      const type = scareTypes[Math.floor(Math.random() * scareTypes.length)];
      setScareType(type);
      
      if (type === 'icon' || type === 'invert') {
        const randomIcon = scareIcons[Math.floor(Math.random() * scareIcons.length)];
        setIconComponent(() => randomIcon);
      } else if (type === 'text') {
        const randomText = scareTexts[Math.floor(Math.random() * scareTexts.length)];
        setScareText(randomText);
      }
      
      setShow(true);
      
      const scareSound = new Audio('/sounds/ambient.wav');
      scareSound.volume = 0.4;
      scareSound.playbackRate = 2.5;
      scareSound.play().catch(() => {});

      // Add screen shake
      document.body.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 500);

      const duration = type === 'blood' ? 1200 : 600;
      setTimeout(() => setShow(false), duration);
    };

    const minTime = 10000; // 10 seconds
    const maxTime = 30000; // 30 seconds
    const randomDelay = Math.random() * (maxTime - minTime) + minTime;

    const timeout = setTimeout(triggerScare, randomDelay);

    return () => clearTimeout(timeout);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none animate-in fade-in duration-75">
      {scareType === 'icon' && (
        <>
          <div className="absolute inset-0 bg-black/95 animate-pulse" />
          <IconComponent className="h-72 w-72 text-primary animate-in zoom-in-150 duration-150 drop-shadow-[0_0_80px_rgba(255,0,0,1)] animate-pulse" />
        </>
      )}
      
      {scareType === 'text' && (
        <>
          <div className="absolute inset-0 bg-black/98" />
          <h1 className="text-9xl font-nosifer text-primary glitch drop-shadow-[0_0_50px_rgba(255,0,0,1)] animate-pulse px-8 text-center">
            {scareText}
          </h1>
        </>
      )}
      
      {scareType === 'blood' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-red-950 via-red-800 to-black opacity-90 animate-pulse" />
          <div className="absolute inset-0" style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 0, 0, 0.3) 2px,
              rgba(255, 0, 0, 0.3) 4px
            )`
          }} />
        </>
      )}
      
      {scareType === 'invert' && (
        <>
          <div className="absolute inset-0 bg-white/95" />
          <IconComponent className="h-72 w-72 text-black animate-in zoom-in-150 duration-150 drop-shadow-[0_0_80px_rgba(0,0,0,1)]" />
        </>
      )}
    </div>
  );
};
