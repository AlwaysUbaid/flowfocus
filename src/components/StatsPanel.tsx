
import React from 'react';
import { useTimer } from '../contexts/TimerContext';
import { Clock, Zap, Trophy, Hash } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const StatsPanel: React.FC = () => {
  const { todayFocusTime, todayFlowStates, longestSession, totalSessions } = useTimer();
  const isMobile = useIsMobile();
  
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
      <div className="grid grid-cols-2 gap-2">
        <StatCard 
          icon={<Clock className="h-4 w-4 text-primary" />}
          value={formatTime(todayFocusTime)}
          label="FOCUS TIME"
          isMobile={true}
        />
        
        <StatCard 
          icon={<Zap className="h-4 w-4 text-primary" />}
          value={todayFlowStates.toString()}
          label="FLOW STATES"
          isMobile={true}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6">
      <StatCard 
        icon={<Clock className="h-5 w-5 text-primary" />}
        value={formatTime(todayFocusTime)}
        label="Focus Time"
      />
      
      <StatCard 
        icon={<Hash className="h-5 w-5 text-primary" />}
        value={totalSessions.toString()}
        label="Sessions"
      />
      
      <StatCard 
        icon={<Zap className="h-5 w-5 text-primary" />}
        value={todayFlowStates.toString()}
        label="Flow States"
      />
      
      <StatCard 
        icon={<Trophy className="h-5 w-5 text-primary" />}
        value={formatLongestSession(longestSession)}
        label="Longest Session"
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  isMobile?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, isMobile = false }) => {
  if (isMobile) {
    return (
      <div className="bg-card rounded-lg p-3 border flex flex-col items-center justify-center shadow-sm text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          {icon}
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        </div>
        <div className="text-xl font-bold digital-clock">{value}</div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-4 border flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-center mb-1">
        {icon}
      </div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  );
};

export default StatsPanel;
