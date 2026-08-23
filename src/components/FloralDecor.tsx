import React from 'react';

// Torn Paper Top Edge SVG Component
export function TornPaperTop({ className = "", color = "#FAF6F0" }: { className?: string; color?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-10 block drop-shadow-sm"
        style={{ fill: color }}
      >
        <path d="M0,0 L0,30 Q150,50 300,35 T600,25 T900,40 T1200,30 L1200,0 Z" />
      </svg>
    </div>
  );
}

// Torn Paper Bottom Edge SVG Component
export function TornPaperBottom({ className = "", color = "#FAF6F0" }: { className?: string; color?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-10 block drop-shadow-sm"
        style={{ fill: color }}
      >
        <path d="M0,60 L0,30 Q150,10 300,25 T600,35 T900,20 T1200,30 L1200,60 Z" />
      </svg>
    </div>
  );
}

// 3D White Hydrangea Flower Layer
export function WhitePaperFlower3D({ size = 48, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative inline-block select-none pointer-events-none drop-shadow-md ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      {/* 4 layered petals with realistic 3D paper gradient */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id="paperWhite" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F5F3EF" />
            <stop offset="100%" stopColor="#E2DDD5" />
          </radialGradient>
          <filter id="petalShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Petal Top */}
        <path
          d="M 50 50 C 25 35, 30 5, 50 5 C 70 5, 75 35, 50 50 Z"
          fill="url(#paperWhite)"
          filter="url(#petalShadow)"
        />
        {/* Petal Right */}
        <path
          d="M 50 50 C 65 25, 95 30, 95 50 C 95 70, 65 75, 50 50 Z"
          fill="url(#paperWhite)"
          filter="url(#petalShadow)"
        />
        {/* Petal Bottom */}
        <path
          d="M 50 50 C 75 65, 70 95, 50 95 C 30 95, 25 65, 50 50 Z"
          fill="url(#paperWhite)"
          filter="url(#petalShadow)"
        />
        {/* Petal Left */}
        <path
          d="M 50 50 C 35 75, 5 70, 5 50 C 5 30, 35 25, 50 50 Z"
          fill="url(#paperWhite)"
          filter="url(#petalShadow)"
        />

        {/* Flower Center Pistil with subtle gold/pearl finish */}
        <circle cx="50" cy="50" r="5.5" fill="#E6CEAC" stroke="#FAF6F0" strokeWidth="1" />
        <circle cx="48.5" cy="48.5" r="2" fill="#FFFFFF" opacity="0.8" />
      </svg>
    </div>
  );
}

// Calla Lily (Hoa Rum Đỏ Tía / Burgundy Calla Lily) Vector
export function BurgundyCallaLily({ size = 70, className = "", style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative inline-block select-none pointer-events-none drop-shadow-md ${className}`}
      style={{ width: size, height: size * 1.3, ...style }}
    >
      <svg viewBox="0 0 120 160" className="w-full h-full overflow-visible">
        <defs>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.2" />
          </filter>
          
          <linearGradient id="stemGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c8e65" />
            <stop offset="50%" stopColor="#556b2f" />
            <stop offset="100%" stopColor="#3d4d22" />
          </linearGradient>
          
          <linearGradient id="leafGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#637c41" />
            <stop offset="100%" stopColor="#34451c" />
          </linearGradient>

          <linearGradient id="petalDeep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9e1b2a" />
            <stop offset="40%" stopColor="#630412" />
            <stop offset="100%" stopColor="#2e0409" />
          </linearGradient>

          <linearGradient id="petalLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e32636" />
            <stop offset="50%" stopColor="#a31425" />
            <stop offset="100%" stopColor="#4a0414" />
          </linearGradient>

          <linearGradient id="spadixGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#b8860b" />
          </linearGradient>
        </defs>

        {/* --- Background Elements (Leaves & Back Stems) --- */}
        {/* Left Leaf */}
        <path
          d="M 55 120 C 35 110, 15 80, 5 60 C 15 75, 30 100, 55 120 Z"
          fill="url(#leafGreen)"
          opacity="0.8"
          filter="url(#softShadow)"
        />
        {/* Right Leaf */}
        <path
          d="M 65 110 C 85 90, 110 50, 115 25 C 100 50, 80 85, 65 110 Z"
          fill="url(#leafGreen)"
          opacity="0.7"
          filter="url(#softShadow)"
        />

        {/* Stem 1 (Small bud on right) */}
        <path
          d="M 90 45 C 80 70, 70 110, 60 140"
          fill="none"
          stroke="url(#stemGreen)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Small Bud Petal */}
        <path
          d="M 90 45 C 85 35, 90 20, 100 15 C 105 30, 95 40, 90 45 Z"
          fill="url(#petalDeep)"
          filter="url(#softShadow)"
        />

        {/* Stem 2 (Main Flower) */}
        <path
          d="M 50 85 C 45 110, 48 135, 55 155"
          fill="none"
          stroke="url(#stemGreen)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#softShadow)"
        />

        {/* Stem 3 (Left leaning flower) */}
        <path
          d="M 25 65 C 35 90, 45 120, 55 155"
          fill="none"
          stroke="url(#stemGreen)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* --- Left Leaning Flower --- */}
        <g filter="url(#softShadow)">
          {/* Back spathe */}
          <path
            d="M 25 65 C 10 55, 0 30, 15 15 C 35 5, 45 35, 30 50 C 27 55, 26 60, 25 65 Z"
            fill="url(#petalDeep)"
          />
          {/* Spadix */}
          <path
            d="M 18 35 C 20 45, 22 55, 25 65"
            stroke="url(#spadixGold)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Front wrapping spathe */}
          <path
            d="M 15 15 C 5 25, 10 50, 25 65 C 28 50, 25 25, 15 15 Z"
            fill="url(#petalLight)"
            opacity="0.9"
          />
        </g>

        {/* --- Main Center Flower --- */}
        <g filter="url(#softShadow)">
          {/* Sweeping back petal */}
          <path
            d="M 50 85 C 25 65, 20 25, 45 0 C 85 -10, 95 40, 65 70 C 58 78, 52 82, 50 85 Z"
            fill="url(#petalDeep)"
          />
          
          {/* Dark inner cavity */}
          <path
            d="M 35 15 C 45 30, 50 50, 55 75 C 65 55, 70 30, 35 15 Z"
            fill="#1c0006"
            opacity="0.8"
          />

          {/* Large Golden Spadix */}
          <path
            d="M 45 25 C 48 40, 50 60, 50 80"
            stroke="url(#spadixGold)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Front elegant wrapping fold */}
          <path
            d="M 35 15 C 20 35, 25 70, 50 85 C 55 65, 50 35, 35 15 Z"
            fill="url(#petalLight)"
            opacity="0.95"
          />

          {/* Subtle edge highlight for 3D realism */}
          <path
            d="M 35 15 C 30 30, 32 55, 48 75"
            fill="none"
            stroke="#ff8c9d"
            strokeWidth="1"
            opacity="0.4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
