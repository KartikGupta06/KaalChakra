import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';

interface ManuscriptPanchangSnapshotPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptPanchangSnapshotPage: React.FC<ManuscriptPanchangSnapshotPageProps> = ({ data }) => {
  const { panchang } = data;

  const panchangItems = [
    { label: 'Tithi (तिथि)', value: panchang.tithi, icon: '🌙', desc: 'Lunar Day & Phase Elongation' },
    { label: 'Nakshatra (नक्षत्र)', value: panchang.nakshatra, icon: '⭐', desc: 'Stellar Mansion at Birth Moment' },
    { label: 'Yoga (नित्य योग)', value: panchang.yoga, icon: '☸', desc: 'Solar-Lunar Angular Harmony' },
    { label: 'Karana (करण)', value: panchang.karana, icon: '📜', desc: 'Half-Tithi Action Governor' },
    { label: 'Paksha (पक्ष)', value: panchang.paksha, icon: '🌗', desc: 'Lunar Fortnight Phase' },
    { label: 'Vaara (वार)', value: panchang.vaara, icon: '☀', desc: 'Solar Weekday Lord' },
    { label: 'Sunrise Time (सूर्योदय)', value: panchang.sunrise, icon: '🌅', desc: 'Local Horizon Solar Rise' },
    { label: 'Sunset Time (सूर्यास्त)', value: panchang.sunset, icon: '🌇', desc: 'Local Horizon Solar Setting' },
    { label: 'Moon Illumination', value: panchang.moonPhase, icon: '🌕', desc: 'Visual Lunar Illumination' },
    { label: 'Vikram Samvat', value: panchang.samvat, icon: '🏛', desc: 'Vedic Calendar Year Era' },
  ];

  return (
    <ManuscriptPageWrapper
      pageNumber={9}
      sectionTitleSanskrit="॥ पञ्चाङ्ग विवरणम् ॥"
      sectionTitleEnglish="Birth Moment Panchang Snapshot"
    >
      <div className="flex-1 flex flex-col justify-between py-2">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ पञ्चाङ्ग तिथि-वार-नक्षत्र अभिलेख ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            FIVE PILLARS OF TIME (PANCHANG)
          </h2>
          <p className="font-serif italic text-xs text-kc-text-muted">
            Historical astronomical baseline at the exact moment of birth
          </p>
          <div className="w-32 h-0.5 bg-kc-gold mx-auto mt-2" />
        </div>

        {/* Panchang Grid Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
          {panchangItems.map((item, idx) => (
            <div
              key={`panchang-item-${idx}`}
              className="p-3 bg-kc-ivory border border-kc-brass/50 rounded-xs shadow-2xs flex items-center gap-3 relative"
            >
              <div className="w-10 h-10 rounded-full bg-kc-paper border border-kc-gold flex items-center justify-center text-xl shrink-0">
                {item.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-devanagari text-xs font-bold text-kc-maroon">
                    {item.label}
                  </span>
                </div>
                <span className="font-serif font-bold text-sm text-kc-text-primary block truncate">
                  {item.value}
                </span>
                <span className="font-serif text-[10px] text-kc-text-muted italic block">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Permanent Historical Record Badge */}
        <div className="mt-4 p-3 bg-kc-paper border border-kc-brass/40 rounded-xs text-center text-xs text-kc-text-muted italic">
          "Panchang represents the five celestial limbs of time: Tithi (Energy), Vaara (Longevity), Nakshatra (Destiny), Yoga (Health), Karana (Wealth)."
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
