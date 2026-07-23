import React, { useState, useRef, useEffect } from 'react';
import { useSound } from '../../context/AudioContext';
import { cn } from '../../lib/utils';

export interface LocationData {
  city: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
}

const HISTORIC_CITIES: LocationData[] = [
  { city: 'Ujjain (उज्जैन)', country: 'India', lat: 23.1765, lng: 75.7885, timezone: 'Asia/Kolkata' },
  { city: 'Varanasi (वाराणसी / काशी)', country: 'India', lat: 25.3176, lng: 82.9739, timezone: 'Asia/Kolkata' },
  { city: 'New Delhi (नई दिल्ली)', country: 'India', lat: 28.6139, lng: 77.209, timezone: 'Asia/Kolkata' },
  { city: 'Ayodhya (अयोध्या)', country: 'India', lat: 26.7922, lng: 82.1998, timezone: 'Asia/Kolkata' },
  { city: 'Jaipur (जयपुर)', country: 'India', lat: 26.9124, lng: 75.7873, timezone: 'Asia/Kolkata' },
  { city: 'Haridwar (हरिद्वार)', country: 'India', lat: 29.9457, lng: 78.1642, timezone: 'Asia/Kolkata' },
  { city: 'Prayagraj (प्रयागराज)', country: 'India', lat: 25.4358, lng: 81.8463, timezone: 'Asia/Kolkata' },
  { city: 'Mumbai (मुंबई)', country: 'India', lat: 19.076, lng: 72.8777, timezone: 'Asia/Kolkata' },
  { city: 'Bengaluru (बेंगलुरु)', country: 'India', lat: 12.9716, lng: 77.5946, timezone: 'Asia/Kolkata' },
  { city: 'Kathmandu (काठमाडौँ)', country: 'Nepal', lat: 27.7172, lng: 85.324, timezone: 'Asia/Kathmandu' },
];

interface LocationSearchProps {
  value: string;
  onChange: (value: string, details?: LocationData) => void;
  className?: string;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  value,
  onChange,
  className,
}) => {
  const { playSound } = useSound();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = HISTORIC_CITIES.filter((loc) =>
    loc.city.toLowerCase().includes(value.toLowerCase())
  );

  const handleSelect = (loc: LocationData) => {
    playSound('ink-stroke');
    onChange(loc.city, loc);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn('relative flex flex-col gap-1.5 w-full', className)}>
      <label className="font-heading text-xs font-bold tracking-wider text-kc-maroon dark:text-kc-gold uppercase flex items-center justify-between">
        <span>Birth Place (जन्म स्थान)</span>
        <span className="text-[10px] text-kc-gold-royal lowercase italic font-serif">coordinates & longitude</span>
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={(e) => {
            playSound('ink-stroke');
            e.target.select();
            setIsOpen(true);
          }}
          placeholder="e.g. Ujjain, Varanasi, Mumbai..."
          className="w-full rounded-xs bg-kc-sand/70 dark:bg-kc-dark-wood/80 px-4 py-2.5 font-serif text-sm font-semibold text-[#1C0F0A] dark:text-[#FDF6E3] border border-kc-brass/60 dark:border-kc-gold/40 shadow-inset transition-all duration-200 placeholder:text-kc-text-muted/70 focus:border-kc-gold-royal focus:outline-none focus:ring-2 focus:ring-kc-gold-royal/80 focus:bg-kc-ivory dark:focus:bg-kc-dark-wood shadow-warm"
        />
        <span className="absolute right-3 top-2.5 text-kc-brass dark:text-kc-gold pointer-events-none">📌</span>
      </div>

      {/* Historic Vedic Suggestions Dropdown */}
      {isOpen && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-xs bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep divide-y divide-kc-brass/20">
          <div className="px-3 py-1.5 font-heading text-[10px] uppercase tracking-widest text-kc-maroon dark:text-kc-gold bg-kc-sand/40 font-bold">
            Sacred Observatory Locations
          </div>
          {filtered.map((loc) => (
            <button
              key={loc.city}
              type="button"
              onClick={() => handleSelect(loc)}
              className="w-full px-3 py-2 text-left font-serif text-xs text-[#1C0F0A] dark:text-[#FDF6E3] hover:bg-kc-sand dark:hover:bg-kc-dark-wood flex items-center justify-between cursor-pointer transition-colors"
            >
              <span className="font-semibold">{loc.city}</span>
              <span className="text-[10px] text-kc-text-muted italic">
                {loc.lat}° N, {loc.lng}° E
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
