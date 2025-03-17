
import React, { useState } from 'react';
import { Slider } from './ui/slider';
import { useTimer } from '../contexts/TimerContext';
import { Input } from './ui/input';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface DurationSliderProps {
  type: 'work' | 'break';
  min?: number;
  max?: number;
  step?: number;
}

const DurationSlider: React.FC<DurationSliderProps> = ({
  type,
  min = 1,
  max = 400, // Maximum 400 minutes
  step = 1,
}) => {
  const { duration, breakDuration, setDuration, setBreakDuration } = useTimer();
  const [showCustomInput, setShowCustomInput] = useState(false);
  
  const currentValue = type === 'work' 
    ? Math.floor(duration / 60) 
    : Math.floor(breakDuration / 60);

  const handleValueChange = (value: number[]) => {
    // Convert minutes to seconds
    const durationInSeconds = value[0] * 60;
    
    if (type === 'work') {
      setDuration(durationInSeconds);
    } else {
      setBreakDuration(durationInSeconds);
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      const durationInSeconds = value * 60;
      if (type === 'work') {
        setDuration(durationInSeconds);
      } else {
        setBreakDuration(durationInSeconds);
      }
    }
  };

  const toggleCustomInput = () => {
    setShowCustomInput(!showCustomInput);
  };
  
  const increaseValue = () => {
    const newValue = currentValue + step;
    if (newValue <= max) {
      const durationInSeconds = newValue * 60;
      if (type === 'work') {
        setDuration(durationInSeconds);
      } else {
        setBreakDuration(durationInSeconds);
      }
    }
  };
  
  const decreaseValue = () => {
    const newValue = currentValue - step;
    if (newValue >= min) {
      const durationInSeconds = newValue * 60;
      if (type === 'work') {
        setDuration(durationInSeconds);
      } else {
        setBreakDuration(durationInSeconds);
      }
    }
  };

  return (
    <div className="w-full mb-6 pixel-pattern p-4 border border-secondary/50">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium flex items-center gap-1">
          <Clock className={`h-4 w-4 ${type === 'work' ? 'text-primary' : 'text-focused'}`} />
          <span className="retro-label">{type === 'work' ? 'Work Duration' : 'Break Duration'}</span>
        </label>
        
        <div className="flex items-center">
          <div 
            className="retro-time-display px-3 py-1 rounded-none cursor-pointer border border-input hover:bg-secondary/50 transition-all duration-200 pixel-border"
            onClick={toggleCustomInput}
            title="Click to enter custom time"
          >
            <span className="text-sm font-medium">{currentValue}m</span>
          </div>
          
          <div className="flex flex-col ml-1">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-5 w-5 p-0" 
              onClick={increaseValue}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-5 w-5 p-0" 
              onClick={decreaseValue}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {showCustomInput ? (
        <div className="mb-2 flex items-center">
          <Input
            type="number"
            min={min}
            max={max}
            value={currentValue}
            onChange={handleCustomInputChange}
            className="w-full retro-input pixel-border rounded-none h-10"
            placeholder="Enter minutes"
          />
          <button 
            onClick={toggleCustomInput}
            className="ml-2 text-xs px-2 py-1 rounded-none bg-secondary hover:bg-secondary/80 transition-all pixel-border"
          >
            <span className="retro-text">DONE</span>
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <span className="text-xs w-8 text-center retro-text">{min}m</span>
          <Slider
            value={[currentValue]}
            min={min}
            max={60} // UI slider max is 60 for better UX
            step={step}
            onValueChange={handleValueChange}
            className="w-full mx-2 retro-slider"
          />
          <span className="text-xs w-8 text-center retro-text">60m</span>
        </div>
      )}
      
      {currentValue > 60 && !showCustomInput && (
        <div className="mt-1 text-xs text-muted-foreground text-center">
          <span className="retro-text">Custom duration: {currentValue}m</span>
        </div>
      )}
      
      <div className="mt-3 text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span className="retro-text">Quick presets:</span>
          <div className="flex gap-1">
            {[5, 15, 25, 45].map(preset => (
              <button
                key={preset}
                className="px-2 bg-secondary/50 hover:bg-secondary text-xs transition-colors pixel-border"
                onClick={() => {
                  const durationInSeconds = preset * 60;
                  if (type === 'work') {
                    setDuration(durationInSeconds);
                  } else {
                    setBreakDuration(durationInSeconds);
                  }
                }}
              >
                <span className="retro-text">{preset}m</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurationSlider;
