
import React from 'react';
import { Slider } from './ui/slider';
import { useTimer } from '../contexts/TimerContext';

interface DurationSliderProps {
  type: 'work' | 'break';
  min?: number;
  max?: number;
  step?: number;
}

const DurationSlider: React.FC<DurationSliderProps> = ({
  type,
  min = 1,
  max = 60,
  step = 1,
}) => {
  const { duration, breakDuration, setDuration, setBreakDuration } = useTimer();

  const handleValueChange = (value: number[]) => {
    // Convert minutes to seconds
    const durationInSeconds = value[0] * 60;
    
    if (type === 'work') {
      setDuration(durationInSeconds);
    } else {
      setBreakDuration(durationInSeconds);
    }
  };

  const currentValue = type === 'work' 
    ? Math.floor(duration / 60) 
    : Math.floor(breakDuration / 60);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium">
          {type === 'work' ? 'Work Duration' : 'Break Duration'}
        </label>
        <span className="text-sm font-medium text-primary">{currentValue}m</span>
      </div>
      <Slider
        value={[currentValue]}
        min={min}
        max={max}
        step={step}
        onValueChange={handleValueChange}
        className="w-full"
      />
    </div>
  );
};

export default DurationSlider;
