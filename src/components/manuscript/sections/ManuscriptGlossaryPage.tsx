import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';

interface ManuscriptGlossaryPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptGlossaryPage: React.FC<ManuscriptGlossaryPageProps> = ({ data }) => {
  const { glossary } = data;

  return (
    <ManuscriptPageWrapper
      pageNumber={10}
      sectionTitleSanskrit="॥ ज्योतिष शब्दावली ॥"
      sectionTitleEnglish="Vedic Astronomical Glossary"
    >
      <div className="flex-1 flex flex-col justify-between py-2">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ ज्योतिष पारिभाषिक कोश ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            ESSENTIAL GLOSSARY OF CLASSICAL TERMS
          </h2>
          <p className="font-serif italic text-xs text-kc-text-muted">
            Educational guide to understanding the astronomical concepts used in this manuscript
          </p>
          <div className="w-32 h-0.5 bg-kc-gold mx-auto mt-2" />
        </div>

        {/* Glossary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
          {glossary.map((item, idx) => (
            <div
              key={`glossary-${idx}`}
              className="p-3.5 bg-kc-ivory border border-kc-brass/50 rounded-xs shadow-2xs relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-kc-brass/30 pb-1 mb-1.5">
                  <h3 className="font-devanagari text-sm font-bold text-kc-maroon">
                    {item.term}
                  </h3>
                  <span className="font-heading text-[9px] uppercase tracking-wider text-kc-brass font-bold border border-kc-brass/40 px-1.5 py-0.5 rounded-3xs">
                    {item.category}
                  </span>
                </div>
                <p className="font-serif text-xs text-kc-text-primary leading-relaxed">
                  {item.definition}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Educational Footer Note */}
        <div className="mt-4 text-center text-xs text-kc-text-muted italic">
          * Preserved in alignment with Maharishi Parasara's *Brihat Parasara Hora Shastra*.
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
