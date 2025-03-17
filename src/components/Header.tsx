
import React from 'react';
import { MoonStar, Sun, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b bg-background/90 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center">
        <Zap className="h-5 w-5 text-primary mr-2" />
        <h1 className="text-xl font-semibold">FlowFocus</h1>
      </div>
      
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <MoonStar className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
