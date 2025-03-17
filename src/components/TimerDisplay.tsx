
import React from 'react';
import { useTimer } from '../contexts/TimerContext';
import CircularProgress from './CircularProgress';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

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

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <CircularProgress
          progress={calculateProgress()}
          color={getColor()}
          size={280}
          strokeWidth={8}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold mb-2 font-mono tracking-tight">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
            {mode === 'work' ? 'Work Mode' : 'Break Mode'}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        {isRunning ? (
          <Button
            onClick={pauseTimer}
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full focus-button-scale border-2"
          >
            <Pause className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            onClick={startTimer}
            variant="default"
            size="icon"
            className="w-12 h-12 rounded-full focus-button-scale"
          >
            <Play className="h-6 w-6 ml-0.5" />
          </Button>
        )}

        <Button
          onClick={resetTimer}
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full focus-button-scale border-2"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TimerDisplay;
