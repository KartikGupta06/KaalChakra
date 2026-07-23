import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface GrahaPlacement {
  id: string;
  symbol: string;
  sanskrit: string;
  name: string;
  house: number; // 1 to 12
  sign: string;
}

export const DEFAULT_PLANETS: GrahaPlacement[] = [
  { id: 'sun', symbol: '☉', sanskrit: 'सूर्य', name: 'Sun', house: 1, sign: 'Leo (सिंह)' },
  { id: 'moon', symbol: '☽', sanskrit: 'चन्द्र', name: 'Moon', house: 4, sign: 'Taurus (वृषभ)' },
  { id: 'mars', symbol: '♂', sanskrit: 'मंगल', name: 'Mars', house: 10, sign: 'Capricorn (मकर)' },
  { id: 'mercury', symbol: '☿', sanskrit: 'बुध', name: 'Mercury', house: 1, sign: 'Virgo (कन्या)' },
  { id: 'jupiter', symbol: '♃', sanskrit: 'गुरु', name: 'Jupiter', house: 9, sign: 'Sagittarius (धनु)' },
  { id: 'venus', symbol: '♀', sanskrit: 'शुक्र', name: 'Venus', house: 2, sign: 'Pisces (मीन)' },
  { id: 'saturn', symbol: '♄', sanskrit: 'शनि', name: 'Saturn', house: 7, sign: 'Libra (तुला)' },
  { id: 'rahu', symbol: '☊', sanskrit: 'राहु', name: 'Rahu', house: 11, sign: 'Gemini (मिथुन)' },
  { id: 'ketu', symbol: '☋', sanskrit: 'केतु', name: 'Ketu', house: 5, sign: 'Sagittarius (धनु)' },
];

// Coordinate placement helpers for North Indian Diamond Chart (500x500 viewBox)
const HOUSE_POSITIONS: { [key: number]: { x: number; y: number } } = {
  1: { x: 250, y: 145 },   // Top Center Diamond (Ascendant / Tanu Bhava)
  2: { x: 130, y: 70 },    // Top Left Triangle
  3: { x: 70, y: 130 },    // Left Top Triangle
  4: { x: 150, y: 250 },   // Left Center Diamond (Matru Bhava)
  5: { x: 70, y: 370 },    // Left Bottom Triangle
  6: { x: 130, y: 430 },   // Bottom Left Triangle
  7: { x: 250, y: 355 },   // Bottom Center Diamond (Yuvati Bhava)
  8: { x: 370, y: 430 },   // Bottom Right Triangle
  9: { x: 430, y: 370 },   // Right Bottom Triangle
  10: { x: 350, y: 250 },  // Right Center Diamond (Karma Bhava)
  11: { x: 430, y: 130 },  // Right Top Triangle
  12: { x: 370, y: 70 },   // Top Right Triangle
};

/**
 * Smart stacking & positioning algorithm to prevent planet label overlap in houses
 */
const getPlanetCoords = (
  pIdx: number,
  totalPlanets: number,
  baseX: number,
  baseY: number
): { x: number; y: number } => {
  if (totalPlanets === 1) {
    return { x: baseX, y: baseY + 4 };
  }
  if (totalPlanets === 2) {
    const offsetY = (pIdx - 0.5) * 20;
    return { x: baseX, y: baseY + 4 + offsetY };
  }
  if (totalPlanets === 3) {
    if (pIdx === 0) return { x: baseX - 22, y: baseY - 6 };
    if (pIdx === 1) return { x: baseX + 22, y: baseY - 6 };
    return { x: baseX, y: baseY + 16 };
  }
  // 4 or more planets: 2-column balanced grid centered at house coordinate
  const col = pIdx % 2;
  const row = Math.floor(pIdx / 2);
  const numRows = Math.ceil(totalPlanets / 2);
  const offsetX = (col - 0.5) * 44;
  const offsetY = (row - (numRows - 1) / 2) * 18;
  return { x: baseX + offsetX, y: baseY + 4 + offsetY };
};

interface NorthIndianKundaliProps {
  planets?: GrahaPlacement[];
  className?: string;
}

