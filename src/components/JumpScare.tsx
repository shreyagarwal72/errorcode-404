import { useEffect, useState } from 'react';
import { Ghost, Skull, Eye, type LucideIcon } from 'lucide-react';

const scareIcons: LucideIcon[] = [Ghost, Skull, Eye];

export const JumpScare = () => {
  const [show, setShow] = useState(false);
  const [IconComponent, setIconComponent] = useState<LucideIcon>(() => scareIcons[0]);

  useEffect(() => {
    const triggerScare = () => {
      const randomIcon = scareIcons[Math.floor(Math.random() * scareIcons.length)];
      setIconComponent(() => randomIcon);
      setShow(true);
      
      const scareSound = new Audio('/sounds/ambient.wav');
      scareSound.volume = 0.3;
      scareSound.playbackRate = 2;
      scareSound.play().catch(() => {});

      setTimeout(() => setShow(false), 800);
    };

    const minTime = 30000; // 30 seconds minimum
    const maxTime = 90000; // 90 seconds maximum
    const randomDelay = Math.random() * (maxTime - minTime) + minTime;

    const timeout = setTimeout(triggerScare, randomDelay);

    return () => clearTimeout(timeout);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none animate-in fade-in duration-100">
      <div className="absolute inset-0 bg-black/90 animate-pulse" />
      <IconComponent className="h-64 w-64 text-red-600 animate-in zoom-in-150 duration-200 drop-shadow-[0_0_50px_rgba(220,38,38,1)]" />
    </div>
  );
};
