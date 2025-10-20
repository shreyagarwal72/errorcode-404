import { useEffect, useRef } from 'react';

interface SoundManagerProps {
  soundPath: string;
  volume?: number;
  loop?: boolean;
}

export const SoundManager = ({ soundPath, volume = 0.3, loop = true }: SoundManagerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(soundPath);
    audioRef.current.volume = volume;
    audioRef.current.loop = loop;
    
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
      } catch (error) {
        console.log('Audio autoplay prevented:', error);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundPath, volume, loop]);

  return null;
};
