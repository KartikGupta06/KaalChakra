import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';

export const MandalaOverlay: React.FC<{ className?: string }> = ({ className }) => {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.035] dark:opacity-[0.06]',
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 800"
        className={cn(
          'h-[900px] w-[900px] text-kc-maroon dark:text-kc-gold',
          !reducedMotion && 'animate-mandala-spin'
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        {/* Outer Zodiac & Astronomical Ring */}
        <circle cx="400" cy="400" r="380" strokeWidth="2" />
        <circle cx="400" cy="400" r="360" strokeDasharray="6 6" />
        <circle cx="400" cy="400" r="340" />

        {/* 12 Solar Petals / Rashis */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 400 + 340 * Math.cos(angle);
          const y1 = 400 + 340 * Math.sin(angle);
          const x2 = 400 + 200 * Math.cos(angle);
          const y2 = 400 + 200 * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.5" />;
        })}

        {/* Inner 27 Nakshatra Rays */}
        <circle cx="400" cy="400" r="280" strokeWidth="1.5" />
        <circle cx="400" cy="400" r="200" strokeDasharray="3 3" />
        {Array.from({ length: 27 }).map((_, i) => {
          const angle = (i * (360 / 27) * Math.PI) / 180;
          const x1 = 400 + 280 * Math.cos(angle);
          const y1 = 400 + 280 * Math.sin(angle);
          const x2 = 400 + 200 * Math.cos(angle);
          const y2 = 400 + 200 * Math.sin(angle);
          return <line key={`n-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.8" />;
        })}

        {/* Central Lotus & Sacred Geometric Star */}
        <polygon
          points="400,220 450,350 580,400 450,450 400,580 350,450 220,400 350,350"
          strokeWidth="1.8"
        />
        <polygon
          points="400,260 430,370 540,400 430,430 400,540 370,430 260,400 370,370"
          strokeWidth="1.2"
        />
        <circle cx="400" cy="400" r="80" strokeWidth="2" />
        <circle cx="400" cy="400" r="40" strokeDasharray="4 4" />
        <circle cx="400" cy="400" r="12" fill="currentColor" opacity="0.3" />
      </svg>
    </div>
  );
};
