import React, { useState } from 'react';
import { MuhuratCandidate } from '../../types/muhurat';
import { TempleButton } from '../ui/TempleButton';
import { useSound } from '../../context/AudioContext';

interface MuhuratTimelineViewProps {
  candidates: MuhuratCandidate[];
  onSelectCandidate: (candidate: MuhuratCandidate) => void;
  onToggleBookmark: (candidateId: string) => void;
  bookmarkedIds: Set<string>;
}

export const MuhuratTimelineView: React.FC<MuhuratTimelineViewProps> = ({
  candidates,
  onSelectCandidate,
  onToggleBookmark,
  bookmarkedIds,
}) => {
  const { playSound } = useSound();
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('score');

  let list = [...candidates];

  // Filtering
  if (filterLevel !== 'all') {
    list = list.filter((c) => c.suitability.level.toLowerCase() === filterLevel.toLowerCase());
  }

  // Sorting
  if (sortBy === 'score') {
    list.sort((a, b) => b.suitability.score - a.suitability.score);
  } else {
    list.sort((a, b) => a.date.localeCompare(b.date));
  }

  return (
    <div className="w-full font-serif space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/50 rounded-xs text-xs">
        {/* Level Filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-heading uppercase text-[10px] text-kc-brass font-bold">
            Filter Level:
          </span>
          {['all', 'excellent', 'good', 'acceptable', 'avoid'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                playSound('ink-stroke');
                setFilterLevel(lvl);
              }}
              className={`px-2.5 py-1 rounded-3xs font-heading uppercase text-[10px] font-bold transition-all border ${
                filterLevel === lvl
                  ? 'bg-kc-maroon text-kc-paper border-kc-gold shadow-warm'
                  : 'bg-kc-paper text-kc-text-secondary border-kc-brass/30 hover:border-kc-brass'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Sort Switcher */}
        <div className="flex items-center gap-1.5">
          <span className="font-heading uppercase text-[10px] text-kc-brass font-bold">
            Sort By:
          </span>
          <button
            onClick={() => {
              playSound('ink-stroke');
              setSortBy(sortBy === 'score' ? 'date' : 'score');
            }}
            className="px-3 py-1 bg-kc-paper border border-kc-gold text-kc-maroon font-bold rounded-3xs uppercase tracking-wider text-[10px]"
          >
            {sortBy === 'score' ? '★ Highest Score' : '📅 Date Chronological'}
          </button>
        </div>
      </div>

      {/* Candidate Timeline Cards List */}
      <div className="space-y-3">
        {list.map((cand) => {
          const isBookmarked = bookmarkedIds.has(cand.candidateId);
          return (
            <div
              key={cand.candidateId}
              className="p-4 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/60 rounded-xs shadow-2xs relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-kc-gold"
            >
              {/* Left Candidate Metadata */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="px-2 py-0.5 rounded-3xs text-[10px] font-heading font-bold uppercase text-kc-paper shadow-xs"
                    style={{ backgroundColor: cand.suitability.badgeColor }}
                  >
                    {cand.suitability.levelSanskrit} • Score {cand.suitability.score}/100
                  </span>
                  <span className="text-xs font-devanagari text-kc-maroon font-semibold">
                    {cand.sanskritDate}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-kc-text-primary">
                  {cand.dateFormatted}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-kc-text-secondary mt-1">
                  <span>⏰ Window: <strong className="text-kc-maroon">{cand.startTime} — {cand.endTime}</strong></span>
                  <span>•</span>
                  <span>🌙 {cand.tithi}</span>
                  <span>•</span>
                  <span>⭐ {cand.nakshatra}</span>
                </div>

                {/* Positive Reason Highlight */}
                {cand.suitability.positiveFactors.length > 0 && (
                  <p className="font-serif italic text-xs text-kc-text-muted mt-2 border-t border-kc-brass/20 pt-1.5">
                    ✦ {cand.suitability.positiveFactors[0]}
                  </p>
                )}
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onToggleBookmark(cand.candidateId)}
                  className="p-2 text-base rounded-3xs bg-kc-paper border border-kc-brass/40 text-kc-maroon hover:border-kc-gold transition-transform hover:scale-105"
                  title="Bookmark Candidate"
                >
                  {isBookmarked ? '★' : '☆'}
                </button>
                <TempleButton
                  variant="secondary"
                  size="sm"
                  onClick={() => onSelectCandidate(cand)}
                >
                  📜 View Window Details
                </TempleButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
