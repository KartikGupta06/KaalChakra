import React from 'react';
import { cn } from '../../lib/utils';

export const MarginGuidance: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'relative p-4 my-4 rounded-xs bg-kc-sand/30 dark:bg-kc-dark-wood/40 border-l-2 border-kc-gold-royal text-kc-text-secondary dark:text-kc-text-muted',
        className
      )}
    >
      <div className="font-devanagari text-xs text-kc-gold-royal tracking-wide mb-0.5">
        ॥ जन्म मुहूर्त ज्ञान ॥
      </div>
      <p className="font-serif text-xs italic leading-relaxed">
        “Your birth moment is the sacred gateway through which the cosmic alignments of the sun, moon, and stars first greeted your soul.”
      </p>
    </div>
  );
};
