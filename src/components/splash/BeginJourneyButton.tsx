import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../context/AudioContext';
import { cn } from '../../lib/utils';

interface BeginJourneyButtonProps {
  onClick: () => void;
  className?: string;
  isTransitioning?: boolean;
}

export const BeginJourneyButton: React.FC<BeginJourneyButtonProps> = ({
  onClick,
  className,
  isTransitioning,
}) => {
  const { playSound } = useSound();

  const handleClick = () => {
    playSound('paper-flip');
    playSound('temple-bell');
    onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mt-8"
    >
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={isTransitioning}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          'relative group inline-flex items-center justify-center gap-3 rounded-xs px-9 py-4 font-heading text-base sm:text-lg font-bold tracking-widest uppercase transition-all duration-500 cursor-pointer select-none overflow-hidden',
          'bg-gradient-to-r from-[#3A2414] via-[#5C4033] to-[#3A2414] text-kc-ivory border-2 border-kc-gold-royal shadow-deep',
          'hover:border-kc-gold-light hover:text-kc-paper hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]',
          className
        )}
      >
        {/* Outer Hairline Frame */}
        <span className="pointer-events-none absolute inset-1 rounded-2xs border border-kc-gold/40 group-hover:border-kc-gold" />

        {/* Ambient Hover Shimmer */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-kc-gold/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Icon & Label */}
        <span className="text-kc-gold text-lg transition-transform group-hover:scale-110">🪔</span>
        <span className="drop-shadow-md">Begin Journey</span>
        <span className="font-devanagari text-xs text-kc-gold-royal font-normal lowercase tracking-normal">
          (प्रारम्भ)
        </span>
      </motion.button>
    </motion.div>
  );
};
