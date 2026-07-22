import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';

interface ManuscriptNavamsaPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptNavamsaPage: React.FC<ManuscriptNavamsaPageProps> = ({ data }) => {
  const { navamsa } = data;

  return (
    <ManuscriptPageWrapper
      pageNumber={8}
      sectionTitleSanskrit="॥ नवांश चक्र विवरण ॥"
      sectionTitleEnglish="Navamsa D9 Harmonic Overview"
    >
      <div className="flex-1 flex flex-col justify-between py-2">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ नवांश तालिका एवं वर्गोत्तम विचार ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            NAVAMSA (D9) HARMONIC COMPARISON
          </h2>
          <p className="font-serif italic text-xs text-kc-text-muted">
            The 1/9th divisional chart reveals the inner strength, fruit of karma, and marital potential.
          </p>
          <div className="w-32 h-0.5 bg-kc-gold mx-auto mt-2" />
        </div>

        {/* D1 vs D9 Comparison Table */}
        <div className="w-full my-auto overflow-hidden">
          <div className="grid grid-cols-12 gap-1 py-2 px-3 bg-kc-ivory border-y-2 border-kc-brass font-heading text-[11px] font-bold text-kc-maroon uppercase tracking-wider text-center">
            <div className="col-span-3 text-left">Entity (ग्रह / लग्न)</div>
            <div className="col-span-3">D1 Rashi Sign</div>
            <div className="col-span-3">D9 Navamsa Sign</div>
            <div className="col-span-1">D9 Bhava</div>
            <div className="col-span-2">Vargottama</div>
          </div>

          <div className="divide-y divide-kc-brass/30 border-b-2 border-kc-brass">
            {navamsa.map((n, idx) => (
              <div
                key={`nav-${n.planetId || idx}`}
                className={`grid grid-cols-12 gap-1 py-2 px-3 text-xs items-center ${
                  idx % 2 === 0 ? 'bg-kc-paper' : 'bg-kc-ivory/50'
                }`}
              >
                <div className="col-span-3 text-left font-semibold text-kc-maroon flex items-center gap-1">
                  <span className="font-devanagari text-sm">{n.sanskrit}</span>
                  <span className="font-serif text-[11px] text-kc-text-muted">({n.name})</span>
                </div>

                <div className="col-span-3 text-center text-kc-text-primary">
                  {n.d1Sign}
                </div>

                <div className="col-span-3 text-center font-semibold text-kc-maroon">
                  {n.d9Sign}
                </div>

                <div className="col-span-1 text-center font-mono font-bold text-kc-brass">
                  H-{n.d9House}
                </div>

                <div className="col-span-2 text-center">
                  {n.isVargottama ? (
                    <span className="px-2 py-0.5 bg-kc-paper border border-kc-gold font-devanagari font-bold text-[10px] text-kc-maroon rounded-3xs shadow-xs">
                      वर्गोत्तम ★
                    </span>
                  ) : (
                    <span className="text-kc-text-muted text-[10px]">—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Expansion Reserve Box */}
        <div className="mt-4 p-3 bg-kc-ivory border border-kc-brass/40 rounded-xs text-xs text-kc-text-muted italic flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌟</span>
            <span>
              <strong>Vargottama Status:</strong> Planets occupying the same sign in D1 and D9 gain supreme strength and stability.
            </span>
          </div>
          <span className="text-[10px] font-heading uppercase text-kc-brass border border-kc-brass/50 px-2 py-1 rounded-3xs not-italic font-bold">
            MODULE EXPANSION READY
          </span>
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
