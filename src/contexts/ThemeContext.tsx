
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    // Apply theme to document
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  useEffect(() => {
    // Apply color theme
    document.documentElement.dataset.theme = color;
    
    // Remove all existing theme classes
    document.documentElement.classList.remove('theme-default', 'theme-purple', 'theme-blue', 'theme-green', 'theme-retro');
    
    // Add the appropriate theme class
    document.documentElement.classList.add(`theme-${color}`);
    
    // Save to localStorage
    localStorage.setItem('themeColor', color);
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
