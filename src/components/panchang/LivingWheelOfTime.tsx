import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PanchangData } from '../../types/panchang';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface LivingWheelOfTimeProps {
  data: PanchangData;
}

export const LivingWheelOfTime: React.FC<LivingWheelOfTimeProps> = ({ data }) => {
  const reducedMotion = useReducedMotion();
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center my-6 sm:my-10 select-none">
      {/* Volumetric Lamp Amber Glow */}
      <div className="pointer-events-none absolute h-[340px] w-[340px] sm:h-[480px] sm:w-[480px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22)_0%,rgba(230,126,34,0.1)_50%,transparent_75%)] blur-2xl" />

      {/* Main Astronomical Instrument Wheel (360px to 460px) */}
      <div className="relative h-[320px] w-[320px] sm:h-[440px] sm:w-[440px] flex items-center justify-center">
        {/* Outer Rotating Time Ring */}
        <svg
          viewBox="0 0 500 500"
          className={`absolute inset-0 h-full w-full drop-shadow-[0_0_20px_rgba(212,175,55,0.35)] ${
            !reducedMotion ? 'animate-mandala-spin' : ''
          }`}
          fill="none"
          stroke="currentColor"
        >
          {/* Outer Engraved Brass Teeth Ring */}
          <circle cx="250" cy="250" r="240" stroke="#C89B3C" strokeWidth="4" />
          <circle cx="250" cy="250" r="230" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3 6" />
          <circle cx="250" cy="250" r="215" stroke="#B87333" strokeWidth="1.5" />

          {/* 12 Solar Sectors */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 250 + 215 * Math.cos(angle);
            const y1 = 250 + 215 * Math.sin(angle);
            const x2 = 250 + 160 * Math.cos(angle);
            const y2 = 250 + 160 * Math.sin(angle);
            return <line key={`sec-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4AF37" strokeWidth="1.5" opacity="0.7" />;
          })}

          {/* 27 Nakshatra Outer Rays */}
          <circle cx="250" cy="250" r="160" stroke="#C89B3C" strokeWidth="2" />
          {Array.from({ length: 27 }).map((_, i) => {
            const angle = (i * (360 / 27) * Math.PI) / 180;
            const x1 = 250 + 160 * Math.cos(angle);
            const y1 = 250 + 160 * Math.sin(angle);
            const x2 = 250 + 140 * Math.cos(angle);
            const y2 = 250 + 140 * Math.sin(angle);
            return <line key={`nak-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B87333" strokeWidth="1" opacity="0.5" />;
          })}

          {/* Sun & Moon Orbit Markers */}
          <circle cx="250" cy="90" r="12" fill="#E67E22" stroke="#D4AF37" strokeWidth="2" />
          <circle cx="250" cy="410" r="10" fill="#F4E7C8" stroke="#D4AF37" strokeWidth="2" />
        </svg>

        {/* Stationary Inner Mandala & Live Clock Hub */}
        <div className="relative h-[210px] w-[210px] sm:h-[280px] sm:w-[280px] rounded-full bg-[#2B1A10]/90 border-2 border-kc-gold-royal shadow-deep flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm">
          {/* Inner Hairline Ring */}
          <div className="pointer-events-none absolute inset-1.5 rounded-full border border-kc-gold/30" />

          {/* Location & Samvat */}
          <span className="font-heading text-[10px] uppercase tracking-widest text-kc-brass dark:text-kc-gold">
            {data.location}
          </span>
          <span className="font-devanagari text-xs text-kc-gold-royal font-semibold my-0.5">
            {data.sanskritDate}
          </span>

          {/* Live Updating Clock */}
          <motion.div
            animate={{ scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="my-1 font-mono text-xl sm:text-2xl font-bold tracking-wider text-kc-paper drop-shadow-md"
          >
            {timeStr || '12:30:00 PM'}
          </motion.div>

          {/* Active Tithi & Nakshatra */}
          <span className="font-devanagari text-xs font-medium text-kc-saffron">
            {data.tithi.value} • {data.nakshatra.value}
          </span>
          <span className="font-serif text-[10px] text-kc-text-muted italic mt-0.5">
            {data.cycles.paksha} • {data.cycles.ritu}
          </span>
        </div>
      </div>
    </div>
  );
};
