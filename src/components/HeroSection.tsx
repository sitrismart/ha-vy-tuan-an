import React from 'react';
import { motion } from 'motion/react';
import { WEDDING_DATA } from '../data/weddingData';
import { WeddingCountdown } from './WeddingCountdown';
import { BurgundyCallaLily } from './FloralDecor';
import { ParallaxLayer, fadeImg, fadeUp, fadeUpTitle, fadeSoft, viewportRepeat } from './motion/Reveal';

export function HeroSection() {
  const getCallNameInitial = (name: string) => name.trim().split(/\s+/).pop()?.charAt(0).toUpperCase() ?? '';
  const brideInitial = getCallNameInitial(WEDDING_DATA.bride.shortName) || 'V';
  const groomInitial = getCallNameInitial(WEDDING_DATA.groom.shortName) || 'A';

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Main Cover Image (SAVE THE DATE) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        variants={fadeImg()}
        className="relative w-full h-[460px] md:h-[520px] overflow-hidden group"
      >
        <ParallaxLayer strength={16}>
          <img
            src={WEDDING_DATA.images.heroCover}
            alt={`${WEDDING_DATA.groom.shortName} & ${WEDDING_DATA.bride.shortName}`}
            className="w-full h-full object-cover object-[center_35%] transform group-hover:scale-105 transition-transform duration-700 filter brightness-90"
          />
        </ParallaxLayer>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

        {/* Hero Title & Typography */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          variants={fadeUpTitle(0.15)}
          className="absolute bottom-8 left-0 right-0 text-center text-white px-4 z-10"
        >
          <span className="font-serif-elegant tracking-[0.3em] text-sm md:text-base uppercase opacity-90 block mb-1">
            SAVE
          </span>
          <span className="font-script text-4xl md:text-5xl text-[#F4D9DF] block -my-2 drop-shadow-md">
            the
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase text-white drop-shadow-lg">
            DATE
          </h1>
          <p className="font-display text-xs md:text-sm tracking-[0.25em] text-[#EADBC8] uppercase font-semibold mt-2">
            {WEDDING_DATA.groom.shortName} & {WEDDING_DATA.bride.shortName}
          </p>
        </motion.div>
      </motion.div>

      {/* Monogram A&K and Quote Section */}
      <div className="w-full py-8 px-6 text-center relative">
        {/* Monogram Emblem */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          variants={fadeUpTitle()}
          className="flex items-center justify-center mb-3"
        >
          <div className="relative flex items-center justify-center">
            <span className="font-serif-elegant text-5xl md:text-6xl text-[#7A121D] font-light italic">
              {brideInitial}
            </span>
            <span className="font-script text-3xl text-[#8E6E53] -mx-1.5 z-10">
              &
            </span>
            <span className="font-serif-elegant text-5xl md:text-6xl text-[#7A121D] font-light italic">
              {groomInitial}
            </span>
          </div>
        </motion.div>

        {/* English Romantic Quote */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          variants={fadeUp(0.15)}
          className="font-serif-elegant italic text-xs md:text-sm text-[#7A121D]/90 max-w-sm mx-auto leading-relaxed"
        >
          "{WEDDING_DATA.quotes.quoteEnglish}"
        </motion.p>

        {/* 4 Mini Polaroids Row with Day / Month / Year Numbers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          variants={fadeImg(0.1)}
          className="grid grid-cols-4 gap-2 max-w-xs mx-auto mt-6"
        >
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white shadow-sm bg-white p-0.5">
            <img
              src={WEDDING_DATA.images.miniPolaroids[0]}
              alt="Mini 1"
              className="w-full h-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center font-display text-xl md:text-2xl font-bold text-white/90 drop-shadow-md">
              {String(WEDDING_DATA.event.day).padStart(2, '0')}
            </span>
          </div>

          <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white shadow-sm bg-white p-0.5">
            <img
              src={WEDDING_DATA.images.miniPolaroids[1]}
              alt="Mini 2"
              className="w-full h-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center font-serif-elegant text-lg md:text-xl font-bold text-white/90 drop-shadow-md">
              /
            </span>
          </div>

          <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white shadow-sm bg-white p-0.5">
            <img
              src={WEDDING_DATA.images.miniPolaroids[2]}
              alt="Mini 3"
              className="w-full h-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center font-display text-xl md:text-2xl font-bold text-white/90 drop-shadow-md">
              {String(WEDDING_DATA.event.month).padStart(2, '0')}
            </span>
          </div>

          <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white shadow-sm bg-white p-0.5">
            <img
              src={WEDDING_DATA.images.miniPolaroids[3]}
              alt="Mini 4"
              className="w-full h-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center font-display text-xl md:text-2xl font-bold text-white/90 drop-shadow-md">
              {String(WEDDING_DATA.event.year).slice(-2)}
            </span>
          </div>
        </motion.div>

        {/* October Calendar & Countdown */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewportRepeat} variants={fadeUp(0.1)}>
          <WeddingCountdown />
        </motion.div>

        {/* Calla Lily Illustration Accent */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          variants={fadeSoft()}
          className="my-4 flex justify-center"
        >
          <BurgundyCallaLily size={60} />
        </motion.div>

        {/* Nhà Gái & Nhà Trai Parents Information */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportRepeat}
          variants={fadeUp(0.1)}
          className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-2 text-center border-t border-[#7A121D]/15"
        >
          {/* Nhà Gái */}
          <div className="space-y-0.5">
            <span className="font-display text-[11px] font-bold tracking-widest text-[#7A121D] uppercase">
              NHÀ GÁI
            </span>
            <p className="text-[11px] font-medium text-[#2D1217]">
              Ông: {WEDDING_DATA.bride.parents.father}
            </p>
            <p className="text-[11px] font-medium text-[#2D1217]">
              Bà: {WEDDING_DATA.bride.parents.mother}
            </p>
            <span className="text-[10px] text-[#8C7377] block italic">
              {WEDDING_DATA.bride.hometown}
            </span>
          </div>

          {/* Nhà Trai */}
          <div className="space-y-0.5">
            <span className="font-display text-[11px] font-bold tracking-widest text-[#7A121D] uppercase">
              NHÀ TRAI
            </span>
            <p className="text-[11px] font-medium text-[#2D1217]">
              Ông: {WEDDING_DATA.groom.parents.father}
            </p>
            <p className="text-[11px] font-medium text-[#2D1217]">
              Bà: {WEDDING_DATA.groom.parents.mother}
            </p>
            <span className="text-[10px] text-[#8C7377] block italic">
              {WEDDING_DATA.groom.hometown}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
