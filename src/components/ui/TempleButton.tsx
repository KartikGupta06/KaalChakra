import React from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../context/AudioContext';
import { cn } from '../../lib/utils';

interface TempleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gilded';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const TempleButton: React.FC<TempleButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  onClick,
  ...props
}) => {
  const { playSound } = useSound();

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold',
    md: 'px-5 py-2.5 text-sm font-semibold',
    lg: 'px-7 py-3.5 text-base font-bold',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playSound('paper-flip');
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.025, y: -1 }}
      whileTap={{ scale: 0.975 }}
      onClick={handleClick}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-xs font-heading tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-kc-gold cursor-pointer select-none',
        variant === 'primary' &&
          'bg-gradient-to-b from-kc-sand to-kc-parchment text-kc-maroon border border-kc-brass/80 shadow-warm hover:border-kc-gold-royal hover:shadow-deep dark:from-kc-dark-wood dark:to-kc-burnt-brown dark:text-kc-gold dark:border-kc-gold/60',
        variant === 'gilded' &&
          'bg-gradient-to-r from-kc-gold-royal via-kc-brass to-kc-gold-royal text-kc-text-primary border border-kc-gold-light shadow-deep kc-glow-amber hover:brightness-110',
        variant === 'secondary' &&
          'bg-kc-paper text-kc-text-primary border border-kc-brass/40 hover:bg-kc-sand dark:bg-kc-temple-brown dark:text-kc-text-secondary dark:border-kc-gold/30',
        variant === 'ghost' &&
          'bg-transparent text-kc-maroon dark:text-kc-gold border border-transparent hover:border-kc-brass/30 hover:bg-kc-sand/30',
        sizeClasses[size],
        className
      )}
      {...(props as unknown as React.ComponentProps<typeof motion.button>)}
    >
      {/* Subtle Inner Hairline */}
      <span className="pointer-events-none absolute inset-0.5 rounded-2xs border border-kc-brass/20 dark:border-kc-gold/20" />
      {icon && <span className="text-base">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
