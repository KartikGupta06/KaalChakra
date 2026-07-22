import React from 'react';
import { cn } from '../../lib/utils';

interface AncientDividerProps {
  className?: string;
  symbol?: 'diamond' | 'flower' | 'wheel' | 'lotus' | 'om';
}

export const AncientDivider: React.FC<AncientDividerProps> = ({
  className,
  symbol = 'flower',
}) => {
  const renderSymbol = () => {
    switch (symbol) {
      case 'diamond':
        return '◆';
      case 'wheel':
        return '☸';
      case 'lotus':
        return '🌺';
      case 'om':
        return '🕉';
      case 'flower':
      default:
        return '❖';
    }
  };

  return (
    <div
      className={cn(
        'my-6 flex items-center justify-center gap-4 text-kc-brass dark:text-kc-gold/70',
        className
      )}
      aria-hidden="true"
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-kc-brass/50 to-kc-brass dark:via-kc-gold/30 dark:to-kc-gold/50" />
      <span className="font-serif text-lg tracking-widest text-kc-maroon dark:text-kc-gold select-none">
        {renderSymbol()}
      </span>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-kc-brass/50 to-kc-brass dark:via-kc-gold/30 dark:to-kc-gold/50" />
    </div>
  );
};
