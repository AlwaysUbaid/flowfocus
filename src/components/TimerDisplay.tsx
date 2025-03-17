
import React, { useState } from 'react';
import { useTimer } from '../contexts/TimerContext';
import CircularProgress from './CircularProgress';
import { Play, Pause, RotateCcw, Clock, FastForward, SkipForward } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const TimerDisplay: React.FC = () => {
  const {
    timeLeft,
    duration,
    breakDuration,
    isRunning,
    isBreak,
    mode,
    startTimer,
    pauseTimer,
    resetTimer,
    toggleMode,
    skipTimer,
  } = useTimer();
  
  const [pixelated, setPixelated] = useState(true);

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress (0 to 1)
  const calculateProgress = (): number => {
    const totalDuration = mode === 'work' ? duration : breakDuration;
    if (totalDuration === 0) return 0;
    return timeLeft / totalDuration;
  };

  // Get color based on mode
  const getColor = (): string => {
    return mode === 'work' ? 'hsl(var(--primary))' : 'hsl(var(--focused))';
  };

  // Handle clicking on the timer display to toggle between work and break
  const handleTimerClick = () => {
    if (!isRunning) {
      toggleMode();
      toast(mode === 'work' ? 'Switched to Break Mode' : 'Switched to Work Mode');
    }
  };
  
  // Toggle pixel effects
  const togglePixelEffects = () => {
    setPixelated(!pixelated);
    toast(pixelated ? 'Modern mode activated' : 'Retro pixel mode activated');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-3 flex justify-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs flex items-center gap-1" 
          onClick={togglePixelEffects}
        >
          <FastForward className="h-3 w-3" />
          <span className="retro-text">{pixelated ? 'PIXELATED' : 'MODERN'}</span>
        </Button>
      </div>
      
      <div 
        className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
          pixelated ? 'crt-effect retro-tv-frame' : ''
        }`}
        onClick={handleTimerClick}
        title="Click to toggle between work and break"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none rounded-lg"></div>
        
        {/* TV Antenna */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-8 flex justify-center">
          <div className="w-1 h-8 bg-gray-600 transform -rotate-45 origin-bottom"></div>
          <div className="w-1 h-8 bg-gray-600 transform rotate-45 origin-bottom"></div>
        </div>
        
        <CircularProgress
          progress={calculateProgress()}
          color={getColor()}
          size={280}
          strokeWidth={8}
          className="drop-shadow-lg"
          pixelated={pixelated}
        />
        
        {/* TV Screen Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-5xl font-bold mb-2 transition-all duration-200 ${
            pixelated ? 'digital-clock retro-glow' : 'retro-text font-mono tracking-tight'
          }`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm uppercase tracking-wider text-muted-foreground font-medium flex items-center gap-1">
            <Clock className="h-3 w-3 animate-pulse" />
            <span className="mode-badge">{mode === 'work' ? 'Work Mode' : 'Break Mode'}</span>
          </div>
        </div>
        
        {/* TV Knobs */}
        <div className="absolute -right-6 top-1/4 w-4 h-12 flex flex-col gap-4">
          <div className="w-4 h-4 rounded-full bg-gray-600"></div>
          <div className="w-4 h-4 rounded-full bg-gray-600"></div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        {isRunning ? (
          <Button
            onClick={pauseTimer}
            variant="outline"
            size="icon"
            className={`w-12 h-12 rounded-full focus-button-scale ${
              pixelated ? 'pixel-button !rounded-none' : 'retro-button-outline border-2'
            }`}
          >
            <Pause className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            onClick={startTimer}
            variant="default"
            size="icon"
            className={`w-12 h-12 rounded-full focus-button-scale ${
              pixelated ? 'pixel-button !rounded-none' : 'retro-button'
            }`}
          >
            <Play className="h-6 w-6 ml-0.5" />
          </Button>
        )}

        <Button
          onClick={resetTimer}
          variant="outline"
          size="icon"
          className={`w-12 h-12 rounded-full focus-button-scale ${
            pixelated ? 'pixel-button !rounded-none' : 'retro-button-outline border-2'
          }`}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        
        <Button
          onClick={skipTimer}
          variant="outline"
          size="icon"
          className={`w-12 h-12 rounded-full focus-button-scale ${
            pixelated ? 'pixel-button !rounded-none' : 'retro-button-outline border-2'
          }`}
          title="Skip to next phase"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TimerDisplay;
