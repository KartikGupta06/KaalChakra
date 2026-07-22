import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const VolumetricLighting: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10" aria-hidden="true">
      {/* Central Volumetric Temple Lamp Glow */}
      <motion.div
        animate={
          reducedMotion
            ? { opacity: 0.7 }
            : {
                opacity: [0.5, 0.85, 0.6, 0.9, 0.55],
                scale: [0.95, 1.08, 0.98, 1.05, 0.95],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(230,126,34,0.22)_0%,rgba(212,175,55,0.12)_45%,transparent_75%)] blur-3xl"
      />

      {/* Secondary Top Warm Highlight */}
      <div className="absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18)_0%,transparent_70%)] blur-2xl" />
    </div>
  );
};
