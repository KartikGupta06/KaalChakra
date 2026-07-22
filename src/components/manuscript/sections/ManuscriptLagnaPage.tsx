import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';

interface ManuscriptLagnaPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptLagnaPage: React.FC<ManuscriptLagnaPageProps> = ({ data }) => {
  const { lagna } = data;

  return (
    <ManuscriptPageWrapper
      pageNumber={6}
      sectionTitleSanskrit="॥ लग्न विवरणम् ॥"
      sectionTitleEnglish="Lagna Details & Rising Sign"
    >
      <div className="flex-1 flex flex-col justify-between py-2 text-center">
        {/* Section Header */}
        <div className="mb-4">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ प्रथम भाव - तनू भाव (लग्न) ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            THE CELESTIAL ASCENDANT (LAGNA)
          </h2>
          <p className="font-serif italic text-xs text-kc-text-muted mt-1 max-w-lg mx-auto">
            The prime foundation of the horoscopic matrix governing vitality, soul orientation, physical stature, and life direction.
          </p>
          <div className="w-32 h-0.5 bg-kc-gold mx-auto mt-2" />
        </div>

        {/* Hero Lagna Decorative Plaque */}
        <div className="w-full max-w-md mx-auto my-auto p-6 bg-kc-ivory border-2 border-kc-brass rounded-xs shadow-deep relative flex flex-col items-center">
          {/* Inner Hairline */}
          <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/40 rounded-2xs" />

          <span className="text-[10px] font-heading uppercase tracking-[0.2em] text-kc-brass font-bold block mb-1">
            RISING ZODIACAL SIGN (लग्न राशि)
          </span>

          <h3 className="font-devanagari text-4xl sm:text-5xl font-extrabold text-kc-maroon drop-shadow-xs mb-1">
            {lagna.signSanskrit} • {lagna.sign}
          </h3>

          <div className="flex items-center justify-center gap-3 my-3">
            <span className="px-3 py-1 bg-kc-paper border border-kc-gold text-xs font-mono font-bold text-kc-maroon rounded-xs">
              Exact Degree: {lagna.degree}
            </span>
          </div>

          <div className="w-full border-t border-kc-brass/30 pt-4 mt-2 grid grid-cols-2 gap-4 text-xs">
            <div className="p-2 bg-kc-paper border border-kc-brass/40 rounded-3xs">
              <span className="text-[9px] font-heading uppercase text-kc-brass font-bold block">
                STELLAR MANSION
              </span>
              <span className="font-devanagari font-bold text-kc-maroon">
                {lagna.nakshatra}
              </span>
              <span className="block text-[10px] text-kc-text-muted">
                Pada {lagna.pada}
              </span>
            </div>

            <div className="p-2 bg-kc-paper border border-kc-brass/40 rounded-3xs">
              <span className="text-[9px] font-heading uppercase text-kc-brass font-bold block">
                RASHI LORD (लग्नेश)
              </span>
              <span className="font-serif font-bold text-kc-maroon">
                {lagna.rashiLord}
              </span>
              <span className="block text-[10px] text-kc-text-muted">
                Primary Governor
              </span>
            </div>

            <div className="p-2 bg-kc-paper border border-kc-brass/40 rounded-3xs">
              <span className="text-[9px] font-heading uppercase text-kc-brass font-bold block">
                ELEMENT (तत्व)
              </span>
              <span className="font-serif font-bold text-kc-text-primary">
                {lagna.element}
              </span>
            </div>

            <div className="p-2 bg-kc-paper border border-kc-brass/40 rounded-3xs">
              <span className="text-[9px] font-heading uppercase text-kc-brass font-bold block">
                QUALITATIVE MODE (गुण)
              </span>
              <span className="font-serif font-bold text-kc-text-primary">
                {lagna.quality}
              </span>
            </div>
          </div>
        </div>

        {/* Interpretation Placeholder Note */}
        <div className="mt-4 p-3 bg-kc-paper border border-kc-brass/30 rounded-xs text-xs text-kc-text-muted italic max-w-lg mx-auto">
          "The Lagna represents the doorway through which cosmic energy enters physical manifestation. A strong Lagna lord empowers all 12 houses."
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
