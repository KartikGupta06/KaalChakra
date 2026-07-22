import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';

interface ManuscriptTimelinePageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptTimelinePage: React.FC<ManuscriptTimelinePageProps> = ({ data }) => {
  const { birthRecord } = data;

  return (
    <ManuscriptPageWrapper
      pageNumber={14}
      totalPages={14}
      sectionTitleSanskrit="॥ काल प्रवाह अभिलेख ॥"
      sectionTitleEnglish="Royal Cosmic Timeline Report"
    >
      <div className="flex-1 flex flex-col justify-between py-2">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ राजकीय विंशोत्तरी दशा एवं काल प्रवाह ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            OFFICIAL CHRONOLOGICAL DASHA & TIMELINE DEDICATION
          </h2>
          <p className="font-serif italic text-xs text-kc-text-muted">
            Vimshottari Dasha sequence for {birthRecord.fullName} born at {birthRecord.placeOfBirth}
          </p>
          <div className="w-32 h-0.5 bg-kc-gold mx-auto mt-2" />
        </div>

        {/* Active Dasha Highlight Box */}
        <div className="p-6 bg-kc-ivory border-2 border-kc-brass rounded-xs shadow-deep my-auto text-center relative">
          <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/40 rounded-2xs" />

          <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-kc-brass font-bold block mb-1">
            ACTIVE VIMSHOTTARI DASHA PERIOD
          </span>

          <h3 className="font-devanagari text-2xl sm:text-3xl font-extrabold text-kc-maroon mb-2">
            Jupiter Mahadasha • Saturn Antardasha
          </h3>

          <div className="inline-block px-4 py-1.5 bg-kc-paper border border-kc-gold rounded-xs text-xs font-mono font-bold text-kc-maroon mb-4">
            Active Sub-Period Span: 2024 to 2026
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-left border-t border-kc-brass/30 pt-3">
            <div className="p-2.5 bg-kc-paper border border-kc-brass/30 rounded-3xs">
              <span className="font-heading uppercase text-[9px] text-kc-brass font-bold block">
                MAHADASHA LORD
              </span>
              <span className="font-serif font-bold text-kc-maroon">
                Guru (Jupiter) — 16 Years Cycle
              </span>
            </div>

            <div className="p-2.5 bg-kc-paper border border-kc-brass/30 rounded-3xs">
              <span className="font-heading uppercase text-[9px] text-kc-brass font-bold block">
                ANTARDASHA LORD
              </span>
              <span className="font-serif font-bold text-kc-maroon">
                Shani (Saturn) — Karmic Duty Focus
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="mt-4 p-3 bg-kc-paper border border-kc-brass/40 rounded-xs text-xs text-kc-text-muted italic text-center">
          "The Cosmic Timeline unifies natal Vimshottari Dashas with planetary transits and traditional festivals for educational reflection."
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
