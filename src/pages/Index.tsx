
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

const Index = () => {
  const { timeLeft, mode, isRunning } = useTimer();
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const { isMobile, isTablet } = useIsMobile();
  
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto py-3 px-2 sm:py-4 sm:px-3 md:py-6 md:px-4 overflow-x-hidden">
        {/* Mobile: Full screen timer layout */}
        {isMobile ? (
          <div className="flex flex-col space-y-4 mb-16"> {/* Added bottom margin for fixed footer */}
            {/* Timer section - full screen on mobile */}
            <div className="flex justify-center items-center min-h-[40vh] -mt-2 mb-1">
              <TimerDisplay />
            </div>
            
            {/* Controls section */}
            <div className="bg-card/60 backdrop-blur-sm rounded-xl p-3 border shadow-sm animate-fade-in">
              <div className="text-center mb-2">
                <h1 className="text-base font-bold">Progressive Pomodoro</h1>
                <p className="text-xs text-muted-foreground">Start small, build momentum</p>
              </div>
              <DurationSlider type="work" />
              <DurationSlider type="break" />
              
              {/* Mobile theme selector */}
              <ThemeSelector />
            </div>
            
            {/* Stats section - simplified for mobile */}
            <StatsPanel />
            
            {/* Music Player - optimized for mobile */}
            <YouTubeVideo videoSrc="" title="Focus Music Player" />
            
            {/* Info panel moved to header with "?" icon */}
          </div>
        ) : (
          // Desktop layout - centered timer with controls and TV above
          <div className="grid lg:grid-cols-2 gap-6 pt-4">
            <div className="flex flex-col">
              <div className="text-center md:text-left mb-4 md:mb-5 animate-fade-in">
                <h1 className="text-lg sm:text-xl font-bold mb-1">Progressive Pomodoro Timer</h1>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Start small, build momentum, achieve flow.
                </p>
              </div>
              
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border shadow-sm mb-5 animate-scale-in">
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
              {/* Retro TV moved above */}
              <div className="animate-fade-in">
                <YouTubeVideo videoSrc="" title="Focus Music Player" />
              </div>
              
              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-4 md:p-5 border animate-fade-in">
                <h3 className="font-semibold mb-3 md:mb-4 text-sm sm:text-base">Weekly Progress</h3>
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  {/* We'll build more advanced stats here in future updates */}
                  <div className="border rounded-lg p-3 md:p-4 bg-card/50 text-center">
                    <div className="text-xs text-muted-foreground mb-2">Statistics saved in your browser</div>
                    <div className="text-sm">Your focus data is automatically saved locally</div>
                  </div>
                </div>
              </div>
              
              {/* About section removed from here, moved to header as "?" icon */}
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
