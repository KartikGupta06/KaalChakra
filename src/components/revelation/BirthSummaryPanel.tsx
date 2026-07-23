import React from 'react';
import { ParchmentCard } from '../ui/ParchmentCard';
import { TempleLabel, CardTitle } from '../typography/Typography';
import { WaxSeal } from '../decorations/WaxSeal';

interface BirthSummaryPanelProps {
  name: string;
  dateStr: string;
  timeStr: string;
  placeStr: string;
  ascendantSign?: string;
  moonSign?: string;
  sunSign?: string;
}

export const BirthSummaryPanel: React.FC<BirthSummaryPanelProps> = ({
  name,
  dateStr,
  timeStr,
  placeStr,
  ascendantSign,
  moonSign,
  sunSign,
}) => {
  return (
    <ParchmentCard className="w-full">
      <div className="flex items-center justify-between border-b border-kc-brass/30 pb-3 mb-4">
        <div>
          <TempleLabel>Birth Record Manuscript</TempleLabel>
          <CardTitle className="my-0.5">Janma Patrika (जन्म पत्रिका)</CardTitle>
        </div>
        <WaxSeal size="sm" label="ॐ" />
      </div>

      <div className="space-y-3 font-serif text-sm">
        <div className="flex flex-col">
          <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass dark:text-kc-gold">
            Observer Name
          </span>
          <span className="font-bold text-base text-kc-maroon dark:text-kc-gold">
            {name || 'Observer'}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass dark:text-kc-gold">
            Date of Birth
          </span>
          <span className="text-kc-text-primary dark:text-kc-text-secondary font-medium">
            📅 {dateStr}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass dark:text-kc-gold">
            Time of Birth
          </span>
          <span className="text-kc-text-primary dark:text-kc-text-secondary font-medium">
            ⏰ {timeStr}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass dark:text-kc-gold">
            Birth Place Coordinates
          </span>
          <span className="text-kc-text-primary dark:text-kc-text-secondary font-medium">
            📌 {placeStr}
          </span>
        </div>

        {/* Calculated Celestial Alignment Badges */}
        {(ascendantSign || moonSign || sunSign) && (
          <div className="pt-2 border-t border-kc-brass/30 space-y-2">
            <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass dark:text-kc-gold block font-bold">
              Key Astrological Markers
            </span>

            {ascendantSign && (
              <div className="flex justify-between items-center bg-kc-sand/30 dark:bg-kc-dark-wood/40 px-2.5 py-1.5 rounded-3xs border border-kc-brass/40">
                <span className="text-xs font-heading font-semibold text-kc-maroon dark:text-kc-gold">
                  Ascendant (Lagna)
                </span>
                <span className="text-xs font-bold text-kc-text-primary dark:text-kc-text-secondary">
                  {ascendantSign}
                </span>
              </div>
            )}

            {moonSign && (
              <div className="flex justify-between items-center bg-kc-sand/30 dark:bg-kc-dark-wood/40 px-2.5 py-1.5 rounded-3xs border border-kc-brass/40">
                <span className="text-xs font-heading font-semibold text-kc-maroon dark:text-kc-gold">
                  Moon Sign (Janma Rashi)
                </span>
                <span className="text-xs font-bold text-kc-text-primary dark:text-kc-text-secondary">
                  {moonSign}
                </span>
              </div>
            )}

            {sunSign && (
              <div className="flex justify-between items-center bg-kc-sand/30 dark:bg-kc-dark-wood/40 px-2.5 py-1.5 rounded-3xs border border-kc-brass/40">
                <span className="text-xs font-heading font-semibold text-kc-maroon dark:text-kc-gold">
                  Sun Sign (Surya Rashi)
                </span>
                <span className="text-xs font-bold text-kc-text-primary dark:text-kc-text-secondary">
                  {sunSign}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-kc-brass/30 bg-kc-sand/30 dark:bg-kc-dark-wood/40 p-3 rounded-xs text-xs font-serif italic text-kc-text-muted">
        ✦ Celestial longitudes & Lagna house boundaries initialized under Surya Siddhanta almanac rules.
      </div>
    </ParchmentCard>
  );
};
