import React from 'react';
import { useSound } from '../../context/AudioContext';
import { cn } from '../../lib/utils';

interface EngravedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  autoSelectOnFocus?: boolean;
}

export const EngravedInput: React.FC<EngravedInputProps> = ({
  label,
  icon,
  error,
  className,
  onFocus,
  autoSelectOnFocus = false,
  ...props
}) => {
  const { playSound } = useSound();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    playSound('ink-stroke');
    if (autoSelectOnFocus) {
      e.target.select();
    }
    if (onFocus) onFocus(e);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="font-heading text-xs font-bold tracking-wider text-kc-maroon dark:text-kc-gold uppercase">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-kc-brass dark:text-kc-gold pointer-events-none">
            {icon}
          </span>
        )}
        <input
          onFocus={handleFocus}
          className={cn(
            'kc-input w-full px-4 py-2.5 font-serif text-sm font-semibold shadow-warm',
            icon && 'pl-10',
            error && 'border-kc-sindoor focus:ring-kc-sindoor',
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="font-serif text-xs text-kc-sindoor font-semibold italic">{error}</span>}
    </div>
  );
};
