import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';

interface ManuscriptMuhuratPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptMuhuratPage: React.FC<ManuscriptMuhuratPageProps> = ({ data }) => {
  const { birthRecord, panchang } = data;

  return (
    <ManuscriptPageWrapper
      pageNumber={13}
      totalPages={13}
      sectionTitleSanskrit="॥ शुभ मुहूर्त अभिलेख ॥"
      sectionTitleEnglish="Royal Muhurat Window Report"
    >
      <div className="flex-1 flex flex-col justify-between py-2">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ राजकीय शुभ मुहूर्त काल निर्णय ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            OFFICIAL MUHURAT RECOMMENDATION DEDICATION
          </h2>
          <p className="font-serif italic text-xs text-kc-text-muted">
            Evaluated auspicious window for {birthRecord.fullName} at {birthRecord.placeOfBirth}
          </p>
          <div className="w-32 h-0.5 bg-kc-gold mx-auto mt-2" />
        </div>

        {/* Recommended Window Highlight Box */}
        <div className="p-6 bg-kc-ivory border-2 border-kc-brass rounded-xs shadow-deep my-auto text-center relative">
          <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/40 rounded-2xs" />

          <span className="font-heading text-[10px] uppercase tracking-[0.25em] text-kc-brass font-bold block mb-1">
            RECOMMENDED TIMING WINDOW
          </span>

          <h3 className="font-devanagari text-2xl sm:text-3xl font-extrabold text-kc-maroon mb-2">
            {panchang.vaara} • {panchang.tithi}
          </h3>

          <div className="inline-block px-4 py-1.5 bg-kc-paper border border-kc-gold rounded-xs text-xs font-mono font-bold text-kc-maroon mb-4">
            Auspicious Morning Window: 05:48 AM to 12:30 PM
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-left border-t border-kc-brass/30 pt-3">
            <div className="p-2.5 bg-kc-paper border border-kc-brass/30 rounded-3xs">
              <span className="font-heading uppercase text-[9px] text-kc-brass font-bold block">
                NAKSHATRA & PADA
              </span>
              <span className="font-serif font-bold text-kc-maroon">
                {panchang.nakshatra}
              </span>
            </div>

            <div className="p-2.5 bg-kc-paper border border-kc-brass/30 rounded-3xs">
              <span className="font-heading uppercase text-[9px] text-kc-brass font-bold block">
                NITYA YOGA & KARANA
              </span>
              <span className="font-serif font-bold text-kc-maroon">
                {panchang.yoga} • {panchang.karana}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer Notice */}
        <div className="mt-4 p-3 bg-kc-paper border border-kc-brass/40 rounded-xs text-xs text-kc-text-muted italic text-center">
          "Muhurat recommendations are evaluated against classical Parasari & Muhurta Chintamani rules. They serve as supportive timing windows for personal endeavors."
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
