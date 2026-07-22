import React from 'react';
import { ParchmentCard } from '../ui/ParchmentCard';
import { TempleLabel, CardTitle } from '../typography/Typography';

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const NakshatraExplorer: React.FC = () => {
  return (
    <ParchmentCard className="w-full my-6">
      <div className="border-b border-kc-brass/30 pb-3 mb-3">
        <TempleLabel>Constellation Realm</TempleLabel>
        <CardTitle className="my-0.5">27 Nakshatra Explorer (नक्षत्र मण्डल)</CardTitle>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 text-center text-xs font-serif">
        {NAKSHATRAS.map((nak, idx) => {
          const isSwati = nak === 'Swati';
          return (
            <div
              key={nak}
              className={`p-2 rounded-xs border transition-all ${
                isSwati
                  ? 'bg-kc-sand border-kc-gold-royal text-kc-maroon font-bold shadow-sm dark:bg-kc-dark-wood dark:text-kc-gold'
                  : 'bg-kc-sand/20 border-kc-brass/20 text-kc-text-muted'
              }`}
            >
              <span className="block font-heading text-[10px] text-kc-brass dark:text-kc-gold">
                #{idx + 1}
              </span>
              <span className="truncate block">{nak}</span>
            </div>
          );
        })}
      </div>
    </ParchmentCard>
  );
};
