import React from 'react';
import { motion } from 'framer-motion';
import { PanchangData } from '../../types/panchang';
import { TempleBorder } from '../decorations/TempleBorder';
import { TempleLabel, CardTitle, BodyText } from '../typography/Typography';

interface MoonPhaseSectionProps {
  data: PanchangData;
}

export const MoonPhaseSection: React.FC<MoonPhaseSectionProps> = ({ data }) => {
  return (
    <TempleBorder variant="gilded" className="w-full my-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Artistic Lunar Illumination Disc */}
        <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-4">
          <div className="relative h-44 w-44 flex items-center justify-center">
            {/* Outer Halo */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(244,231,200,0.4)_0%,rgba(212,175,55,0.15)_50%,transparent_75%)] blur-xl" />

            {/* Moon Globe */}
            <motion.div
              animate={{ scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative h-36 w-36 rounded-full bg-gradient-to-br from-[#F8F0DD] via-[#E7D1A3] to-[#B8A388] border-2 border-kc-gold-royal shadow-deep flex items-center justify-center overflow-hidden"
            >
              {/* Moon Craters SVG Texture */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-25">
                <circle cx="30" cy="30" r="10" fill="#7D6B57" />
                <circle cx="65" cy="45" r="14" fill="#7D6B57" />
                <circle cx="45" cy="70" r="8" fill="#7D6B57" />
                <circle cx="75" cy="20" r="6" fill="#7D6B57" />
              </svg>

              {/* Shadow Overlay simulating Waxing Gibbous phase */}
              <div
                className="absolute inset-0 bg-[#20140D]/75 rounded-full"
                style={{ clipPath: 'polygon(0 0, 45% 0, 45% 100%, 0 100%)' }}
              />

              <span className="relative z-10 font-devanagari text-2xl font-bold text-kc-maroon drop-shadow-sm">
                ☽
              </span>
            </motion.div>
          </div>

          <span className="font-heading text-sm font-bold text-kc-maroon dark:text-kc-gold mt-2">
            {data.cycles.moonPhaseName} ({data.cycles.moonPhaseSanskrit})
          </span>
          <span className="font-serif text-xs text-kc-text-muted">
            Illumination: {data.cycles.illuminationPercent}% • Age: {data.cycles.lunarAgeDays} days
          </span>
        </div>

        {/* Right: Astronomical & Spiritual Notes */}
        <div className="md:col-span-7 space-y-3">
          <TempleLabel>Chandra Mandal • Lunar Realm</TempleLabel>
          <CardTitle className="my-0">
            Current Moon Phase & Lunar Mansion Alignment
          </CardTitle>

          <BodyText className="text-sm leading-relaxed">
            The Moon currently traverses <strong>{data.cycles.moonSign}</strong> within <strong>{data.nakshatra.name}</strong>, illuminating <strong>{data.cycles.illuminationPercent}%</strong> of the lunar disc under <strong>{data.cycles.paksha}</strong>.
          </BodyText>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-serif">
            <div className="p-2.5 rounded-xs bg-kc-sand/40 dark:bg-kc-dark-wood/40 border border-kc-brass/30">
              <span className="font-heading text-[10px] text-kc-brass dark:text-kc-gold block uppercase">
                Moonrise Timing
              </span>
              <span className="font-bold text-kc-maroon dark:text-kc-gold">
                {data.cycles.moonrise}
              </span>
            </div>
            <div className="p-2.5 rounded-xs bg-kc-sand/40 dark:bg-kc-dark-wood/40 border border-kc-brass/30">
              <span className="font-heading text-[10px] text-kc-brass dark:text-kc-gold block uppercase">
                Moonset Timing
              </span>
              <span className="font-bold text-kc-maroon dark:text-kc-gold">
                {data.cycles.moonset}
              </span>
            </div>
          </div>
        </div>
      </div>
    </TempleBorder>
  );
};
