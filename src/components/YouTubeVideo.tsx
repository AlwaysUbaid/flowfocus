
import React, { useState, useEffect } from 'react';
import { Music, Album, Disc, Power } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useIsMobile } from '../hooks/use-mobile';
import { useTheme } from '../contexts/ThemeContext';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

interface YouTubeVideoProps {
  videoSrc: string;
  title?: string;
}

// Pre-defined playlist of YouTube videos with actual YouTube titles
const videoPlaylist = [
  { 
    id: "Fxv6LgHgMy0", 
    title: "Fantasy Music - Daydream Mix", 
    description: "Magical instrumental soundtrack",
    color: "bg-gradient-to-b from-[#9b87f5] to-[#6E59A5]" 
  },
  { 
    id: "KaGEVNdPcyc", 
    title: "Epic Fantasy Music", 
    description: "Adventure & relaxation music",
    color: "bg-gradient-to-b from-[#D6BCFA] to-[#8B5CF6]" 
  },
  { 
    id: "iPzmBKQVcjo", 
    title: "Medieval Fantasy Music", 
    description: "Celtic & fantasy soundtrack",
    color: "bg-gradient-to-b from-[#9B87F5] to-[#7E69AB]" 
  },
  { 
    id: "_MZb0Xbzz7Y", 
    title: "Celtic Fantasy Music", 
    description: "Mystical Celtic music",
    color: "bg-gradient-to-b from-[#E5DEFF] to-[#9B87F5]" 
  },
  { 
    id: "kyZZeS6nsFw", 
    title: "Fantasy Music - Magical Worlds", 
    description: "Mystical instrumental soundtrack",
    color: "bg-gradient-to-b from-[#7E69AB] to-[#4E3980]" 
  }
];

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ 
  videoSrc, 
  title = "YouTube video player" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPowered, setIsPowered] = useState(true);
  const [currentVideoSrc, setCurrentVideoSrc] = useState(videoSrc || `https://www.youtube.com/embed/${videoPlaylist[0].id}`);
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const { isMobile } = useIsMobile();
  const { color, mode } = useTheme();

  // Get theme-specific colors
  const getThemeColors = () => {
    switch (color) {
      case 'purple':
        return {
          primary: mode === 'dark' ? '#9d5cf7' : '#8B5CF6',
          secondary: mode === 'dark' ? '#7c3aed' : '#6E59A5',
          accent: mode === 'dark' ? '#6d28d9' : '#5f42a9',
          border: mode === 'dark' ? '#4c1d95' : '#4E3980',
          highlight: mode === 'dark' ? '#D6BCFA' : '#E5DEFF',
        };
      case 'blue':
        return {
          primary: mode === 'dark' ? '#38bdf8' : '#0EA5E9',
          secondary: mode === 'dark' ? '#0284c7' : '#0369A1',
          accent: mode === 'dark' ? '#0369a1' : '#075985',
          border: mode === 'dark' ? '#075985' : '#0C4A6E',
          highlight: mode === 'dark' ? '#BAE6FD' : '#E0F2FE',
        };
      case 'green':
        return {
          primary: mode === 'dark' ? '#22c55e' : '#10B981',
          secondary: mode === 'dark' ? '#16a34a' : '#047857',
          accent: mode === 'dark' ? '#15803d' : '#065F46',
          border: mode === 'dark' ? '#166534' : '#064E3B',
          highlight: mode === 'dark' ? '#BBF7D0' : '#DCFCE7',
        };
      case 'retro': 
        return {
          primary: mode === 'dark' ? '#e879f9' : '#D946EF',
          secondary: mode === 'dark' ? '#d946ef' : '#C026D3',
          accent: mode === 'dark' ? '#c026d3' : '#A21CAF',
          border: mode === 'dark' ? '#a21caf' : '#86198F',
          highlight: mode === 'dark' ? '#F5D0FE' : '#FAE8FF',
        };
      default: // Default theme
        return {
          primary: mode === 'dark' ? '#9b87f5' : '#8755FE',
          secondary: mode === 'dark' ? '#8755fe' : '#7E69AB',
          accent: mode === 'dark' ? '#7e69ab' : '#6E59A5',
          border: mode === 'dark' ? '#6e59a5' : '#4E3980',
          highlight: mode === 'dark' ? '#D6BCFA' : '#E5DEFF',
        };
    }
  };

  const themeColors = getThemeColors();

  // Function to handle custom video input
  const handleCustomVideo = () => {
    if (customVideoUrl.trim() === '') return;
    
    // Convert various YouTube URL formats to embed format
    let embedUrl = customVideoUrl;
    
    // Handle youtube.com/watch?v= format
    if (customVideoUrl.includes('youtube.com/watch?v=')) {
      const videoId = new URLSearchParams(customVideoUrl.split('?')[1]).get('v');
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } 
    // Handle youtu.be/ format
    else if (customVideoUrl.includes('youtu.be/')) {
      const videoId = customVideoUrl.split('youtu.be/')[1].split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    // If it's not already an embed URL, try to convert it
    else if (!customVideoUrl.includes('youtube.com/embed/')) {
      // Assume it's a video ID
      embedUrl = `https://www.youtube.com/embed/${customVideoUrl}`;
    }
    
    setCurrentVideoSrc(embedUrl);
    setShowCustomInput(false);
    setCustomVideoUrl('');
  };

  // Function to play a video from the playlist
  const playFromPlaylist = (videoId: string) => {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    setCurrentVideoSrc(embedUrl);
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Modern TV Container */}
      <div 
        className="relative rounded-xl overflow-hidden shadow-lg mx-auto w-full transition-all duration-300 hover:translate-y-[-4px]"
        style={{
          background: `linear-gradient(to bottom, ${themeColors.primary}80, ${themeColors.secondary}80)`
        }}
      >
        {/* TV Top Panel */}
        <div className="flex items-center justify-between p-2 sm:p-3 bg-black/80 border-b border-black/20">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm sm:text-base text-white">
              FOCUS MUSIC
            </h3>
            <div className="h-1.5 w-1.5 rounded-full animate-pulse"
                 style={{ backgroundColor: themeColors.highlight }}></div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsPowered(!isPowered)}
            className="h-6 w-6 sm:h-7 sm:w-7 rounded-full"
            style={{ backgroundColor: isPowered ? themeColors.primary + '30' : 'transparent' }}
          >
            <Power className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </Button>
        </div>
        
        {/* TV Screen */}
        <div className="relative bg-black overflow-hidden aspect-video">
          {/* Actual video iframe */}
          <iframe 
            className={`absolute inset-0 w-full h-full border-none z-10 transition-all duration-500 ${isPowered ? 'opacity-100' : 'opacity-0'}`}
            src={isPowered ? currentVideoSrc : ''}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          ></iframe>
          
          {/* Power off screen */}
          {!isPowered && (
            <div className="absolute inset-0 z-20 bg-black overflow-hidden flex items-center justify-center">
              <div className="h-1 w-20 sm:w-30 md:w-40 bg-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 animate-pulse"></div>
            </div>
          )}
          
          {/* Subtle screen effects */}
          <div className="absolute inset-0 pointer-events-none z-20 opacity-30">
            {/* Subtle scan lines */}
            <div className="absolute inset-0 bg-scanline opacity-10"></div>
            
            {/* Subtle glare/reflection */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent_80%)]"></div>
          </div>
        </div>
        
        {/* TV Bottom panel with minimal controls */}
        <div className="flex items-center justify-between p-2 sm:p-3 bg-black/90">
          {/* TV Brand */}
          <div className="text-xs sm:text-sm font-bold tracking-widest text-white/80">
            FLOWTRON
          </div>
          
          {/* Minimal control dots */}
          <div className="flex gap-2 sm:gap-3">
            {[1, 2].map((_, index) => (
              <div 
                key={index}
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                style={{
                  backgroundColor: index === 0 ? themeColors.highlight : themeColors.primary
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom URL Input */}
      {showCustomInput && (
        <div className="mt-4 p-3 bg-card rounded-lg border shadow-sm">
          <div className="text-sm font-medium mb-2">Enter YouTube URL:</div>
          <div className="flex gap-2">
            <Input 
              value={customVideoUrl}
              onChange={(e) => setCustomVideoUrl(e.target.value)}
              placeholder="Paste YouTube video URL or ID"
              className="flex-1"
            />
            <Button 
              onClick={handleCustomVideo}
              style={{ backgroundColor: themeColors.primary, color: 'white' }}
              className="hover:opacity-90"
            >
              Play
            </Button>
            <Button 
              onClick={() => setShowCustomInput(false)}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Playlist Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2">
            <Music className="h-4 w-4" style={{ color: themeColors.primary }} />
            Focus Music Playlist
          </h3>
          {!showCustomInput && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowCustomInput(true)}
              className="text-xs"
            >
              Add Custom
            </Button>
          )}
        </div>
        
        <Carousel 
          opts={{
            align: "start",
            loop: true
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {videoPlaylist.map((video, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <div 
                  className="group cursor-pointer" 
                  onClick={() => playFromPlaylist(video.id)}
                >
                  {/* Video Thumbnail */}
                  <div className="relative h-24 sm:h-28 md:h-32 rounded-md overflow-hidden border group-hover:border-opacity-100 transition-all duration-300 shadow-md group-hover:shadow-lg"
                       style={{ 
                         borderColor: themeColors.border, 
                         borderWidth: '1px',
                         background: `linear-gradient(to bottom, ${themeColors.primary}, ${themeColors.secondary})`,
                         boxShadow: `0 4px 6px -1px ${themeColors.primary}20`
                       }}>
                    {/* Album icon */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                      <Disc className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white/80 mb-1 sm:mb-2" />
                      <div className="text-[10px] sm:text-xs font-medium text-white text-center line-clamp-1">{video.title}</div>
                    </div>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Video title */}
                  <div className="mt-1 sm:mt-2">
                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{video.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 sm:-left-6 top-1/3 text-white" 
                           style={{ backgroundColor: `${themeColors.secondary}CC` }} />
          <CarouselNext className="absolute -right-4 sm:-right-6 top-1/3 text-white"
                       style={{ backgroundColor: `${themeColors.secondary}CC` }} />
        </Carousel>
      </div>

      {/* Add custom CSS for effects */}
      <style>
        {`
        .bg-scanline {
          background-image: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 1px,
            rgba(0, 0, 0, 0.3) 1px,
            rgba(0, 0, 0, 0.3) 2px
          );
          background-size: 100% 4px;
        }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        `}
      </style>
    </div>
  );
};

export default YouTubeVideo;
