
import React from 'react';
import { useTimer } from '../contexts/TimerContext';
import CircularProgress from './CircularProgress';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
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
  } = useTimer();

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress (0 to 1)
  const calculateProgress = (): number => {
    const totalDuration = mode === 'work' ? duration : breakDuration;
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

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className="relative cursor-pointer transition-all duration-300 hover:scale-105" 
        onClick={handleTimerClick}
        title="Click to toggle between work and break"
      >
        <CircularProgress
          progress={calculateProgress()}
          color={getColor()}
          size={280}
          strokeWidth={8}
          className="drop-shadow-md"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold mb-2 font-mono tracking-tight retro-text transition-all duration-200">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm uppercase tracking-wider text-muted-foreground font-medium flex items-center gap-1">
            <Clock className="h-3 w-3 animate-pulse" />
            <span className="mode-badge">{mode === 'work' ? 'Work Mode' : 'Break Mode'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        {isRunning ? (
          <Button
            onClick={pauseTimer}
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full focus-button-scale border-2 retro-button-outline"
          >
            <Pause className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            onClick={startTimer}
            variant="default"
            size="icon"
            className="w-12 h-12 rounded-full focus-button-scale retro-button"
          >
            <Play className="h-6 w-6 ml-0.5" />
          </Button>
        )}

        <Button
          onClick={resetTimer}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full focus-button-scale border-2 retro-button-outline"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TimerDisplay;
