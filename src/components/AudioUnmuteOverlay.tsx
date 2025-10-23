import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

interface AudioUnmuteOverlayProps {
  onUnmute: () => void;
}

export const AudioUnmuteOverlay = ({ onUnmute }: AudioUnmuteOverlayProps) => {
  const [show, setShow] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const interacted = localStorage.getItem('audio-permission');
    if (interacted === 'granted') {
      setShow(false);
      onUnmute();
    }
  }, [onUnmute]);

  const handleUnmute = async () => {
    setHasInteracted(true);
    await onUnmute();
    setShow(false);
  };

  const handleMute = () => {
    localStorage.setItem('audio-permission', 'denied');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
      <div className="text-center space-y-6 max-w-md p-8 bg-card border-2 border-primary rounded-lg shadow-[0_0_50px_rgba(255,0,0,0.5)]">
        <VolumeX className="h-20 w-20 text-primary mx-auto animate-pulse drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]" />
        <div>
          <h2 className="text-4xl font-nosifer text-primary mb-3 glitch">
            Enter If You Dare
          </h2>
          <p className="text-muted-foreground font-creepster text-lg">
            This realm requires sound to fully experience the horror...
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleUnmute}
            size="lg"
            className="font-creepster text-lg shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]"
          >
            <Volume2 className="mr-2 h-5 w-5" />
            Enable Sound
          </Button>
          <Button
            onClick={handleMute}
            variant="outline"
            size="lg"
            className="font-creepster text-lg"
          >
            Enter Silently
          </Button>
        </div>
      </div>
    </div>
  );
};