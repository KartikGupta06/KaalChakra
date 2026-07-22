import React from 'react';
import { MandalaOverlay } from './MandalaOverlay';
import { DustParticles } from './DustParticles';

export const GlobalBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-kc-paper text-kc-text-primary transition-colors duration-500">
      {/* Layer 1 & 2: Base Parchment Color + SVG Paper Grain Noise Texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-multiply dark:opacity-20 dark:mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.18'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Sacred Mandala Rotating Overlay */}
      <MandalaOverlay />

      {/* Layer 4: Soft Temple Lighting Vignette & Amber Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(58,36,20,0.12)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]"
        aria-hidden="true"
      />

      {/* Layer 5: Floating Amber Dust Particles */}
      <DustParticles />

      {/* Foreground Content Shell */}
      <div className="relative z-20 flex min-h-screen flex-col">{children}</div>
    </div>
  );
};
