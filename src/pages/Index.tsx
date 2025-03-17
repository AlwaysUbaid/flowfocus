
import React, { useState, useEffect } from 'react';
import { useTimer } from '../contexts/TimerContext';
import Header from '../components/Header';
import TimerDisplay from '../components/TimerDisplay';
import DurationSlider from '../components/DurationSlider';
import StatsPanel from '../components/StatsPanel';
import InfoPanel from '../components/InfoPanel';
import FocusRatingDialog from '../components/FocusRatingDialog';
import YouTubeVideo from '../components/YouTubeVideo';
import { useIsMobile } from '../hooks/use-mobile';
import { toast } from 'sonner';

const Index = () => {
  const { timeLeft, mode, isRunning } = useTimer();
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const isMobile = useIsMobile();
  
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
      
      <main className="flex-1 container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 overflow-x-hidden">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="flex flex-col">
            <div className="text-center md:text-left mb-3 sm:mb-4 md:mb-6">
              <h1 className="text-lg sm:text-xl font-bold mb-1">Progressive Pomodoro Timer</h1>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Start small, build momentum, achieve flow.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-3 sm:p-4 md:p-6 border shadow-sm mb-4 sm:mb-5 md:mb-6">
              <DurationSlider type="work" />
              <DurationSlider type="break" />
              
              <div className="mt-3 sm:mt-4 flex justify-center">
                <TimerDisplay />
              </div>
            </div>
            
            <div className="mt-auto">
              <StatsPanel />
            </div>
          </div>
          
          <div className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6">
            {!isMobile && <InfoPanel />}
            
            <div className="bg-card rounded-lg p-3 sm:p-4 md:p-5 border">
              <h3 className="font-semibold mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base">Today's Progress</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-center">
                <div className="border rounded-lg p-2 sm:p-3 md:p-4">
                  <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold">0h</div>
                  <div className="text-[0.6rem] sm:text-xs text-muted-foreground mt-1">Focus Time</div>
                </div>
                
                <div className="border rounded-lg p-2 sm:p-3 md:p-4">
                  <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold">0</div>
                  <div className="text-[0.6rem] sm:text-xs text-muted-foreground mt-1">Flow States</div>
                </div>
                
                <div className="border rounded-lg p-2 sm:p-3 md:p-4">
                  <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold">0m</div>
                  <div className="text-[0.6rem] sm:text-xs text-muted-foreground mt-1">Longest Session</div>
                </div>
              </div>
            </div>
            
            {/* Add YouTube Video component - updated to use an empty video source initially */}
            <YouTubeVideo 
              videoSrc="" 
              title="Focus Music Player" 
            />
            
            {/* Show InfoPanel at the bottom on mobile */}
            {isMobile && <InfoPanel />}
          </div>
        </div>
      </main>
      
      <footer className="py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-center text-[0.6rem] sm:text-xs md:text-sm text-muted-foreground border-t">
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
