import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading, TempleLabel } from '../typography/Typography';
import { WaxSeal } from '../decorations/WaxSeal';
import { sectionReveal } from '../animations/variants';

interface YogaItem {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  contributingPlanets: string[];
  strength?: string;
}

interface YogaGalleryProps {
  yogas?: YogaItem[];
}

const DEFAULT_YOGAS: YogaItem[] = [
  {
    id: 'gajakesari',
    name: 'Gajakesari Yoga',
    sanskritName: 'गजकेसरी योग',
    description: 'Jupiter resides in Kendra from Moon, bestowing wisdom, reputation, and noble character.',
    contributingPlanets: ['Jupiter', 'Moon'],
    strength: 'High',
  },
  {
    id: 'budhaditya',
    name: 'Budhaditya Yoga',
    sanskritName: 'बुधादित्य योग',
    description: 'Sun and Mercury unite in the same sign, bestowing keen intellect, analytical prowess, and fame.',
    contributingPlanets: ['Sun', 'Mercury'],
    strength: 'High',
  },
  {
    id: 'chandra_mangala',
    name: 'Chandra Mangala Yoga',
    sanskritName: 'चन्द्र-मंगल योग',
    description: 'Moon and Mars unite, granting strong determination, material prosperity, and vitality.',
    contributingPlanets: ['Moon', 'Mars'],
    strength: 'Medium',
  },
];

export const YogaGallery: React.FC<YogaGalleryProps> = ({ yogas = DEFAULT_YOGAS }) => {
  const displayYogas = yogas.length > 0 ? yogas : DEFAULT_YOGAS;

  return (
    <section className="my-8 w-full">
      <div className="text-center mb-6">
        <TempleLabel>Vedic Combinations</TempleLabel>
        <SectionHeading className="border-none pb-0 mb-1 justify-center flex">
          Detected Yoga Manuscripts (योग सङ्ग्रह)
        </SectionHeading>
        <p className="font-serif text-sm text-kc-text-muted italic">
          Sacred planetary alignments bestowing specific qualities and auspicious life influences
        </p>
      </div>

      <motion.div
        variants={sectionReveal}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {displayYogas.map((y) => (
          <div
            key={y.id}
            className="relative p-5 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-warm rounded-xs flex flex-col justify-between"
          >
            <div className="pointer-events-none absolute inset-1 border border-kc-gold/30 rounded-2xs" />

            <div className="flex items-center justify-between mb-2">
              <span className="font-devanagari text-sm font-bold text-kc-maroon dark:text-kc-gold">
                {y.sanskritName}
              </span>
              <WaxSeal size="sm" label="ॐ" />
            </div>

            <h4 className="font-heading text-base font-extrabold text-kc-maroon dark:text-kc-gold mb-1">
              {y.name}
            </h4>

            <p className="font-serif text-xs text-kc-text-secondary leading-relaxed my-2">
              {y.description}
            </p>

            <div className="pt-2 border-t border-kc-brass/20 flex items-center justify-between text-[11px] font-serif text-kc-text-muted">
              <span>Planets: <strong>{y.contributingPlanets.join(' + ')}</strong></span>
              <span className="text-kc-saffron font-bold">Strength: {y.strength || 'Medium'}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
