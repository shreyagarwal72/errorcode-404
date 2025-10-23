import { useEffect, useRef, useState } from 'react';
import { AudioUnmuteOverlay } from './AudioUnmuteOverlay';

export const GlobalAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const permission = localStorage.getItem('audio-permission');
    if (permission === 'granted') {
      setShowOverlay(false);
    } else if (permission === 'denied') {
      setShowOverlay(false);
      return;
    }
  }, []);

  const initAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/ambient.wav');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
    }
  };

  const handleUnmute = async () => {
    initAudio();
    try {
      if (audioRef.current && !isPlaying) {
        localStorage.setItem('audio-permission', 'granted');
        setShowOverlay(false);
        await audioRef.current.play();
        setIsPlaying(true);
        console.log('Audio started successfully');
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {showOverlay && <AudioUnmuteOverlay onUnmute={handleUnmute} />}
    </>
  );
};
