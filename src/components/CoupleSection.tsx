import React from 'react';
import { motion } from 'motion/react';
import { WEDDING_DATA } from '../data/weddingData';
import { TornPaperTop, TornPaperBottom, WhitePaperFlower3D, BurgundyCallaLily } from './FloralDecor';
import { ParallaxLayer, fadeImg, fadeUp, fadeUpTitle, fadeSoft, viewportRepeat } from './motion/Reveal';

export function CoupleSection() {
  return (
    <section className="relative w-full overflow-hidden my-4">
      {/* Background container holding the torn paper portrait sections */}
      <div className="relative w-full bg-[#1F3144] py-2 overflow-hidden shadow-inner">

        {/* BRIDE PHOTO STRIP (Cô dâu) with Torn Edges */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          variants={fadeImg()}
          className="relative w-full h-[380px] md:h-[420px] overflow-hidden group"
        >
          {/* Background Photo of Bride */}
          <ParallaxLayer strength={10}>
            <img
              src={WEDDING_DATA.images.bridePortrait}
              alt={`Cô dâu ${WEDDING_DATA.bride.shortName}`}
              className="w-full h-full object-cover object-[center_30%] transform group-hover:scale-105 transition-transform duration-700 filter brightness-95"
            />
          </ParallaxLayer>
          <div className="absolute inset-0 bg-gradient-to-r from-[#172635]/65 via-[#172635]/25 to-transparent pointer-events-none" />

          {/* Bride Name & Info in Luxury Serif Typography */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportRepeat}
            variants={fadeUpTitle(0.15)}
            className="absolute top-10 left-6 z-10 text-white drop-shadow-md"
          >
            <span className="block font-script text-3xl md:text-4xl text-[#F4D9DF] -mb-1">
              Cô dâu
            </span>
            <h4 className="font-display text-2xl md:text-3xl font-semibold tracking-wider uppercase text-white">
              {WEDDING_DATA.bride.shortName}
            </h4>
            <p className="text-xs md:text-sm tracking-widest text-[#F4D9DF]/90 font-medium mt-0.5">
              {WEDDING_DATA.bride.birthday}
            </p>
          </motion.div>

          {/* Top Torn Paper Edge of Bride section */}
          <div className="absolute top-0 left-0 right-0 z-20">
            <TornPaperTop color="#FAF6F0" />
          </div>

          {/* 3D Paper Flower overlapping on Left/Mid */}
          <div className="absolute -bottom-4 left-4 z-30 transform -rotate-12 animate-float">
            <WhitePaperFlower3D size={44} />
          </div>
        </motion.div>

        {/* MIDDLE TORN DIVIDER WITH 3D FLOWERS */}
        <div className="relative w-full h-8 z-20 flex items-center justify-center -my-3 pointer-events-none">
          <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-full fill-[#FAF6F0] drop-shadow-md">
            <path d="M0,20 Q150,5 300,25 T600,15 T900,30 T1200,18 L1200,40 L0,40 Z" />
          </svg>
        </div>

        {/* GROOM PHOTO STRIP (Chú rể) with Torn Edges */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          variants={fadeImg()}
          className="relative w-full h-[380px] md:h-[420px] overflow-hidden group"
        >
          {/* Background Photo of Groom */}
          <ParallaxLayer strength={10}>
            <img
              src={WEDDING_DATA.images.groomPortrait}
              alt={`Chú rể ${WEDDING_DATA.groom.shortName}`}
              className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 filter brightness-95"
            />
          </ParallaxLayer>
          <div className="absolute inset-0 bg-gradient-to-l from-[#172635]/65 via-[#172635]/25 to-transparent pointer-events-none" />

          {/* Groom Name & Info in Luxury Serif Typography */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportRepeat}
            variants={fadeUpTitle(0.15)}
            className="absolute top-10 right-6 z-10 text-right text-white drop-shadow-md"
          >
            <span className="block font-script text-3xl md:text-4xl text-[#F4D9DF] -mb-1">
              Chú rể
            </span>
            <h4 className="font-display text-2xl md:text-3xl font-semibold tracking-wider uppercase text-white">
              {WEDDING_DATA.groom.shortName}
            </h4>
            <p className="text-xs md:text-sm tracking-widest text-[#F4D9DF]/90 font-medium mt-0.5">
              {WEDDING_DATA.groom.birthday}
            </p>
          </motion.div>

          {/* Big 3D White Flower Cluster at Bottom Right (Exact design from user's image) */}
          <div className="absolute -bottom-5 right-5 z-30 flex items-center gap-0 pointer-events-none">
            <div className="transform -rotate-12 translate-y-1">
              <WhitePaperFlower3D size={32} />
            </div>
            <div className="transform rotate-6 -ml-3">
              <WhitePaperFlower3D size={64} />
            </div>
          </div>

          {/* Bottom Torn Paper Edge Transitioning back to Cream Body */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <TornPaperBottom color="#FAF6F0" />
          </div>
        </motion.div>

      </div>

      {/* Love Quote Below the Torn Photos */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        variants={fadeSoft()}
        className="px-6 py-6 text-center"
      >
        <p className="font-serif-elegant italic text-base md:text-lg text-[#55383C] leading-relaxed max-w-md mx-auto">
          "{WEDDING_DATA.quotes.quoteVietnamese}"
        </p>
      </motion.div>
    </section>
  );
}
