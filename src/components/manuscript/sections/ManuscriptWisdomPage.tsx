import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';

interface ManuscriptWisdomPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptWisdomPage: React.FC<ManuscriptWisdomPageProps> = ({ data }) => {
  const { birthRecord, yogas, lagna } = data;

  return (
    <ManuscriptPageWrapper
      pageNumber={12}
      totalPages={12}
      sectionTitleSanskrit="॥ ज्ञान व्याख्या पृष्ठ ॥"
      sectionTitleEnglish="Wisdom Engine Interpretation Commentary"
    >
      <div className="flex-1 flex flex-col justify-between py-2">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ ज्योतिष ज्ञान व्याख्या एवं फल विचार ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            EDUCATIONAL INTERPRETATION MANUSCRIPT
          </h2>
          <p className="font-serif italic text-xs text-kc-text-muted">
            Commentary for {birthRecord.fullName} derived from classical Parasari horoscopic principles
          </p>
          <div className="w-32 h-0.5 bg-kc-gold mx-auto mt-2" />
        </div>

        {/* Overview Box */}
        <div className="p-4 bg-kc-ivory border border-kc-brass/60 rounded-xs shadow-xs my-auto space-y-3">
          <div className="border-b border-kc-brass/30 pb-2">
            <span className="font-heading uppercase text-[10px] text-kc-brass font-bold block">
              ASCENDANT PERSPECTIVE
            </span>
            <span className="font-devanagari text-base font-bold text-kc-maroon">
              {lagna.signSanskrit} ({lagna.sign}) Lagna • Degree {lagna.degree}
            </span>
            <p className="font-serif text-xs text-kc-text-primary mt-1">
              Establishes vital force, personal identity, and dharmic orientation. Ruled by {lagna.rashiLord} with {lagna.element} element emphasis.
            </p>
          </div>

          <div className="border-b border-kc-brass/30 pb-2">
            <span className="font-heading uppercase text-[10px] text-kc-brass font-bold block">
              PARASARI YOGA INSIGHTS
            </span>
            <ul className="list-disc list-inside text-xs text-kc-text-primary space-y-1 mt-1">
              {yogas.map((y) => (
                <li key={`manuscript-yoga-${y.id}`}>
                  <strong>{y.sanskritName} ({y.name}):</strong> {y.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-kc-paper border border-kc-brass/40 rounded-xs text-[11px] text-kc-text-muted italic">
            <strong>Transparency Notice:</strong> All interpretations are educational explanations intended for personal reflection and self-awareness. In accordance with Vedic tradition, planetary placements represent natural inclinations shaped continuously by ethical action (Dharma) and conscious effort (Purushartha).
          </div>
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
