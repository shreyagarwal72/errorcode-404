import { useEffect, useState } from 'react';
import { Ghost, Skull, Eye, Flame, Zap, Moon, BrainCircuit, AlertTriangle, Axe, Bug, Skull as SkullCross, ScanEye, Siren, type LucideIcon } from 'lucide-react';

const scareIcons: LucideIcon[] = [Ghost, Skull, Eye, Flame, Zap, Moon, BrainCircuit, AlertTriangle, Axe, Bug, SkullCross, ScanEye, Siren];
const scareTexts = [
  'THEY ARE WATCHING',
  'YOU CANNOT ESCAPE',
  'TURN AROUND',
  'RUN',
  'IT SEES YOU',
  'TOO LATE',
  'HELLO',
  'BEHIND YOU',
  'DONT LOOK',
  'FOUND YOU',
  'NO ESCAPE',
  'HELP ME',
  'JOIN US',
];

const scareTypes = ['icon', 'text', 'blood', 'invert', 'glitch', 'static'] as const;

export const JumpScare = () => {
  const [show, setShow] = useState(false);
  const [IconComponent, setIconComponent] = useState<LucideIcon>(() => scareIcons[0]);
  const [scareText, setScareText] = useState('');
  const [scareType, setScareType] = useState<typeof scareTypes[number]>('icon');

  useEffect(() => {
    const triggerScare = () => {
      const type = scareTypes[Math.floor(Math.random() * scareTypes.length)];
      setScareType(type);
      
      if (type === 'icon' || type === 'invert' || type === 'glitch') {
        const randomIcon = scareIcons[Math.floor(Math.random() * scareIcons.length)];
        setIconComponent(() => randomIcon);
      } else if (type === 'text') {
        const randomText = scareTexts[Math.floor(Math.random() * scareTexts.length)];
        setScareText(randomText);
      }
      
      setShow(true);
      
      // Different sounds for different scares
      const sounds = ['/sounds/ambient.wav', '/sounds/door-creak.mp3', '/sounds/whisper.mp3'];
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
      const scareSound = new Audio(randomSound);
      scareSound.volume = 0.5;
      if (type === 'static' || type === 'glitch') {
        scareSound.playbackRate = 0.8;
      } else {
        scareSound.playbackRate = 2.5;
      }
      scareSound.play().catch(() => {});

      // Add screen shake for intense scares
      if (type === 'icon' || type === 'text' || type === 'glitch') {
        document.body.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          document.body.style.animation = '';
        }, 500);
      }

      const duration = type === 'blood' || type === 'static' ? 1200 : 700;
      setTimeout(() => setShow(false), duration);
    };

    const minTime = 15000; // 15 seconds
    const maxTime = 45000; // 45 seconds
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
          <h1 className="text-7xl md:text-9xl font-nosifer text-primary glitch drop-shadow-[0_0_50px_rgba(255,0,0,1)] animate-pulse px-8 text-center">
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
          <Skull className="h-64 w-64 text-red-600 animate-pulse drop-shadow-[0_0_100px_rgba(220,38,38,1)]" />
        </>
      )}
      
      {scareType === 'invert' && (
        <>
          <div className="absolute inset-0 bg-white/95" />
          <IconComponent className="h-72 w-72 text-black animate-in zoom-in-150 duration-150 drop-shadow-[0_0_80px_rgba(0,0,0,1)]" />
        </>
      )}
      
      {scareType === 'glitch' && (
        <>
          <div className="absolute inset-0 bg-black animate-flicker" />
          <div className="absolute inset-0 opacity-30" style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 4px,
              rgba(255, 0, 0, 0.5) 4px,
              rgba(255, 0, 0, 0.5) 8px
            )`
          }} />
          <IconComponent className="h-80 w-80 text-primary glitch drop-shadow-[0_0_100px_rgba(255,0,0,1)]" />
        </>
      )}
      
      {scareType === 'static' && (
        <>
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 opacity-50 animate-pulse" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover'
          }} />
          <div className="text-center space-y-4">
            <Eye className="h-56 w-56 text-red-600 mx-auto animate-pulse drop-shadow-[0_0_100px_rgba(220,38,38,1)]" />
            <p className="text-4xl font-nosifer text-white animate-flicker">WE SEE YOU</p>
          </div>
        </>
      )}
    </div>
  );
};
