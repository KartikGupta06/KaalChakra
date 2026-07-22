import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MuhuratCandidate } from '../../types/muhurat';
import { TempleButton } from '../ui/TempleButton';
import { useSound } from '../../context/AudioContext';

interface MuhuratCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: MuhuratCandidate[];
  bookmarkedIds: Set<string>;
}

export const MuhuratCompareModal: React.FC<MuhuratCompareModalProps> = ({
  isOpen,
  onClose,
  candidates,
  bookmarkedIds,
}) => {
  const { playSound } = useSound();

  if (!isOpen) return null;

  const bookmarkedCandidates = candidates.filter((c) => bookmarkedIds.has(c.candidateId));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-kc-charcoal/85 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl p-6 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep rounded-xs font-serif text-kc-text-primary max-h-[90vh] flex flex-col"
        >
          {/* Inner Hairline */}
          <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/40 rounded-2xs" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3 border-b border-kc-brass/30 mb-4 shrink-0">
            <div>
              <span className="text-[10px] font-heading uppercase tracking-widest text-kc-brass font-bold block">
                SIDE-BY-SIDE MUHURAT COMPARISON
              </span>
              <h3 className="font-devanagari text-lg font-bold text-kc-maroon dark:text-kc-gold">
                ॥ तुलनात्मक मुहूर्त विश्लेषण ॥
              </h3>
            </div>
            <button
              onClick={() => {
                playSound('ink-stroke');
                onClose();
              }}
              className="w-7 h-7 rounded-full bg-kc-sindoor text-kc-paper font-bold flex items-center justify-center text-xs"
            >
              ✕
            </button>
          </div>

          {/* Content Body */}
          {bookmarkedCandidates.length === 0 ? (
            <div className="py-12 text-center text-kc-text-muted italic">
              No bookmarked Muhurat candidates selected for comparison. Please click the ★ star icon on candidates to add them.
            </div>
          ) : (
            <div className="flex-1 overflow-x-auto">
              <div className="grid grid-flow-col auto-cols-[280px] gap-4 pb-4">
                {bookmarkedCandidates.map((cand) => (
                  <div
                    key={`comp-${cand.candidateId}`}
                    className="p-4 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/60 rounded-xs flex flex-col justify-between"
                  >
                    <div>
                      {/* Score Badge */}
                      <div
                        className="p-2.5 rounded-3xs text-kc-paper text-center font-bold text-xs mb-3 shadow-xs"
                        style={{ backgroundColor: cand.suitability.badgeColor }}
                      >
                        {cand.suitability.levelSanskrit} ({cand.suitability.score}/100)
                      </div>

                      <h4 className="font-serif font-bold text-sm text-kc-maroon dark:text-kc-gold mb-1">
                        {cand.dateFormatted}
                      </h4>
                      <span className="font-serif text-xs text-kc-text-muted block mb-3">
                        {cand.startTime}
                      </span>

                      <div className="space-y-1.5 text-xs border-t border-kc-brass/30 pt-2 mb-3">
                        <p><strong>Tithi:</strong> {cand.tithi}</p>
                        <p><strong>Nakshatra:</strong> {cand.nakshatra}</p>
                        <p><strong>Yoga:</strong> {cand.yoga}</p>
                        <p><strong>Karana:</strong> {cand.karana}</p>
                        <p><strong>Vaara:</strong> {cand.vaara}</p>
                      </div>

                      <div className="border-t border-kc-brass/30 pt-2 text-xs">
                        <span className="font-heading uppercase text-[9px] text-green-700 font-bold block mb-1">
                          PRIMARY BENEFIC FACTORS
                        </span>
                        <ul className="list-disc list-inside space-y-1 text-kc-text-primary text-[11px]">
                          {cand.suitability.positiveFactors.slice(0, 3).map((pf, idx) => (
                            <li key={`pf-${idx}`}>{pf}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="pt-3 border-t border-kc-brass/30 flex items-center justify-end shrink-0">
            <TempleButton variant="ghost" size="sm" onClick={onClose}>
              Close Comparison
            </TempleButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
