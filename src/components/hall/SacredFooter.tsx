import React from 'react';
import { AncientDivider } from '../decorations/AncientDivider';

export const SacredFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-kc-brass/30 py-8 text-center text-xs text-kc-text-muted select-none">
      <div className="mx-auto max-w-4xl px-4">
        <div className="font-devanagari text-lg text-kc-gold-royal tracking-widest mb-1">
          ॥ ॐ नमः शिवाय ॥
        </div>

        <div className="font-heading text-sm font-bold tracking-wider text-kc-maroon dark:text-kc-gold">
          KALACHAKRA (कालचक्र)
        </div>

        <AncientDivider symbol="om" className="my-3 opacity-60" />

        <p className="font-serif text-xs text-kc-text-secondary dark:text-kc-text-muted leading-relaxed">
          Inspired by India's Vedic Astronomical Heritage • Designed as a Royal Digital Manuscript Museum
        </p>

        <div className="mt-3 flex items-center justify-center gap-4 text-[11px] font-mono text-kc-text-disabled">
          <span>Version 1.0.0</span>
          <span>•</span>
          <span>Surya Siddhanta System</span>
          <span>•</span>
          <span>Vedic Observatory Edition</span>
        </div>
      </div>
    </footer>
  );
};
