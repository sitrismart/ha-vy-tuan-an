import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Heart } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATA.event.solarDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const eventDate = new Date(WEDDING_DATA.event.solarDate);
  const year = WEDDING_DATA.event.year || eventDate.getFullYear();
  const month = WEDDING_DATA.event.month || (eventDate.getMonth() + 1);
  const targetDay = WEDDING_DATA.event.day || eventDate.getDate();

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = monthNames[month - 1] || 'September';

  // Calculate days in month and starting day offset (Monday = 0 ... Sunday = 6)
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0 = Sun, 1 = Mon ...
  const offsetDays = (firstDayOfWeek + 6) % 7; // Mon = 0, Tue = 1, ..., Sun = 6

  return (
    <div className="w-full flex flex-col items-center py-6 px-4">
      {/* Script Month Title */}
      <h3 className="font-script text-4xl md:text-5xl text-[#7A121D] tracking-wide mb-3">
        {monthName}
      </h3>

      {/* Calendar Grid */}
      <div className="w-full max-w-[320px] bg-white/60 backdrop-blur-xs rounded-2xl p-4 border border-[#7A121D]/15 shadow-sm mb-6">
        {/* Days of week */}
        <div className="grid grid-cols-7 text-center text-[10px] font-semibold tracking-wider text-[#7A121D]/70 mb-3 uppercase">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>

        {/* Calendar days with dynamic leading blanks */}
        <div className="grid grid-cols-7 text-center gap-y-2 text-xs font-medium text-[#4A3B32]">
          {/* Empty days before start of month */}
          {Array.from({ length: offsetDays }, (_, i) => (
            <span key={`blank-${i}`} className="text-transparent">-</span>
          ))}

          {/* Days 1 to daysInMonth */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const dayNum = i + 1;
            const isWeddingDay = dayNum === targetDay;

            return (
              <div key={dayNum} className="relative flex items-center justify-center h-7">
                {isWeddingDay ? (
                  <div className="relative flex items-center justify-center w-7 h-7">
                    {/* Heart Background on wedding day */}
                    <Heart className="w-7 h-7 fill-[#7A121D] text-[#7A121D] drop-shadow-sm animate-pulse" />
                    <span className="absolute text-white text-[11px] font-bold z-10 pt-0.5">
                      {dayNum}
                    </span>
                  </div>
                ) : (
                  <span className="text-[12px] opacity-80 hover:text-[#7A121D] transition-colors">
                    {dayNum}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Countdown Clock */}
      <div className="w-full max-w-[340px] flex items-center justify-between gap-2 px-2">
        <div className="flex-1 bg-white/80 border border-[#7A121D]/20 rounded-xl py-2.5 px-1 text-center shadow-xs">
          <span className="block font-display text-xl md:text-2xl font-bold text-[#7A121D]">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[9px] font-semibold tracking-widest text-[#7A121D]/70 uppercase">
            Ngày
          </span>
        </div>

        <span className="text-[#7A121D] font-bold text-lg">:</span>

        <div className="flex-1 bg-white/80 border border-[#7A121D]/20 rounded-xl py-2.5 px-1 text-center shadow-xs">
          <span className="block font-display text-xl md:text-2xl font-bold text-[#7A121D]">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[9px] font-semibold tracking-widest text-[#7A121D]/70 uppercase">
            Giờ
          </span>
        </div>

        <span className="text-[#7A121D] font-bold text-lg">:</span>

        <div className="flex-1 bg-white/80 border border-[#7A121D]/20 rounded-xl py-2.5 px-1 text-center shadow-xs">
          <span className="block font-display text-xl md:text-2xl font-bold text-[#7A121D]">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[9px] font-semibold tracking-widest text-[#7A121D]/70 uppercase">
            Phút
          </span>
        </div>

        <span className="text-[#7A121D] font-bold text-lg">:</span>

        <div className="flex-1 bg-white/80 border border-[#7A121D]/20 rounded-xl py-2.5 px-1 text-center shadow-xs">
          <span className="block font-display text-xl md:text-2xl font-bold text-[#7A121D]">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[9px] font-semibold tracking-widest text-[#7A121D]/70 uppercase">
            Giây
          </span>
        </div>
      </div>
    </div>
  );
}
