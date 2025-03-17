
import React, { useState } from 'react';
import { Music, Volume2, Radio } from 'lucide-react';

interface YouTubeVideoProps {
  videoSrc: string;
  title?: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ 
  videoSrc, 
  title = "YouTube video player" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="mt-6 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Music className="h-5 w-5 text-primary animate-pulse" />
          <h3 className="font-semibold retro-text text-lg bg-gradient-to-r from-primary to-focused bg-clip-text text-transparent">
            Focus Ambient Music
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-muted-foreground" />
          <Volume2 className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      <div className="relative overflow-hidden rounded-lg border-4 border-gray-600 dark:border-gray-400 
                    shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] 
                    dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]
                    bg-gradient-to-br from-gray-600 to-gray-800
                    dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900
                    transition-all duration-300 hover:scale-[1.02] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.4)]
                    dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.25)]">
        {/* TV Frame */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* TV Antenna */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-8 flex justify-center">
            <div className="w-1 h-8 bg-gray-600 dark:bg-gray-400 transform -rotate-45 origin-bottom"></div>
            <div className="w-1 h-8 bg-gray-600 dark:bg-gray-400 transform rotate-45 origin-bottom"></div>
          </div>
          
          {/* TV Knobs */}
          <div className="absolute -right-6 top-1/4 flex flex-col gap-4">
            <div className="w-4 h-4 rounded-full bg-gray-600 dark:bg-gray-400"></div>
            <div className="w-4 h-4 rounded-full bg-gray-600 dark:bg-gray-400"></div>
          </div>
          
          {/* TV Logo */}
          <div className="absolute bottom-3 right-3 bg-black/30 dark:bg-white/20 p-1 rounded-sm">
            <span className="text-primary font-bold text-xs retro-text tracking-widest">RETRO TV</span>
          </div>
        </div>
        
        {/* Scanlines and screen effects */}
        <div className="relative pt-[56.25%] before:absolute before:inset-0 before:z-10 
                      before:pointer-events-none before:rounded-[3px]
                      before:bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.15),transparent_80%)]
                      scan-lines group">
          <iframe 
            className="absolute inset-0 w-full h-full border-none group-hover:opacity-100 transition-opacity"
            src={videoSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          ></iframe>
          
          {/* Static effect overlay */}
          <div className="absolute inset-0 pointer-events-none bg-noise opacity-10 mix-blend-overlay"></div>
          
          {/* CRT tube effect - rounded corners inside */}
          <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
            <div className="absolute top-0 left-0 w-20 h-20 bg-black opacity-30 rounded-br-[100px]"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-black opacity-30 rounded-bl-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-black opacity-30 rounded-tr-[100px]"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-black opacity-30 rounded-tl-[100px]"></div>
            
            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-repeat-y bg-[length:100%_3px] opacity-10 mix-blend-overlay"></div>
          </div>
          
          {/* Flickering glow effect */}
          <div className="absolute inset-0 pointer-events-none rounded-lg opacity-40 animate-pulse bg-gradient-to-br from-primary/10 to-focused/10"></div>
        </div>
        
        {/* Power light */}
        <div className="absolute -left-2 bottom-4 w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_2px_rgba(74,222,128,0.6)] animate-pulse"></div>
      </div>
      
      {/* Channel indicator */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black/40 dark:bg-white/10 p-1 px-3 rounded-sm text-xs retro-text flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        <span>CHANNEL 42 • LOFI BEATS</span>
      </div>
    </div>
  );
};

export default YouTubeVideo;
