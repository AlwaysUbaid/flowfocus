
import React from 'react';

interface YouTubeVideoProps {
  videoSrc: string;
  title?: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ 
  videoSrc, 
  title = "YouTube video player" 
}) => {
  return (
    <div className="mt-6 relative">
      <h3 className="font-semibold mb-3 retro-text text-lg">Focus Ambient Music</h3>
      <div className="relative overflow-hidden rounded-lg border-4 border-gray-600 dark:border-gray-400 
                      shadow-[5px_5px_0px_0px_rgba(0,0,0,0.3)] 
                      dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]
                      bg-gradient-to-br from-gray-600 to-gray-800
                      dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900
                      before:absolute before:inset-0 before:z-10 
                      before:pointer-events-none before:rounded-[3px]
                      before:bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.12),transparent_80%)]
                      scan-lines">
        <div className="relative pt-[56.25%]">
          <iframe 
            className="absolute inset-0 w-full h-full border-none"
            src={videoSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        
        {/* CRT tube effect - rounded corners inside */}
        <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-20 bg-black opacity-20 rounded-br-[100px]"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-black opacity-20 rounded-bl-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-black opacity-20 rounded-tr-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-black opacity-20 rounded-tl-[100px]"></div>
          
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-repeat-y bg-[length:100%_3px] opacity-5 mix-blend-overlay"></div>
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2 bg-black/10 dark:bg-white/10 p-1 rounded-none text-xs retro-text">
        <span className="text-primary font-bold">RETRO TV</span>
      </div>
    </div>
  );
};

export default YouTubeVideo;
