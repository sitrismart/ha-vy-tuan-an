import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { MapPin, Navigation, CalendarPlus, ExternalLink, Building2 } from 'lucide-react';
import { BurgundyCallaLily } from './FloralDecor';

export function VenueSection() {
  return (
    <section className="relative w-full py-10 px-4 text-center">
      {/* Script Title */}
      <div className="mb-6 relative">
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-widest text-[#7A121D] uppercase">
          {WEDDING_DATA.groom.shortName}
        </h3>
        <span className="font-script text-3xl text-[#7A121D] block -my-2">&</span>
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-widest text-[#7A121D] uppercase">
          {WEDDING_DATA.bride.shortName}
        </h3>
      </div>

      {/* Time & Solar / Lunar Date display */}
      <div className="mb-6 space-y-1">
        <p className="font-display text-sm font-semibold tracking-wider text-[#7A121D] uppercase">
          {WEDDING_DATA.event.timeDisplay}
        </p>

        <div className="flex items-center justify-center gap-3 py-2">
          <div className="h-[1px] w-12 bg-[#7A121D]/40" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A121D]">
              THÁNG 10
            </span>
            <span className="font-display text-4xl font-bold text-[#7A121D] px-1">
              23
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A121D]">
              NĂM 2026
            </span>
          </div>
          <div className="h-[1px] w-12 bg-[#7A121D]/40" />
        </div>

        <p className="text-xs text-[#6A4D53] italic">
          ({WEDDING_DATA.event.lunarDateDisplay})
        </p>
      </div>

      {/* Venue Address Card */}
      <div className="max-w-sm mx-auto bg-white/80 backdrop-blur-xs rounded-2xl p-5 border border-[#7A121D]/20 shadow-sm space-y-3">
        <div className="flex items-center justify-center gap-2 text-[#7A121D]">
          <Building2 className="w-5 h-5" />
          <span className="text-[11px] font-bold tracking-widest uppercase">
            Tại Địa Điểm
          </span>
        </div>

        <h4 className="font-display text-lg font-bold text-[#2D1217] tracking-wider uppercase">
          {WEDDING_DATA.event.venueName}
        </h4>
        <p className="text-xs text-[#7A121D] font-medium">
          {WEDDING_DATA.event.venueSubName}
        </p>
        <p className="text-xs text-[#6A4D53] leading-relaxed">
          {WEDDING_DATA.event.venueAddress}
        </p>

        {/* Action Buttons: Xem chỉ đường & Thêm vào lịch */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
          <a
            href={WEDDING_DATA.event.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#7A121D] hover:bg-[#600D16] text-white text-xs font-semibold tracking-wider uppercase shadow-xs transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>XEM CHỈ ĐƯỜNG</span>
          </a>

          <a
            href={WEDDING_DATA.event.googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#7A121D] border border-[#7A121D]/30 text-xs font-semibold tracking-wider uppercase shadow-xs transition-colors"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            <span>LƯU VÀO LỊCH</span>
          </a>
        </div>
      </div>
    </section>
  );
}
