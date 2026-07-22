import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';
import { NorthIndianKundali } from '../../revelation/NorthIndianKundali';

interface ManuscriptKundaliPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptKundaliPage: React.FC<ManuscriptKundaliPageProps> = ({ data }) => {
  return (
    <ManuscriptPageWrapper
      pageNumber={3}
      sectionTitleSanskrit="॥ जन्म चक्रम् ॥"
      sectionTitleEnglish="Janma Kundali Chart"
    >
      <div className="flex-1 flex flex-col items-center justify-between py-2">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ उत्तर भारतीय लग्न कुण्डली ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            NORTH INDIAN NATAL HOROSCOPE
          </h2>
          <p className="font-serif italic text-xs text-kc-text-muted">
            Whole Sign Rashi Chakra showing 12 Bhavas & Navagraha Sidereal Inscriptions
          </p>
        </div>

        {/* Vector North Indian Chart Wrapper */}
        <div className="w-full max-w-[460px] mx-auto my-auto">
          <NorthIndianKundali planets={data.grahaPlacements} />
        </div>

        {/* Legend Footnote */}
        <div className="w-full mt-4 p-3 bg-kc-ivory border border-kc-brass/40 rounded-xs text-[11px] text-kc-text-muted flex flex-wrap items-center justify-around gap-2 text-center">
          <span><strong>L-1:</strong> Tanu Bhava (Ascendant)</span>
          <span>•</span>
          <span><strong>☉:</strong> Surya (Sun)</span>
          <span>•</span>
          <span><strong>☽:</strong> Chandra (Moon)</span>
          <span>•</span>
          <span><strong>♂:</strong> Mangala (Mars)</span>
          <span>•</span>
          <span><strong>☿:</strong> Budha (Mercury)</span>
          <span>•</span>
          <span><strong>♃:</strong> Guru (Jupiter)</span>
          <span>•</span>
          <span><strong>♀:</strong> Shukra (Venus)</span>
          <span>•</span>
          <span><strong>♄:</strong> Shani (Saturn)</span>
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
