import React from 'react';
import { useSound } from '../../context/AudioContext';
import { cn } from '../../lib/utils';

interface EngravedDatePickerProps {
  day: number;
  month: number;
  year: number;
  onChange: (date: { day: number; month: number; year: number }) => void;
  className?: string;
}

const MONTHS = [
  { value: 1, label: 'January (पौष / माघ)' },
  { value: 2, label: 'February (माघ / फाल्गुन)' },
  { value: 3, label: 'March (फाल्गुन / चैत्र)' },
  { value: 4, label: 'April (चैत्र / वैशाख)' },
  { value: 5, label: 'May (वैशाख / ज्येष्ठ)' },
  { value: 6, label: 'June (ज्येष्ठ / आषाढ)' },
  { value: 7, label: 'July (आषाढ / श्रावण)' },
  { value: 8, label: 'August (श्रावण / भाद्रपद)' },
  { value: 9, label: 'September (भाद्रपद / आश्विन)' },
  { value: 10, label: 'October (आश्विन / कार्तिक)' },
  { value: 11, label: 'November (कार्तिक / मार्गशीर्ष)' },
  { value: 12, label: 'December (मार्गशीर्ष / पौष)' },
];

export const EngravedDatePicker: React.FC<EngravedDatePickerProps> = ({
  day,
  month,
  year,
  onChange,
  className,
}) => {
  const { playSound } = useSound();

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playSound('ink-stroke');
    onChange({ day: parseInt(e.target.value, 10), month, year });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playSound('ink-stroke');
    onChange({ day, month: parseInt(e.target.value, 10), year });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playSound('ink-stroke');
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      onChange({ day, month, year: val });
    }
  };

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      <label className="font-heading text-xs font-semibold tracking-wider text-kc-maroon dark:text-kc-gold uppercase flex items-center justify-between">
        <span>Date of Birth (जन्म तिथि)</span>
        <span className="text-[10px] text-kc-gold-royal lowercase italic">solar & lunar almanac</span>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Day Select */}
        <select
          value={day}
          onChange={handleDayChange}
          className="rounded-xs bg-kc-sand/50 dark:bg-kc-dark-wood/60 px-3 py-2.5 font-serif text-sm text-kc-text-primary dark:text-kc-text-secondary border border-kc-brass/50 dark:border-kc-gold/30 shadow-inset focus:border-kc-gold-royal focus:outline-none cursor-pointer"
        >
          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d} className="bg-kc-paper dark:bg-kc-burnt-brown">
              Day {d}
            </option>
          ))}
        </select>

        {/* Month Select */}
        <select
          value={month}
          onChange={handleMonthChange}
          className="rounded-xs bg-kc-sand/50 dark:bg-kc-dark-wood/60 px-3 py-2.5 font-serif text-sm text-kc-text-primary dark:text-kc-text-secondary border border-kc-brass/50 dark:border-kc-gold/30 shadow-inset focus:border-kc-gold-royal focus:outline-none cursor-pointer"
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value} className="bg-kc-paper dark:bg-kc-burnt-brown">
              {m.label}
            </option>
          ))}
        </select>

        {/* Year Input */}
        <input
          type="number"
          min="1900"
          max="2100"
          value={year}
          onChange={handleYearChange}
          placeholder="Year (1995)"
          className="rounded-xs bg-kc-sand/50 dark:bg-kc-dark-wood/60 px-3 py-2.5 font-serif text-sm text-kc-text-primary dark:text-kc-text-secondary border border-kc-brass/50 dark:border-kc-gold/30 shadow-inset focus:border-kc-gold-royal focus:outline-none"
        />
      </div>
    </div>
  );
};
