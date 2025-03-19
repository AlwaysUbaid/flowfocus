
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
  
  useEffect(() => {
    if (timeLeft % 60 === 0 && timeLeft > 0 && isRunning) {
      setPulseEffect(true);
      setTimeout(() => setPulseEffect(false), 1000);
    }
  }, [timeLeft, isRunning]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = (): number => {
    const totalDuration = mode === 'work' ? duration : breakDuration;
    if (totalDuration === 0) return 0;
    return timeLeft / totalDuration;
  };

  const getColor = (): string => {
    return mode === 'work' ? 'hsl(var(--primary))' : 'hsl(var(--focused))';
  };

  const handleTimerClick = () => {
    if (!isRunning) {
      toggleMode();
      toast(mode === 'work' ? 'Switched to Break Mode' : 'Switched to Work Mode');
    }
  };
  
  const togglePixelEffects = () => {
    setPixelated(!pixelated);
    toast(pixelated ? 'Modern mode activated' : 'Retro pixel mode activated');
  };

  const applyPreset = (seconds: number) => {
    if (mode === 'work') {
      setDuration(seconds);
    } else {
      setBreakDuration(seconds);
    }
    toast(`Set ${mode} duration to ${formatTime(seconds)}`);
  };

  const togglePresets = () => {
    setShowPresets(!showPresets);
  };

  // Adjust timer size based on screen size
  // Increase mobile size significantly
  let timerSize = 300; // Larger default for desktop
  let strokeWidth = 8;
  
  if (isMobile) {
    timerSize = 280; // Increased from 240 for mobile
    strokeWidth = 8; // Increased from 6 for better visibility
  } else if (isTablet) {
    timerSize = 290; // Slightly larger for tablets
    strokeWidth = 8;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <div 
        className={`relative cursor-pointer transition-all duration-300 hover:scale-102 ${
          pulseEffect ? 'animate-pulse' : ''
        } ${pixelated ? 'crt-effect' : ''} timer-container`}
        onClick={handleTimerClick}
        title="Click to toggle between work and break"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none rounded-full"></div>
        
        <CircularProgress
          progress={calculateProgress()}
          color={getColor()}
          size={timerSize}
          strokeWidth={strokeWidth}
          className={`drop-shadow-xl ${pulseEffect ? 'animate-pulse' : ''}`}
          pixelated={pixelated}
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-4xl sm:text-5xl font-bold mb-1 sm:mb-2 transition-all duration-300 ${
            pixelated ? 'digital-clock retro-glow' : 'retro-text font-mono tracking-tight'
          }`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="mode-badge">{mode === 'work' ? 'WORK MODE' : 'BREAK MODE'}</span>
          </div>
        </div>
        
        <Button
          onClick={(e) => {
            e.stopPropagation();
            togglePresets();
          }}
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-70 hover:opacity-100 transition-opacity bg-background/40 backdrop-blur-sm"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-4 sm:gap-5 mt-6 sm:mt-8">
        {isRunning ? (
          <Button
            onClick={pauseTimer}
            variant="outline"
            size="icon"
            className={`w-14 h-14 rounded-full focus-button-scale shadow-md ${
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
            className={`w-14 h-14 rounded-full focus-button-scale shadow-md ${
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
      
      <div className="mt-4 flex justify-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs flex items-center gap-1 bg-primary/10 hover:bg-primary/20 transition-all" 
          onClick={togglePixelEffects}
        >
          <FastForward className="h-3 w-3" />
          <span className="retro-text">{pixelated ? 'PIXELATED' : 'MODERN'}</span>
        </Button>
      </div>
      
      {showPresets && (
        <div className={`mt-4 bg-background/90 backdrop-blur-md rounded-lg p-3 border animate-fade-in shadow-md ${pixelated ? 'pixel-border' : ''}`}>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs retro-text font-semibold">Quick presets:</span>
              <Zap className="h-3 w-3 text-primary" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_DURATIONS.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(preset.value)}
                  className={`text-xs ${pixelated ? 'pixel-button h-8' : 'h-8'} hover:bg-primary/20 hover:text-primary font-medium`}
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
