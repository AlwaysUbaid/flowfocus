
import React from 'react';
import { Info, Timer, Star, Play, SkipForward } from 'lucide-react';

const InfoPanel: React.FC = () => {
  return (
    <div className="bg-card rounded-lg p-5 border">
      <div className="flex items-center mb-4">
        <Info className="h-5 w-5 text-primary mr-2" />
        <h3 className="font-semibold">About Progressive Pomodoro</h3>
      </div>
      
      <div className="space-y-4 text-sm">
        <p className="text-muted-foreground">
          The Progressive Pomodoro technique improves on the traditional method by focusing on cultivating flow state:
        </p>
        
        <div className="flex items-start gap-3 border-l-2 border-primary pl-3 py-1">
          <Timer className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-medium">Start small</span> - Begin with shorter focus periods to reduce resistance.
          </div>
        </div>
        
        <div className="flex items-start gap-3 border-l-2 border-primary pl-3 py-1">
          <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-medium">Rate your focus</span> - Honestly evaluate your focus level after each session.
          </div>
        </div>
        
        <div className="flex items-start gap-3 border-l-2 border-primary pl-3 py-1">
          <SkipForward className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-medium">Break or continue</span> - If you're in flow, don't break your momentum.
          </div>
        </div>
        
        <div className="flex items-start gap-3 border-l-2 border-primary pl-3 py-1">
          <Play className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-medium">Adjust</span> - Gradually increase your focus periods as your concentration builds.
          </div>
        </div>
        
        <p className="text-muted-foreground mt-3 text-xs">
          The more resistance you feel to starting, the shorter your initial focus block should be.
        </p>
      </div>
    </div>
  );
};

export default InfoPanel;
