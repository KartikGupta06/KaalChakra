import React from 'react';
import { motion } from 'framer-motion';
import { ChamberCard, ChamberData } from './ChamberCard';
import { SectionHeading, TempleLabel } from '../typography/Typography';
import { sectionReveal } from '../animations/variants';

export const SACRED_CHAMBERS: ChamberData[] = [
  {
    id: 'kundali',
    title: 'Generate Kundali',
    sanskritTitle: 'जन्मकुण्डली विन्यास',
    path: '/kundali',
    icon: '🪔',
    description: 'Vedic natal chart, planetary positions, houses, and dashas calculated according to Surya Siddhanta.',
    badge: 'Chamber I',
  },
  {
    id: 'panchang',
    title: "Today's Panchang",
    sanskritTitle: 'दैनिक पञ्चाङ्गम्',
    path: '/panchang',
    icon: '☀',
    description: 'The five sacred pillars of time: Tithi, Vara, Nakshatra, Yoga, and Karana with solar/lunar hours.',
    badge: 'Chamber II',
  },
  {
    id: 'calendar',
    title: 'Festival Calendar',
    sanskritTitle: 'उत्सवपञ्चाङ्गम्',
    path: '/calendar',
    icon: '📅',
    description: 'Ancient Vedic festival almanac, lunar tithis, ekadashi dates, and sacred observational observances.',
    badge: 'Chamber III',
  },
  {
    id: 'muhurat',
    title: 'Shubha Muhurat',
    sanskritTitle: 'शुभमुहूर्त गणन',
    path: '/muhurat',
    icon: '🕉',
    description: 'Auspicious timing calculations, Abhijit Muhurat, Rahu Kaal, and planetary hour windows.',
    badge: 'Chamber IV',
  },
  {
    id: 'horoscope',
    title: 'Daily Horoscope',
    sanskritTitle: 'राशिफलम् एवं सञ्चार',
    path: '/horoscope',
    icon: '🌙',
    description: 'Daily solar and lunar zodiac transits, rashifal insights, and planetary house movements.',
    badge: 'Chamber V',
  },
  {
    id: 'about',
    title: 'About Jyotish',
    sanskritTitle: 'वैदिकज्योतिष इतिहास',
    path: '/about',
    icon: '📖',
    description: 'Exploration of India’s astronomical heritage, ancient observatories, Jantar Mantar, and historical texts.',
    badge: 'Chamber VI',
  },
  {
    id: 'settings',
    title: 'System Settings',
    sanskritTitle: 'विन्यास एवं प्राचल',
    path: '/settings',
    icon: '⚙',
    description: 'Configure observational location coordinates, Ayanamsha systems (Lahiri/Raman), audio & visuals.',
    badge: 'Chamber VII',
  },
];

export const KnowledgeChambers: React.FC = () => {
  return (
    <section className="my-12 w-full">
      <div className="text-center mb-8">
        <TempleLabel>Sacred Knowledge Hub</TempleLabel>
        <SectionHeading className="border-none pb-0 mb-1 justify-center flex">
          Sacred Knowledge Chambers
        </SectionHeading>
        <p className="font-serif text-sm text-kc-text-muted italic">
          Select a chamber to enter its astronomical realm
        </p>
      </div>

      <motion.div
        variants={sectionReveal}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {SACRED_CHAMBERS.map((chamber) => (
          <ChamberCard key={chamber.id} chamber={chamber} />
        ))}
      </motion.div>
    </section>
  );
};
