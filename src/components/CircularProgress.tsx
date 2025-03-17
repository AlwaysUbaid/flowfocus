
import React from 'react';

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
  size = 240,
  strokeWidth = 10,
  color = 'hsl(var(--primary))',
  backgroundColor = 'hsl(var(--secondary))',
  className = '',
  pixelated = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = circumference * (1 - progress);

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`} 
      className={`transform -rotate-90 retro-progress ${pixelated ? 'pixel-progress' : ''} ${className}`}
    >
      {/* Inner glow effect */}
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* CRT screen effect */}
      <filter id="crtEffect">
        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="1" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
      </filter>

      {/* Subtle background pattern */}
      <defs>
        <pattern id="diagonalPattern" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="2" height="8" fill="rgba(255,255,255,0.05)" />
        </pattern>
        <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="none" stroke="rgba(130, 87, 229, 0.1)" strokeWidth="1" />
        </pattern>
      </defs>
      
      {/* Background pattern circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius + strokeWidth/2}
        fill={pixelated ? "url(#gridPattern)" : "url(#diagonalPattern)"}
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
        strokeLinecap={pixelated ? "butt" : "round"}
        filter="url(#glow)"
        className="transition-all duration-300 ease-in-out retro-progress-indicator"
      />
      
      {/* Tick marks around the circle */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180);
        const x1 = size / 2 + (radius - 15) * Math.cos(angle);
        const y1 = size / 2 + (radius - 15) * Math.sin(angle);
        const x2 = size / 2 + (radius - 5) * Math.cos(angle);
        const y2 = size / 2 + (radius - 5) * Math.sin(angle);
        
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth={pixelated ? "3" : "2"}
            className="retro-tick"
            transform={`rotate(90, ${size/2}, ${size/2})`}
          />
        );
      })}
      
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
        />
      )}
    </svg>
  );
};

export default CircularProgress;
