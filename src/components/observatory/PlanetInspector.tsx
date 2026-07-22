import React from 'react';
import { ParchmentCard } from '../ui/ParchmentCard';
import { TempleLabel, CardTitle } from '../typography/Typography';
import { WaxSeal } from '../decorations/WaxSeal';
import { GrahaPlacement } from '../revelation/NorthIndianKundali';

interface PlanetInspectorProps {
  selectedPlanet?: GrahaPlacement | null;
  selectedHouse?: number | null;
}

export const PlanetInspector: React.FC<PlanetInspectorProps> = ({
  selectedPlanet,
  selectedHouse,
}) => {
  return (
    <ParchmentCard className="w-full">
      <div className="flex items-center justify-between border-b border-kc-brass/30 pb-3 mb-3">
        <div>
          <TempleLabel>Graha & Bhava Inspector</TempleLabel>
          <CardTitle className="my-0.5">
            {selectedPlanet ? `${selectedPlanet.name} (${selectedPlanet.sanskrit})` : selectedHouse ? `House ${selectedHouse} (भाव ${selectedHouse})` : 'Celestial Inspector'}
          </CardTitle>
        </div>
        <WaxSeal size="sm" label={selectedPlanet ? selectedPlanet.symbol : 'ॐ'} />
      </div>

      {selectedPlanet ? (
        <div className="space-y-3 font-serif text-xs">
          <div className="flex justify-between border-b border-kc-brass/20 pb-2">
            <span className="text-kc-text-muted">Sign / Rashi:</span>
            <span className="font-bold text-kc-maroon dark:text-kc-gold">{selectedPlanet.sign}</span>
          </div>

          <div className="flex justify-between border-b border-kc-brass/20 pb-2">
            <span className="text-kc-text-muted">Occupied House:</span>
            <span className="font-bold text-kc-maroon dark:text-kc-gold">House {selectedPlanet.house} (Bhava {selectedPlanet.house})</span>
          </div>

          <div className="flex justify-between border-b border-kc-brass/20 pb-2">
            <span className="text-kc-text-muted">Presiding Symbol:</span>
            <span className="font-bold text-kc-maroon dark:text-kc-gold text-base">{selectedPlanet.symbol}</span>
          </div>

          <div className="p-3 bg-kc-sand/30 dark:bg-kc-dark-wood/40 rounded-xs border border-kc-brass/30 text-kc-text-secondary mt-2">
            <span className="font-heading text-[10px] uppercase text-kc-brass dark:text-kc-gold block mb-1">
              ✦ Aspect Rays (Drishti)
            </span>
            <span>
              Casts full 7th house aspect onto House {((selectedPlanet.house - 1 + 6) % 12) + 1}.
            </span>
          </div>
        </div>
      ) : selectedHouse ? (
        <div className="space-y-3 font-serif text-xs">
          <div className="flex justify-between border-b border-kc-brass/20 pb-2">
            <span className="text-kc-text-muted">House Sector:</span>
            <span className="font-bold text-kc-maroon dark:text-kc-gold">Bhava {selectedHouse}</span>
          </div>
          <p className="text-kc-text-secondary italic">
            Select an individual Graha symbol inside the chart to view specific astronomical longitudes and aspects.
          </p>
        </div>
      ) : (
        <div className="py-6 text-center text-kc-text-muted font-serif text-xs italic">
          Click any planet or house in the Celestial Chart to inspect its sidereal longitude, Rashi, and aspect relationships.
        </div>
      )}
    </ParchmentCard>
  );
};
