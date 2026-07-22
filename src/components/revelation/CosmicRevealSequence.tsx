import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { KalachakraWheel } from '../hall/KalachakraWheel';
import { NorthIndianKundali, DEFAULT_PLANETS } from './NorthIndianKundali';
import { WaxSeal } from '../decorations/WaxSeal';
import { useSound } from '../../context/AudioContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CosmicRevealSequenceProps {
  onComplete: () => void;
}

export const CosmicRevealSequence: React.FC<CosmicRevealSequenceProps> = ({ onComplete }) => {
  const { playSound } = useSound();
  const reducedMotion = useReducedMotion();

  // Scene state: 1 to 8
  const [scene, setScene] = useState<number>(1);
  const [visiblePlanetsCount, setVisiblePlanetsCount] = useState<number>(0);

  useEffect(() => {
    if (reducedMotion) {
      onComplete();
      return;
    }

    // Scene 1: Silence -> Scene 2: Cosmic Awakening (1.5s)
    const t1 = setTimeout(() => {
      playSound('temple-bell');
      setScene(2);
    }, 1500);

    // Scene 2 -> Scene 3: Celestial Alignment (3.5s)
    const t2 = setTimeout(() => {
      setScene(3);
    }, 3500);

    // Scene 3 -> Scene 4: Sacred Geometry (5.5s)
    const t3 = setTimeout(() => {
      setScene(4);
    }, 5500);

    // Scene 4 -> Scene 5: Ink Revelation (7.3s)
    const t4 = setTimeout(() => {
      playSound('paper-flip');
      setScene(5);
    }, 7300);

    // Scene 5 -> Scene 6: House Construction (9.3s)
    const t5 = setTimeout(() => {
      setScene(6);
    }, 9300);

    // Scene 6 -> Scene 7: Planet Manifestation (10.8s)
    const t6 = setTimeout(() => {
      setScene(7);
    }, 10800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete, playSound, reducedMotion]);

  // Handle Planet Manifestation sequence in Scene 7
  useEffect(() => {
    if (scene === 7) {
      const interval = setInterval(() => {
        setVisiblePlanetsCount((prev) => {
          if (prev < DEFAULT_PLANETS.length) {
            playSound('ink-stroke');
            return prev + 1;
          } else {
            clearInterval(interval);
            // Complete sequence -> Scene 8
            setTimeout(() => {
              onComplete();
            }, 1000);
            return prev;
          }
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [scene, onComplete, playSound]);

  // Keyboard skip listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  const sceneTitles: { [key: number]: string } = {
    1: 'I. The Silence (मौनम्)',
    2: 'II. Cosmic Awakening (ब्रह्म जागृति)',
    3: 'III. Celestial Alignment (नक्षत्र मण्डल)',
    4: 'IV. Sacred Geometry (क्षेत्र विन्यास)',
    5: 'V. Ink Revelation (मषी प्राकट्य)',
    6: 'VI. House Construction (द्वादश भाव)',
    7: 'VII. Navagraha Manifestation (नवग्रह स्थापन)',
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A0E08] text-kc-paper flex flex-col items-center justify-center p-4 overflow-hidden select-none">
      {/* Skip Button */}
      <button
        type="button"
        onClick={onComplete}
        className="absolute top-6 right-6 font-heading text-xs font-semibold tracking-widest uppercase text-kc-gold/70 hover:text-kc-gold border border-kc-gold/30 rounded-xs px-3 py-1.5 cursor-pointer z-50"
      >
        Skip Reveal (Press Space/Enter)
      </button>

      {/* Top Scene Subtitle Indicator */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
        <span className="font-devanagari text-xs text-kc-gold-royal tracking-widest block mb-0.5">
          ॥ जन्म कुण्डली प्राकट्य ॥
        </span>
        <span className="font-heading text-sm font-bold tracking-wider text-kc-paper">
          {sceneTitles[scene] || 'Cosmic Revelation'}
        </span>
      </div>

      {/* Central Sequence Dynamic View */}
      <div className="relative w-full max-w-xl flex flex-col items-center justify-center my-auto">
        {/* Scene 1 & 2: Kalachakra Wheel */}
        {(scene === 1 || scene === 2 || scene === 3) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center"
          >
            <KalachakraWheel />
            {scene === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-devanagari text-lg text-kc-gold-royal tracking-widest mt-4"
              >
                ✦ Constellations & Nakshatras Aligning...
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Scene 4, 5, 6, 7: North Indian Chart Ink & House Reveal */}
        {(scene >= 4 && scene <= 7) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center"
          >
            <NorthIndianKundali
              planets={DEFAULT_PLANETS.slice(0, visiblePlanetsCount)}
            />

            <div className="mt-4 flex items-center gap-2">
              <WaxSeal size="sm" label="ॐ" />
              <span className="font-serif text-xs text-kc-gold-royal italic">
                {scene === 4 && 'Drawing Sacred Geometry...'}
                {scene === 5 && 'Inscribing North Indian Kundali Frame...'}
                {scene === 6 && 'Constructing 12 Bhavas (Houses)...'}
                {scene === 7 && `Manifesting Grahas (${visiblePlanetsCount}/9)...`}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
