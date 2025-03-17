
import React from 'react';
import { useTimer } from '../contexts/TimerContext';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { 
  AlertCircle, 
  ThumbsUp, 
  Zap, 
  FlaskConical,
  ArrowRight
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-card rounded-xl p-6 w-full max-w-md mx-4 animate-scale-in shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">How was your focus?</h2>
        <p className="text-muted-foreground text-sm mb-6 text-center">
          Rate your focus to help adjust your next session.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 border-2 hover:border-focus-distracted hover:bg-focus-distracted/10"
            onClick={() => handleRating('distracted')}
          >
            <AlertCircle className="h-8 w-8 mb-2 text-focus-distracted" />
            <span>Distracted</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 border-2 hover:border-focus-okay hover:bg-focus-okay/10"
            onClick={() => handleRating('okay')}
          >
            <ThumbsUp className="h-8 w-8 mb-2 text-focus-okay" />
            <span>Okay</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 border-2 hover:border-focus-focused hover:bg-focus-focused/10"
            onClick={() => handleRating('focused')}
          >
            <Zap className="h-8 w-8 mb-2 text-focus-focused" />
            <span>Focused</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center py-6 border-2 hover:border-focus-flow hover:bg-focus-flow/10"
            onClick={() => handleRating('flow')}
          >
            <FlaskConical className="h-8 w-8 mb-2 text-focus-flow" />
            <span>Flow</span>
          </Button>
        </div>
        
        <div className="mt-6 text-center">
          <Button 
            variant="ghost" 
            className="text-sm text-muted-foreground"
            onClick={onClose}
          >
            Skip for now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FocusRatingDialog;
