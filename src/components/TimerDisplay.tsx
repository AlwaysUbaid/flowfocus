
import React, { useState, useEffect } from 'react';
import { useTimer } from '../contexts/TimerContext';
import CircularProgress from './CircularProgress';
import { Play, Pause, RotateCcw, Clock, FastForward, SkipForward, Zap, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useIsMobile } from '../hooks/use-mobile';

const PRESET_DURATIONS = [
  { label: '5m', value: 5 * 60 },
  { label: '15m', value: 15 * 60 },
  { label: '25m', value: 25 * 60 },
  { label: '45m', value: 45 * 60 },
];

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
    setDuration,
    setBreakDuration
  } = useTimer();
  
  const [pixelated, setPixelated] = useState(true);
  const { isMobile, isTablet } = useIsMobile();
  const [pulseEffect, setPulseEffect] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  
  // Add pulse effect every minute
  useEffect(() => {
    if (timeLeft % 60 === 0 && timeLeft > 0 && isRunning) {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 1000);
    }
  }, [timeLeft, isRunning]);

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

  // Apply preset duration
  const applyPreset = (seconds: number) => {
    if (mode === 'work') {
      setDuration(seconds);
    } else {
      setBreakDuration(seconds);
    }
    toast(`Set ${mode} duration to ${formatTime(seconds)}`);
  };

  // Toggle presets visibility
  const togglePresets = () => {
    setShowPresets(!showPresets);
  };

  // Adjust timer size based on device
  let timerSize = 280;
  let strokeWidth = 8;
  
  if (isMobile) {
    timerSize = 240;
    strokeWidth = 6;
  } else if (isTablet) {
    timerSize = 260;
    strokeWidth = 7;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
          pulseEffect ? 'animate-pulse' : ''
        } ${pixelated ? 'crt-effect' : ''}`}
        onClick={handleTimerClick}
        title="Click to toggle between work and break"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none rounded-lg"></div>
        
        <CircularProgress
          progress={calculateProgress()}
          color={getColor()}
          size={timerSize}
          strokeWidth={strokeWidth}
          className={`drop-shadow-lg ${pulseEffect ? 'animate-pulse' : ''}`}
          pixelated={pixelated}
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-5xl font-bold mb-1 sm:mb-2 transition-all duration-300 ${
            pixelated ? 'digital-clock retro-glow animate-pulse' : 'retro-text font-mono tracking-tight'
          }`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-medium flex items-center gap-1">
            <Clock className="h-3 w-3 animate-pulse" />
            <span className="mode-badge">{mode === 'work' ? 'WORK MODE' : 'BREAK MODE'}</span>
          </div>
        </div>
        
        {/* Settings button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            togglePresets();
          }}
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0 h-8 w-8 rounded-full opacity-70 hover:opacity-100 transition-opacity"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
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
              pixelated ? 'pixel-button !rounded-none animate-pulse' : 'retro-button animate-pulse'
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
      
      <div className="mt-3 flex justify-center">
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
      
      {/* Quick Presets */}
      {showPresets && (
        <div className={`mt-4 bg-background/80 backdrop-blur-md rounded-lg p-3 border animate-fade-in ${pixelated ? 'pixel-border' : ''}`}>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs retro-text">Quick presets:</span>
              <Zap className="h-3 w-3 text-primary animate-pulse" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_DURATIONS.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(preset.value)}
                  className={`text-xs ${pixelated ? 'pixel-button h-8' : 'h-8'}`}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerDisplay;
