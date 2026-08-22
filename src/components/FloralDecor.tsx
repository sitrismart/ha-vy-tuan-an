import React from 'react';

// Torn Paper Top Edge SVG Component
export function TornPaperTop({ className = "", color = "#FAF6F0" }: { className?: string; color?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-8 md:h-12 block drop-shadow-sm"
        style={{ fill: color }}
      >
        <path d="M0,0 L0,38 Q30,12 60,34 T120,28 T180,45 T240,22 T300,42 T360,18 T420,38 T480,24 T540,46 T600,20 T660,40 T720,25 T780,45 T840,16 T900,40 T960,22 T1020,44 T1080,26 T1140,42 T1200,30 L1200,0 Z" />
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
        className="w-full h-8 md:h-12 block drop-shadow-sm"
        style={{ fill: color }}
      >
        <path d="M0,60 L0,22 Q30,48 60,26 T120,32 T180,15 T240,38 T300,18 T360,42 T420,22 T480,36 T540,14 T600,40 T660,20 T720,35 T780,15 T840,44 T900,20 T960,38 T1020,16 T1080,34 T1140,18 T1200,30 L1200,60 Z" />
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
          d="M 50 50 C 35 30, 30 10, 50 5 C 70 10, 65 30, 50 50 Z"
          fill="url(#paperWhite)"
          filter="url(#petalShadow)"
        />
        {/* Petal Right */}
        <path
          d="M 50 50 C 70 35, 90 30, 95 50 C 90 70, 70 65, 50 50 Z"
          fill="url(#paperWhite)"
          filter="url(#petalShadow)"
        />
        {/* Petal Bottom */}
        <path
          d="M 50 50 C 65 70, 70 90, 50 95 C 30 90, 35 70, 50 50 Z"
          fill="url(#paperWhite)"
          filter="url(#petalShadow)"
        />
        {/* Petal Left */}
        <path
          d="M 50 50 C 30 65, 10 70, 5 50 C 10 30, 30 35, 50 50 Z"
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
      <svg viewBox="0 0 100 130" className="w-full h-full">
        <defs>
          <linearGradient id="burgundyStem" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A6B4D" />
            <stop offset="100%" stopColor="#2D4430" />
          </linearGradient>
          <linearGradient id="burgundyFlower" x1="0%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#9E1B2A" />
            <stop offset="40%" stopColor="#7A121D" />
            <stop offset="85%" stopColor="#4D0B12" />
            <stop offset="100%" stopColor="#2E0409" />
          </linearGradient>
          <linearGradient id="spadixGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFEAA7" />
            <stop offset="100%" stopColor="#E17055" />
          </linearGradient>
        </defs>

        {/* Stem */}
        <path
          d="M 45 65 Q 40 95, 25 125"
          fill="none"
          stroke="url(#burgundyStem)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Calla Lily Petal Shape */}
        <path
          d="M 45 65 C 20 50, 15 20, 50 10 C 85 10, 80 45, 55 65 C 48 70, 46 70, 45 65 Z"
          fill="url(#burgundyFlower)"
        />
        {/* Inner Curved Lip */}
        <path
          d="M 50 10 C 65 25, 60 50, 45 65 C 38 45, 42 22, 50 10 Z"
          fill="#5D0B14"
          opacity="0.8"
        />
        {/* Yellow Spadix Inside */}
        <path
          d="M 50 35 Q 52 48, 48 55"
          stroke="url(#spadixGold)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