export const NorthIndianKundali: React.FC<NorthIndianKundaliProps> = ({
  planets = DEFAULT_PLANETS,
  className,
}) => {
  return (
    <div className={cn('relative flex flex-col items-center select-none', className)}>
      {/* Outer Manuscript Framing Card */}
      <div className="relative p-4 sm:p-6 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep rounded-xs max-w-[520px] w-full">
        {/* Inner Hairline */}
        <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/30 rounded-2xs" />

        {/* Filigree Corner Caps */}
        <span className="pointer-events-none absolute top-1 left-1 h-4 w-4 border-t-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute top-1 right-1 h-4 w-4 border-t-2 border-r-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1 left-1 h-4 w-4 border-b-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1 right-1 h-4 w-4 border-b-2 border-r-2 border-kc-gold" />

        {/* Chart Header Tag */}
        <div className="text-center mb-2">
          <span className="font-heading text-[10px] uppercase tracking-widest text-kc-brass dark:text-kc-gold block">
            उत्तर भारतीय कुण्डली • North Indian Natal Chart
          </span>
          <span className="font-devanagari text-xs text-kc-maroon dark:text-kc-gold font-semibold">
            ॥ लग्न चक्र विन्यास ॥
          </span>
        </div>

        {/* SVG North Indian Square-Diamond Chart */}
        <div className="relative aspect-square w-full">
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full text-kc-maroon dark:text-kc-gold drop-shadow-sm"
            fill="none"
            stroke="currentColor"
          >
            {/* Outer Square */}
            <rect x="10" y="10" width="480" height="480" strokeWidth="3" stroke="#C89B3C" />
            <rect x="16" y="16" width="468" height="468" strokeWidth="1" stroke="#D4AF37" strokeDasharray="4 4" />

            {/* Inner Diagonals forming 12 Triangles & Diamonds */}
            <line x1="10" y1="10" x2="490" y2="490" strokeWidth="2" stroke="#C89B3C" />
            <line x1="490" y1="10" x2="10" y2="490" strokeWidth="2" stroke="#C89B3C" />

            {/* Inner Diamond */}
            <polygon points="250,10 490,250 250,490 10,250" strokeWidth="2.5" stroke="#D4AF37" />

            {/* House Numbers (1 to 12) */}
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => {
              const pos = HOUSE_POSITIONS[h];
              const isLagna = h === 1;
              return (
                <g key={`num-${h}`}>
                  <rect
                    x={pos.x - 14}
                    y={pos.y - 32}
                    width="28"
                    height="16"
                    rx="3"
                    className="fill-kc-paper/80 dark:fill-kc-burnt-brown/80"
                  />
                  <text
                    x={pos.x}
                    y={pos.y - 24}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={cn(
                      'font-heading text-xs font-bold fill-kc-maroon/80 dark:fill-kc-gold/80',
                      isLagna && 'fill-kc-maroon dark:fill-kc-gold text-xs font-black'
                    )}
                  >
                    {isLagna ? 'L-1' : h}
                  </text>
                </g>
              );
            })}

            {/* Graha Placements inside Houses */}
            {Array.from({ length: 12 }, (_, i) => i + 1).map((houseNum) => {
              const pos = HOUSE_POSITIONS[houseNum];
              const housePlanets = planets.filter((p) => p.house === houseNum);

              if (housePlanets.length === 0) return null;

              return (
                <g key={`house-planets-${houseNum}`}>
                  {housePlanets.map((p, pIdx) => {
                    const coords = getPlanetCoords(pIdx, housePlanets.length, pos.x, pos.y);
                    return (
                      <motion.g
                        key={p.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.08 * pIdx, duration: 0.4 }}
                      >
                        {/* High-contrast background pill for visual clarity & zero line overlap */}
                        <rect
                          x={coords.x - 24}
                          y={coords.y - 10}
                          width="48"
                          height="20"
                          rx="4"
                          className="fill-kc-paper/95 dark:fill-kc-burnt-brown/95 stroke-kc-brass/40 dark:stroke-kc-gold/40"
                          strokeWidth="0.8"
                        />
                        <text
                          x={coords.x}
                          y={coords.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="font-devanagari text-[11px] font-bold fill-kc-maroon dark:fill-kc-gold drop-shadow-2xs select-none"
                        >
                          {p.sanskrit} {p.symbol}
                        </text>
                      </motion.g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-3 pt-2 border-t border-kc-brass/30">
          <span className="font-serif text-[11px] text-kc-text-muted italic">
            L1: Lagna (Ascendant House) • Suriya Siddhanta Mathematical Chart Layout
          </span>
        </div>
      </div>
    </div>
  );
};
