import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TempleBorder } from '../decorations/TempleBorder';
import { TempleLabel, Quote, BodyText } from '../typography/Typography';
import { AncientDivider } from '../decorations/AncientDivider';
import { TempleButton } from '../ui/TempleButton';
import { useSound } from '../../context/AudioContext';

const VEDIC_QUOTES = [
  {
    sanskrit: '॥ यथा पिण्डे तथा ब्रह्माण्डे ॥',
    translation: '“As is the individual, so is the universe. As is the microcosm, so is the macrocosm.”',
    source: 'Yajurveda Observational Principle',
  },
  {
    sanskrit: '॥ कालो हि बलवान् सर्वत्र ॥',
    translation: '“Time is indeed supreme and powerful across all realms of existence.”',
    source: 'Mahabharata (Shanti Parva)',
  },
  {
    sanskrit: '॥ ज्योतिषं चक्षुः शास्त्रम् ॥',
    translation: '“Jyotisha is the sacred eye of Vedic knowledge, revealing the subtle movements of light.”',
    source: 'Vedanga Jyotisha',
  },
  {
    sanskrit: '॥ ज्ञानं परमं बलम् ॥',
    translation: '“True knowledge of the celestial order is the highest strength.”',
    source: 'Surya Siddhanta Mandate',
  },
];

export const WisdomPanel: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const { playSound } = useSound();

  const handleNextQuote = () => {
    playSound('paper-flip');
    setIndex((prev) => (prev + 1) % VEDIC_QUOTES.length);
  };

  const current = VEDIC_QUOTES[index];

  return (
    <section className="my-12 w-full">
      <TempleBorder variant="gilded" className="text-center">
        <TempleLabel>Vedic Astronomical Wisdom</TempleLabel>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="my-4"
          >
            <div className="font-devanagari text-2xl sm:text-3xl font-semibold text-kc-gold-royal dark:text-kc-saffron tracking-wider my-2">
              {current.sanskrit}
            </div>

            <Quote className="border-l-0 text-base sm:text-lg my-2 max-w-2xl mx-auto">
              {current.translation}
            </Quote>

            <BodyText className="text-xs text-kc-text-muted italic">
              — {current.source}
            </BodyText>
          </motion.div>
        </AnimatePresence>

        <AncientDivider symbol="lotus" className="my-4" />

        <div className="flex justify-center">
          <TempleButton size="sm" variant="ghost" onClick={handleNextQuote}>
            📜 Unveil Next Verse ({index + 1}/{VEDIC_QUOTES.length})
          </TempleButton>
        </div>
      </TempleBorder>
    </section>
  );
};
