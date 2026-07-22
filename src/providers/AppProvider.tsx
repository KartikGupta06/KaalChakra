import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { AudioProvider } from '../context/AudioContext';
import { NavigationProvider } from '../context/NavigationContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <AudioProvider>
        <NavigationProvider>{children}</NavigationProvider>
      </AudioProvider>
    </ThemeProvider>
  );
};
