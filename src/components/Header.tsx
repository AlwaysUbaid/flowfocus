
import React from 'react';
import { Zap, Twitter, Gamepad } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { useIsMobile } from '../hooks/use-mobile';
import ThemeSelector from './ThemeSelector';
import { toast } from '../hooks/use-toast';

const Header: React.FC = () => {
  const { color, pixelated, togglePixelated } = useTheme();
  const { isMobile } = useIsMobile();
  
  const getThemeClasses = () => {
    const baseClass = "w-full py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 flex items-center justify-between border-b bg-background/90 backdrop-blur-sm sticky top-0 z-10 retro-header scan-lines";
    
    switch (color) {
      case 'purple':
        return `${baseClass} theme-purple-header`;
      case 'blue':
        return `${baseClass} theme-blue-header`;
      case 'green':
        return `${baseClass} theme-green-header`;
      case 'retro':
        return `${baseClass} theme-retro-header`;
      default:
        return baseClass;
    }
  };

  const handleRetroToggle = () => {
    togglePixelated();
  };

  return (
    <header className={getThemeClasses()}>
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
      
      <div className="flex items-center gap-2 sm:gap-3">
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
        
        <ThemeSelector />
        
        {isMobile ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetroToggle}
            className={`text-[0.65rem] h-7 items-center gap-1 pixel-border ${pixelated ? 'bg-primary/10 text-primary' : 'bg-muted/70 text-muted-foreground'} rounded-none`}
          >
            <Gamepad className="h-3 w-3" />
            <span className="retro-text truncate">{pixelated ? 'RETRO' : 'MODERN'}</span>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetroToggle}
            className={`hidden md:flex items-center gap-1 pixel-border ${pixelated ? 'bg-primary/20 text-primary' : 'bg-muted/70 text-muted-foreground'} ml-1 text-xs py-1 rounded-none`}
          >
            <Gamepad className="h-3.5 w-3.5" />
            <span className="retro-text">{pixelated ? 'RETRO MODE' : 'MODERN MODE'}</span>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
