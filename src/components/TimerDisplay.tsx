
import React, { useState, useEffect, useRef } from 'react';
import { useTimer } from '../contexts/TimerContext';
import CircularProgress from './CircularProgress';
import { Play, Pause, RotateCcw, Clock, FastForward, Volume2, VolumeX, SkipForward, Volume1 } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
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
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [tickingEnabled, setTickingEnabled] = useState(false);
  const [pixelated, setPixelated] = useState(true);
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Create audio element only once
      if (!tickAudioRef.current) {
        tickAudioRef.current = new Audio('/tick.mp3');
        tickAudioRef.current.volume = 0.3;
      }
    }

    return () => {
      // Cleanup audio on component unmount
      if (tickAudioRef.current) {
        tickAudioRef.current.pause();
        tickAudioRef.current = null;
      }
    };
  }, []);

  // Play tick sound every second when timer is running
  useEffect(() => {
    let tickInterval: number | undefined;
    
    if (isRunning && tickingEnabled && tickAudioRef.current && soundEnabled) {
      // Play tick immediately on start
      try {
        tickAudioRef.current.currentTime = 0;
        tickAudioRef.current.play().catch(e => console.log('Audio play failed', e));
      } catch (error) {
        console.log('Error playing audio:', error);
      }
      
      // Set interval for subsequent ticks
      tickInterval = window.setInterval(() => {
        if (tickAudioRef.current && soundEnabled) {
          try {
            tickAudioRef.current.currentTime = 0;
            tickAudioRef.current.play().catch(e => console.log('Audio play failed', e));
          } catch (error) {
            console.log('Error playing audio:', error);
          }
        }
      }, 1000);
    }
    
    return () => {
      if (tickInterval) clearInterval(tickInterval);
    };
  }, [isRunning, tickingEnabled, soundEnabled]);

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress (0 to 1)
  const calculateProgress = (): number => {
    const totalDuration = mode === 'work' ? duration : breakDuration;
    if (totalDuration === 0) return 0; // Prevent division by zero
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
  
  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    toast(soundEnabled ? 'Sound disabled' : 'Sound enabled');
  };
  
  // Toggle ticking sound
  const toggleTicking = (enabled: boolean) => {
    setTickingEnabled(enabled);
    toast(enabled ? 'Ticking sound enabled' : 'Ticking sound disabled');
  };
  
  // Toggle pixel effects
  const togglePixelEffects = () => {
    setPixelated(!pixelated);
    toast(pixelated ? 'Modern mode activated' : 'Retro pixel mode activated');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-3 flex gap-3 items-center justify-center flex-wrap">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs flex items-center gap-1" 
          onClick={toggleSound}
        >
          {soundEnabled ? (
            <><Volume2 className="h-3 w-3" /> <span className="retro-text">SOUND ON</span></>
          ) : (
            <><VolumeX className="h-3 w-3" /> <span className="retro-text">SOUND OFF</span></>
          )}
        </Button>
        
        <div className="flex items-center gap-2 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded-none bg-background/50">
          <Volume1 className="h-3 w-3 text-muted-foreground" />
          <span className="retro-text text-xs">TICK</span>
          <Switch 
            checked={tickingEnabled}
            onCheckedChange={toggleTicking}
            className="retro-switch data-[state=checked]:bg-primary"
          />
        </div>
        
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
        className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${pixelated ? 'crt-effect' : ''}`}
        onClick={handleTimerClick}
        title="Click to toggle between work and break"
      >
        <CircularProgress
          progress={calculateProgress()}
          color={getColor()}
          size={280}
          strokeWidth={8}
          className="drop-shadow-md"
          pixelated={pixelated}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-5xl font-bold mb-2 transition-all duration-200 ${pixelated ? 'digital-clock' : 'retro-text font-mono tracking-tight'}`}>
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
            className={`w-12 h-12 rounded-full focus-button-scale ${pixelated ? 'pixel-button !rounded-none' : 'retro-button-outline border-2'}`}
          >
            <Pause className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            onClick={startTimer}
            variant="default"
            size="icon"
            className={`w-12 h-12 rounded-full focus-button-scale ${pixelated ? 'pixel-button !rounded-none' : 'retro-button'}`}
          >
            <Play className="h-6 w-6 ml-0.5" />
          </Button>
        )}

        <Button
          onClick={resetTimer}
          variant="outline"
          size="icon"
          className={`w-12 h-12 rounded-full focus-button-scale ${pixelated ? 'pixel-button !rounded-none' : 'retro-button-outline border-2'}`}
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        
        <Button
          onClick={skipTimer}
          variant="outline"
          size="icon"
          className={`w-12 h-12 rounded-full focus-button-scale ${pixelated ? 'pixel-button !rounded-none' : 'retro-button-outline border-2'}`}
          title="Skip to next phase"
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TimerDisplay;
