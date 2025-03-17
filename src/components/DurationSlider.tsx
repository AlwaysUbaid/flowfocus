
import React, { useState } from 'react';
import { Slider } from './ui/slider';
import { useTimer } from '../contexts/TimerContext';
import { Input } from './ui/input';
import { Clock } from 'lucide-react';

interface DurationSliderProps {
  type: 'work' | 'break';
  min?: number;
  max?: number;
  step?: number;
}

const DurationSlider: React.FC<DurationSliderProps> = ({
  type,
  min = 1,
  max = 400, // Increased max to 400 minutes
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

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium flex items-center gap-1">
          <Clock className={`h-4 w-4 ${type === 'work' ? 'text-primary' : 'text-focused'}`} />
          <span className="retro-label">{type === 'work' ? 'Work Duration' : 'Break Duration'}</span>
        </label>
        
        <div 
          className="retro-time-display px-3 py-1 rounded cursor-pointer border border-input hover:bg-secondary/50 transition-all duration-200"
          onClick={toggleCustomInput}
          title="Click to enter custom time"
        >
          <span className="text-sm font-medium">{currentValue}m</span>
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
            className="w-full retro-input"
            placeholder="Enter minutes"
          />
          <button 
            onClick={toggleCustomInput}
            className="ml-2 text-xs px-2 py-1 rounded bg-secondary hover:bg-secondary/80 transition-all"
          >
            Done
          </button>
        </div>
      ) : (
        <Slider
          value={[currentValue]}
          min={min}
          max={60} // We keep the slider at max 60 for better UX, but allow custom input up to 400
          step={step}
          onValueChange={handleValueChange}
          className="w-full retro-slider"
        />
      )}
    </div>
  );
};

export default DurationSlider;
