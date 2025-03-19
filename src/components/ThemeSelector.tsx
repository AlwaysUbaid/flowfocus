
import React, { useState } from 'react';
import { MoonStar, Sun, Palette, X, Settings, Circle, Triangle, Square } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { useIsMobile } from '../hooks/use-mobile';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const ThemeSelector: React.FC = () => {
  const { mode, setMode, color, setColor } = useTheme();
  const { isMobile } = useIsMobile();
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);

  // Color theme options with improved icons
  const colorThemes = [
    { id: 'default', name: 'Default', color: 'bg-primary', icon: <Circle className="h-3 w-3" /> },
    { id: 'purple', name: 'Purple', color: 'bg-[#8B5CF6]', icon: <Circle className="h-3 w-3" /> },
    { id: 'blue', name: 'Ocean', color: 'bg-[#0EA5E9]', icon: <Circle className="h-3 w-3" /> },
    { id: 'green', name: 'Forest', color: 'bg-[#10B981]', icon: <Triangle className="h-3 w-3" /> },
    { id: 'retro', name: 'Retro+', color: 'bg-[#D946EF]', icon: <Square className="h-3 w-3" /> },
  ];

  // Mobile theme selector
  if (isMobile) {
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsThemeDialogOpen(true)}
                className="w-8 h-8 rounded-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background to-secondary/40 border-secondary/40 shadow-inner hover:shadow-sm hover:bg-secondary/20 transition-all duration-300"
              >
                <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
                <Palette className="h-4 w-4 relative z-10 text-primary" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Dialog open={isThemeDialogOpen} onOpenChange={setIsThemeDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center retro-title mb-4">Theme Settings</DialogTitle>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            
            <div className="space-y-6 py-2">
              <div>
                <h3 className="mb-3 text-sm font-medium retro-label">Mode</h3>
                <ToggleGroup 
                  type="single" 
                  defaultValue={mode}
                  onValueChange={(value) => value && setMode(value as 'light' | 'dark')}
                  className="flex w-full justify-between pixel-border"
                >
                  <ToggleGroupItem value="light" className="flex-1 retro-text">
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </ToggleGroupItem>
                  <ToggleGroupItem value="dark" className="flex-1 retro-text">
                    <MoonStar className="h-4 w-4 mr-2" />
                    Dark
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              <div>
                <h3 className="mb-3 text-sm font-medium retro-label">Color Theme</h3>
                <RadioGroup 
                  defaultValue={color}
                  onValueChange={(value) => setColor(value as any)}
                  className="grid grid-cols-2 gap-2"
                >
                  {colorThemes.map((theme) => (
                    <div 
                      key={theme.id} 
                      className={`flex items-center space-x-2 border rounded p-2 ${color === theme.id ? 'pixel-border bg-secondary/40' : 'border-muted'}`}
                    >
                      <RadioGroupItem value={theme.id} id={theme.id} className="peer sr-only" />
                      <div className={`h-4 w-4 rounded-full ${theme.color} flex items-center justify-center`}>
                        {theme.icon}
                      </div>
                      <label 
                        htmlFor={theme.id} 
                        className="retro-text flex-1 cursor-pointer"
                      >
                        {theme.name}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Desktop theme selector with improved appearance
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-9 h-9 rounded-full relative overflow-hidden bg-gradient-to-br from-background to-secondary/40 border-secondary/40 shadow-inner hover:shadow-sm hover:bg-secondary/20 transition-all duration-300"
              >
                <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div>
                <Palette className="h-4 w-4 relative z-10 text-primary" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Theme Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="end" className="w-56 pixel-bg">
        <DropdownMenuLabel className="retro-label">Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="p-2">
          <h4 className="mb-2 text-xs font-medium">Mode</h4>
          <ToggleGroup 
            type="single" 
            defaultValue={mode}
            onValueChange={(value) => value && setMode(value as 'light' | 'dark')}
            className="flex justify-between pixel-border w-full"
          >
            <ToggleGroupItem value="light" className="flex-1 retro-text text-xs">
              <Sun className="h-3 w-3 mr-1" />
              Light
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" className="flex-1 retro-text text-xs">
              <MoonStar className="h-3 w-3 mr-1" />
              Dark
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <DropdownMenuSeparator />
        
        <div className="p-2 space-y-2">
          <h4 className="mb-2 text-xs font-medium">Theme Colors</h4>
          {colorThemes.map((theme) => (
            <DropdownMenuItem 
              key={theme.id}
              className={`flex items-center cursor-pointer ${color === theme.id ? 'bg-secondary/60' : ''}`}
              onClick={() => setColor(theme.id as any)}
            >
              <div className={`h-4 w-4 rounded-full mr-2 ${theme.color} flex items-center justify-center`}>
                {theme.icon}
              </div>
              <span className="retro-text text-xs">{theme.name}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
