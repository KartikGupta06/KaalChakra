import React from 'react';
import { PanchangData } from '../../types/panchang';
import { TempleBorder } from '../decorations/TempleBorder';
import { TempleLabel, CardTitle } from '../typography/Typography';

interface SolarJourneySectionProps {
  data: PanchangData;
}

export const SolarJourneySection: React.FC<SolarJourneySectionProps> = ({ data }) => {
  return (
    <TempleBorder variant="standard" className="w-full my-6">
      <div className="text-center mb-4">
        <TempleLabel>Surya Patha • Solar Trajectory</TempleLabel>
        <CardTitle className="my-0">Today's Solar Journey</CardTitle>
      </div>

      {/* SVG Solar Trajectory Arc */}
      <div className="relative w-full h-36 flex items-center justify-center">
        <svg viewBox="0 0 500 160" className="w-full h-full text-kc-saffron">
          {/* Horizon Line */}
          <line x1="20" y1="140" x2="480" y2="140" stroke="#C89B3C" strokeWidth="2" strokeDasharray="4 4" />

          {/* Solar Arc Path */}
          <path
            d="M 40,140 Q 250,10 460,140"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
          />

          {/* Sun Position Indicator (Solar Noon / Active Zenith Position) */}
          <circle cx="250" cy="40" r="14" fill="#E67E22" stroke="#F8F0DD" strokeWidth="3" />
          <circle cx="250" cy="40" r="22" fill="none" stroke="#E67E22" strokeWidth="1.5" strokeDasharray="2 4" />

          {/* Key Markers: Sunrise, Solar Noon, Sunset */}
          <circle cx="40" cy="140" r="6" fill="#C89B3C" />
          <circle cx="460" cy="140" r="6" fill="#C89B3C" />

          {/* Text Labels */}
          <text x="40" y="155" textAnchor="middle" className="font-serif text-[10px] fill-kc-text-secondary">
            Sunrise ({data.cycles.sunrise})
          </text>
          <text x="250" y="20" textAnchor="middle" className="font-serif text-[10px] fill-kc-maroon font-bold">
            Solar Noon ({data.cycles.solarNoon})
          </text>
          <text x="460" y="155" textAnchor="middle" className="font-serif text-[10px] fill-kc-text-secondary">
            Sunset ({data.cycles.sunset})
          </text>
        </svg>
      </div>
    </TempleBorder>
  );
};
