
import React, { useState } from 'react';
import { useTimer } from '../contexts/TimerContext';
import { Clock, Zap, Trophy, Hash, Activity, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const StatsPanel: React.FC = () => {
  const { todayFocusTime, todayFlowStates, longestSession, totalSessions, averageFocusTime, weeklyFocusTime } = useTimer();
  const { isMobile } = useIsMobile();
  const { color } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Format time as hours:minutes
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };
  
  // Format longest session
  const formatLongestSession = (seconds: number): string => {
    if (seconds === 0) return '0m';
    return formatTime(seconds);
  };

  if (isMobile) {
    return (
      <div className="animate-fade-in">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <StatCard 
              icon={<Clock className="h-4 w-4 text-primary" />}
              value={formatTime(todayFocusTime)}
              label="FOCUS TIME"
              isMobile={true}
              theme={color}
            />
            
            <StatCard 
              icon={<Zap className="h-4 w-4 text-primary" />}
              value={todayFlowStates.toString()}
              label="FLOW STATES"
              isMobile={true}
              theme={color}
            />
          </div>
          
          <CollapsibleContent>
            <div className="grid grid-cols-3 gap-2 my-2">
              <StatCard 
                icon={<Trophy className="h-4 w-4" />}
                value={formatLongestSession(longestSession)}
                label="LONGEST"
                isMobile={true}
                theme={color}
              />
              
              <StatCard 
                icon={<Hash className="h-4 w-4" />}
                value={totalSessions ? totalSessions.toString() : "0"}
                label="SESSIONS"
                isMobile={true}
                theme={color}
              />
              
              <StatCard 
                icon={<Activity className="h-4 w-4" />}
                value={formatTime(averageFocusTime || 0)}
                label="AVERAGE"
                isMobile={true}
                theme={color}
              />
            </div>
          </CollapsibleContent>
          
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-center py-1 mt-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              {isExpanded ? (
                <>
                  <span className="mr-1">Show less</span>
                  <ChevronUp className="h-3 w-3" />
                </>
              ) : (
                <>
                  <span className="mr-1">View more stats</span>
                  <ChevronDown className="h-3 w-3" />
                </>
              )}
            </button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 mb-6 animate-fade-in">
      <StatCard 
        icon={<Clock className="h-4 w-4" />}
        value={formatTime(todayFocusTime)}
        label="FOCUS TIME"
        theme={color}
      />
      
      <StatCard 
        icon={<Zap className="h-4 w-4" />}
        value={todayFlowStates.toString()}
        label="FLOW STATES"
        theme={color}
      />
      
      <StatCard 
        icon={<Trophy className="h-4 w-4" />}
        value={formatLongestSession(longestSession)}
        label="LONGEST"
        theme={color}
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  isMobile?: boolean;
  theme?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, isMobile = false, theme = 'default' }) => {
  // Apply theme-specific styles
  const getIconColor = () => {
    switch (theme) {
      case 'purple': return 'text-purple-400';
      case 'blue': return 'text-blue-400';
      case 'green': return 'text-green-400';
      case 'retro': return 'text-pink-400 retro-glow';
      default: return 'text-primary';
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-[1px] rounded-lg p-2 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:bg-card/80">
      <div className={`${getIconColor()} mb-0.5`}>
        {icon}
      </div>
      <div className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold digital-clock`}>{value}</div>
      <div className="text-[10px] text-muted-foreground tracking-wider">{label}</div>
    </Card>
  );
};

export default StatsPanel;
