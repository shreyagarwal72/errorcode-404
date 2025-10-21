import { useEffect, useRef } from 'react';

export const GlobalAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/ambient.wav');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.15;
      
      const playAudio = () => {
        audioRef.current?.play().catch(() => {
          document.addEventListener('click', () => {
            audioRef.current?.play();
          }, { once: true });
        });
      };

      playAudio();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return null;
};
