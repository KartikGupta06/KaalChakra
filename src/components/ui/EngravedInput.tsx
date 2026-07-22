import React from 'react';
import { useSound } from '../../context/AudioContext';
import { cn } from '../../lib/utils';

interface EngravedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const EngravedInput: React.FC<EngravedInputProps> = ({
  label,
  icon,
  error,
  className,
  onFocus,
  ...props
}) => {
  const { playSound } = useSound();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    playSound('ink-stroke');
    if (onFocus) onFocus(e);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="font-heading text-xs font-semibold tracking-wider text-kc-maroon dark:text-kc-gold uppercase">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-kc-text-muted dark:text-kc-text-muted">
            {icon}
          </span>
        )}
        <input
          onFocus={handleFocus}
          className={cn(
            'w-full rounded-xs bg-kc-sand/50 dark:bg-kc-dark-wood/60 px-4 py-2.5 font-serif text-sm text-kc-text-primary dark:text-kc-text-secondary border border-kc-brass/50 dark:border-kc-gold/30 shadow-inset transition-all duration-300 placeholder:text-kc-text-disabled focus:border-kc-gold-royal focus:outline-none focus:ring-1 focus:ring-kc-gold-royal dark:focus:border-kc-gold',
            icon && 'pl-10',
            error && 'border-kc-sindoor focus:ring-kc-sindoor',
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="font-serif text-xs text-kc-sindoor italic">{error}</span>}
    </div>
  );
};
