import React from 'react';
import { motion } from 'framer-motion';
import { PanchangData } from '../../types/panchang';
import { SectionHeading, TempleLabel } from '../typography/Typography';
import { sectionReveal, cardLift } from '../animations/variants';
import { useSound } from '../../context/AudioContext';
import {
  SunriseIcon,
  SunsetIcon,
  MoonriseIcon,
  MoonsetIcon,
  TithiIcon,
  NakshatraIcon,
  YogaIcon,
  KaranaIcon,
} from './PanchangIcons';

interface SacredEightPanelsProps {
  data: PanchangData;
}

export const SacredEightPanels: React.FC<SacredEightPanelsProps> = ({ data }) => {
  const { playSound } = useSound();

  const panels = [
    {
      id: 'sunrise',
      icon: <SunriseIcon size={20} className="text-kc-saffron dark:text-kc-gold" />,
      title: 'Sunrise',
      sanskrit: 'सूर्योदय',
      value: data.cycles.sunrise,
      sub: `Solar Noon: ${data.cycles.solarNoon}`,
      note: `Sun in ${data.cycles.sunSign}`,
    },
    {
      id: 'sunset',
      icon: <SunsetIcon size={20} className="text-kc-sindoor dark:text-kc-gold" />,
      title: 'Sunset',
      sanskrit: 'सूर्यास्त',
      value: data.cycles.sunset,
      sub: `Ayana: ${data.cycles.ayana}`,
      note: 'Transition to Sandhya hours',
    },
    {
      id: 'moonrise',
      icon: <MoonriseIcon size={20} className="text-kc-gold dark:text-kc-gold" />,
      title: 'Moonrise',
      sanskrit: 'चन्द्रोदय',
      value: data.cycles.moonrise,
      sub: `Moon in ${data.cycles.moonSign}`,
      note: `Lunar Age: ${data.cycles.lunarAgeDays} days`,
    },
    {
      id: 'moonset',
      icon: <MoonsetIcon size={20} className="text-kc-text-secondary dark:text-kc-gold" />,
      title: 'Moonset',
      sanskrit: 'चन्द्रास्त',
      value: data.cycles.moonset,
      sub: `Paksha: ${data.cycles.paksha}`,
      note: `Illumination: ${data.cycles.illuminationPercent}%`,
    },
    {
      id: 'tithi',
      icon: <TithiIcon size={20} className="text-kc-maroon dark:text-kc-gold" />,
      title: 'Tithi',
      sanskrit: 'तिथि',
      value: data.tithi.value,
      sub: data.tithi.sanskritValue,
      note: data.tithi.note,
      progress: data.tithi.progressPercent,
    },
    {
      id: 'nakshatra',
      icon: <NakshatraIcon size={20} className="text-kc-gold-royal dark:text-kc-gold" />,
      title: 'Nakshatra',
      sanskrit: 'नक्षत्र',
      value: data.nakshatra.value,
      sub: data.nakshatra.sanskritValue,
      note: data.nakshatra.note,
      progress: data.nakshatra.progressPercent,
    },
    {
      id: 'yoga',
      icon: <YogaIcon size={20} className="text-kc-brass dark:text-kc-gold" />,
      title: 'Yoga',
      sanskrit: 'योग',
      value: data.yoga.value,
      sub: data.yoga.sanskritValue,
      note: data.yoga.note,
      progress: data.yoga.progressPercent,
    },
    {
      id: 'karana',
      icon: <KaranaIcon size={20} className="text-kc-copper dark:text-kc-gold" />,
      title: 'Karana',
      sanskrit: 'करण',
      value: data.karana.value,
      sub: data.karana.sanskritValue,
      note: data.karana.note,
      progress: data.karana.progressPercent,
    },
  ];

  return (
    <section className="my-10 w-full">
      <div className="text-center mb-6">
        <TempleLabel>Vedic Time Pillars</TempleLabel>
        <SectionHeading className="border-none pb-0 mb-1 justify-center flex">
          Eight Sacred Panchang Panels
        </SectionHeading>
        <p className="font-serif text-sm text-kc-text-muted italic">
          Observable pillars tracking the alignment of Surya, Chandra, and celestial mansions
        </p>
      </div>

      <motion.div
        variants={sectionReveal}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {panels.map((p) => (
          <motion.div
            key={p.id}
            initial="rest"
            whileHover="hover"
            variants={cardLift}
            onHoverStart={() => playSound('ink-stroke')}
            className="relative p-5 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass/60 shadow-warm rounded-xs flex flex-col justify-between"
          >
            {/* Inner Border Hairline */}
            <div className="pointer-events-none absolute inset-1 border border-kc-gold/30 rounded-2xs" />

            {/* Panel Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-xs bg-kc-sand/50 dark:bg-kc-dark-wood text-kc-maroon dark:text-kc-gold border border-kc-brass/30 flex items-center justify-center">
                  {p.icon}
                </span>
                <span className="font-devanagari text-xs font-semibold text-kc-gold-royal dark:text-kc-saffron">
                  {p.sanskrit}
                </span>
              </div>

              <span className="font-heading text-xs font-bold uppercase tracking-wider text-kc-text-secondary dark:text-kc-text-muted block">
                {p.title}
              </span>

              <div className="font-heading text-base sm:text-lg font-extrabold text-kc-maroon dark:text-kc-gold my-1 leading-tight">
                {p.value}
              </div>

              <span className="font-serif text-xs text-kc-text-primary dark:text-kc-text-secondary block">
                {p.sub}
              </span>
            </div>

            {/* Optional Progress Bar for Tithi/Nakshatra */}
            {p.progress !== undefined && (
              <div className="my-2">
                <div className="h-1.5 w-full bg-kc-sand/60 dark:bg-kc-dark-wood rounded-full overflow-hidden border border-kc-brass/30">
                  <div
                    className="h-full bg-gradient-to-r from-kc-brass to-kc-gold-royal rounded-full transition-all duration-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Note */}
            <p className="font-serif text-[11px] text-kc-text-muted italic mt-2 border-t border-kc-brass/20 pt-2 line-clamp-2">
              {p.note}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
