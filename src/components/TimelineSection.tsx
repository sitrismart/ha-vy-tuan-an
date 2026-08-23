import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Flower2, Heart, Utensils, Music } from 'lucide-react';
import { TIMELINE_ITEMS } from '../data/weddingData';
import { BurgundyCallaLily } from './FloralDecor';
import { fadeSoft, fadeUp, fadeUpTitle, viewportRepeat } from './motion/Reveal';

type Point = { x: number; y: number };

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [points, setPoints] = useState<Point[]>([]);

  // Measure the actual on-screen center of each time badge (e.g. "11:00")
  // so the dashed curve's start/end points are pinned exactly to them,
  // instead of guessing fixed SVG coordinates that drift out of sync
  // whenever spacing/content/viewport size changes.
  const measurePoints = () => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const next = badgeRefs.current
      .map((el) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top,
        };
      })
      .filter((p): p is Point => p !== null);
    if (next.length === TIMELINE_ITEMS.length) setPoints(next);
  };

  useEffect(() => {
    measurePoints();
    window.addEventListener('resize', measurePoints);
    return () => window.removeEventListener('resize', measurePoints);
  }, []);

  // Curve through the measured badge centers, swinging alternately
  // left/right between consecutive points for the S-shape flair. The two
  // control points sit at different heights (35% / 70% of the way down)
  // rather than both at the midpoint, so the line eases out and back in
  // smoothly instead of hooking to a sharp point at the bulge.
  const pathD = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const bulge = i % 2 === 1 ? 110 : -110;
      const dy = p.y - prev.y;
      const c1y = prev.y + dy * 0.35;
      const c2y = prev.y + dy * 0.7;
      return `C ${prev.x + bulge} ${c1y}, ${p.x + bulge} ${c2y}, ${p.x} ${p.y}`;
    })
    .join(' ');

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
      <div ref={containerRef} className="relative w-full max-w-[340px] mx-auto min-h-[460px] py-4">

        {/* Dashed connecting path, pinned to the actual badge positions */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" fill="none">
          {pathD && (
            <path
              d={pathD}
              stroke="#7A121D"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.6"
            />
          )}
        </svg>

        {TIMELINE_ITEMS.map((item, index) => {
          const IconComponent = () => {
            switch (item.iconName) {
              case 'bouquet':
                return <Flower2 className="w-5 h-5" strokeWidth={1.5} />;
              case 'rings':
                return <Heart className="w-5 h-5" strokeWidth={1.5} />;
              case 'feast':
                return <Utensils className="w-5 h-5" strokeWidth={1.5} />;
              case 'music':
              default:
                return <Music className="w-5 h-5" strokeWidth={1.5} />;
            }
          };

          return (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={viewportRepeat}
              variants={fadeUp()}
              onAnimationComplete={measurePoints}
              className="relative z-10 flex flex-col items-center text-center mb-12"
            >
              <div className="flex flex-col items-center">
                <span
                  ref={(el) => { badgeRefs.current[index] = el; }}
                  className="font-display text-sm font-bold text-[#7A121D] bg-[#FAF6F0] px-2 py-0.5 rounded-full border border-[#7A121D]/20 shadow-xs"
                >
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
