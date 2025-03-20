
import React, { useState, useEffect } from 'react';
import { useTimer } from '../contexts/TimerContext';
import Header from '../components/Header';
import TimerDisplay from '../components/TimerDisplay';
import DurationSlider from '../components/DurationSlider';
import StatsPanel from '../components/StatsPanel';
import InfoPanel from '../components/InfoPanel';
import FocusRatingDialog from '../components/FocusRatingDialog';
import YouTubeVideo from '../components/YouTubeVideo';
import ThemeSelector from '../components/ThemeSelector';
import { useIsMobile } from '../hooks/use-mobile';
import { Activity, BarChart2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Index = () => {
  const { timeLeft, mode, isRunning, weeklyFocusTime } = useTimer();
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const { isMobile, isTablet } = useIsMobile();
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
  
  // Get icon color based on theme
  const getIconColor = () => {
    switch (color) {
      case 'purple': return 'text-purple-400';
      case 'blue': return 'text-blue-400';
      case 'green': return 'text-green-400';
      case 'retro': return 'text-pink-400';
      default: return 'text-primary';
    }
  };
  
  // Show rating dialog when timer completes
  useEffect(() => {
    if (timeLeft === 0 && mode === 'work') {
      // Small delay to ensure the timer animation completes
      const timeout = setTimeout(() => {
        setShowRatingDialog(true);
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [timeLeft, mode]);
  
  // Update page title with timer
  useEffect(() => {
    const formatTime = (seconds: number): string => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    
    document.title = isRunning 
      ? `${formatTime(timeLeft)} - FlowFocus` 
      : 'FlowFocus Progressive Pomodoro';
      
    return () => {
      document.title = 'FlowFocus Progressive Pomodoro';
    };
  }, [timeLeft, isRunning]);

  // Get day names for the week
  const getDayNames = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    const result = [];
    
    for (let i = 6; i >= 0; i--) {
      const dayIndex = (today - i + 7) % 7;
      result.push(days[dayIndex]);
    }
    
    return result;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto py-3 px-2 sm:py-4 sm:px-3 md:py-6 md:px-4 overflow-x-hidden">
        {/* Mobile: Full screen timer layout */}
        {isMobile ? (
          <div className="flex flex-col space-y-4 mb-16"> {/* Added bottom margin for fixed footer */}
            {/* Timer section - full screen on mobile with larger size */}
            <div className="flex justify-center items-center min-h-[40vh] -mt-2 mb-1">
              <TimerDisplay />
            </div>
            
            {/* Controls section */}
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-3 border shadow-sm animate-fade-in">
              <div className="text-center mb-2 flex items-center justify-center gap-1">
                <h1 className="text-base font-bold">Progressive Pomodoro</h1>
                <InfoPanel />
              </div>
              <p className="text-xs text-muted-foreground text-center mb-2">Start small, build momentum</p>
              <DurationSlider type="work" />
              <DurationSlider type="break" />
            </div>
            
            {/* Stats section - enhanced for mobile */}
            <StatsPanel />
            
            {/* Music Player - optimized for mobile */}
            <YouTubeVideo videoSrc="" title="Focus Music Player" />
          </div>
        ) : (
          // Desktop layout - centered timer with controls and TV above
          <div className="grid lg:grid-cols-2 gap-6 pt-4">
            <div className="flex flex-col">
              <div className="text-center md:text-left mb-4 md:mb-5 animate-fade-in flex items-center justify-between">
                <div>
                  <h1 className="text-lg sm:text-xl font-bold mb-1">Progressive Pomodoro Timer</h1>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Start small, build momentum, achieve flow.
                  </p>
                </div>
                <InfoPanel />
              </div>
              
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border shadow-md mb-5 animate-scale-in">
                <div className="flex justify-center mb-5">
                  <TimerDisplay />
                </div>
                
                <div className="mt-4">
                  <DurationSlider type="work" />
                  <DurationSlider type="break" />
                </div>
              </div>
              
              <div className="animate-fade-in">
                <StatsPanel />
              </div>
            </div>
            
            <div className="flex flex-col space-y-5 md:space-y-6">
              {/* Enhanced TV component */}
              <div className="animate-fade-in">
                <YouTubeVideo videoSrc="" title="Focus Music Player" />
              </div>
              
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border animate-fade-in shadow-md">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2">
                    <BarChart2 className={`h-4 w-4 ${getIconColor()}`} />
                    Weekly Progress
                  </h3>
                  <span className="text-xs text-muted-foreground">Last 7 days</span>
                </div>
                
                <div className="flex items-end justify-between h-[120px] px-2">
                  {getDayNames().map((day, index) => {
                    // Generate random heights for bars (in a real app, this would use actual data)
                    const percentage = (Array.isArray(weeklyFocusTime) && weeklyFocusTime[index] ? 
                      (weeklyFocusTime[index] / 3600) * 5 : 0); // Scale hours to percentage
                    const height = Math.max(5, Math.min(100, percentage)); // Min 5%, max 100%
                    
                    return (
                      <div key={index} className="flex flex-col items-center gap-1 w-full">
                        <div 
                          className={`w-full max-w-[20px] rounded-t ${index === 6 ? getIconColor() : 'bg-muted-foreground/30'}`} 
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-[10px] text-muted-foreground">{day}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-muted-foreground mr-1">Total:</span>
                    <span className="font-medium">{formatTime(Array.isArray(weeklyFocusTime) ? weeklyFocusTime.reduce((a, b) => a + b, 0) : 0)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground mr-1">Today:</span>
                    <span className="font-medium">{formatTime(Array.isArray(weeklyFocusTime) && weeklyFocusTime.length > 0 ? weeklyFocusTime[6] : 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className={`py-2 px-3 text-center text-[0.6rem] sm:text-xs text-muted-foreground border-t ${isMobile ? 'fixed bottom-0 w-full bg-background/80 backdrop-blur-sm z-10' : ''}`}>
        <p>FlowFocus - Advanced Progressive Pomodoro Timer © {new Date().getFullYear()}</p>
      </footer>
      
      <FocusRatingDialog 
        isOpen={showRatingDialog} 
        onClose={() => setShowRatingDialog(false)} 
      />
    </div>
  );
};

export default Index;
