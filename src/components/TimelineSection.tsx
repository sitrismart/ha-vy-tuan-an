import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { TIMELINE_ITEMS } from '../data/weddingData';
import { BurgundyCallaLily } from './FloralDecor';
import { fadeSoft, fadeUp, fadeUpTitle, viewportRepeat } from './motion/Reveal';

export function TimelineSection() {
  return (
    <section className="relative w-full py-10 px-4 overflow-hidden">
      {/* Decorative Calla Lilies around title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        variants={fadeSoft(0.2)}
        className="absolute top-4 right-2 pointer-events-none transform rotate-12 opacity-85"
      >
        <BurgundyCallaLily size={65} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        variants={fadeUpTitle()}
        className="text-center mb-8"
      >
        <h3 className="font-script text-5xl md:text-6xl text-[#7A121D] tracking-wide">
          Timeline
        </h3>
        <p className="text-[11px] font-semibold tracking-widest text-[#7A121D]/70 uppercase mt-1">
          Chương Trình Tiệc Cưới
        </p>
      </motion.div>

      {/* Interactive S-Curve Timeline Graphic matching user's photo */}
      <div className="relative w-full max-w-[340px] mx-auto min-h-[460px] py-4">
        
        {/* SVG Wavy Connecting Path for 3 nodes */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          viewBox="0 0 340 360"
          fill="none"
        >
          <path
            d="M 170 30 C 270 90, 280 140, 170 180 C 60 220, 50 280, 170 330"
            stroke="#7A121D"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />
        </svg>

        {TIMELINE_ITEMS.map((item, index) => {
          // Determine alignment based on index
          let alignmentClass = "items-center text-center";
          let innerAlignClass = "items-center text-center";
          if (index === 1) {
            alignmentClass = "items-end text-right pr-6";
            innerAlignClass = "flex-col items-center";
          } else if (index === 2) {
            alignmentClass = "items-start text-left pl-6";
            innerAlignClass = "flex-col items-center";
          }

          const IconComponent = () => {
            switch (item.iconName) {
              case 'bouquet':
                return (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5">
                    <path d="M12 2a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" />
                    <path d="M8 5a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" />
                    <path d="M16 5a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" />
                    <path d="M12 10v12" />
                    <path d="M9 13l3 3 3-3" />
                  </svg>
                );
              case 'rings':
                return (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="1.5">
                    <circle cx="8.5" cy="13.5" r="5.5" />
                    <circle cx="15.5" cy="13.5" r="5.5" />
                    <path d="M7 6l1.5-2 1.5 2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                );
              case 'feast':
                return (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5">
                    <path d="M18 2v20M18 2a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3M6 2v6a3 3 0 0 0 6 0V2M9 8v14" />
                  </svg>
                );
              case 'music':
              default:
                return (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                );
            }
          };

          return (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRepeat}
              variants={fadeUp()}
              className={`relative z-10 flex flex-col mb-12 ${alignmentClass}`}
            >
              <div className={`flex flex-col ${innerAlignClass}`}>
                <span className="font-display text-sm font-bold text-[#7A121D] bg-[#FAF6F0] px-2 py-0.5 rounded-full border border-[#7A121D]/20 shadow-xs">
                  {item.time}
                </span>
                <h4 className="font-display text-xs font-bold tracking-wider text-[#2D1217] uppercase mt-1">
                  {item.title}
                </h4>
                <p className={`text-[11px] text-[#6A4D53] mt-0.5 ${index === 0 ? 'max-w-[200px]' : 'max-w-[180px]'}`}>
                  {item.description}
                </p>
                <div className="mt-2 w-10 h-10 rounded-full bg-white border border-[#7A121D]/30 flex items-center justify-center text-[#7A121D] shadow-sm">
                  <IconComponent />
                </div>
              </div>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
}
