import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { GrahaPlacement, DEFAULT_PLANETS } from '../revelation/NorthIndianKundali';

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

interface InteractiveKundaliChartProps {
  planets?: GrahaPlacement[];
  selectedPlanetId?: string | null;
  selectedHouse?: number | null;
  onSelectPlanet?: (planet: GrahaPlacement) => void;
  onSelectHouse?: (houseNumber: number) => void;
  showAspectLines?: boolean;
}

export const InteractiveKundaliChart: React.FC<InteractiveKundaliChartProps> = ({
  planets = DEFAULT_PLANETS,
  selectedPlanetId,
  selectedHouse,
  onSelectPlanet,
  onSelectHouse,
  showAspectLines = true,
}) => {
  const [hoveredHouse, setHoveredHouse] = useState<number | null>(null);

  const selectedPlanet = planets.find((p) => p.id === selectedPlanetId);

  // Determine aspected houses for selected planet
  const aspectedHouses: number[] = [];
  if (selectedPlanet) {
    const h = selectedPlanet.house;
    // 7th house aspect for all planets
    aspectedHouses.push(((h - 1 + 6) % 12) + 1);

    // Special aspects
    if (selectedPlanet.id === 'mars') {
      aspectedHouses.push(((h - 1 + 3) % 12) + 1);
      aspectedHouses.push(((h - 1 + 7) % 12) + 1);
    } else if (selectedPlanet.id === 'jupiter') {
      aspectedHouses.push(((h - 1 + 4) % 12) + 1);
      aspectedHouses.push(((h - 1 + 8) % 12) + 1);
    } else if (selectedPlanet.id === 'saturn') {
      aspectedHouses.push(((h - 1 + 2) % 12) + 1);
      aspectedHouses.push(((h - 1 + 9) % 12) + 1);
    }
  }

  return (
    <div className="relative flex flex-col items-center select-none w-full">
      {/* Outer Card */}
      <div className="relative p-4 sm:p-6 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep rounded-xs max-w-[540px] w-full">
        {/* Hairline */}
        <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/30 rounded-2xs" />

        {/* Filigree Corner Caps */}
        <span className="pointer-events-none absolute top-1 left-1 h-4 w-4 border-t-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute top-1 right-1 h-4 w-4 border-t-2 border-r-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1 left-1 h-4 w-4 border-b-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1 right-1 h-4 w-4 border-b-2 border-r-2 border-kc-gold" />

        {/* Header Tag */}
        <div className="text-center mb-2">
          <span className="font-heading text-[10px] uppercase tracking-widest text-kc-brass dark:text-kc-gold block">
            Interactive Celestial Chart • Click Planet or House
          </span>
          <span className="font-devanagari text-xs text-kc-maroon dark:text-kc-gold font-semibold">
            ॥ दिव्य चक्र वेध ॥
          </span>
        </div>

        {/* SVG Chart */}
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

            {/* Diagonals */}
            <line x1="10" y1="10" x2="490" y2="490" strokeWidth="2" stroke="#C89B3C" />
            <line x1="490" y1="10" x2="10" y2="490" strokeWidth="2" stroke="#C89B3C" />

            {/* Inner Diamond */}
            <polygon points="250,10 490,250 250,490 10,250" strokeWidth="2.5" stroke="#D4AF37" />

            {/* Aspect Rays from Selected Planet */}
            {showAspectLines && selectedPlanet && aspectedHouses.map((targetHouse) => {
              const startPos = HOUSE_POSITIONS[selectedPlanet.house];
              const endPos = HOUSE_POSITIONS[targetHouse];
              return (
                <g key={`aspect-${selectedPlanet.id}-${targetHouse}`}>
                  <line
                    x1={startPos.x}
                    y1={startPos.y}
                    x2={endPos.x}
                    y2={endPos.y}
                    stroke="#E67E22"
                    strokeWidth="2.5"
                    strokeDasharray="6 3"
                    className="animate-pulse"
                  />
                  <circle cx={endPos.x} cy={endPos.y} r="18" fill="rgba(230, 126, 34, 0.15)" stroke="#E67E22" strokeWidth="1.5" />
                </g>
              );
            })}

            {/* House Interactive Sectors */}
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => {
              const pos = HOUSE_POSITIONS[h];
              const isSelected = selectedHouse === h;
              const isHovered = hoveredHouse === h;
              const isAspected = aspectedHouses.includes(h);

              return (
                <g
                  key={`house-click-${h}`}
                  onClick={() => onSelectHouse?.(h)}
                  onMouseEnter={() => setHoveredHouse(h)}
                  onMouseLeave={() => setHoveredHouse(null)}
                  className="cursor-pointer"
                >
                  {/* Highlight Circle behind House number */}
                  {(isSelected || isHovered || isAspected) && (
                    <circle
                      cx={pos.x}
                      y={pos.y}
                      r="42"
                      fill={isSelected ? 'rgba(212, 175, 55, 0.25)' : isAspected ? 'rgba(230, 126, 34, 0.2)' : 'rgba(212, 175, 55, 0.12)'}
                      stroke={isSelected ? '#D4AF37' : isAspected ? '#E67E22' : '#C89B3C'}
                      strokeWidth="1.5"
                    />
                  )}

                  {/* House Label */}
                  <rect
                    x={pos.x - 14}
                    y={pos.y - 34}
                    width="28"
                    height="16"
                    rx="3"
                    className="fill-kc-paper/80 dark:fill-kc-burnt-brown/80"
                  />
                  <text
                    x={pos.x}
                    y={pos.y - 26}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className={cn(
                      'font-heading text-xs font-bold fill-kc-maroon/80 dark:fill-kc-gold/80 select-none',
                      (isSelected || isHovered) && 'fill-kc-maroon dark:fill-kc-gold font-extrabold text-xs'
                    )}
                  >
                    {h === 1 ? 'L-1' : h}
                  </text>
                </g>
              );
            })}

            {/* Graha Placements */}
            {Array.from({ length: 12 }, (_, i) => i + 1).map((houseNum) => {
              const pos = HOUSE_POSITIONS[houseNum];
              const housePlanets = planets.filter((p) => p.house === houseNum);

              if (housePlanets.length === 0) return null;

              return (
                <g key={`interactive-house-${houseNum}`}>
                  {housePlanets.map((p, pIdx) => {
                    const coords = getPlanetCoords(pIdx, housePlanets.length, pos.x, pos.y);
                    const isSelectedPlanet = selectedPlanetId === p.id;

                    return (
                      <g
                        key={p.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPlanet?.(p);
                        }}
                        className="cursor-pointer group"
                      >
                        <rect
                          x={coords.x - 24}
                          y={coords.y - 10}
                          width="48"
                          height="20"
                          rx="4"
                          className={cn(
                            'fill-kc-paper/95 dark:fill-kc-burnt-brown/95 stroke-kc-brass/40 dark:stroke-kc-gold/40 transition-all',
                            isSelectedPlanet && 'fill-kc-gold/20 stroke-kc-gold-royal stroke-[1.5]'
                          )}
                        />
                        <text
                          x={coords.x}
                          y={coords.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className={cn(
                            'font-devanagari text-[11px] font-bold fill-kc-maroon dark:fill-kc-gold select-none transition-all',
                            isSelectedPlanet && 'fill-kc-maroon dark:fill-kc-gold font-black text-[12px] drop-shadow-md'
                          )}
                        >
                          {p.sanskrit} {p.symbol}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Interactive Tip */}
        <div className="text-center mt-3 pt-2 border-t border-kc-brass/30">
          <span className="font-serif text-[11px] text-kc-text-muted italic">
            ✦ Click any Graha (planet) to reveal Vedic Drishti (aspect rays) & Nakshatra details.
          </span>
        </div>
      </div>
    </div>
  );
};
