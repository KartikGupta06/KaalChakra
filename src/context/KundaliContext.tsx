import React, { createContext, useContext, useState, useEffect } from 'react';
import { GrahaPlacement, DEFAULT_PLANETS } from '../components/revelation/NorthIndianKundali';

export interface KundaliState {
  fullName: string;
  gender: 'male' | 'female' | 'other';
  date: { day: number; month: number; year: number };
  time: { hour: number; minute: number; period: 'AM' | 'PM' };
  place: string;
  ascendantSign: string;
  moonSign: string;
  sunSign: string;
  nakshatra: string;
  planets: GrahaPlacement[];
  yogas?: string[];
  kundaliData?: any;
}

// Canonical Default Chart (15 August 1998, 06:30 AM, Ujjain)
export const CANONICAL_DEFAULT_KUNDALI: KundaliState = {
  fullName: 'Vedic Traveler',
  gender: 'male',
  date: { day: 15, month: 8, year: 1998 },
  time: { hour: 6, minute: 30, period: 'AM' },
  place: 'Ujjain (उज्जैन)',
  ascendantSign: 'Leo (सिंह)',
  moonSign: 'Taurus (वृषभ)',
  sunSign: 'Leo (सिंह)',
  nakshatra: 'Rohini (रोहिणी)',
  planets: DEFAULT_PLANETS,
};

interface KundaliContextType {
  activeKundali: KundaliState;
  setActiveKundali: (chart: Partial<KundaliState>) => void;
  resetToDefault: () => void;
}

const STORAGE_KEY = 'kalachakra_active_kundali_v1';

const KundaliContext = createContext<KundaliContextType>({
  activeKundali: CANONICAL_DEFAULT_KUNDALI,
  setActiveKundali: () => {},
  resetToDefault: () => {},
});

export const KundaliProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeKundali, setActiveKundaliState] = useState<KundaliState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.planets && parsed.planets.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[KundaliContext] Failed to restore from localStorage:', e);
    }
    return CANONICAL_DEFAULT_KUNDALI;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeKundali));
    } catch (e) {
      console.warn('[KundaliContext] Failed to persist to localStorage:', e);
    }
  }, [activeKundali]);

  const setActiveKundali = (chartUpdate: Partial<KundaliState>) => {
    setActiveKundaliState((prev) => {
      const updated = { ...prev, ...chartUpdate };
      if (chartUpdate.planets && chartUpdate.planets.length > 0) {
        const moon = chartUpdate.planets.find((p) => p.id === 'moon');
        const sun = chartUpdate.planets.find((p) => p.id === 'sun');
        if (moon) updated.moonSign = moon.sign;
        if (sun) updated.sunSign = sun.sign;
      }
      return updated;
    });
  };

  const resetToDefault = () => {
    setActiveKundaliState(CANONICAL_DEFAULT_KUNDALI);
  };

  return (
    <KundaliContext.Provider value={{ activeKundali, setActiveKundali, resetToDefault }}>
      {children}
    </KundaliContext.Provider>
  );
};

export const useKundali = () => useContext(KundaliContext);
