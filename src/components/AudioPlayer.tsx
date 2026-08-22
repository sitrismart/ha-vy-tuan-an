import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt auto-play on first user touch/click on page
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay policy prevented
        });
        setHasInteracted(true);
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Playback prevented', e);
      });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={WEDDING_DATA.music.url}
        loop
        preload="auto"
      />

      {/* Floating Vinyl Music Disc Button */}
      <button
        id="audio-toggle-btn"
        onClick={togglePlay}
        aria-label="Bật/Tắt nhạc nền thiệp cưới"
        className="fixed bottom-5 right-5 z-50 group flex items-center justify-center p-1 rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 focus:outline-none"
      >
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-[#1E080C] via-[#4D0B12] to-[#7A121D] p-1 border-2 border-[#EADBC8]/80 shadow-lg flex items-center justify-center">
          
          {/* Rotating Vinyl Grooves Effect */}
          <div
            className={`w-full h-full rounded-full border border-white/20 flex items-center justify-center ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          >
            {/* Center Label */}
            <div className="w-5 h-5 rounded-full bg-[#EADBC8] border border-[#7A121D] flex items-center justify-center text-[#7A121D]">
              <Music className="w-2.5 h-2.5 animate-pulse" />
            </div>
          </div>

          {/* Sound waves badge indicator */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#7A121D] border border-[#EADBC8] rounded-full flex items-center justify-center text-[#EADBC8] shadow-sm">
            {isPlaying ? (
              <Volume2 className="w-3 h-3 animate-pulse" />
            ) : (
              <VolumeX className="w-3 h-3 opacity-70" />
            )}
          </div>
        </div>
      </button>
    </>
  );
}
