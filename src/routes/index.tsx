import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CinematicSplash } from '../components/splash/CinematicSplash';
import { SacredHallPage } from '../pages/SacredHallPage';
import { BirthChamberPage } from '../pages/BirthChamberPage';
import { KundaliRevelationPage } from '../pages/KundaliRevelationPage';
import { CelestialObservatoryPage } from '../pages/CelestialObservatoryPage';
import { PanchangModulePage } from '../pages/modules/PanchangModulePage';
import { CalendarModulePage } from '../pages/modules/CalendarModulePage';
import { MuhuratModulePage } from '../pages/modules/MuhuratModulePage';
import { HoroscopeModulePage } from '../pages/modules/HoroscopeModulePage';
import { AboutModulePage } from '../pages/modules/AboutModulePage';
import { SettingsModulePage } from '../pages/modules/SettingsModulePage';
import { DesignSystemShowcase } from '../pages/DesignSystemShowcase';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ceremonial Splash Entry */}
        <Route path="/" element={<CinematicSplash />} />

        {/* Phase 3 Main Experience Hub: The Sacred Hall */}
        <Route path="/app" element={<SacredHallPage />} />

        {/* Phase 4 & Phase 5 & Phase 8 Kundali Flow */}
        <Route path="/kundali" element={<BirthChamberPage />} />
        <Route path="/kundali/view" element={<KundaliRevelationPage />} />

        {/* Phase 9 Celestial Observatory */}
        <Route path="/observatory" element={<CelestialObservatoryPage />} />

        {/* Module Destinations */}
        <Route path="/panchang" element={<PanchangModulePage />} />
        <Route path="/calendar" element={<CalendarModulePage />} />
        <Route path="/muhurat" element={<MuhuratModulePage />} />
        <Route path="/horoscope" element={<HoroscopeModulePage />} />
        <Route path="/about" element={<AboutModulePage />} />
        <Route path="/settings" element={<SettingsModulePage />} />

        {/* Phase 1 Design System Showcase */}
        <Route path="/showcase" element={<DesignSystemShowcase />} />

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
