
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '../hooks/use-toast';

// Define theme types
type ThemeMode = 'light' | 'dark';
type ThemeColor = 'default' | 'purple' | 'blue' | 'green' | 'retro';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  color: ThemeColor;
  setColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [color, setColor] = useState<ThemeColor>('default');

  useEffect(() => {
    // Check for user preference in localStorage or system preference
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    const savedColor = localStorage.getItem('themeColor') as ThemeColor;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode) {
      setMode(savedMode);
    } else if (systemPrefersDark) {
      setMode('dark');
    }

    if (savedColor) {
      setColor(savedColor);
    }
  }, []);

  // Apply theme mode to document
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('themeMode', mode);
    
    // Show toast notification
    toast({
      title: `${mode === 'dark' ? 'Dark' : 'Light'} Mode Activated`,
      description: `Theme switched to ${mode} mode`,
      duration: 3000,
    });
  }, [mode]);

  // Apply color theme
  useEffect(() => {
    // Apply color theme
    document.documentElement.dataset.theme = color;
    
    // Remove all existing theme classes
    document.documentElement.classList.remove('theme-default', 'theme-purple', 'theme-blue', 'theme-green', 'theme-retro');
    
    // Add the appropriate theme class
    document.documentElement.classList.add(`theme-${color}`);
    
    // Save to localStorage
    localStorage.setItem('themeColor', color);
    
    // Only show toast if not the initial load
    if (document.readyState === 'complete') {
      const colorNames = {
        default: 'Default Purple',
        purple: 'Rich Purple',
        blue: 'Ocean Blue',
        green: 'Forest Green',
        retro: 'Retro Pink'
      };
      
      toast({
        title: `${colorNames[color]} Theme Applied`,
        description: 'Color theme updated',
        duration: 3000,
      });
    }
  }, [color]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, color, setColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
