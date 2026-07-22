import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DesignSystemShowcase } from '../pages/DesignSystemShowcase';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DesignSystemShowcase />} />
        <Route path="*" element={<DesignSystemShowcase />} />
      </Routes>
    </BrowserRouter>
  );
};
