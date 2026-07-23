import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SplashBackground } from './SplashBackground';
import { SacredQuoteReveal } from './SacredQuoteReveal';
import { BeginJourneyButton } from './BeginJourneyButton';
import { WaxSeal } from '../decorations/WaxSeal';
import { AncientDivider } from '../decorations/AncientDivider';
import { useSound } from '../../context/AudioContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CinematicSplash: React.FC = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();
  const reducedMotion = useReducedMotion();

  // Animation Sequence Steps: 0 to 4
  const [step, setStep] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    if (reducedMotion) {
      setStep(4);
      return;
    }

    // Step 0 -> Step 1: Initial Temple Bell & Light
    const timer1 = setTimeout(() => {
      playSound('temple-bell');
      setStep(1);
    }, 400);

    // Step 1 -> Step 2: Unfold Manuscript & Symbol
    const timer2 = setTimeout(() => {
      setStep(2);
    }, 1200);

    // Step 2 -> Step 3: Sanskrit Verse
    const timer3 = setTimeout(() => {
      setStep(3);
    }, 2200);

    // Step 3 -> Step 4: Begin Journey Button
    const timer4 = setTimeout(() => {
      setStep(4);
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [playSound, reducedMotion]);

  // Keyboard shortcut listener to skip intro or begin journey
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        if (step < 4) {
          setStep(4);
        } else {
          handleBeginJourney();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step]);

  const handleBeginJourney = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    playSound('temple-bell');

    // Ceremonial 2.8s hold on bright manuscript screen before transitioning into Sacred Hall
    setTimeout(() => {
      playSound('temple-bell');
      navigate('/app');
    }, 2800);
  };

  const skipIntro = () => {
    setStep(4);
    playSound('paper-flip');
  };

  return (
    <SplashBackground>
      {/* Subtle Top Skip Button for Accessibility */}
      {step < 4 && (
        <button
          type="button"
          onClick={skipIntro}
          className="absolute top-6 right-6 font-heading text-xs font-semibold tracking-widest uppercase text-kc-gold/70 hover:text-kc-gold border border-kc-gold/30 hover:border-kc-gold rounded-xs px-3 py-1.5 transition-all duration-300 cursor-pointer z-50"
        >
          Skip Intro (Press Space/Enter)
        </button>
      )}

      {/* Main Unfolding Manuscript Container */}
      <div className="relative w-full max-w-2xl text-center py-10 px-6 sm:px-12 bg-[#2B1A10]/70 border-2 border-kc-brass/50 rounded-xs shadow-deep backdrop-blur-sm">
        {/* Inner Border Frame */}
        <div className="pointer-events-none absolute inset-2 border border-kc-gold/30 rounded-2xs" />

        {/* Step 1: Sacred Wax Seal & Symbol Illumination */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mb-4"
            >
              <WaxSeal size="lg" label="कालचक्र" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Sanskrit Title, Name, Tagline */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-devanagari text-3xl sm:text-4xl md:text-5xl font-normal text-kc-gold-royal tracking-widest drop-shadow-md">
              कालचक्र
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wider text-kc-paper dark:text-kc-gold my-2 drop-shadow-sm">
              KALACHAKRA
            </h1>

            <div className="font-serif text-base sm:text-lg text-kc-text-secondary dark:text-kc-text-secondary tracking-widest uppercase">
              The Eternal Wheel of Time
            </div>
            <div className="font-serif text-xs text-kc-gold-royal/80 italic mt-0.5">
              Ancient Wisdom • Modern Experience
            </div>
          </motion.div>
        )}

        {/* Step 3: Sacred Sanskrit Verse */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <AncientDivider symbol="flower" className="my-4" />
            <SacredQuoteReveal />
          </motion.div>
        )}

        {/* Step 4: Begin Journey Hero Interaction Button */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center mt-2"
          >
            <BeginJourneyButton
              onClick={handleBeginJourney}
              isTransitioning={isTransitioning}
            />
            <span className="font-serif text-[11px] text-kc-text-muted mt-3 italic opacity-80">
              Press Enter or click to enter the sacred museum portal
            </span>
          </motion.div>
        )}
      </div>

      {/* Fullscreen Ceremonial Bright Manuscript Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-[#F4E7C8] via-[#E7D1A3] to-[#F8F0DD] flex items-center justify-center text-kc-maroon font-heading text-xl font-bold tracking-widest uppercase shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col items-center gap-4 text-center max-w-lg p-8 bg-[#F4E7C8]/80 border-2 border-kc-brass/50 rounded-xs shadow-deep"
            >
              <div className="font-devanagari text-4xl text-kc-gold-royal drop-shadow">
                ॥ कालचक्र जगत् सर्वं ॥
              </div>
              <h2 className="font-heading text-3xl font-extrabold tracking-wider text-kc-maroon">
                KALACHAKRA
              </h2>
              <div className="font-serif text-sm text-kc-text-secondary tracking-widest uppercase">
                The Eternal Wheel of Time
              </div>
              <div className="w-28 h-0.5 bg-kc-gold-royal/60 my-2 rounded-full" />
              <span className="font-serif text-xs text-kc-text-muted italic">
                Entering the Sacred Knowledge Hub...
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SplashBackground>
  );
};
