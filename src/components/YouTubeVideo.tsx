import React, { useState } from 'react';
import { Music, Volume2, Radio, Power, Zap, Tv, Disc, Album } from 'lucide-react';
import { Input } from './ui/input';
import { useIsMobile } from '../hooks/use-mobile';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

interface YouTubeVideoProps {
  videoSrc: string;
  title?: string;
}

// Pre-defined collection of YouTube videos for the DVD rack
const dvdCollection = [
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
  const [currentVideoSrc, setCurrentVideoSrc] = useState(videoSrc);
  const [showDvdInput, setShowDvdInput] = useState(false);
  const [inputVideoUrl, setInputVideoUrl] = useState('');
  const [isDvdInserted, setIsDvdInserted] = useState(false);
  const isMobile = useIsMobile();

  // Function to handle DVD insertion
  const handleInsertDvd = () => {
    if (inputVideoUrl.trim() === '') return;
    
    // Convert various YouTube URL formats to embed format
    let embedUrl = inputVideoUrl;
    
    // Handle youtube.com/watch?v= format
    if (inputVideoUrl.includes('youtube.com/watch?v=')) {
      const videoId = new URLSearchParams(inputVideoUrl.split('?')[1]).get('v');
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } 
    // Handle youtu.be/ format
    else if (inputVideoUrl.includes('youtu.be/')) {
      const videoId = inputVideoUrl.split('youtu.be/')[1].split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    // If it's not already an embed URL, try to convert it
    else if (!inputVideoUrl.includes('youtube.com/embed/')) {
      // Assume it's a video ID
      embedUrl = `https://www.youtube.com/embed/${inputVideoUrl}`;
    }
    
    setCurrentVideoSrc(embedUrl);
    setShowDvdInput(false);
    setIsDvdInserted(true);
    setInputVideoUrl('');
  };

  // Function to eject the DVD
  const handleEjectDvd = () => {
    setIsDvdInserted(false);
    setCurrentVideoSrc('');
  };

  // Function to play a DVD from the collection
  const playDvdFromCollection = (videoId: string) => {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    setCurrentVideoSrc(embedUrl);
    setIsDvdInserted(true);
  };

  return (
    <div className="mt-8 relative perspective-[1000px] w-full max-w-full overflow-hidden">
      {/* 3D TV Container with purple frame */}
      <div className="relative px-4 sm:px-6 md:px-10 py-6 md:py-10 overflow-visible transform-style-3d">
        {/* TV frame with 3D effects - updated to purple theme */}
        <div className="relative 
                      mx-auto
                      border-[15px] sm:border-[20px] md:border-[25px] border-[#6E59A5] dark:border-[#4E3980]
                      rounded-xl 
                      shadow-[6px_8px_0px_0px_rgba(0,0,0,0.5)] sm:shadow-[8px_12px_0px_0px_rgba(0,0,0,0.5)] md:shadow-[12px_15px_0px_0px_rgba(0,0,0,0.5)]
                      dark:shadow-[12px_15px_0px_0px_rgba(0,0,0,0.7)]
                      pt-4
                      transition-all duration-500 
                      hover:translate-y-[-4px] sm:hover:translate-y-[-6px] md:hover:translate-y-[-8px] 
                      hover:rotate-y-[3deg] sm:hover:rotate-y-[4deg] md:hover:rotate-y-[5deg]
                      transform-style-3d
                      w-full max-w-full sm:max-w-[95%] md:max-w-3xl
                      bg-gradient-to-b from-[#9b87f5] to-[#7E69AB]">
        
          {/* TV Top Panel with 3D buttons */}
          <div className="flex items-center justify-between mb-2 px-2 sm:px-3 md:px-5 py-1 sm:py-2 
                        bg-[#111111] dark:bg-[#0A0A0A] 
                        border-b-2 sm:border-b-3 md:border-b-4 border-[#000000]
                        shadow-[inset_0px_2px_5px_rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-[#D6BCFA] animate-pulse" />
              <h3 className="font-bold retro-text text-sm sm:text-base md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#E5DEFF] to-[#8B5CF6]">
                SYNTHWAVE TV
              </h3>
              <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 md:h-2 md:w-2 rounded-full bg-[#D6BCFA] animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <Tv className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#8B5CF6]" />
              <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-[#8B5CF6]" />
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
                <Power className={`h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${isPowered ? 'text-[#E5DEFF]' : 'text-[#8B5CF6]'}`} />
              </button>
            </div>
          </div>
          
          {/* TV Screen with 3D effects */}
          <div className="relative overflow-hidden 
                        border-[8px] sm:border-[12px] md:border-[16px] border-[#111111] 
                        bg-black rounded-md
                        shadow-[inset_0px_0px_30px_rgba(0,0,0,0.8)]">
            {/* Realistic TV Antenna */}
            {!isMobile && (
              <div className="absolute -top-10 sm:-top-12 md:-top-16 left-1/2 -translate-x-1/2 w-20 sm:w-30 md:w-40 h-6 sm:h-8 md:h-10 flex justify-center z-10">
                <div className="w-1 sm:w-1.5 md:w-2 h-10 sm:h-15 md:h-20 bg-gradient-to-t from-black to-[#333] transform -rotate-15 origin-bottom translate-x-3 sm:translate-x-4 md:translate-x-6 rounded-t-full"></div>
                <div className="w-1 sm:w-1.5 md:w-2 h-10 sm:h-15 md:h-20 bg-gradient-to-t from-black to-[#333] transform rotate-15 origin-bottom -translate-x-3 sm:-translate-x-4 md:-translate-x-6 rounded-t-full"></div>
                {/* Antenna tip light */}
                <div className="absolute -top-1 sm:-top-1.5 md:-top-2 left-1/2 -translate-x-1/2 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 rounded-full bg-purple-500/30 shadow-[0_0_10px_2px_rgba(147,51,234,0.5)] animate-pulse"></div>
              </div>
            )}
            
            {/* Screen with CRT effect */}
            <div className="relative pt-[56.25%] 
                          scan-lines 
                          after:content-['']
                          after:absolute
                          after:inset-0
                          after:bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]">
              {/* CRT curved corners - more pronounced */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-black opacity-50 rounded-br-[50px] sm:rounded-br-[75px] md:rounded-br-[100px]"></div>
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-black opacity-50 rounded-bl-[50px] sm:rounded-bl-[75px] md:rounded-bl-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-black opacity-50 rounded-tr-[50px] sm:rounded-tr-[75px] md:rounded-tr-[100px]"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-black opacity-50 rounded-tl-[50px] sm:rounded-tl-[75px] md:rounded-tl-[100px]"></div>
              </div>
              
              {/* Actual video iframe */}
              <iframe 
                className={`absolute inset-0 w-full h-full border-none z-10 transition-all duration-500 ${isPowered && currentVideoSrc ? 'opacity-100' : 'opacity-0'}`}
                src={currentVideoSrc}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              ></iframe>
              
              {/* DVD not inserted message */}
              {isPowered && !isDvdInserted && !currentVideoSrc && (
                <div className="absolute inset-0 z-15 flex flex-col items-center justify-center text-white/70">
                  <div className="text-base sm:text-xl md:text-2xl retro-text mb-1 sm:mb-2">NO DISC</div>
                  <div className="text-xs sm:text-sm retro-text animate-pulse">Please insert a DVD</div>
                  <div className="text-xs mt-2 retro-text">or select one from the rack below</div>
                </div>
              )}
              
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
              
              {/* Screen overlay effects - Enhanced but removed white layer */}
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
          
          {/* TV Bottom panel with 3D controls */}
          <div className="flex items-center justify-between px-2 sm:px-3 md:px-5 py-2 sm:py-2.5 md:py-3 
                        bg-gradient-to-b from-[#222222] to-[#111111] dark:from-[#1A1A1A] dark:to-[#000000]
                        border-t-2 sm:border-t-3 md:border-t-4 border-[#000000]">
            {/* TV Brand */}
            <div className="text-xs sm:text-sm retro-text text-[#D6BCFA] font-bold tracking-widest drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
              {isMobile ? "PT-3000" : "PURPLETRON 3000"}
            </div>
            
            {/* Control knobs with 3D effect */}
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#6E59A5] border border-[#222] sm:border-2 md:border-2 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
              <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#6E59A5] border border-[#222] sm:border-2 md:border-2 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
              {!isMobile && (
                <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-b from-[#8B5CF6] to-[#6E59A5] border border-[#222] sm:border-2 md:border-2 shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
              )}
            </div>
            
            {/* Channel display with neon glow */}
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-[#111] px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-0.5 md:py-1 rounded border border-[#333]">
              <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-[#D6BCFA] shadow-[0_0_8px_rgba(214,188,250,0.8)] animate-pulse"></span>
              <span className="text-[0.6rem] sm:text-xs retro-text text-[#8B5CF6] shadow-[0_0_5px_rgba(139,92,246,0.8)]">CH 84</span>
            </div>
          </div>
          
          {/* TV Stand with 3D perspective - updated to purple */}
          <div className="absolute -bottom-5 sm:-bottom-8 md:-bottom-10 left-0 right-0 flex justify-between px-8 sm:px-12 md:px-16">
            <div className="w-3 sm:w-4 md:w-6 h-5 sm:h-8 md:h-10 bg-gradient-to-b from-[#6E59A5] to-[#4E3980] dark:from-[#4E3980] dark:to-[#3C2A66] skew-x-[-20deg] rounded-b-md shadow-[5px_5px_0px_rgba(0,0,0,0.3)]"></div>
            <div className="w-3 sm:w-4 md:w-6 h-5 sm:h-8 md:h-10 bg-gradient-to-b from-[#6E59A5] to-[#4E3980] dark:from-[#4E3980] dark:to-[#3C2A66] skew-x-[20deg] rounded-b-md shadow-[5px_5px_0px_rgba(0,0,0,0.3)]"></div>
          </div>
        </div>
        
        {/* 3D Environment effects */}
        {/* Shadow underneath */}
        <div className="absolute -z-10 left-10 right-10 -bottom-3 sm:-bottom-4 md:-bottom-5 h-5 sm:h-8 md:h-10 blur-xl bg-black/40 rounded-full"></div>
        
        {/* TV glow/ambient lighting effect - updated to purple */}
        <div className="absolute -z-10 inset-0 blur-2xl bg-gradient-to-t from-[#8B5CF6]/30 via-[#D6BCFA]/20 to-transparent opacity-60"></div>
        
        {/* Random dust particles floating for depth perception */}
        {isPowered && Array.from({ length: isMobile ? 5 : 10 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white/50 rounded-full animate-float"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* DVD Player Component */}
      <div className="relative mx-auto mt-2 sm:mt-3 md:mt-4 max-w-xs sm:max-w-xl md:max-w-2xl">
        {/* DVD Player Body */}
        <div className="bg-gradient-to-b from-[#333] to-[#111] 
                     rounded-md p-2 sm:p-3 md:p-4 border-t-1 sm:border-t-2 border-[#444]
                     shadow-[0_5px_10px_-2px_rgba(0,0,0,0.3)]">
          
          {/* DVD Player Front Panel */}
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <div className="text-xs sm:text-sm retro-text text-[#D6BCFA] font-bold">
              {isMobile ? "PT-DVD" : "PURPLETRON DVD"}
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_rgba(139,92,246,0.4)] animate-pulse"></div>
              <div className="text-[0.6rem] sm:text-xs retro-text text-gray-400">
                {isDvdInserted ? "DISC LOADED" : "NO DISC"}
              </div>
            </div>
          </div>
          
          {/* DVD Player Controls */}
          <div className="flex items-center gap-2 justify-center border-t border-b border-[#444] py-1 sm:py-1.5 md:py-2 mb-2 sm:mb-2.5 md:mb-3">
            <button 
              onClick={() => setShowDvdInput(true)}
              disabled={showDvdInput}
              className="text-[0.6rem] sm:text-xs retro-text px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-0.5 md:py-1 rounded
                        bg-gradient-to-b from-[#444] to-[#222]
                        hover:from-[#555] hover:to-[#333]
                        active:from-[#333] active:to-[#111]
                        border border-[#555] text-white
                        shadow-[0_1px_2px_rgba(0,0,0,0.3)]
                        disabled:opacity-50 disabled:cursor-not-allowed"
            >
              INSERT DVD
            </button>
            
            <button 
              onClick={handleEjectDvd}
              disabled={!isDvdInserted}
              className="text-[0.6rem] sm:text-xs retro-text px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-0.5 md:py-1 rounded
                        bg-gradient-to-b from-[#444] to-[#222]
                        hover:from-[#555] hover:to-[#333]
                        active:from-[#333] active:to-[#111]
                        border border-[#555] text-white
                        shadow-[0_1px_2px_rgba(0,0,0,0.3)]
                        disabled:opacity-50 disabled:cursor-not-allowed"
            >
              EJECT
            </button>
          </div>
          
          {/* DVD URL Input */}
          {showDvdInput && (
            <div className="flex flex-col gap-1 sm:gap-2 border border-[#444] rounded p-1 sm:p-2 bg-[#222] mb-2 sm:mb-3">
              <div className="text-[0.6rem] sm:text-xs text-[#D6BCFA] retro-text">Insert YouTube Link:</div>
              <div className="flex gap-1 sm:gap-2">
                <Input 
                  value={inputVideoUrl}
                  onChange={(e) => setInputVideoUrl(e.target.value)}
                  placeholder="Paste YouTube video URL or ID"
                  className="flex-1 text-[0.6rem] sm:text-xs h-6 sm:h-8 bg-[#111] border-[#444] text-white retro-input focus-visible:ring-[#8B5CF6]"
                />
                <button 
                  onClick={handleInsertDvd}
                  className="text-[0.6rem] sm:text-xs retro-text px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-0.5 md:py-1 rounded
                            bg-gradient-to-b from-[#8B5CF6] to-[#6E59A5]
                            hover:from-[#9B87F5] hover:to-[#7E69AB]
                            active:from-[#6E59A5] active:to-[#4E3980]
                            text-white
                            shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                >
                  PLAY
                </button>
                <button 
                  onClick={() => setShowDvdInput(false)}
                  className="text-[0.6rem] sm:text-xs retro-text px-1 sm:px-1.5 md:px-2 py-0.5 md:py-1 rounded
                            bg-gradient-to-b from-[#444] to-[#222]
                            hover:from-[#555] hover:to-[#333]
                            active:from-[#333] active:to-[#111]
                            border border-[#555] text-white
                            shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
          
          {/* DVD Player Base with Lights */}
          <div className="flex justify-between items-center">
            <div className="flex gap-1 sm:gap-2">
              {Array.from({ length: isMobile ? 2 : 3 }).map((_, i) => (
                <div key={i} className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-[#8B5CF6] opacity-30"></div>
              ))}
            </div>
            <div className="text-[0.6rem] sm:text-xs retro-text text-[#D6BCFA]/50">
              {isMobile ? "DVD-P3K" : "MODEL DVD-P3000"}
            </div>
          </div>
        </div>
        
        {/* DVD Player Shadow */}
        <div className="absolute -z-10 left-2 right-2 -bottom-1 sm:-bottom-1.5 md:-bottom-2 h-3 sm:h-4 md:h-6 blur-xl bg-black/40 rounded-full"></div>
      </div>

      {/* DVD Rack Component */}
      <div className="relative mx-auto mt-8 sm:mt-10 md:mt-12 max-w-full">
        <div className="bg-gradient-to-b from-[#4E3980] to-[#1A1F2C] p-3 sm:p-4 md:p-5 rounded-lg border border-[#6E59A5] shadow-lg">
          <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
            <h3 className="font-bold text-sm sm:text-base md:text-lg text-[#D6BCFA] retro-text">DVD COLLECTION</h3>
            <Disc className="h-4 w-4 sm:h-5 sm:w-5 text-[#9b87f5]" />
          </div>
          
          <Carousel 
            opts={{
              align: "start",
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {dvdCollection.map((dvd, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <div 
                    className="group cursor-pointer" 
                    onClick={() => playDvdFromCollection(dvd.id)}
                  >
                    {/* DVD Case */}
                    <div className={`relative h-32 sm:h-40 md:h-48 rounded-md overflow-hidden border-2 border-[#6E59A5] group-hover:border-[#D6BCFA] transition-all duration-300 shadow-md group-hover:shadow-[#8B5CF6]/20 ${dvd.color}`}>
                      {/* DVD Cover Art */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-2 sm:p-3">
                        <Album className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white/80 mb-2" />
                        <div className="text-xs sm:text-sm font-bold text-white text-center line-clamp-1">{dvd.title}</div>
                        <div className="text-[10px] sm:text-xs text-white/80 text-center line-clamp-2 mt-1">{dvd.description}</div>
                      </div>
                      
                      {/* Reflection/Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* DVD Label */}
                    <div className="mt-2 text-center">
                      <p className="text-xs sm:text-sm font-medium text-[#D6BCFA] truncate">{dvd.title}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 sm:-left-12 md:-left-12 top-1/3 bg-[#6E59A5] hover:bg-[#8B5CF6] text-white" />
            <CarouselNext className="absolute right-0 sm:-right-12 md:-right-12 top-1/3 bg-[#6E59A5] hover:bg-[#8B5CF6] text-white" />
          </Carousel>
        </div>
      </div>

      {/* Add custom CSS for 3D perspective and animations */}
      <style>
        {`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .perspective-[1000px] {
          perspective: 1000px;
        }
        
        .rotate-y-[5deg] {
          transform: rotateY(5deg);
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
        `}
      </style>
    </div>
  );
};

export default YouTubeVideo;
