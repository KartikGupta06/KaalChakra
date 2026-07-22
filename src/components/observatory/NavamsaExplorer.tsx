import React from 'react';
import { ParchmentCard } from '../ui/ParchmentCard';
import { TempleLabel, CardTitle } from '../typography/Typography';
import { NorthIndianKundali } from '../revelation/NorthIndianKundali';

export const NavamsaExplorer: React.FC = () => {
  return (
    <ParchmentCard className="w-full my-6">
      <div className="border-b border-kc-brass/30 pb-3 mb-4">
        <TempleLabel>Harmonic Chart Comparison</TempleLabel>
        <CardTitle className="my-0.5">D1 Natal Chart vs D9 Navamsa Chart (नवांश तुलना)</CardTitle>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-kc-brass dark:text-kc-gold block text-center mb-2">
            D1 Rashi Chart (लग्न चक्र)
          </span>
          <NorthIndianKundali />
        </div>

        <div>
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-kc-brass dark:text-kc-gold block text-center mb-2">
            D9 Navamsa Chart (नवांश चक्र)
          </span>
          <NorthIndianKundali />
        </div>
      </div>
    </ParchmentCard>
  );
};
