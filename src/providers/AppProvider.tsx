import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { AudioProvider } from '../context/AudioContext';
import { NavigationProvider } from '../context/NavigationContext';
import { SettingsProvider } from '../context/SettingsContext';
import { LocalizationProvider } from '../context/LocalizationContext';
import { NotificationProvider } from '../context/NotificationContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <LocalizationProvider>
          <NotificationProvider>
            <AudioProvider>
              <NavigationProvider>{children}</NavigationProvider>
            </AudioProvider>
          </NotificationProvider>
        </LocalizationProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
};
