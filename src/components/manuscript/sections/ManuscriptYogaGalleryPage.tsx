import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';

interface ManuscriptYogaGalleryPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptYogaGalleryPage: React.FC<ManuscriptYogaGalleryPageProps> = ({ data }) => {
  const { yogas } = data;

  return (
    <ManuscriptPageWrapper
      pageNumber={7}
      sectionTitleSanskrit="॥ योग प्रदर्शन ॥"
      sectionTitleEnglish="Detected Vedic Yogas Gallery"
    >
      <div className="flex-1 flex flex-col justify-between py-2">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ शुभ एवं विशेष योग विन्यास ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            SPECIAL PLANETARY COMBINATIONS (YOGAS)
          </h2>
          <div className="w-32 h-0.5 bg-kc-gold mx-auto mt-2" />
        </div>

        {/* Yoga Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto">
          {yogas.map((yoga) => (
            <div
              key={`yoga-${yoga.id}`}
              className="p-4 bg-kc-ivory border-2 border-kc-brass/70 rounded-xs shadow-xs relative flex flex-col justify-between"
            >
              {/* Inner Hairline */}
              <div className="pointer-events-none absolute inset-1 border border-kc-gold/30 rounded-2xs" />

              <div>
                <div className="flex items-center justify-between mb-1.5 border-b border-kc-brass/30 pb-1.5">
                  <span className="font-devanagari text-base font-bold text-kc-maroon">
                    {yoga.sanskritName}
                  </span>
                  <span className="px-2 py-0.5 bg-kc-paper border border-kc-gold/60 text-[10px] font-heading uppercase font-bold text-kc-maroon rounded-3xs">
                    {yoga.strength} Strength
                  </span>
                </div>

                <h3 className="font-heading text-xs uppercase tracking-wider text-kc-text-secondary font-semibold mb-2">
                  {yoga.name}
                </h3>

                <p className="font-serif text-xs text-kc-text-primary leading-relaxed mb-3">
                  {yoga.description}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-[11px] text-kc-text-muted mb-2">
                  <span className="font-heading text-[10px] uppercase font-bold text-kc-brass">
                    GRAHAS INVOLVED:
                  </span>
                  <span className="font-serif font-medium text-kc-maroon">
                    {yoga.contributingPlanets.join(' • ')}
                  </span>
                </div>

                {/* Future AI / Deep Interpretation Reserve Box */}
                <div className="p-2 bg-kc-paper/80 border border-dashed border-kc-brass/40 rounded-3xs text-[10px] text-kc-text-muted italic">
                  🔮 Reserved for future deep AI karmic & dasha timing insights.
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-center text-xs text-kc-text-muted italic">
          * Yogas are evaluated based on classical Parasari standards.
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
