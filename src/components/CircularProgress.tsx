
import React, { useEffect, useState } from 'react';

interface CircularProgressProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
  pixelated?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 280,
  strokeWidth = 10,
  color = 'hsl(var(--primary))',
  backgroundColor = 'hsl(var(--secondary))',
  className = '',
  pixelated = true
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(progress);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = circumference * (1 - animatedProgress);
  
  // Add smooth animation for progress changes
  useEffect(() => {
    const animationId = requestAnimationFrame(() => {
      setAnimatedProgress(progress);
    });
    
    return () => cancelAnimationFrame(animationId);
  }, [progress]);

  // Create tick marks
  const createTicks = () => {
    const ticks = [];
    const tickCount = 60; // One tick per minute/second
    
    for (let i = 0; i < tickCount; i++) {
      const angle = (i * (360 / tickCount)) * (Math.PI / 180);
      const tickLength = i % 5 === 0 ? 10 : 5; // Longer ticks for every 5 marks
      
      const x1 = size / 2 + (radius - tickLength) * Math.cos(angle);
      const y1 = size / 2 + (radius - tickLength) * Math.sin(angle);
      const x2 = size / 2 + radius * Math.cos(angle);
      const y2 = size / 2 + radius * Math.sin(angle);
      
      ticks.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeOpacity={i % 5 === 0 ? "0.5" : "0.3"}
          strokeWidth={i % 5 === 0 ? "2" : "1.5"}
          className={`retro-tick ${pixelated ? 'pixel-tick' : ''}`}
          transform={`rotate(90, ${size/2}, ${size/2})`}
        />
      );
    }
    
    return ticks;
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`} 
      className={`transform -rotate-90 retro-progress ${pixelated ? 'pixel-progress' : ''} ${className}`}
    >
      {/* Filters and Effects */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="crtEffect">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="rgba(130, 87, 229, 0.3)" />
          <stop offset="100%" stopColor="rgba(130, 87, 229, 0)" />
        </radialGradient>

        <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="none" stroke="rgba(130, 87, 229, 0.15)" strokeWidth="1" />
        </pattern>
      </defs>
      
      {/* Background glow */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius + 20}
        fill="url(#glowGradient)"
        className="animate-pulse"
      />
      
      {/* Grid pattern background */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius + strokeWidth/2}
        fill={pixelated ? "url(#gridPattern)" : "none"}
        className="retro-progress-bg"
      />

      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
        strokeOpacity="0.5"
        className="retro-progress-bg-stroke"
      />

      {/* Progress track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={backgroundColor}
        strokeOpacity="0.3"
        strokeWidth={strokeWidth - 2}
        strokeDasharray={pixelated ? "4,4" : "4,4"}
        className={`retro-progress-track ${pixelated ? 'pixel-track' : ''}`}
      />
      
      {/* Progress circle with animation */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dash}
        strokeLinecap={pixelated ? "butt" : "round"}
        filter="url(#glow)"
        className="transition-all duration-300 ease-in-out retro-progress-indicator"
      />
      
      {/* Tick marks */}
      {createTicks()}
      
      {/* Pixelated overlay for CRT effect */}
      {pixelated && (
        <rect
          x="0"
          y="0"
          width={size}
          height={size}
          fill="none"
          filter="url(#crtEffect)"
          opacity="0.02"
          className="animate-pulse"
        />
      )}
    </svg>
  );
};

export default CircularProgress;
