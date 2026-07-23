import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../../context/AudioContext';
import { cardLift } from '../animations/variants';
import { cn } from '../../lib/utils';
import { EngravedIcon } from '../ui/EngravedIcon';

export interface ChamberData {
  id: string;
  title: string;
  sanskritTitle: string;
  path: string;
  icon: string;
  description: string;
  badge?: string;
}

export const ChamberCard: React.FC<{ chamber: ChamberData; className?: string }> = ({
  chamber,
  className,
}) => {
  const navigate = useNavigate();
  const { playSound } = useSound();

  const handleClick = () => {
    playSound('paper-flip');
    playSound('ink-stroke');
    navigate(chamber.path);
  };

  const romanNumeral = chamber.badge ? chamber.badge.replace(/^Chamber\s+/i, '') : '';

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={cardLift}
      onClick={handleClick}
      className={cn(
        'relative group p-6 sm:p-7 rounded-xs cursor-pointer select-none transition-all duration-300',
        'bg-gradient-to-b from-kc-paper via-kc-ivory to-kc-sand border-2 border-kc-brass/70 shadow-warm dark:from-kc-burnt-brown dark:via-kc-dark-wood dark:to-kc-temple-brown dark:border-kc-gold/60',
        'hover:border-kc-gold-royal hover:shadow-deep hover:kc-glow-amber',
        className
      )}
    >
      {/* Inner Double Hairline Frame */}
      <div className="pointer-events-none absolute inset-1.5 border border-kc-brass/30 dark:border-kc-gold/20 rounded-2xs group-hover:border-kc-gold/60 transition-colors" />

      {/* Filigree Corner Caps */}
      <span className="pointer-events-none absolute top-1 left-1 h-3 w-3 border-t-2 border-l-2 border-kc-brass dark:border-kc-gold" />
      <span className="pointer-events-none absolute top-1 right-1 h-3 w-3 border-t-2 border-r-2 border-kc-brass dark:border-kc-gold" />
      <span className="pointer-events-none absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-kc-brass dark:border-kc-gold" />
      <span className="pointer-events-none absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-kc-brass dark:border-kc-gold" />

      {/* Header Row: Icon & Sanskrit Subtitle */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xs bg-kc-sand/60 dark:bg-kc-dark-wood border border-kc-brass/40 text-kc-maroon dark:text-kc-gold group-hover:scale-110 transition-transform">
            <EngravedIcon name={chamber.icon} className="w-6 h-6 stroke-[1.5]" />
          </span>
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-kc-maroon dark:text-kc-gold tracking-wide group-hover:text-kc-maroon dark:group-hover:text-kc-gold-light">
              {chamber.title}
            </h3>
            <span className="font-devanagari text-xs text-kc-gold-royal dark:text-kc-saffron font-medium">
              {chamber.sanskritTitle}
            </span>
          </div>
        </div>

        {/* Two-Line Consistent Chamber Badge */}
        {chamber.badge && (
          <div className="flex flex-col items-center justify-center font-heading text-[9px] uppercase tracking-widest px-2.5 py-1 leading-tight text-center rounded-xs bg-kc-maroon/10 text-kc-maroon border border-kc-maroon/30 dark:bg-kc-gold/10 dark:text-kc-gold dark:border-kc-gold/40">
            <span className="opacity-75">CHAMBER</span>
            <span className="font-bold text-[11px] mt-0.5">{romanNumeral}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="font-serif text-sm text-kc-text-secondary dark:text-kc-text-secondary leading-relaxed line-clamp-2">
        {chamber.description}
      </p>

      {/* Hover Action Indicator */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-kc-brass/20 dark:border-kc-gold/20 text-xs font-heading font-semibold text-kc-maroon dark:text-kc-gold opacity-90 group-hover:opacity-100">
        <span className="tracking-wider uppercase text-[11px]">Explore Chamber</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </motion.div>
  );
};
