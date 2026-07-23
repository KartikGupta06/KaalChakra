import React from 'react';
import { useSound } from '../../context/AudioContext';
import { cn } from '../../lib/utils';

interface EngravedTimePickerProps {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
  onChange: (time: { hour: number; minute: number; period: 'AM' | 'PM' }) => void;
  className?: string;
}

export const EngravedTimePicker: React.FC<EngravedTimePickerProps> = ({
  hour,
  minute,
  period,
  onChange,
  className,
}) => {
  const { playSound } = useSound();

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playSound('ink-stroke');
    onChange({ hour: parseInt(e.target.value, 10), minute, period });
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playSound('ink-stroke');
    onChange({ hour, minute: parseInt(e.target.value, 10), period });
  };

  const handlePeriodToggle = (p: 'AM' | 'PM') => {
    playSound('ink-stroke');
    onChange({ hour, minute, period: p });
  };

  const handleInputFocus = () => {
    playSound('ink-stroke');
  };

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      <label className="font-heading text-xs font-bold tracking-wider text-kc-maroon dark:text-kc-gold uppercase flex items-center justify-between">
        <span>Time of Birth (जन्म समय)</span>
        <span className="text-[10px] text-kc-gold-royal lowercase italic font-serif">sundial & hora hours</span>
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* Hour Selector */}
        <select
          value={hour}
          onChange={handleHourChange}
          onFocus={handleInputFocus}
          className="rounded-xs bg-kc-sand/70 dark:bg-kc-dark-wood/80 px-3 py-2.5 font-serif text-sm font-semibold text-[#1C0F0A] dark:text-[#FDF6E3] border border-kc-brass/60 dark:border-kc-gold/40 shadow-inset focus:border-kc-gold-royal focus:outline-none focus:ring-2 focus:ring-kc-gold-royal/80 focus:bg-kc-ivory dark:focus:bg-kc-dark-wood transition-all duration-200 cursor-pointer"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
            <option key={h} value={h} className="bg-kc-paper dark:bg-kc-burnt-brown text-[#1C0F0A] dark:text-[#FDF6E3]">
              {h < 10 ? `0${h}` : h} Hour
            </option>
          ))}
        </select>

        {/* Minute Selector */}
        <select
          value={minute}
          onChange={handleMinuteChange}
          onFocus={handleInputFocus}
          className="rounded-xs bg-kc-sand/70 dark:bg-kc-dark-wood/80 px-3 py-2.5 font-serif text-sm font-semibold text-[#1C0F0A] dark:text-[#FDF6E3] border border-kc-brass/60 dark:border-kc-gold/40 shadow-inset focus:border-kc-gold-royal focus:outline-none focus:ring-2 focus:ring-kc-gold-royal/80 focus:bg-kc-ivory dark:focus:bg-kc-dark-wood transition-all duration-200 cursor-pointer"
        >
          {Array.from({ length: 60 }, (_, i) => i).map((m) => (
            <option key={m} value={m} className="bg-kc-paper dark:bg-kc-burnt-brown text-[#1C0F0A] dark:text-[#FDF6E3]">
              {m < 10 ? `0${m}` : m} Min
            </option>
          ))}
        </select>

        {/* AM / PM Toggle */}
        <div className="flex border border-kc-brass/60 dark:border-kc-gold/40 rounded-xs overflow-hidden shadow-inset">
          <button
            type="button"
            onClick={() => handlePeriodToggle('AM')}
            className={cn(
              'flex-1 py-2 font-heading text-xs font-extrabold tracking-wider transition-colors cursor-pointer',
              period === 'AM'
                ? 'bg-kc-maroon text-kc-ivory dark:bg-kc-gold dark:text-kc-burnt-brown shadow-warm'
                : 'bg-kc-sand/50 dark:bg-kc-dark-wood/50 text-[#5C4033] dark:text-[#E7D1A3] hover:text-kc-maroon'
            )}
          >
            AM (पूर्वाह्न)
          </button>
          <button
            type="button"
            onClick={() => handlePeriodToggle('PM')}
            className={cn(
              'flex-1 py-2 font-heading text-xs font-extrabold tracking-wider transition-colors cursor-pointer',
              period === 'PM'
                ? 'bg-kc-maroon text-kc-ivory dark:bg-kc-gold dark:text-kc-burnt-brown shadow-warm'
                : 'bg-kc-sand/50 dark:bg-kc-dark-wood/50 text-[#5C4033] dark:text-[#E7D1A3] hover:text-kc-maroon'
            )}
          >
            PM (अपराह्न)
          </button>
        </div>
      </div>
    </div>
  );
};
