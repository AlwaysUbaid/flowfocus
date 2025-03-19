
import React, { useState } from 'react';
import { Info, Timer, Star, Play, SkipForward, HelpCircle, Save } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useTheme } from '../contexts/ThemeContext';

const InfoPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { color } = useTheme();
  
  // Apply theme-specific styles
  const getIconColor = () => {
    switch (color) {
      case 'purple': return 'text-purple-400';
      case 'blue': return 'text-blue-400';
      case 'green': return 'text-green-400';
      case 'retro': return 'text-pink-400';
      default: return 'text-primary';
    }
  };

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full"
              >
                <HelpCircle className={`h-5 w-5 ${getIconColor()}`} />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>About Progressive Pomodoro</p>
          </TooltipContent>
        </Tooltip>
        
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Info className={`h-5 w-5 ${getIconColor()}`} />
              About Progressive Pomodoro
            </DialogTitle>
            <DialogDescription>
              Learn how this technique improves on the traditional Pomodoro method
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 text-sm mt-2">
            <p className="text-muted-foreground">
              The Progressive Pomodoro technique improves on the traditional method by focusing on cultivating flow state:
            </p>
            
            <div className="flex items-start gap-3 border-l-2 border-primary pl-3 py-1">
              <Timer className={`h-4 w-4 ${getIconColor()} mt-0.5 flex-shrink-0`} />
              <div>
                <span className="font-medium">Start small</span> - Begin with shorter focus periods to reduce resistance.
              </div>
            </div>
            
            <div className="flex items-start gap-3 border-l-2 border-primary pl-3 py-1">
              <Star className={`h-4 w-4 ${getIconColor()} mt-0.5 flex-shrink-0`} />
              <div>
                <span className="font-medium">Rate your focus</span> - Honestly evaluate your focus level after each session.
              </div>
            </div>
            
            <div className="flex items-start gap-3 border-l-2 border-primary pl-3 py-1">
              <SkipForward className={`h-4 w-4 ${getIconColor()} mt-0.5 flex-shrink-0`} />
              <div>
                <span className="font-medium">Break or continue</span> - If you're in flow, don't break your momentum.
              </div>
            </div>
            
            <div className="flex items-start gap-3 border-l-2 border-primary pl-3 py-1">
              <Play className={`h-4 w-4 ${getIconColor()} mt-0.5 flex-shrink-0`} />
              <div>
                <span className="font-medium">Adjust</span> - Gradually increase your focus periods as your concentration builds.
              </div>
            </div>
            
            <div className="flex items-start gap-3 border-l-2 border-primary pl-3 py-1">
              <Save className={`h-4 w-4 ${getIconColor()} mt-0.5 flex-shrink-0`} />
              <div>
                <span className="font-medium">Data storage</span> - All your focus statistics are automatically saved in your browser's local storage.
              </div>
            </div>
            
            <p className="text-muted-foreground mt-3 text-xs">
              The more resistance you feel to starting, the shorter your initial focus block should be.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default InfoPanel;
