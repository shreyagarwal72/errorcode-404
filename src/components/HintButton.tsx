import { useState } from 'react';
import { Skull } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { GhostHintChat } from './GhostHintChat';

interface HintButtonProps {
  isUnlocked: boolean;
}

export const HintButton = ({ isUnlocked }: HintButtonProps) => {
  const [open, setOpen] = useState(false);

  if (!isUnlocked) return null;

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-[0_0_30px_rgba(255,0,0,0.6)] hover:shadow-[0_0_50px_rgba(255,0,0,0.9)] animate-pulse-slow bg-primary hover:bg-primary/90 z-50"
        title="Get hints from the spirits"
      >
        <Skull className="h-7 w-7 animate-float" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] bg-card/95 backdrop-blur border-2 border-primary shadow-[0_0_50px_rgba(255,0,0,0.5)]">
          <DialogHeader>
            <DialogTitle className="font-nosifer text-2xl text-primary flex items-center gap-2">
              <Skull className="h-6 w-6 animate-pulse" />
              Spirit Hints
            </DialogTitle>
            <DialogDescription className="font-creepster text-muted-foreground">
              Ask the trapped spirits for cryptic guidance...
            </DialogDescription>
          </DialogHeader>
          <GhostHintChat />
        </DialogContent>
      </Dialog>
    </>
  );
};
