
import React from 'react';
import { useTimer } from '../contexts/TimerContext';
import { Clock, Zap, Trophy, Hash, Activity, Calendar } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from './ui/card';

const StatsPanel: React.FC = () => {
  const { todayFocusTime, todayFlowStates, longestSession, totalSessions, averageFocusTime, weeklyFocusTime } = useTimer();
  const isMobile = useIsMobile();
  const { color } = useTheme();
  
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
      <div className="grid grid-cols-2 gap-2 animate-fade-in">
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
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 animate-fade-in">
      <StatCard 
        icon={<Clock className="h-5 w-5" />}
        value={formatTime(todayFocusTime)}
        label="FOCUS TIME"
        theme={color}
      />
      
      <StatCard 
        icon={<Hash className="h-5 w-5" />}
        value={totalSessions.toString()}
        label="SESSIONS"
        theme={color}
      />
      
      <StatCard 
        icon={<Zap className="h-5 w-5" />}
        value={todayFlowStates.toString()}
        label="FLOW STATES"
        theme={color}
      />
      
      <StatCard 
        icon={<Trophy className="h-5 w-5" />}
        value={formatLongestSession(longestSession)}
        label="LONGEST SESSION"
        theme={color}
      />

      <StatCard 
        icon={<Activity className="h-5 w-5" />}
        value={formatTime(averageFocusTime)}
        label="AVG. SESSION"
        theme={color}
      />
      
      <StatCard 
        icon={<Calendar className="h-5 w-5" />}
        value={formatTime(weeklyFocusTime)}
        label="WEEKLY FOCUS"
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

  if (isMobile) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-[1px] rounded-xl p-3 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:bg-card/80">
        <div className={`${getIconColor()} mb-1`}>
          {icon}
        </div>
        <div className="text-lg font-bold digital-clock">{value}</div>
        <div className="text-xs text-muted-foreground tracking-wider">{label}</div>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-[1px] rounded-xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:bg-card/80">
      <div className={`${getIconColor()} mb-2`}>
        {icon}
      </div>
      <div className="text-2xl font-bold digital-clock">{value}</div>
      <div className="text-xs text-muted-foreground tracking-wider">{label}</div>
    </Card>
  );
};

export default StatsPanel;
