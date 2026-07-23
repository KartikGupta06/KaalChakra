import React, { createContext, useContext, useState } from 'react';
import { UserSettings } from '../types/settings';

const DEFAULT_SETTINGS: UserSettings = {
  language: 'en',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '12h',
  themeMode: 'dark',
  reducedMotion: false,
  ayanamsha: 'lahiri',
  houseSystem: 'whole_sign',
  soundEnabled: true,
  autoArchive: true,
};

const SETTINGS_KEY = 'kalachakra_user_settings_v1';

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to load user settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to persist settings:', e);
      }
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    } catch (e) {
      console.error('Failed to reset settings:', e);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
