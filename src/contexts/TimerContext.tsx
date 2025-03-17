
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type FocusRating = 'distracted' | 'okay' | 'focused' | 'flow';

interface TimerContextType {
  // Timer state
  duration: number;
  breakDuration: number;
  timeLeft: number;
  isRunning: boolean;
  isBreak: boolean;
  mode: 'work' | 'break';
  
  // Focus tracking
  focusRating: FocusRating | null;
  
  // Stats
  todayFocusTime: number;
  todayFlowStates: number;
  longestSession: number;
  totalSessions: number;
  
  // Actions
  setDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipTimer: () => void;
  rateFocus: (rating: FocusRating) => void;
  getNextDuration: (rating: FocusRating) => number;
  continueSession: () => void;
  toggleMode: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Timer settings
  const [duration, setDuration] = useState(5 * 60); // Default 5 minutes in seconds
  const [breakDuration, setBreakDuration] = useState(5 * 60); // Default 5 minutes break
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  
  // Focus tracking
  const [focusRating, setFocusRating] = useState<FocusRating | null>(null);
  
  // Stats - would be in localStorage in real app
  const [todayFocusTime, setTodayFocusTime] = useState(0);
  const [todayFlowStates, setTodayFlowStates] = useState(0);
  const [longestSession, setLongestSession] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  
  // Timer functionality
  useEffect(() => {
    let timerId: number | undefined;
    
    if (isRunning) {
      timerId = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            handleTimerComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRunning]);
  
  // Reset timer when duration changes
  useEffect(() => {
    if (!isRunning) {
      if (mode === 'work') {
        setTimeLeft(duration);
      } else {
        setTimeLeft(breakDuration);
      }
    }
  }, [duration, breakDuration, mode]);
  
  const handleTimerComplete = () => {
    // Play sound (would use real audio in production)
    const audio = new Audio('/notification.mp3');
    audio.play().catch(e => console.log('Audio play failed', e));
    
    setIsRunning(false);
    
    if (mode === 'work') {
      setTotalSessions(prev => prev + 1);
      setTodayFocusTime(prev => prev + duration);
      
      if (duration > longestSession) {
        setLongestSession(duration);
      }
      
      // Show focus rating dialog after work session
      toast("Session Complete", {
        description: "How was your focus during this session?",
        duration: 5000,
      });
      
    } else {
      // Break is over, go back to work mode
      setMode('work');
      setTimeLeft(duration);
      setIsBreak(false);
      
      toast("Break Complete", {
        description: "Ready to start your next focus session?",
        duration: 3000,
      });
    }
  };
  
  const startTimer = () => {
    setIsRunning(true);
  };
  
  const pauseTimer = () => {
    setIsRunning(false);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'work') {
      setTimeLeft(duration);
    } else {
      setTimeLeft(breakDuration);
    }
  };
  
  const skipTimer = () => {
    setIsRunning(false);
    if (mode === 'work') {
      setMode('break');
      setTimeLeft(breakDuration);
      setIsBreak(true);
      
      // Count the skipped session
      setTotalSessions(prev => prev + 1);
      setTodayFocusTime(prev => prev + (duration - timeLeft));
    } else {
      setMode('work');
      setTimeLeft(duration);
      setIsBreak(false);
    }
  };
  
  // Toggle between work and break modes
  const toggleMode = () => {
    if (isRunning) return; // Don't toggle while timer is running
    
    if (mode === 'work') {
      setMode('break');
      setTimeLeft(breakDuration);
      setIsBreak(true);
    } else {
      setMode('work');
      setTimeLeft(duration);
      setIsBreak(false);
    }
  };
  
  // Handle focus rating
  const rateFocus = (rating: FocusRating) => {
    setFocusRating(rating);
    
    if (rating === 'flow') {
      setTodayFlowStates(prev => prev + 1);
      toast("Flow State Detected!", {
        description: "Would you like to continue your session?",
      });
    } else {
      // Start break
      setMode('break');
      setTimeLeft(breakDuration);
      setIsBreak(true);
    }
  };
  
  // Calculate next duration based on focus rating
  const getNextDuration = (rating: FocusRating): number => {
    const currentMinutes = Math.floor(duration / 60);
    
    switch (rating) {
      case 'distracted':
        // Decrease by ~25% (minimum 1 minute)
        return Math.max(60, Math.floor(duration * 0.75));
      case 'okay':
        // Keep roughly the same
        return duration;
      case 'focused':
        // Increase slightly ~15%
        return Math.floor(duration * 1.15);
      case 'flow':
        // Increase more ~25%
        return Math.floor(duration * 1.25);
      default:
        return duration;
    }
  };
  
  // Continue session without a break (for flow state)
  const continueSession = () => {
    setMode('work');
    // If they were in flow, suggest a longer duration
    const newDuration = getNextDuration('flow');
    setDuration(newDuration);
    setTimeLeft(newDuration);
    setIsBreak(false);
    setFocusRating(null);
  };
  
  const value = {
    duration,
    breakDuration,
    timeLeft,
    isRunning,
    isBreak,
    mode,
    focusRating,
    todayFocusTime,
    todayFlowStates,
    longestSession,
    totalSessions,
    setDuration,
    setBreakDuration,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    rateFocus,
    getNextDuration,
    continueSession,
    toggleMode,
  };
  
  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
