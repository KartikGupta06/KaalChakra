import React from 'react';
import { cn } from '../../lib/utils';

interface TempleBorderProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'standard' | 'elevated' | 'gilded';
}

export const TempleBorder: React.FC<TempleBorderProps> = ({
  children,
  className,
  variant = 'standard',
}) => {
  return (
    <div
      className={cn(
        'relative p-6 sm:p-8 rounded-sm transition-all duration-300',
        variant === 'standard' &&
          'bg-kc-paper border border-kc-brass/60 shadow-warm dark:bg-kc-burnt-brown dark:border-kc-brass/40',
        variant === 'elevated' &&
          'bg-kc-ivory border-2 border-kc-brass shadow-deep dark:bg-kc-dark-wood dark:border-kc-gold',
        variant === 'gilded' &&
          'bg-kc-parchment border-2 border-kc-gold-royal shadow-deep kc-glow-amber dark:bg-kc-temple-brown dark:border-kc-gold',
        className
      )}
    >
      {/* Inner Framing Line */}
      <div className="pointer-events-none absolute inset-1.5 border border-kc-brass/30 dark:border-kc-gold/20 rounded-xs" />

      {/* L-Shaped Temple Corner Filigree caps */}
      {/* Top Left */}
      <svg
        className="pointer-events-none absolute top-1 left-1 h-5 w-5 text-kc-brass dark:text-kc-gold"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M 2 12 V 2 H 12" />
        <circle cx="5" cy="5" r="1.5" fill="currentColor" />
      </svg>

      {/* Top Right */}
      <svg
        className="pointer-events-none absolute top-1 right-1 h-5 w-5 text-kc-brass dark:text-kc-gold"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M 22 12 V 2 H 12" />
        <circle cx="19" cy="5" r="1.5" fill="currentColor" />
      </svg>

      {/* Bottom Left */}
      <svg
        className="pointer-events-none absolute bottom-1 left-1 h-5 w-5 text-kc-brass dark:text-kc-gold"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M 2 12 V 22 H 12" />
        <circle cx="5" cy="19" r="1.5" fill="currentColor" />
      </svg>

      {/* Bottom Right */}
      <svg
        className="pointer-events-none absolute bottom-1 right-1 h-5 w-5 text-kc-brass dark:text-kc-gold"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M 22 12 V 22 H 12" />
        <circle cx="19" cy="19" r="1.5" fill="currentColor" />
      </svg>

      {children}
    </div>
  );
};
