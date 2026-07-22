import React from 'react';
import { RoyalManuscriptData } from '../../../types/manuscript';
import { ManuscriptPageWrapper } from './ManuscriptPageWrapper';

interface ManuscriptPlanetaryPageProps {
  data: RoyalManuscriptData;
}

export const ManuscriptPlanetaryPage: React.FC<ManuscriptPlanetaryPageProps> = ({ data }) => {
  const { planets } = data;

  return (
    <ManuscriptPageWrapper
      pageNumber={4}
      sectionTitleSanskrit="॥ ग्रह स्थिति तालिका ॥"
      sectionTitleEnglish="Planetary Summary Table"
    >
      <div className="flex-1 flex flex-col justify-between py-2">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="font-devanagari text-xl text-kc-maroon font-bold block mb-1">
            ॥ नवग्रह विवरण एवं स्थिति ॥
          </span>
          <h2 className="font-heading text-lg uppercase tracking-wider text-kc-text-secondary">
            NAVAGRAHA CELESTIAL POSITIONS
          </h2>
          <div className="w-32 h-0.5 bg-kc-gold mx-auto mt-2" />
        </div>

        {/* Manuscript Table with Decorative Dividers */}
        <div className="w-full my-auto overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-1 py-2 px-3 bg-kc-ivory border-y-2 border-kc-brass font-heading text-[11px] font-bold text-kc-maroon uppercase tracking-wider text-center">
            <div className="col-span-2 text-left">Planet (ग्रह)</div>
            <div className="col-span-2">Rashi (राशि)</div>
            <div className="col-span-2">Degree (अंश)</div>
            <div className="col-span-1">Bhava</div>
            <div className="col-span-3 text-left">Nakshatra & Pada</div>
            <div className="col-span-2">Dignity (दीप्ति)</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-kc-brass/30 border-b-2 border-kc-brass">
            {planets.map((p, idx) => (
              <div
                key={`planet-row-${p.id || idx}`}
                className={`grid grid-cols-12 gap-1 py-2.5 px-3 text-xs items-center ${
                  idx % 2 === 0 ? 'bg-kc-paper' : 'bg-kc-ivory/50'
                }`}
              >
                {/* Planet Name & Symbol */}
                <div className="col-span-2 flex items-center gap-1.5 text-left font-semibold text-kc-maroon">
                  <span className="text-base">{p.symbol}</span>
                  <div>
                    <span className="font-devanagari block leading-tight">{p.sanskrit}</span>
                    <span className="font-serif text-[10px] text-kc-text-muted">{p.name}</span>
                  </div>
                  {p.isRetrograde && (
                    <span className="text-[9px] font-bold text-kc-sindoor ml-auto" title="Retrograde (वक्रि)">
                      [R]
                    </span>
                  )}
                </div>

                {/* Sign */}
                <div className="col-span-2 text-center font-medium text-kc-text-primary">
                  {p.sign}
                </div>

                {/* Degree */}
                <div className="col-span-2 text-center font-mono font-semibold text-kc-maroon">
                  {p.degrees}
                </div>

                {/* House */}
                <div className="col-span-1 text-center font-bold text-kc-brass">
                  H-{p.house}
                </div>

                {/* Nakshatra & Pada */}
                <div className="col-span-3 text-left">
                  <span className="font-devanagari font-semibold text-kc-text-primary block leading-tight">
                    {p.nakshatraSanskrit}
                  </span>
                  <span className="font-serif text-[10px] text-kc-text-muted">
                    {p.nakshatraName} • Pada {p.pada}
                  </span>
                </div>

                {/* Dignity */}
                <div className="col-span-2 text-center">
                  <span className="inline-block px-1.5 py-0.5 rounded-3xs text-[10px] font-semibold bg-kc-sand border border-kc-brass/50 text-kc-maroon">
                    {p.dignity || 'Sama'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retrograde & Dignity Note */}
        <div className="mt-4 text-center text-xs text-kc-text-muted italic">
          * Note: [R] denotes Vakri (Retrograde) motion. Sidereal calculations use Lahiri Ayanamsha ($24^\circ 12' 36"$).
        </div>
      </div>
    </ManuscriptPageWrapper>
  );
};
