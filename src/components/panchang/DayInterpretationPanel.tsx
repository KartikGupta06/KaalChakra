import React from 'react';
import { PanchangData } from '../../types/panchang';
import { ParchmentCard } from '../ui/ParchmentCard';
import { TempleLabel, Quote, BodyText } from '../typography/Typography';
import { AncientDivider } from '../decorations/AncientDivider';

interface DayInterpretationPanelProps {
  data: PanchangData;
}

export const DayInterpretationPanel: React.FC<DayInterpretationPanelProps> = ({ data }) => {
  return (
    <ParchmentCard className="w-full my-6 text-center">
      <TempleLabel>Vedic Astronomical Guidance</TempleLabel>
      <h3 className="font-heading text-xl font-bold text-kc-maroon dark:text-kc-gold my-1">
        {data.dayCharacter.title} ({data.dayCharacter.sanskritTitle})
      </h3>

      <AncientDivider symbol="om" className="my-3" />

      <Quote className="border-l-0 text-base sm:text-lg my-3 max-w-2xl mx-auto">
        “{data.dayCharacter.description}”
      </Quote>

      <div className="p-4 rounded-xs bg-kc-sand/40 dark:bg-kc-dark-wood/40 border border-kc-brass/30 max-w-2xl mx-auto my-3 text-left">
        <span className="font-heading text-xs font-bold uppercase tracking-wider text-kc-maroon dark:text-kc-gold block mb-1">
          ✦ Auspicious Observances & Conduct
        </span>
        <BodyText className="text-xs text-kc-text-primary dark:text-kc-text-secondary leading-relaxed">
          {data.dayCharacter.auspiciousNote}
        </BodyText>
      </div>

      <div className="flex items-center justify-center gap-6 text-xs font-serif text-kc-text-muted mt-3">
        <span>Elemental Essence: <strong>{data.dayCharacter.element}</strong></span>
        <span>•</span>
        <span>Auspicious Color: <strong>{data.dayCharacter.color}</strong></span>
      </div>
    </ParchmentCard>
  );
};
