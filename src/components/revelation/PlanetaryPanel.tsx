import React from 'react';
import { ParchmentCard } from '../ui/ParchmentCard';
import { TempleLabel, CardTitle } from '../typography/Typography';
import { GrahaPlacement, DEFAULT_PLANETS } from './NorthIndianKundali';

interface PlanetaryPanelProps {
  planets?: GrahaPlacement[];
}

export const PlanetaryPanel: React.FC<PlanetaryPanelProps> = ({
  planets = DEFAULT_PLANETS,
}) => {
  return (
    <ParchmentCard className="w-full">
      <div className="border-b border-kc-brass/30 pb-3 mb-3">
        <TempleLabel>Navagraha Positions</TempleLabel>
        <CardTitle className="my-0.5">Planetary Alignment (ग्रहस्थिति)</CardTitle>
      </div>

      <div className="divide-y divide-kc-brass/20 max-h-[380px] overflow-y-auto pr-1">
        {planets.map((p) => (
          <div key={p.id} className="py-2 flex items-center justify-between font-serif text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-base font-bold text-kc-maroon dark:text-kc-gold w-5 text-center">
                {p.symbol}
              </span>
              <div>
                <span className="font-bold text-kc-text-primary dark:text-kc-text-secondary block leading-tight">
                  {p.name} ({p.sanskrit})
                </span>
                <span className="text-[10px] text-kc-text-muted">{p.sign}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-heading text-[11px] font-bold text-kc-maroon dark:text-kc-gold block">
                House {p.house}
              </span>
              <span className="text-[10px] text-kc-gold-royal italic">
                {p.house === 1 ? 'Ascendant' : `Bhava ${p.house}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ParchmentCard>
  );
};
