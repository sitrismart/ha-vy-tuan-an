import React, { useState } from 'react';
import { PHOTO_GALLERY } from '../data/weddingData';
import { BurgundyCallaLily, WhitePaperFlower3D } from './FloralDecor';
import { Heart, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export function PhotoMomentsSection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

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

  return (
    <section className="relative w-full py-10 px-4">
      {/* Decorative Calla Lily on side */}
      <div className="absolute top-10 left-2 pointer-events-none transform -rotate-12 opacity-90">
        <BurgundyCallaLily size={70} />
      </div>

      {/* Header text layout matching original mockup */}
      <div className="text-center mb-6 relative">
        <span className="font-script text-2xl text-[#7A121D] block">
          Forever & Love you
        </span>
        <h3 className="font-script text-5xl md:text-6xl text-[#7A121D] tracking-wide my-1">
          Our Moments
        </h3>
        <p className="font-serif-elegant italic text-xs md:text-sm text-[#6A4D53]">
          A collection of memories we've shared together
        </p>
      </div>

      {/* Artistic Collage Layout */}
      <div className="max-w-md mx-auto grid grid-cols-2 gap-3 sm:gap-4 items-start">
        
        {/* Item 1 - Tall Top Left */}
        <div
          onClick={() => openLightbox(0)}
          className="relative col-span-1 rounded-2xl overflow-hidden shadow-md bg-white p-1.5 border border-[#7A121D]/15 cursor-pointer transform hover:-translate-y-1 transition-transform group"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
            <img
              src={PHOTO_GALLERY[0].url}
              alt="Khoảnh khắc ngọt ngào"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Maximize2 className="w-5 h-5 drop-shadow" />
            </div>
          </div>
          <p className="text-[10px] font-medium text-center text-[#55383C] mt-1.5 line-clamp-1 italic">
            Forever with you
          </p>
        </div>

        {/* Item 2 - Square Top Right */}
        <div
          onClick={() => openLightbox(1)}
          className="relative col-span-1 rounded-2xl overflow-hidden shadow-md bg-white p-1.5 border border-[#7A121D]/15 cursor-pointer transform hover:-translate-y-1 transition-transform group mt-4"
        >
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <img
              src={PHOTO_GALLERY[1].url}
              alt="Khoảnh khắc ngọt ngào"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Maximize2 className="w-5 h-5 drop-shadow" />
            </div>
          </div>
          <p className="text-[10px] font-medium text-center text-[#55383C] mt-1.5 line-clamp-1 italic">
            Nắm tay em đi qua bão giông
          </p>
        </div>

        {/* Item 3 - Square Bottom Left */}
        <div
          onClick={() => openLightbox(2)}
          className="relative col-span-1 rounded-2xl overflow-hidden shadow-md bg-white p-1.5 border border-[#7A121D]/15 cursor-pointer transform hover:-translate-y-1 transition-transform group"
        >
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <img
              src={PHOTO_GALLERY[2].url}
              alt="Khoảnh khắc ngọt ngào"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Maximize2 className="w-5 h-5 drop-shadow" />
            </div>
          </div>
          <p className="text-[10px] font-medium text-center text-[#55383C] mt-1.5 line-clamp-1 italic">
            Ánh mắt trao nhau
          </p>
        </div>

        {/* Item 4 - Tall Bottom Right */}
        <div
          onClick={() => openLightbox(3)}
          className="relative col-span-1 rounded-2xl overflow-hidden shadow-md bg-white p-1.5 border border-[#7A121D]/15 cursor-pointer transform hover:-translate-y-1 transition-transform group -mt-4"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
            <img
              src={PHOTO_GALLERY[3].url}
              alt="Khoảnh khắc ngọt ngào"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Maximize2 className="w-5 h-5 drop-shadow" />
            </div>
          </div>
          <p className="text-[10px] font-medium text-center text-[#55383C] mt-1.5 line-clamp-1 italic">
            Hạnh phúc giản đơn
          </p>
        </div>

      </div>

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
