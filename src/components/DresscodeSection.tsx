import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { Sparkles, Info } from 'lucide-react';
import { BurgundyCallaLily } from './FloralDecor';

export function DresscodeSection() {
  return (
    <section className="relative w-full py-8 px-4 text-center">
      {/* Script Title */}
      <div className="mb-6 relative inline-block">
        <h3 className="font-script text-5xl md:text-6xl text-[#7A121D] tracking-wide">
          Dresscode
        </h3>
        <p className="text-[11px] font-semibold tracking-widest text-[#7A121D]/70 uppercase mt-1">
          Trang Phục Tham Dự
        </p>
      </div>

      {/* Color Circles Row matching photo */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
        {WEDDING_DATA.dresscode.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center group cursor-pointer">
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg flex items-center justify-center"
              style={{ backgroundColor: item.hex }}
              title={item.name}
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-bold text-white/90">
                ✓
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#4A3B32] mt-2 max-w-[70px] leading-tight">
              {item.name.split('/')[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Dresscode note */}
      <p className="text-xs text-[#6A4D53] italic max-w-xs mx-auto mt-2">
        *Để những bức ảnh kỷ niệm thêm phần đồng điệu, quý khách vui lòng ưu tiên trang phục theo bảng màu trên nhé!
      </p>
    </section>
  );
}
