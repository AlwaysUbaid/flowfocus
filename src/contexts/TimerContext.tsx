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
  averageFocusTime: number;
  weeklyFocusTime: number;
  
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

interface StatsData {
  todayFocusTime: number;
  todayFlowStates: number;
  longestSession: number;
  totalSessions: number;
  sessionHistory: {
    date: string;
    duration: number;
    rating?: FocusRating;
  }[];
  lastUpdated: string;
}

const defaultStats: StatsData = {
  todayFocusTime: 0,
  todayFlowStates: 0,
  longestSession: 0,
  totalSessions: 0,
  sessionHistory: [],
  lastUpdated: new Date().toISOString().split('T')[0]
};

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
  
  // Stats with localStorage
  const [statsData, setStatsData] = useState<StatsData>(defaultStats);
  const [todayFocusTime, setTodayFocusTime] = useState(0);
  const [todayFlowStates, setTodayFlowStates] = useState(0);
  const [longestSession, setLongestSession] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [averageFocusTime, setAverageFocusTime] = useState(0);
  const [weeklyFocusTime, setWeeklyFocusTime] = useState(0);
  
  // Load stats from localStorage on initial load
  useEffect(() => {
    const loadStats = () => {
      try {
        const savedStats = localStorage.getItem('flowFocusStats');
        if (savedStats) {
          const parsedStats: StatsData = JSON.parse(savedStats);
          
          // Check if it's a new day, reset daily stats if needed
          const today = new Date().toISOString().split('T')[0];
          if (parsedStats.lastUpdated !== today) {
            // Keep historical data but reset today's counters
            setStatsData({
              ...parsedStats,
              todayFocusTime: 0,
              todayFlowStates: 0,
              lastUpdated: today
            });
          } else {
            setStatsData(parsedStats);
          }
        }
      } catch (error) {
        console.error('Error loading stats from localStorage:', error);
        // If there's an error, initialize with default stats
        setStatsData(defaultStats);
      }
    };
    
    loadStats();
  }, []);
  
  // Update state variables when statsData changes
  useEffect(() => {
    setTodayFocusTime(statsData.todayFocusTime);
    setTodayFlowStates(statsData.todayFlowStates);
    setLongestSession(statsData.longestSession);
    setTotalSessions(statsData.totalSessions);
    
    // Calculate average session time
    if (statsData.sessionHistory.length > 0) {
      const totalTime = statsData.sessionHistory.reduce((sum, session) => sum + session.duration, 0);
      setAverageFocusTime(Math.floor(totalTime / statsData.sessionHistory.length));
    }
    
    // Calculate weekly focus time
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
    
    const weeklyTime = statsData.sessionHistory
      .filter(session => {
        const sessionDate = new Date(session.date);
        return sessionDate >= startOfWeek;
      })
      .reduce((sum, session) => sum + session.duration, 0);
    
    setWeeklyFocusTime(weeklyTime);
    
  }, [statsData]);
  
  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flowFocusStats', JSON.stringify(statsData));
  }, [statsData]);
  
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
      // Update session history and stats
      const completedSessionDuration = duration;
      const today = new Date().toISOString().split('T')[0];
      
      setStatsData(prev => {
        const newSessionHistory = [
          ...prev.sessionHistory,
          { date: today, duration: completedSessionDuration }
        ];
        
        return {
          ...prev,
          todayFocusTime: prev.todayFocusTime + completedSessionDuration,
          totalSessions: prev.totalSessions + 1,
          longestSession: Math.max(prev.longestSession, completedSessionDuration),
          sessionHistory: newSessionHistory,
          lastUpdated: today
        };
      });
      
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
  
  // Handle focus rating - updated to save rating in session history
  const rateFocus = (rating: FocusRating) => {
    setFocusRating(rating);
    
    // Update the last session with the rating
    setStatsData(prev => {
      const updatedHistory = [...prev.sessionHistory];
      if (updatedHistory.length > 0) {
        const lastSession = updatedHistory[updatedHistory.length - 1];
        updatedHistory[updatedHistory.length - 1] = {
          ...lastSession,
          rating
        };
      }
      
      // If flow state, increment counter
      const newFlowStates = rating === 'flow' 
        ? prev.todayFlowStates + 1 
        : prev.todayFlowStates;
      
      return {
        ...prev,
        sessionHistory: updatedHistory,
        todayFlowStates: newFlowStates
      };
    });
    
    if (rating === 'flow') {
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
    averageFocusTime,
    weeklyFocusTime,
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
