
import React from 'react';
import { MoonStar, Sun, Zap, Twitter, Gamepad, Menu } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { useIsMobile } from '../hooks/use-mobile';
import ThemeSelector from './ThemeSelector';

const Header: React.FC = () => {
  const { mode, setMode } = useTheme();
  const { isMobile } = useIsMobile();

  return (
    <header className="w-full py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 flex items-center justify-between border-b bg-background/90 backdrop-blur-sm sticky top-0 z-10 retro-header scan-lines">
      <div className="flex items-center">
        <div className="flex items-center mr-2 h-5 w-5 sm:h-6 sm:w-6 bg-primary rounded-none p-1 pixel-border">
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-white retro-icon" />
        </div>
        <h1 className="text-lg sm:text-xl font-semibold retro-title tracking-tighter">FlowFocus</h1>
        {!isMobile && (
          <div className="ml-2 bg-black/10 dark:bg-white/10 rounded-none text-xs px-2 py-1 retro-text">
            <span className="text-primary font-bold">RETRO</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        {!isMobile && (
          <a 
            href="https://x.com/AlfredAlpino" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-all flex items-center gap-1 retro-creator-link pixel-border !rounded-none py-1 px-2"
            aria-label="Developed by Ubaid, visit Twitter profile"
          >
            <span className="retro-text">by Ubaid</span>
            <Twitter className="h-3.5 w-3.5" />
          </a>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          className="retro-theme-toggle h-8 w-8 sm:h-9 sm:w-9"
        >
          {mode === 'dark' ? (
            <Sun className="h-[1rem] w-[1rem] sm:h-[1.2rem] sm:w-[1.2rem]" />
          ) : (
            <MoonStar className="h-[1rem] w-[1rem] sm:h-[1.2rem] sm:w-[1.2rem]" />
          )}
        </Button>
        
        <ThemeSelector />
        
        {isMobile ? (
          <Button
            variant="outline"
            size="sm"
            className="text-[0.65rem] h-7 items-center gap-1 pixel-border bg-primary/10 text-primary rounded-none"
          >
            <Gamepad className="h-3 w-3" />
            <span className="retro-text truncate">RETRO</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-1 pixel-border bg-primary/20 text-primary ml-2 text-xs py-1 rounded-none"
          >
            <Gamepad className="h-3.5 w-3.5" />
            <span className="retro-text">RETRO MODE</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
