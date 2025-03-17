
import React, { useState } from 'react';
import { Music, Volume2, Radio, Power } from 'lucide-react';

interface YouTubeVideoProps {
  videoSrc: string;
  title?: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ 
  videoSrc, 
  title = "YouTube video player" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPowered, setIsPowered] = useState(true);

  return (
    <div className="mt-8 relative">
      {/* TV Container with wooden frame */}
      <div className="relative px-6 pb-10 overflow-visible">
        {/* Wooden TV frame - pixelated style */}
        <div className="relative 
                      mx-auto
                      border-[20px] border-[#B08968] dark:border-[#8A6642]
                      rounded-lg 
                      shadow-[8px_12px_0px_0px_rgba(0,0,0,0.4)] 
                      dark:shadow-[8px_12px_0px_0px_rgba(0,0,0,0.6)]
                      pt-4
                      transition-all duration-300 hover:translate-y-[-5px]
                      max-w-3xl">
        
          {/* TV Top Panel with label and controls */}
          <div className="flex items-center justify-between mb-2 px-4 py-1 
                        bg-[#222222] dark:bg-[#1A1A1A] 
                        border-b-4 border-[#111111]">
            <div className="flex items-center gap-2">
              <Music className="h-5 w-5 text-[#FF5EBC] animate-pulse" />
              <h3 className="font-semibold retro-text text-lg text-[#FF5EBC]">
                SYNTH WAVE BEATS
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <Radio className="h-4 w-4 text-[#5EB9FF]" />
              <Volume2 className="h-4 w-4 text-[#5EB9FF]" />
              <button 
                onClick={() => setIsPowered(!isPowered)} 
                className="flex items-center justify-center h-6 w-6 bg-[#222] border-2 border-[#444] rounded-sm hover:bg-[#333]"
              >
                <Power className="h-4 w-4 text-[#5EB9FF]" />
              </button>
            </div>
          </div>
          
          {/* TV Screen */}
          <div className="relative overflow-hidden 
                        border-[16px] border-[#222222] 
                        bg-black rounded-sm">
            {/* TV Antenna */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-32 h-10 flex justify-center">
              <div className="w-2 h-14 bg-black transform -rotate-15 origin-bottom translate-x-4"></div>
              <div className="w-2 h-14 bg-black transform rotate-15 origin-bottom -translate-x-4"></div>
            </div>
            
            {/* Screen with content */}
            <div className="relative pt-[56.25%] 
                          scan-lines 
                          after:content-['']
                          after:absolute
                          after:inset-0
                          after:bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]">
              {/* CRT curved corners */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 bg-black opacity-40 rounded-br-[100px]"></div>
                <div className="absolute top-0 right-0 w-16 h-16 bg-black opacity-40 rounded-bl-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-black opacity-40 rounded-tr-[100px]"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-black opacity-40 rounded-tl-[100px]"></div>
              </div>
              
              {/* Actual video iframe */}
              <iframe 
                className={`absolute inset-0 w-full h-full border-none z-10 transition-opacity duration-300 ${isPowered ? 'opacity-100' : 'opacity-0'}`}
                src={videoSrc}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              ></iframe>
              
              {/* Power off screen */}
              {!isPowered && (
                <div className="absolute inset-0 z-20 bg-black flex items-center justify-center">
                  <div className="h-1 w-20 bg-white/20 animate-pulse"></div>
                </div>
              )}
              
              {/* Screen overlay effects */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Scan lines */}
                <div className="absolute inset-0 bg-scanline opacity-10"></div>
                
                {/* Static noise */}
                <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay"></div>
                
                {/* Screen glare */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_70%)]"></div>
                
                {/* VHS tracking lines - random horizontal lines */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="w-full h-[2px] bg-white/10 absolute opacity-0 tracking-line"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* TV Bottom panel with controls */}
          <div className="flex items-center justify-between px-4 py-3 
                        bg-[#222222] dark:bg-[#1A1A1A]
                        border-t-4 border-[#111111]">
            {/* TV Brand */}
            <div className="text-xs retro-text text-[#777] font-bold tracking-widest">
              PIXELTRON 2000
            </div>
            
            {/* Control knobs */}
            <div className="flex gap-3">
              <div className="w-4 h-4 rounded-full bg-[#444] border-2 border-[#222]"></div>
              <div className="w-4 h-4 rounded-full bg-[#444] border-2 border-[#222]"></div>
              <div className="w-4 h-4 rounded-full bg-[#444] border-2 border-[#222]"></div>
            </div>
            
            {/* Channel number */}
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF5EBC] animate-pulse"></span>
              <span className="text-xs retro-text text-[#5EB9FF]">CH 42</span>
            </div>
          </div>
          
          {/* TV Stand/Legs */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-12">
            <div className="w-4 h-8 bg-[#222] dark:bg-[#111]"></div>
            <div className="w-4 h-8 bg-[#222] dark:bg-[#111]"></div>
          </div>
        </div>
        
        {/* Decorative elements around TV */}
        <div className="absolute -z-10 left-0 right-0 -bottom-4 h-16 bg-gradient-to-t from-[#333]/20 to-transparent"></div>
        
        {/* TV glow effect */}
        <div className="absolute -z-10 inset-0 blur-xl bg-[#FF5EBC]/10 dark:bg-[#FF5EBC]/5 opacity-50"></div>
      </div>
    </div>
  );
};

export default YouTubeVideo;
