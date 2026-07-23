import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { AudioProvider } from '../context/AudioContext';
import { NavigationProvider } from '../context/NavigationContext';
import { SettingsProvider } from '../context/SettingsContext';
import { LocalizationProvider } from '../context/LocalizationContext';
import { NotificationProvider } from '../context/NotificationContext';
import { KundaliProvider } from '../context/KundaliContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <LocalizationProvider>
          <NotificationProvider>
            <AudioProvider>
              <KundaliProvider>
                <NavigationProvider>{children}</NavigationProvider>
              </KundaliProvider>
            </AudioProvider>
          </NotificationProvider>
        </LocalizationProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
};

