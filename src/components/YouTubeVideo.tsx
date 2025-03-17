
import React, { useState } from 'react';
import { Music, Album, Disc } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useIsMobile } from '../hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

interface YouTubeVideoProps {
  videoSrc: string;
  title?: string;
}

// Pre-defined playlist of YouTube videos
const videoPlaylist = [
  { 
    id: "jfKfPfyJRdk", 
    title: "Lofi Hip Hop Radio", 
    description: "Beats to relax/study to",
    color: "bg-gradient-to-b from-[#9b87f5] to-[#6E59A5]" 
  },
  { 
    id: "rUxyKA_-grg", 
    title: "Deep Focus Music", 
    description: "Concentration & productivity",
    color: "bg-gradient-to-b from-[#D6BCFA] to-[#8B5CF6]" 
  },
  { 
    id: "lTRiuFIWV54", 
    title: "Study with Me", 
    description: "Pomodoro 25/5",
    color: "bg-gradient-to-b from-[#9B87F5] to-[#7E69AB]" 
  },
  { 
    id: "n61ULEU7CO0", 
    title: "Nature Sounds", 
    description: "Forest ambience",
    color: "bg-gradient-to-b from-[#E5DEFF] to-[#9B87F5]" 
  },
  { 
    id: "mPZkdNFkNps", 
    title: "Ambient Study Music", 
    description: "Improve focus & concentration",
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
  const isMobile = useIsMobile();

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
      {/* TV Container */}
      <div className="relative 
                    mx-auto
                    border-[15px] sm:border-[20px] md:border-[25px] border-[#6E59A5] dark:border-[#4E3980]
                    rounded-xl 
                    shadow-[6px_8px_0px_0px_rgba(0,0,0,0.5)] sm:shadow-[8px_12px_0px_0px_rgba(0,0,0,0.5)] md:shadow-[12px_15px_0px_0px_rgba(0,0,0,0.5)]
                    dark:shadow-[12px_15px_0px_0px_rgba(0,0,0,0.7)]
                    pt-4
                    transition-all duration-500 
                    hover:translate-y-[-4px] sm:hover:translate-y-[-6px] md:hover:translate-y-[-8px] 
                    transform-style-preserve-3d
                    w-full max-w-full sm:max-w-[95%] md:max-w-3xl
                    bg-gradient-to-b from-[#9b87f5] to-[#7E69AB]">
      
        {/* TV Top Panel with buttons */}
        <div className="flex items-center justify-between mb-2 px-2 sm:px-3 md:px-5 py-1 sm:py-2 
                      bg-[#111111] dark:bg-[#0A0A0A] 
                      border-b-2 sm:border-b-3 md:border-b-4 border-[#000000]
                      shadow-[inset_0px_2px_5px_rgba(255,255,255,0.1)]">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <h3 className="font-bold text-sm sm:text-base md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#E5DEFF] to-[#8B5CF6]">
              FOCUS MUSIC
            </h3>
            <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 md:h-2 md:w-2 rounded-full bg-[#D6BCFA] animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <button 
              onClick={() => setIsPowered(!isPowered)} 
              className="flex items-center justify-center h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 
                        bg-gradient-to-b from-[#333] to-[#111] 
                        border-2 border-[#444] rounded-md 
                        hover:from-[#444] hover:to-[#222]
                        shadow-[0_2px_4px_rgba(0,0,0,0.5)]
                        active:translate-y-[1px]
                        active:shadow-none
                        transition-all duration-150"
            >
              <div className={`h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 rounded-full ${isPowered ? 'bg-[#E5DEFF]' : 'bg-[#8B5CF6]'} shadow-[0_0_5px_rgba(139,92,246,0.8)]`}></div>
            </button>
          </div>
        </div>
        
        {/* TV Screen */}
        <div className="relative overflow-hidden 
                      border-[8px] sm:border-[12px] md:border-[16px] border-[#111111] 
                      bg-black rounded-md
                      shadow-[inset_0px_0px_30px_rgba(0,0,0,0.8)]">
          {/* Screen with CRT effect */}
          <div className="relative pt-[56.25%] 
                        scan-lines 
                        after:content-['']
                        after:absolute
                        after:inset-0
                        after:bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]">
            {/* CRT curved corners */}
            <div className="absolute inset-0 pointer-events-none z-20">
              <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-black opacity-50 rounded-br-[50px] sm:rounded-br-[75px] md:rounded-br-[100px]"></div>
              <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-black opacity-50 rounded-bl-[50px] sm:rounded-bl-[75px] md:rounded-bl-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-black opacity-50 rounded-tr-[50px] sm:rounded-tr-[75px] md:rounded-tr-[100px]"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-black opacity-50 rounded-tl-[50px] sm:rounded-tl-[75px] md:rounded-tl-[100px]"></div>
            </div>
            
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
            
            {/* Power off screen with scanlines and static */}
            {!isPowered && (
              <div className="absolute inset-0 z-20 bg-black overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-10"></div>
                <div className="h-1 w-20 sm:w-30 md:w-40 bg-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 animate-pulse"></div>
                
                {/* Static dots */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute bg-white/30 rounded-full"
                    style={{
                      width: `${Math.random() * 3 + 1}px`,
                      height: `${Math.random() * 3 + 1}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.5 + 0.1,
                    }}
                  ></div>
                ))}
              </div>
            )}
            
            {/* Screen overlay effects */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Scan lines */}
              <div className="absolute inset-0 bg-scanline opacity-20"></div>
              
              {/* Static noise - reduced opacity */}
              <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay"></div>
              
              {/* Screen glare/reflection - reduced */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_80%)]"></div>
              
              {/* Color distortion at edges - changed to purple tint */}
              <div className="absolute inset-0 opacity-8" style={{
                background: 'linear-gradient(to right, rgba(147,51,234,0.5) 0%, transparent 5%, transparent 95%, rgba(91,33,182,0.5) 100%)'
              }}></div>
              
              {/* VHS tracking lines */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="w-full h-[1px] sm:h-[1.5px] md:h-[2px] bg-white/20 absolute opacity-0 tracking-line"></div>
                <div className="w-full h-[1.5px] sm:h-[2px] md:h-[3px] bg-white/10 absolute opacity-0 tracking-line" style={{"--random-delay": "3", "--random-position": "200px"} as React.CSSProperties}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* TV Bottom panel with controls */}
        <div className="flex items-center justify-between px-2 sm:px-3 md:px-5 py-2 sm:py-2.5 md:py-3 
                      bg-gradient-to-b from-[#222222] to-[#111111] dark:from-[#1A1A1A] dark:to-[#000000]
                      border-t-2 sm:border-t-3 md:border-t-4 border-[#000000]">
          {/* TV Brand */}
          <div className="text-xs sm:text-sm text-[#D6BCFA] font-bold tracking-widest drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
            FLOWTRON
          </div>
          
          {/* Control knobs */}
          <div className="flex gap-2 sm:gap-3 md:gap-4">
            <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#6E59A5] border border-[#222] sm:border-2 md:border-2 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
            <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#6E59A5] border border-[#222] sm:border-2 md:border-2 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
            {!isMobile && (
              <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#6E59A5] border border-[#222] sm:border-2 md:border-2 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
            )}
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
              className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
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
            <Music className="h-4 w-4 text-[#8B5CF6]" />
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
                  <div className={`relative h-24 sm:h-28 md:h-32 rounded-md overflow-hidden border border-[#6E59A5] group-hover:border-[#D6BCFA] transition-all duration-300 shadow-md group-hover:shadow-[#8B5CF6]/20 ${video.color}`}>
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
          <CarouselPrevious className="absolute -left-4 sm:-left-6 top-1/3 bg-[#6E59A5]/80 hover:bg-[#8B5CF6] text-white" />
          <CarouselNext className="absolute -right-4 sm:-right-6 top-1/3 bg-[#6E59A5]/80 hover:bg-[#8B5CF6] text-white" />
        </Carousel>
      </div>

      {/* Add custom CSS for effects */}
      <style>
        {`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        @keyframes trackingLine {
          0% {
            opacity: 0;
            top: -10px;
          }
          10% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.1;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            top: 110%;
          }
        }
        
        .tracking-line {
          animation: trackingLine 10s linear infinite;
          animation-delay: calc(var(--random-delay, 0) * 1s);
          top: calc(var(--random-position, 0px) * 1);
        }
        
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
