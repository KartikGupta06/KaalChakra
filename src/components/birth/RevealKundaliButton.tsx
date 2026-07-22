import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../context/AudioContext';
import { cn } from '../../lib/utils';

interface RevealKundaliButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

export const RevealKundaliButton: React.FC<RevealKundaliButtonProps> = ({
  onClick,
  isLoading,
  className,
}) => {
  const { playSound } = useSound();

  const handleClick = () => {
    playSound('ink-stroke');
    playSound('temple-bell');
    onClick();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'relative group inline-flex items-center justify-center gap-3 rounded-xs px-8 py-4 font-heading text-base sm:text-lg font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer select-none overflow-hidden w-full sm:w-auto',
        'bg-gradient-to-r from-kc-gold-royal via-kc-brass to-kc-gold-royal text-kc-text-primary border-2 border-kc-gold-light shadow-deep kc-glow-amber',
        'hover:brightness-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]',
        className
      )}
    >
      {/* Inner Hairline */}
      <span className="pointer-events-none absolute inset-1 rounded-2xs border border-kc-maroon/30 group-hover:border-kc-maroon/60" />

      {/* Wax Seal Accent */}
      <span className="text-xl">🪔</span>

      <div className="flex flex-col items-center">
        <span className="drop-shadow-sm leading-tight">Reveal My Kundali</span>
        <span className="font-devanagari text-xs font-normal lowercase text-kc-maroon tracking-normal leading-tight">
          (कुण्डली प्रकट करें)
        </span>
      </div>

      <span className="text-xl group-hover:translate-x-1 transition-transform">❖</span>
    </motion.button>
  );
};
