import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PHOTO_GALLERY } from '../data/weddingData';
import { BurgundyCallaLily } from './FloralDecor';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { fadeImg, fadeSoft, fadeUpTitle, viewportRepeat } from './motion/Reveal';

// Edge-to-edge slide: the entering photo pushes in from the direction of
// travel while the leaving one is pushed fully out the other side, so the
// two always tile the frame with zero gap and the dark backdrop never shows.
const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (direction: number) => ({ x: direction > 0 ? '-100%' : '100%' }),
};

export function PhotoMomentsSection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev < PHOTO_GALLERY.length - 1 ? prev + 1 : 0));
    }, 3500); // changes every 3.5 seconds
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) => (prev! > 0 ? prev! - 1 : PHOTO_GALLERY.length - 1));
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) => (prev! < PHOTO_GALLERY.length - 1 ? prev! + 1 : 0));
    }
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : PHOTO_GALLERY.length - 1));
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev < PHOTO_GALLERY.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="relative w-full py-10 px-4">
      {/* Decorative Calla Lily on side */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        variants={fadeSoft(0.2)}
        className="absolute top-10 left-2 pointer-events-none transform -rotate-12 opacity-90"
      >
        <BurgundyCallaLily size={70} />
      </motion.div>

      {/* Header text layout matching original mockup */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        variants={fadeUpTitle()}
        className="text-center mb-6 relative"
      >
        <span className="font-script text-2xl text-[#7A121D] block">
          Forever & Love you
        </span>
        <h3 className="font-script text-5xl md:text-6xl text-[#7A121D] tracking-wide my-1">
          Our Moments
        </h3>
        <p className="font-serif-elegant italic text-xs md:text-sm text-[#6A4D53]">
          A collection of memories we've shared together
        </p>
      </motion.div>

      {/* Carousel Layout */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportRepeat}
        variants={fadeImg()}
        className="max-w-md mx-auto relative rounded-2xl shadow-xl bg-white p-2 border border-[#7A121D]/15"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#1A0B0D]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={PHOTO_GALLERY[currentIndex].url}
              alt="Khoảnh khắc"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              style={{ imageRendering: 'high-quality' as any, WebkitBackfaceVisibility: 'hidden' }}
              onClick={() => openLightbox(currentIndex)}
            />
          </AnimatePresence>
          
          {/* Caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12 pointer-events-none">
            <p className="text-white text-sm md:text-base font-serif-elegant italic text-center drop-shadow-md">
              {PHOTO_GALLERY[currentIndex].caption}
            </p>
          </div>

          {/* Controls */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-1.5 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-1.5 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Enlarge icon hint */}
          <div className="absolute top-3 right-3 bg-black/20 text-white rounded-full p-1.5 pointer-events-none">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-3 mb-1">
          {PHOTO_GALLERY.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoPlaying(false);
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex ? 'bg-[#7A121D] w-5' : 'bg-[#7A121D]/30 w-2'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={PHOTO_GALLERY[selectedPhotoIndex].url}
              alt="Ảnh phóng to"
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              style={{ imageRendering: 'high-quality' as any }}
            />
            <p className="text-white text-sm font-medium mt-3 text-center">
              {PHOTO_GALLERY[selectedPhotoIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
