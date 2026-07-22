import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../context/AudioContext';
import { cn } from '../../lib/utils';

interface WaxSealProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  label = ' कालचक्र ',
  onClick,
  className,
  size = 'md',
}) => {
  const { playSound } = useSound();

  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-base',
  };

  const handleClick = () => {
    playSound('ink-stroke');
    if (onClick) onClick();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.08, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-kc-sindoor via-kc-maroon to-[#4A1010] text-kc-paper shadow-md transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-kc-gold/50 cursor-pointer select-none',
        sizeClasses[size],
        className
      )}
      aria-label="Royal Wax Seal"
    >
      {/* Outer Wax Irregular Rim */}
      <span className="absolute inset-0.5 rounded-full border border-kc-gold/40 opacity-70" />
      <span className="absolute inset-1.5 rounded-full border border-dashed border-kc-gold/30" />

      {/* Embossed Text / Symbol */}
      <span className="font-devanagari font-bold tracking-tighter drop-shadow-sm">
        {label}
      </span>
    </motion.button>
  );
};
