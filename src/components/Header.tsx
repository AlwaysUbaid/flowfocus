
import React from 'react';
import { MoonStar, Sun, Zap, Twitter } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b bg-background/90 backdrop-blur-sm sticky top-0 z-10 retro-header">
      <div className="flex items-center">
        <Zap className="h-5 w-5 text-primary mr-2 retro-icon" />
        <h1 className="text-xl font-semibold retro-title">FlowFocus</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <a 
          href="https://x.com/AlfredAlpino" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-all flex items-center gap-1 retro-creator-link"
        >
          <span>by Ubaid</span>
          <Twitter className="h-3.5 w-3.5" />
        </a>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="retro-theme-toggle"
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
