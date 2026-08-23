import React from 'react';
import { motion } from 'motion/react';
import { WEDDING_DATA } from '../data/weddingData';
import { Heart } from 'lucide-react';
import { WhitePaperFlower3D } from './FloralDecor';
import { ParallaxLayer, fadeImg, fadeSoft, fadeUp, fadeUpTitle, viewportRepeat } from './motion/Reveal';

export function FooterClosingSection() {
  return (
    <footer className="relative w-full pt-6 pb-24 overflow-hidden">
      {/* Couple Ending Photo with Romantic Message */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        variants={fadeImg()}
        className="relative w-full h-[400px] md:h-[450px] overflow-hidden group"
      >
        <ParallaxLayer strength={16}>
          <img
            src={WEDDING_DATA.images.footerCover}
            alt={`${WEDDING_DATA.bride.shortName} & ${WEDDING_DATA.groom.shortName} - Cảm ơn`}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-75"
          />
        </ParallaxLayer>

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 flex flex-col items-center justify-center p-6 text-center text-white" />

        {/* Content overlaid on photo */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          variants={fadeUpTitle(0.15)}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white z-10 space-y-4"
        >
          <p className="font-serif-elegant italic text-xs md:text-sm max-w-xs leading-relaxed text-[#F4D9DF]">
            "{WEDDING_DATA.quotes.closing}"
          </p>

          <h3 className="font-script text-5xl md:text-6xl text-white tracking-wide drop-shadow-lg">
            Thank you!
          </h3>
        </motion.div>

        {/* 3D Paper Flower accent on bottom corner */}
        <div className="absolute bottom-4 right-4 z-20">
          <WhitePaperFlower3D size={48} />
        </div>
      </motion.div>

      {/* Footer Branding info */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        variants={fadeUp(0.1)}
        className="text-center pt-8 px-4 text-[#8C7377] text-[11px] space-y-1"
      >
        <p className="font-display tracking-widest text-[#7A121D] uppercase font-semibold">
          {WEDDING_DATA.bride.shortName} & {WEDDING_DATA.groom.shortName} • {String(WEDDING_DATA.event.day).padStart(2, '0')}.{String(WEDDING_DATA.event.month).padStart(2, '0')}.{WEDDING_DATA.event.year}
        </p>
        <p className="opacity-80">
          Made with love & happiness for the bride & groom
        </p>
      </motion.div>
    </footer>
  );
}
