
import React from 'react';

interface CircularProgressProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 240,
  strokeWidth = 10,
  color = 'hsl(var(--primary))',
  backgroundColor = 'hsl(var(--secondary))',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = circumference * (1 - progress);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
      />
      
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dash}
        strokeLinecap="round"
        className="transition-all duration-300 ease-in-out"
      />
    </svg>
  );
};

export default CircularProgress;
