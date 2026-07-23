import React from 'react';
import { motion } from 'framer-motion';
import { HeroHeading, Subheading, SanskritHeading, Caption, TempleLabel } from '../typography/Typography';
import { paperReveal } from '../animations/variants';
import { TempleButton } from '../ui/TempleButton';
import { KundaliState } from '../../context/KundaliContext';

interface TimelineHeroHeaderProps {
  kundali: KundaliState;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  totalEventsCount: number;
}

export const TimelineHeroHeader: React.FC<TimelineHeroHeaderProps> = ({
  kundali,
  activeFilter,
  onFilterChange,
  totalEventsCount,
}) => {
  // Calculate current age from birth date
  const birthYear = kundali.date?.year || 1998;
  const birthMonth = kundali.date?.month || 8;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  let ageYears = currentYear - birthYear;
  let ageMonths = currentMonth - birthMonth;
  if (ageMonths < 0) {
    ageYears -= 1;
    ageMonths += 12;
  }

  const filters = [
    { id: 'all', label: '❖ All Chronicles' },
    { id: 'dasha', label: '⏳ Vimshottari Dashas' },
    { id: 'transit', label: '🪐 Planetary Transits' },
    { id: 'eclipse', label: '🌑 Eclipses & Solstices' },
    { id: 'muhurat', label: '📜 Muhurat Windows' },
  ];

  return (
    <motion.div
      variants={paperReveal}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center w-full"
    >
      <SanskritHeading className="mb-1">॥ काल प्रवाह - अनन्त समय चक्र ॥</SanskritHeading>
      <HeroHeading className="mb-2">THE COSMIC TIMELINE</HeroHeading>
      <Subheading className="max-w-xl text-center">
        An Ancient Royal Chronicle Documenting Your Life's Cosmic Journey Through Time
      </Subheading>
      <Caption className="mt-1 text-center max-w-md">
        Observe the unrolling manuscript of planetary transits, Vimshottari Mahadashas, and sacred celestial milestones.
      </Caption>

      {/* Royal Archive Inscription Summary Card */}
      <div className="mt-6 p-4 sm:p-5 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep rounded-xs max-w-2xl w-full text-left relative overflow-hidden">
        {/* Inner Hairline */}
        <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/30 rounded-2xs" />

        <div className="flex items-center justify-between border-b border-kc-brass/30 pb-3 mb-3">
          <div>
            <TempleLabel>Vedic Chronicle Inscription</TempleLabel>
            <h2 className="font-heading text-lg font-bold text-kc-maroon dark:text-kc-gold leading-tight">
              {kundali.fullName}
            </h2>
          </div>
          <div className="text-right">
            <span className="font-heading text-[10px] text-kc-brass uppercase block">Current Age</span>
            <span className="font-serif text-sm font-bold text-kc-maroon dark:text-kc-gold">
              {ageYears} Years, {ageMonths} Months
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-serif">
          <div className="p-2 rounded-2xs bg-kc-sand/40 dark:bg-kc-dark-wood/40 border border-kc-brass/20">
            <span className="font-heading text-[9px] uppercase tracking-wider text-kc-brass block">Birth Moment</span>
            <span className="font-semibold text-kc-text-primary dark:text-kc-text-secondary">
              {kundali.date ? `${kundali.date.day}/${kundali.date.month}/${kundali.date.year}` : '15/8/1998'}
            </span>
          </div>

          <div className="p-2 rounded-2xs bg-kc-sand/40 dark:bg-kc-dark-wood/40 border border-kc-brass/20">
            <span className="font-heading text-[9px] uppercase tracking-wider text-kc-brass block">Lagna / Rising</span>
            <span className="font-semibold text-kc-maroon dark:text-kc-gold">
              {kundali.ascendantSign}
            </span>
          </div>

          <div className="p-2 rounded-2xs bg-kc-sand/40 dark:bg-kc-dark-wood/40 border border-kc-brass/20">
            <span className="font-heading text-[9px] uppercase tracking-wider text-kc-brass block">Moon Rashi</span>
            <span className="font-semibold text-kc-maroon dark:text-kc-gold">
              {kundali.moonSign}
            </span>
          </div>

          <div className="p-2 rounded-2xs bg-kc-sand/40 dark:bg-kc-dark-wood/40 border border-kc-brass/20">
            <span className="font-heading text-[9px] uppercase tracking-wider text-kc-brass block">Chronicles</span>
            <span className="font-semibold text-kc-maroon dark:text-kc-gold">
              {totalEventsCount} Milestones
            </span>
          </div>
        </div>
      </div>

      {/* Layer Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
        {filters.map((f) => (
          <TempleButton
            key={f.id}
            variant={activeFilter === f.id ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onFilterChange(f.id)}
          >
            {f.label}
          </TempleButton>
        ))}
      </div>
    </motion.div>
  );
};
