import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';

interface ManuscriptHouseSummaryPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptHouseSummaryPage: React.FC<ManuscriptHouseSummaryPageProps> = ({ data }) => {
  const { houses } = data;

  return (
    <ManuscriptPageWrapper
      pageNumber={5}
      sectionTitleSanskrit="॥ द्वादश भाव विचार ॥"
      sectionTitleEnglish="12 Houses Summary"
    >
      <div className="flex-1 flex flex-col justify-between py-2">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ द्वादश भाव एवं फल स्वरूप ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            THE TWELVE CELESTIAL HOUSES (BHAVAS)
          </h2>
          <div className="w-32 h-0.5 bg-kc-gold mx-auto mt-2" />
        </div>

        {/* 12 House Grid / List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto">
          {houses.map((h) => (
            <div
              key={`house-box-${h.houseNumber}`}
              className="p-3 bg-kc-ivory border border-kc-brass/50 rounded-xs shadow-2xs relative flex flex-col justify-between"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-kc-brass/30 pb-1.5 mb-1.5">
                <span className="font-heading text-xs font-bold text-kc-maroon">
                  BHAVA {h.houseNumber}
                </span>
                <span className="font-devanagari text-xs font-semibold text-kc-maroon">
                  {h.name}
                </span>
              </div>

              {/* Rashi & Lord */}
              <div className="flex items-center justify-between text-[11px] text-kc-text-secondary mb-1">
                <span>
                  Sign: <strong className="text-kc-text-primary">{h.rashi}</strong>
                </span>
                <span>
                  Lord: <strong className="text-kc-maroon">{h.lord}</strong>
                </span>
              </div>

              {/* Contained Planets */}
              <div className="text-[11px] my-1 font-semibold text-kc-maroon flex items-center gap-1 flex-wrap">
                <span className="text-[10px] text-kc-text-muted font-heading uppercase font-normal">
                  Occupants:
                </span>
                {h.containedPlanets.length > 0 ? (
                  h.containedPlanets.map((planet, pIdx) => (
                    <span
                      key={`h-${h.houseNumber}-p-${pIdx}`}
                      className="px-1.5 py-0.5 bg-kc-paper border border-kc-gold/50 rounded-3xs text-[10px]"
                    >
                      {planet}
                    </span>
                  ))
                ) : (
                  <span className="text-kc-text-muted italic text-[10px]">Unoccupied (रिक्त)</span>
                )}
              </div>

              {/* Purpose & Significance */}
              <p className="font-serif text-[10px] text-kc-text-muted italic leading-snug mt-1 border-t border-kc-brass/20 pt-1">
                {h.purpose}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
