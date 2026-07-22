import React from 'react';
import { MandalaOverlay } from '../backgrounds/MandalaOverlay';
import { DustParticles } from '../backgrounds/DustParticles';
import { VolumetricLighting } from './VolumetricLighting';

export const SplashBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-kc-charcoal text-kc-paper flex items-center justify-center select-none">
      {/* Layer 1: Dark Burnt Brown Base Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0E08] via-[#20140D] to-[#2B1A10]" />

      {/* Layer 2: Noise / Grain Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25 mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Faint Mandala Watermark */}
      <MandalaOverlay className="opacity-[0.05] text-kc-gold" />

      {/* Layer 4: Floating Golden Dust Particles */}
      <DustParticles />

      {/* Layer 5: Volumetric Breathing Lamp Glow */}
      <VolumetricLighting />

      {/* Layer 6: Deep Vignette Shadow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(10,5,3,0.85)_100%)]"
        aria-hidden="true"
      />

      {/* Foreground Content */}
      <div className="relative z-30 w-full max-w-4xl px-4 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
