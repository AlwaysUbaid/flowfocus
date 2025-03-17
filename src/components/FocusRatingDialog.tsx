
import React from 'react';
import { useTimer } from '../contexts/TimerContext';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { 
  AlertCircle, 
  ThumbsUp, 
  Zap, 
  FlaskConical,
  ArrowRight,
  Gamepad,
  X
} from 'lucide-react';

interface FocusRatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const FocusRatingDialog: React.FC<FocusRatingDialogProps> = ({ isOpen, onClose }) => {
  const { rateFocus, getNextDuration, continueSession } = useTimer();

  const handleRating = (rating: 'distracted' | 'okay' | 'focused' | 'flow') => {
    rateFocus(rating);
    
    const nextDuration = getNextDuration(rating);
    const nextMinutes = Math.floor(nextDuration / 60);
    
    if (rating === 'flow') {
      toast.success("Flow state detected!", {
        description: "Continue your momentum without breaking your flow.",
        action: {
          label: "Continue",
          onClick: () => continueSession(),
        },
      });
    } else {
      toast.info(`Next session: ${nextMinutes} minutes`, {
        description: "Your next work session duration has been adjusted."
      });
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in scan-lines">
      <div className="bg-card rounded-none p-6 w-full max-w-md mx-4 animate-scale-in shadow-xl pixel-border pixel-bg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-center retro-title">RATE YOUR FOCUS</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-none">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="pixel-pattern p-3 mb-4">
          <p className="text-muted-foreground text-sm text-center retro-text">
            How was your focus during this session?
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 pixel-focus-button hover:border-focus-distracted hover:bg-focus-distracted/10"
            onClick={() => handleRating('distracted')}
          >
            <AlertCircle className="h-8 w-8 mb-2 text-focus-distracted" />
            <span className="retro-text">DISTRACTED</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 pixel-focus-button hover:border-focus-okay hover:bg-focus-okay/10"
            onClick={() => handleRating('okay')}
          >
            <ThumbsUp className="h-8 w-8 mb-2 text-focus-okay" />
            <span className="retro-text">OKAY</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 pixel-focus-button hover:border-focus-focused hover:bg-focus-focused/10"
            onClick={() => handleRating('focused')}
          >
            <Zap className="h-8 w-8 mb-2 text-focus-focused" />
            <span className="retro-text">FOCUSED</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 pixel-focus-button hover:border-focus-flow hover:bg-focus-flow/10"
            onClick={() => handleRating('flow')}
          >
            <FlaskConical className="h-8 w-8 mb-2 text-focus-flow" />
            <span className="retro-text">FLOW</span>
          </Button>
        </div>
        
        <div className="mt-6 text-center">
          <Button 
            variant="ghost" 
            className="text-sm text-muted-foreground rounded-none pixel-border px-4"
            onClick={onClose}
          >
            <span className="retro-text">SKIP</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-4 text-center text-xs text-muted-foreground flex items-center justify-center">
          <Gamepad className="h-3 w-3 mr-1" />
          <span className="retro-text">RETRO MODE ACTIVATED</span>
        </div>
      </div>
    </div>
  );
};

export default FocusRatingDialog;
