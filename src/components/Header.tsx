
import React from 'react';
import { MoonStar, Sun, Zap, Twitter, Gamepad } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b bg-background/90 backdrop-blur-sm sticky top-0 z-10 retro-header scan-lines">
      <div className="flex items-center">
        <div className="flex items-center mr-2 h-6 w-6 bg-primary rounded-none p-1 pixel-border">
          <Zap className="h-4 w-4 text-white retro-icon" />
        </div>
        <h1 className="text-xl font-semibold retro-title tracking-tighter">FlowFocus</h1>
        <div className="ml-2 bg-black/10 dark:bg-white/10 rounded-none text-xs px-2 py-1 retro-text">
          <span className="text-primary font-bold">RETRO</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <a 
          href="https://x.com/AlfredAlpino" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-all flex items-center gap-1 retro-creator-link"
        >
          <span className="retro-text">by Ubaid</span>
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
        
        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex items-center gap-1 pixel-border bg-primary/20 text-primary ml-2 text-xs py-1 rounded-none"
        >
          <Gamepad className="h-3.5 w-3.5" />
          <span className="retro-text">RETRO MODE</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
