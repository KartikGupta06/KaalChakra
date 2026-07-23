import React, { useState, useEffect } from 'react';
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
  const [yearInput, setYearInput] = useState<string>(year ? year.toString() : '1998');

  useEffect(() => {
    if (year && year.toString() !== yearInput && yearInput.length === 4) {
      setYearInput(year.toString());
    }
  }, [year]);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playSound('ink-stroke');
    onChange({ day: parseInt(e.target.value, 10), month, year });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playSound('ink-stroke');
    onChange({ day, month: parseInt(e.target.value, 10), year });
  };

  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Allow digits only up to 4 characters for clean year entry
    const cleaned = rawVal.replace(/\D/g, '').slice(0, 4);
    setYearInput(cleaned);

    const numericVal = parseInt(cleaned, 10);
    if (!isNaN(numericVal) && cleaned.length === 4) {
      playSound('ink-stroke');
      onChange({ day, month, year: numericVal });
    }
  };

  const handleYearBlur = () => {
    const numericVal = parseInt(yearInput, 10);
    if (isNaN(numericVal) || numericVal < 1900 || numericVal > 2100) {
      // Revert to valid year prop if invalid on blur
      setYearInput(year.toString());
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    playSound('ink-stroke');
    if ('select' in e.target) {
      (e.target as HTMLInputElement).select();
    }
  };

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      <label className="font-heading text-xs font-bold tracking-wider text-kc-maroon dark:text-kc-gold uppercase flex items-center justify-between">
        <span>Date of Birth (जन्म तिथि)</span>
        <span className="text-[10px] text-kc-gold-royal lowercase italic font-serif">solar & lunar almanac</span>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Day Select (Simplified to 1..31 for clean visual identity) */}
        <select
          value={day}
          onChange={handleDayChange}
          onFocus={handleInputFocus}
          className="rounded-xs bg-kc-sand/70 dark:bg-kc-dark-wood/80 px-3 py-2.5 font-serif text-sm font-semibold text-[#1C0F0A] dark:text-[#FDF6E3] border border-kc-brass/60 dark:border-kc-gold/40 shadow-inset focus:border-kc-gold-royal focus:outline-none focus:ring-2 focus:ring-kc-gold-royal/80 focus:bg-kc-ivory dark:focus:bg-kc-dark-wood transition-all duration-200 cursor-pointer"
        >
          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d} className="bg-kc-paper dark:bg-kc-burnt-brown text-[#1C0F0A] dark:text-[#FDF6E3]">
              {d}
            </option>
          ))}
        </select>

        {/* Month Select */}
        <select
          value={month}
          onChange={handleMonthChange}
          onFocus={handleInputFocus}
          className="rounded-xs bg-kc-sand/70 dark:bg-kc-dark-wood/80 px-3 py-2.5 font-serif text-sm font-semibold text-[#1C0F0A] dark:text-[#FDF6E3] border border-kc-brass/60 dark:border-kc-gold/40 shadow-inset focus:border-kc-gold-royal focus:outline-none focus:ring-2 focus:ring-kc-gold-royal/80 focus:bg-kc-ivory dark:focus:bg-kc-dark-wood transition-all duration-200 cursor-pointer"
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value} className="bg-kc-paper dark:bg-kc-burnt-brown text-[#1C0F0A] dark:text-[#FDF6E3]">
              {m.label}
            </option>
          ))}
        </select>

        {/* Year Input (Natural keyboard, selection, backspace, delete & paste friendly) */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={yearInput}
          onChange={handleYearInputChange}
          onBlur={handleYearBlur}
          onFocus={handleInputFocus}
          placeholder="Year (e.g. 2010)"
          className="rounded-xs bg-kc-sand/70 dark:bg-kc-dark-wood/80 px-3 py-2.5 font-serif text-sm font-semibold text-[#1C0F0A] dark:text-[#FDF6E3] border border-kc-brass/60 dark:border-kc-gold/40 shadow-inset focus:border-kc-gold-royal focus:outline-none focus:ring-2 focus:ring-kc-gold-royal/80 focus:bg-kc-ivory dark:focus:bg-kc-dark-wood transition-all duration-200"
        />
      </div>
    </div>
  );
};
