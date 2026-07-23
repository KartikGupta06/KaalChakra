import React from 'react';
import { motion } from 'framer-motion';
import { HeroHeading, Subheading, SanskritHeading, Caption, TempleLabel } from '../typography/Typography';
import { paperReveal } from '../animations/variants';
import { TempleButton } from '../ui/TempleButton';
import { EngravedDatePicker } from '../birth/EngravedDatePicker';
import { EngravedTimePicker } from '../birth/EngravedTimePicker';
import { LocationSearch, LocationData } from '../birth/LocationSearch';
import { useSound } from '../../context/AudioContext';

export interface EditableTimelineFormData {
  fullName: string;
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
  city: string;
  lat?: number;
  lng?: number;
}

interface TimelineHeroHeaderProps {
  formData: EditableTimelineFormData;
  onFormChange: (updated: Partial<EditableTimelineFormData>) => void;
  onRegenerateTimeline: () => void;
  isRegenerating: boolean;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  totalEventsCount: number;
  ascendantSign?: string;
  moonSign?: string;
}

export const TimelineHeroHeader: React.FC<TimelineHeroHeaderProps> = ({
  formData,
  onFormChange,
  onRegenerateTimeline,
  isRegenerating,
  activeFilter,
  onFilterChange,
  totalEventsCount,
  ascendantSign = 'Mesh (Aries)',
  moonSign = 'Kark (Cancer)',
}) => {
  const { playSound } = useSound();

  // Calculate current age
  const birthYear = formData.year || 1998;
  const birthMonth = formData.month || 8;
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange({ fullName: e.target.value });
  };

  const handleCitySelect = (cityName: string, details?: LocationData) => {
    onFormChange({
      city: cityName,
      lat: details?.lat,
      lng: details?.lng,
    });
  };

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

      {/* Royal Archive Inscription Editable Form Card */}
      <div className="mt-6 p-4 sm:p-6 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep rounded-xs max-w-3xl w-full text-left relative overflow-hidden">
        {/* Inner Hairline */}
        <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/30 rounded-2xs" />

        {/* Card Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-kc-brass/30 pb-3 mb-4 gap-2">
          <div>
            <TempleLabel>Royal Observer Registration Form</TempleLabel>
            <h2 className="font-heading text-lg font-bold text-kc-maroon dark:text-kc-gold leading-tight">
              Edit Timeline Coordinates
            </h2>
          </div>
          <div className="text-right">
            <span className="font-heading text-[10px] text-kc-brass uppercase block">Current Age</span>
            <span className="font-serif text-sm font-bold text-kc-maroon dark:text-kc-gold">
              {ageYears >= 0 ? `${ageYears} Years, ${ageMonths} Months` : 'Natal Chart'}
            </span>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif">
          {/* 1. Name Field */}
          <div>
            <label className="font-heading text-[10px] uppercase tracking-wider text-kc-brass font-bold block mb-1">
              Observer Full Name
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={handleNameChange}
              onFocus={() => playSound('ink-stroke')}
              placeholder="e.g. Maharishi Valmiki"
              className="kc-input w-full px-3.5 py-2 font-serif text-sm font-bold"
            />
          </div>

          {/* 2. Location Field */}
          <div>
            <label className="font-heading text-[10px] uppercase tracking-wider text-kc-brass font-bold block mb-1">
              Birth Observatory Location
            </label>
            <LocationSearch value={formData.city} onChange={handleCitySelect} />
          </div>

          {/* 3. Date of Birth Picker */}
          <div>
            <label className="font-heading text-[10px] uppercase tracking-wider text-kc-brass font-bold block mb-1">
              Date of Birth (Gregorian / Tithi)
            </label>
            <EngravedDatePicker
              day={formData.day}
              month={formData.month}
              year={formData.year}
              onChange={(d) => onFormChange({ day: d.day, month: d.month, year: d.year })}
            />
          </div>

          {/* 4. Time of Birth Picker */}
          <div>
            <label className="font-heading text-[10px] uppercase tracking-wider text-kc-brass font-bold block mb-1">
              Exact Time of Birth (Local Time)
            </label>
            <EngravedTimePicker
              hour={formData.hour}
              minute={formData.minute}
              period={formData.period}
              onChange={(t) => onFormChange({ hour: t.hour, minute: t.minute, period: t.period })}
            />
          </div>
        </div>

        {/* Recalculation Button & Summary Bar */}
        <div className="mt-5 pt-4 border-t border-kc-brass/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs font-serif text-kc-text-secondary">
            <span>Lagna: <strong className="text-kc-maroon dark:text-kc-gold">{ascendantSign}</strong></span>
            <span>•</span>
            <span>Moon Rashi: <strong className="text-kc-maroon dark:text-kc-gold">{moonSign}</strong></span>
            <span>•</span>
            <span>Chronicles: <strong className="text-kc-maroon dark:text-kc-gold">{totalEventsCount} Milestones</strong></span>
          </div>

          <TempleButton
            variant="primary"
            size="md"
            onClick={() => {
              playSound('ink-stroke');
              onRegenerateTimeline();
            }}
            disabled={isRegenerating}
            className="w-full sm:w-auto font-bold shadow-deep"
          >
            {isRegenerating ? ' Recalculating Timeline...' : ' Regenerate Timeline (काल पुनर्गणन)'}
          </TempleButton>
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
