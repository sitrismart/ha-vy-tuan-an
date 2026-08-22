import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { Heart } from 'lucide-react';
import { WhitePaperFlower3D } from './FloralDecor';

export function FooterClosingSection({ onOpenGift }: { onOpenGift: () => void }) {
  return (
    <footer className="relative w-full pt-6 pb-24 overflow-hidden">
      {/* Couple Ending Photo with Romantic Message */}
      <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden group">
        <img
          src={WEDDING_DATA.images.footerCover}
          alt={`${WEDDING_DATA.groom.shortName} & ${WEDDING_DATA.bride.shortName} - Cảm ơn`}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-75"
        />

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 flex flex-col items-center justify-center p-6 text-center text-white" />

        {/* Content overlaid on photo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white z-10 space-y-4">
          <p className="font-serif-elegant italic text-xs md:text-sm max-w-xs leading-relaxed text-[#F4D9DF]">
            "{WEDDING_DATA.quotes.closing}"
          </p>

          <h3 className="font-script text-5xl md:text-6xl text-white tracking-wide drop-shadow-lg">
            Thank you!
          </h3>

          <div className="pt-2">
            <button
              onClick={onOpenGift}
              className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 text-xs font-semibold tracking-wider text-white uppercase transition-all shadow-md active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
              <span>GỬI MỪNG CƯỚI</span>
            </button>
          </div>
        </div>

        {/* 3D Paper Flower accent on bottom corner */}
        <div className="absolute bottom-4 right-4 z-20">
          <WhitePaperFlower3D size={48} />
        </div>
      </div>

      {/* Footer Branding info */}
      <div className="text-center pt-8 px-4 text-[#8C7377] text-[11px] space-y-1">
        <p className="font-display tracking-widest text-[#7A121D] uppercase font-semibold">
          {WEDDING_DATA.groom.shortName} & {WEDDING_DATA.bride.shortName} • {WEDDING_DATA.event.day}.{WEDDING_DATA.event.month}.{WEDDING_DATA.event.year}
        </p>
        <p className="opacity-80">
          Made with love & happiness for the bride & groom
        </p>
      </div>
    </footer>
  );
}
