import React from 'react';

export const ObservatoryLegend: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-4 rounded-xs bg-kc-sand/30 dark:bg-kc-dark-wood/40 border border-kc-brass/30 my-6 font-serif text-xs">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-kc-maroon border border-kc-gold" />
        <span>Graha (Planet Symbol)</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-6 border-b-2 border-dashed border-kc-saffron" />
        <span>Vedic Drishti (Aspect Ray)</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-heading font-bold text-kc-maroon dark:text-kc-gold">L-1</span>
        <span>Lagna (Ascendant House)</span>
      </div>
    </div>
  );
};
