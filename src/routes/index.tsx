import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CinematicSplash } from '../components/splash/CinematicSplash';
import { FoundationInitializedPage } from '../pages/FoundationInitializedPage';
import { DesignSystemShowcase } from '../pages/DesignSystemShowcase';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ceremonial Splash Entry */}
        <Route path="/" element={<CinematicSplash />} />

        {/* Phase 2 Placeholder Destination Screen */}
        <Route path="/app" element={<FoundationInitializedPage />} />

        {/* Phase 1 Design System Showcase */}
        <Route path="/showcase" element={<DesignSystemShowcase />} />

        {/* Catch-all Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
