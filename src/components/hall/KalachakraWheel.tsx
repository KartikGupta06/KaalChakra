import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const KalachakraWheel: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center my-8 sm:my-12 select-none">
      {/* Outer Volumetric Warm Lamp Halo */}
      <div className="pointer-events-none absolute h-[320px] w-[320px] sm:h-[450px] sm:w-[450px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.25)_0%,rgba(230,126,34,0.12)_50%,transparent_75%)] blur-2xl" />

      {/* Rotating Engraved Brass Cosmic Wheel */}
      <div className="relative h-[280px] w-[280px] sm:h-[380px] sm:w-[380px]">
        <svg
          viewBox="0 0 500 500"
          className={`h-full w-full drop-shadow-[0_0_25px_rgba(212,175,55,0.4)] ${
            !reducedMotion ? 'animate-mandala-spin' : ''
          }`}
          fill="none"
          stroke="currentColor"
        >
          {/* Outer Brass Rim & Filigree Teeth */}
          <circle cx="250" cy="250" r="240" stroke="#C89B3C" strokeWidth="4" />
          <circle cx="250" cy="250" r="230" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 8" />
          <circle cx="250" cy="250" r="218" stroke="#B87333" strokeWidth="1.5" />

          {/* 12 Solar Rashis (Zodiac Sectors) */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 250 + 218 * Math.cos(angle);
            const y1 = 250 + 218 * Math.sin(angle);
            const x2 = 250 + 130 * Math.cos(angle);
            const y2 = 250 + 130 * Math.sin(angle);
            return (
              <g key={`rashi-${i}`}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="2" opacity="0.8" />
              </g>
            );
          })}

          {/* Inner Nakshatra Ring (27 Mansions) */}
          <circle cx="250" cy="250" r="170" stroke="#C89B3C" strokeWidth="2" />
          <circle cx="250" cy="250" r="130" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" />
          {Array.from({ length: 27 }).map((_, i) => {
            const angle = (i * (360 / 27) * Math.PI) / 180;
            const x1 = 250 + 170 * Math.cos(angle);
            const y1 = 250 + 170 * Math.sin(angle);
            const x2 = 250 + 130 * Math.cos(angle);
            const y2 = 250 + 130 * Math.sin(angle);
            return <line key={`nakshatra-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C89B3C" strokeWidth="1" opacity="0.6" />;
          })}

          {/* Central Sacred Geometric Star & Lotus Hub */}
          <circle cx="250" cy="250" r="90" stroke="#7B1E1E" strokeWidth="3" />
          <polygon
            points="250,160 275,225 340,250 275,275 250,340 225,275 160,250 225,225"
            stroke="#D4AF37"
            strokeWidth="2.5"
            fill="rgba(212,175,55,0.08)"
          />
          <polygon
            points="250,180 268,232 320,250 268,268 250,320 232,268 180,250 232,232"
            stroke="#C89B3C"
            strokeWidth="1.5"
          />

          {/* Center Om / Surya Hub */}
          <circle cx="250" cy="250" r="40" fill="#3A2414" stroke="#D4AF37" strokeWidth="2.5" />
          <circle cx="250" cy="250" r="12" fill="#D4AF37" />
        </svg>

        {/* Static Center Emblem Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.span
            animate={{ scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="font-devanagari text-2xl sm:text-3xl font-bold text-kc-gold-royal drop-shadow-md select-none"
          >
            ॐ
          </motion.span>
        </div>
      </div>
    </div>
  );
};
