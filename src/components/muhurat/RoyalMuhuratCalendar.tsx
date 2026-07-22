import React from 'react';
import { MuhuratCandidate } from '../../types/muhurat';

interface RoyalMuhuratCalendarProps {
  candidates: MuhuratCandidate[];
  onSelectCandidate: (candidate: MuhuratCandidate) => void;
  selectedCandidateId?: string;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const RoyalMuhuratCalendar: React.FC<RoyalMuhuratCalendarProps> = ({
  candidates,
  onSelectCandidate,
  selectedCandidateId,
}) => {
  if (!candidates || candidates.length === 0) return null;

  // Group candidates into calendar days grid
  const firstDate = new Date(candidates[0].date);
  const year = firstDate.getFullYear();
  const month = firstDate.getMonth();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

  const candidatesMap = new Map<string, MuhuratCandidate>();
  candidates.forEach((c) => candidatesMap.set(c.date, c));

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full font-serif select-none">
      {/* Handcrafted Parchment Calendar Card */}
      <div className="relative p-4 sm:p-6 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep rounded-xs">
        {/* Inner Hairline */}
        <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/40 rounded-2xs" />

        {/* Filigree Corner Caps */}
        <span className="pointer-events-none absolute top-1 left-1 h-4 w-4 border-t-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute top-1 right-1 h-4 w-4 border-t-2 border-r-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1 left-1 h-4 w-4 border-b-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1 right-1 h-4 w-4 border-b-2 border-r-2 border-kc-gold" />

        {/* Calendar Header */}
        <div className="text-center pb-3 border-b border-kc-brass/30 mb-4 flex items-center justify-between">
          <span className="font-devanagari text-lg font-bold text-kc-maroon dark:text-kc-gold">
            ॥ राजकीय मुहूर्त पञ्चाङ्ग वर्ग ॥
          </span>
          <span className="font-heading text-xs uppercase tracking-widest text-kc-brass font-bold">
            {firstDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Weekday Labels Header */}
        <div className="grid grid-cols-7 gap-1 text-center font-heading text-xs font-bold text-kc-maroon dark:text-kc-gold uppercase tracking-wider mb-2 border-b border-kc-brass/20 pb-1">
          {WEEKDAYS.map((wd) => (
            <div key={wd} className="py-1">
              {wd}
            </div>
          ))}
        </div>

        {/* 35/42 Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {/* Empty Padding Cells Before 1st Day */}
          {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
            <div key={`blank-${idx}`} className="h-16 sm:h-20 bg-kc-ivory/20 rounded-3xs opacity-30" />
          ))}

          {/* Days of the Month */}
          {Array.from({ length: totalDaysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const cand = candidatesMap.get(dateStr);
            const isToday = dateStr === todayStr;
            const isSelected = cand && cand.candidateId === selectedCandidateId;

            return (
              <div
                key={`day-${dayNum}`}
                onClick={() => cand && onSelectCandidate(cand)}
                className={`h-16 sm:h-20 p-1 sm:p-1.5 border rounded-3xs transition-all relative flex flex-col justify-between cursor-pointer ${
                  cand
                    ? isSelected
                      ? 'bg-kc-burnt-brown border-2 border-kc-gold shadow-warm text-kc-gold transform scale-102 z-10'
                      : 'bg-kc-ivory dark:bg-kc-dark-wood border-kc-brass/50 hover:border-kc-gold hover:shadow-xs'
                    : 'bg-kc-paper/40 border-kc-brass/20 opacity-60 cursor-default'
                }`}
              >
                {/* Day Number Header */}
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold ${isToday ? 'text-kc-sindoor font-extrabold' : 'text-kc-text-primary'}`}>
                    {dayNum}
                  </span>
                  {isToday && (
                    <span className="text-[8px] font-heading uppercase text-kc-sindoor font-bold px-1 bg-kc-paper border border-kc-sindoor rounded-3xs">
                      Today
                    </span>
                  )}
                </div>

                {/* Candidate Badge if evaluated */}
                {cand ? (
                  <div className="flex flex-col items-center">
                    <span
                      className="px-1.5 py-0.5 rounded-3xs text-[9px] font-heading font-bold uppercase tracking-tight text-kc-paper truncate max-w-full text-center shadow-xs"
                      style={{ backgroundColor: cand.suitability.badgeColor }}
                    >
                      {cand.suitability.levelSanskrit}
                    </span>
                    <span className="text-[8px] font-mono text-kc-text-muted mt-0.5 hidden sm:block">
                      Score: {cand.suitability.score}
                    </span>
                  </div>
                ) : (
                  <span className="text-[9px] font-serif text-kc-text-disabled text-center">—</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend Footnote Bar */}
        <div className="mt-4 pt-3 border-t border-kc-brass/30 flex flex-wrap items-center justify-around gap-2 text-xs text-kc-text-muted">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-kc-gold" />
            <span>Ati Uttam (अति उत्तम • Excellent ≥85)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-green-700" />
            <span>Uttam (उत्तम • Good 70-84)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <span>Madhyam (मध्यम • Acceptable 50-69)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-800" />
            <span>Varjya (वर्ज्य • Avoid &lt;50)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
