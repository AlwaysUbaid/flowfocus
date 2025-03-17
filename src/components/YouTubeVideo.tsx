
import React, { useState } from 'react';
import { Music, Volume2, Radio, Power, Zap, Tv } from 'lucide-react';

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
    <div className="mt-8 relative perspective-[1000px]">
      {/* 3D TV Container with wooden frame */}
      <div className="relative px-10 py-10 overflow-visible transform-style-3d">
        {/* Wooden TV frame with 3D effects */}
        <div className="relative 
                      mx-auto
                      border-[25px] border-[#A47551] dark:border-[#8A6642]
                      rounded-xl 
                      shadow-[12px_15px_0px_0px_rgba(0,0,0,0.5)] 
                      dark:shadow-[12px_15px_0px_0px_rgba(0,0,0,0.7)]
                      pt-4
                      transition-all duration-500 
                      hover:translate-y-[-8px] 
                      hover:rotate-y-[5deg]
                      transform-style-3d
                      max-w-3xl
                      bg-gradient-to-b from-[#C49A6C] to-[#8A6642]">
        
          {/* TV Top Panel with 3D buttons */}
          <div className="flex items-center justify-between mb-2 px-5 py-2 
                        bg-[#111111] dark:bg-[#0A0A0A] 
                        border-b-4 border-[#000000]
                        shadow-[inset_0px_2px_5px_rgba(255,255,255,0.1)]">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-[#FF5EBC] animate-pulse" />
              <h3 className="font-bold retro-text text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF5EBC] to-[#5EB9FF]">
                SYNTHWAVE RADIO
              </h3>
              <div className="h-2 w-2 rounded-full bg-[#FF5EBC] animate-pulse"></div>
            </div>
            <div className="flex items-center gap-4">
              <Tv className="h-4 w-4 text-[#5EB9FF]" />
              <Volume2 className="h-4 w-4 text-[#5EB9FF]" />
              <button 
                onClick={() => setIsPowered(!isPowered)} 
                className="flex items-center justify-center h-7 w-7 
                          bg-gradient-to-b from-[#333] to-[#111] 
                          border-2 border-[#444] rounded-md 
                          hover:from-[#444] hover:to-[#222]
                          shadow-[0_2px_4px_rgba(0,0,0,0.5)]
                          active:translate-y-[1px]
                          active:shadow-none
                          transition-all duration-150"
              >
                <Power className={`h-4 w-4 ${isPowered ? 'text-[#FF5EBC]' : 'text-[#5EB9FF]'}`} />
              </button>
            </div>
          </div>
          
          {/* TV Screen with 3D effects */}
          <div className="relative overflow-hidden 
                        border-[16px] border-[#111111] 
                        bg-black rounded-md
                        shadow-[inset_0px_0px_30px_rgba(0,0,0,0.8)]">
            {/* Realistic TV Antenna */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-10 flex justify-center z-10">
              <div className="w-2 h-20 bg-gradient-to-t from-black to-[#333] transform -rotate-15 origin-bottom translate-x-6 rounded-t-full"></div>
              <div className="w-2 h-20 bg-gradient-to-t from-black to-[#333] transform rotate-15 origin-bottom -translate-x-6 rounded-t-full"></div>
              {/* Antenna tip light */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500/30 shadow-[0_0_10px_2px_rgba(255,0,0,0.5)] animate-pulse"></div>
            </div>
            
            {/* Screen with CRT effect */}
            <div className="relative pt-[56.25%] 
                          scan-lines 
                          after:content-['']
                          after:absolute
                          after:inset-0
                          after:bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]">
              {/* CRT curved corners - more pronounced */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute top-0 left-0 w-24 h-24 bg-black opacity-50 rounded-br-[100px]"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-black opacity-50 rounded-bl-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-50 rounded-tr-[100px]"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-black opacity-50 rounded-tl-[100px]"></div>
              </div>
              
              {/* Actual video iframe */}
              <iframe 
                className={`absolute inset-0 w-full h-full border-none z-10 transition-all duration-500 ${isPowered ? 'opacity-100' : 'opacity-0'}`}
                src={videoSrc}
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
                  <div className="h-1 w-40 bg-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 animate-pulse"></div>
                  
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
              
              {/* Screen overlay effects - enhanced */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Scan lines */}
                <div className="absolute inset-0 bg-scanline opacity-20"></div>
                
                {/* Static noise */}
                <div className="absolute inset-0 bg-noise opacity-8 mix-blend-overlay"></div>
                
                {/* Screen glare/reflection */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_80%)]"></div>
                
                {/* Color distortion at edges */}
                <div className="absolute inset-0 opacity-10" style={{
                  background: 'linear-gradient(to right, rgba(255,0,0,0.5) 0%, transparent 5%, transparent 95%, rgba(0,0,255,0.5) 100%)'
                }}></div>
                
                {/* VHS tracking lines */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="w-full h-[2px] bg-white/20 absolute opacity-0 tracking-line"></div>
                  <div className="w-full h-[3px] bg-white/10 absolute opacity-0 tracking-line" style={{"--random-delay": "3", "--random-position": "200px"} as React.CSSProperties}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* TV Bottom panel with 3D controls */}
          <div className="flex items-center justify-between px-5 py-3 
                        bg-gradient-to-b from-[#222222] to-[#111111] dark:from-[#1A1A1A] dark:to-[#000000]
                        border-t-4 border-[#000000]">
            {/* TV Brand */}
            <div className="text-sm retro-text text-[#999] font-bold tracking-widest drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
              PIXELTRON 3000
            </div>
            
            {/* Control knobs with 3D effect */}
            <div className="flex gap-4">
              <div className="w-5 h-5 rounded-full bg-gradient-to-b from-[#666] to-[#333] border-2 border-[#222] shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
              <div className="w-5 h-5 rounded-full bg-gradient-to-b from-[#666] to-[#333] border-2 border-[#222] shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
              <div className="w-5 h-5 rounded-full bg-gradient-to-b from-[#666] to-[#333] border-2 border-[#222] shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
            </div>
            
            {/* Channel display with neon glow */}
            <div className="flex items-center gap-2 bg-[#111] px-2 py-1 rounded border border-[#333]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF5EBC] shadow-[0_0_8px_rgba(255,94,188,0.8)] animate-pulse"></span>
              <span className="text-xs retro-text text-[#5EB9FF] shadow-[0_0_5px_rgba(94,185,255,0.8)]">CH 84</span>
            </div>
          </div>
          
          {/* TV Stand with 3D perspective */}
          <div className="absolute -bottom-10 left-0 right-0 flex justify-between px-16">
            <div className="w-6 h-10 bg-gradient-to-b from-[#333] to-[#111] dark:from-[#222] dark:to-[#000] skew-x-[-20deg] rounded-b-md shadow-[5px_5px_0px_rgba(0,0,0,0.3)]"></div>
            <div className="w-6 h-10 bg-gradient-to-b from-[#333] to-[#111] dark:from-[#222] dark:to-[#000] skew-x-[20deg] rounded-b-md shadow-[5px_5px_0px_rgba(0,0,0,0.3)]"></div>
          </div>
        </div>
        
        {/* 3D Environment effects */}
        {/* Shadow underneath */}
        <div className="absolute -z-10 left-10 right-10 -bottom-5 h-10 blur-xl bg-black/40 rounded-full"></div>
        
        {/* TV glow/ambient lighting effect */}
        <div className="absolute -z-10 inset-0 blur-2xl bg-gradient-to-t from-[#FF5EBC]/30 via-[#5EB9FF]/20 to-transparent opacity-60"></div>
        
        {/* Random dust particles floating for depth perception */}
        {isPowered && Array.from({ length: 10 }).map((_, i) => (
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

      {/* Add custom CSS for 3D perspective and animations */}
      <style>{`
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
      `}</style>
    </div>
  );
};

export default YouTubeVideo;
