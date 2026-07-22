import React from 'react';
import { GrahaPlacement } from '../revelation/NorthIndianKundali';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ZodiacRingProps {
  planets?: GrahaPlacement[];
  onSelectSign?: (signIndex: number) => void;
}

const RASHI_SIGNS = [
  { index: 1, english: 'Aries', sanskrit: 'मेष', symbol: '♈' },
  { index: 2, english: 'Taurus', sanskrit: 'वृषभ', symbol: '♉' },
  { index: 3, english: 'Gemini', sanskrit: 'मिथुन', symbol: '♊' },
  { index: 4, english: 'Cancer', sanskrit: 'कर्क', symbol: '♋' },
  { index: 5, english: 'Leo', sanskrit: 'सिंह', symbol: '♌' },
  { index: 6, english: 'Virgo', sanskrit: 'कन्या', symbol: '♍' },
  { index: 7, english: 'Libra', sanskrit: 'तुला', symbol: '♎' },
  { index: 8, english: 'Scorpio', sanskrit: 'वृश्चिक', symbol: '♏' },
  { index: 9, english: 'Sagittarius', sanskrit: 'धनु', symbol: '♐' },
  { index: 10, english: 'Capricorn', sanskrit: 'मकर', symbol: '♑' },
  { index: 11, english: 'Aquarius', sanskrit: 'कुम्भ', symbol: '♒' },
  { index: 12, english: 'Pisces', sanskrit: 'मीन', symbol: '♓' },
];

export const ZodiacRing: React.FC<ZodiacRingProps> = ({ onSelectSign }) => {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative flex flex-col items-center justify-center my-6 select-none">
      <div className="relative h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] flex items-center justify-center">
        {/* Rotating SVG Zodiac Wheel */}
        <svg
          viewBox="0 0 500 500"
          className={`absolute inset-0 h-full w-full drop-shadow-md ${
            !reducedMotion ? 'animate-mandala-spin' : ''
          }`}
          fill="none"
          stroke="currentColor"
        >
          {/* Engraved Outer Rings */}
          <circle cx="250" cy="250" r="235" stroke="#C89B3C" strokeWidth="3" />
          <circle cx="250" cy="250" r="215" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="250" cy="250" r="150" stroke="#B87333" strokeWidth="2" />

          {/* 12 Rashi Sectors & Symbols */}
          {RASHI_SIGNS.map((r, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const textAngle = ((i * 30 + 15) * Math.PI) / 180;
            const x1 = 250 + 235 * Math.cos(angle);
            const y1 = 250 + 235 * Math.sin(angle);
            const x2 = 250 + 150 * Math.cos(angle);
            const y2 = 250 + 150 * Math.sin(angle);

            const tx = 250 + 185 * Math.cos(textAngle);
            const ty = 250 + 185 * Math.sin(textAngle);

            return (
              <g key={r.index} className="cursor-pointer" onClick={() => onSelectSign?.(r.index)}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="1" opacity="0.6" />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-devanagari text-xs font-bold fill-kc-maroon dark:fill-kc-gold opacity-90"
                >
                  {r.sanskrit}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Stationary Inner Core */}
        <div className="relative h-[160px] w-[160px] sm:h-[200px] sm:w-[200px] rounded-full bg-[#2B1A10]/95 border-2 border-kc-gold-royal shadow-deep flex flex-col items-center justify-center text-center p-3">
          <span className="font-heading text-[10px] uppercase tracking-widest text-kc-gold block">
            Rashi Chakra • 12 Signs
          </span>
          <span className="font-devanagari text-sm font-bold text-kc-paper my-1">
            ॥ द्वादश राशि मण्डल ॥
          </span>
          <span className="font-serif text-[11px] text-kc-text-muted italic">
            Surya & Chandra sidereal trajectory
          </span>
        </div>
      </div>
    </div>
  );
};
