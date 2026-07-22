import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MuhuratCandidate } from '../../types/muhurat';
import { TempleButton } from '../ui/TempleButton';
import { useSound } from '../../context/AudioContext';

interface MuhuratDetailModalProps {
  candidate: MuhuratCandidate | null;
  onClose: () => void;
  eventName: string;
  location: string;
  onExportManuscript?: (candidate: MuhuratCandidate) => void;
}

export const MuhuratDetailModal: React.FC<MuhuratDetailModalProps> = ({
  candidate,
  onClose,
  eventName,
  location,
  onExportManuscript,
}) => {
  const { playSound } = useSound();

  if (!candidate) return null;

  const { suitability } = candidate;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-kc-charcoal/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg p-6 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep rounded-xs font-serif text-kc-text-primary"
        >
          {/* Inner Hairline */}
          <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/40 rounded-2xs" />

          {/* Filigree Corner Caps */}
          <span className="pointer-events-none absolute top-1.5 left-1.5 h-4 w-4 border-t-2 border-l-2 border-kc-gold" />
          <span className="pointer-events-none absolute top-1.5 right-1.5 h-4 w-4 border-t-2 border-r-2 border-kc-gold" />
          <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-4 w-4 border-b-2 border-l-2 border-kc-gold" />
          <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-4 w-4 border-b-2 border-r-2 border-kc-gold" />

          {/* Modal Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-kc-brass/30 mb-4">
            <div>
              <span className="text-[10px] font-heading uppercase tracking-widest text-kc-brass font-bold block">
                RECOMMENDED MUHURAT WINDOW
              </span>
              <h3 className="font-devanagari text-lg font-bold text-kc-maroon dark:text-kc-gold">
                {eventName} • {candidate.dateFormatted}
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

          {/* Suitability Score Header */}
          <div
            className="p-4 rounded-xs text-kc-paper mb-4 text-center shadow-warm relative overflow-hidden"
            style={{ backgroundColor: suitability.badgeColor }}
          >
            <span className="font-heading uppercase text-xs tracking-widest block opacity-90">
              SUITABILITY EVALUATION
            </span>
            <h4 className="font-devanagari text-2xl font-extrabold my-0.5">
              {suitability.levelSanskrit} ({suitability.level})
            </h4>
            <span className="font-mono text-sm font-bold">
              Score: {suitability.score} / 100
            </span>
          </div>

          {/* Date & Location Snapshot */}
          <div className="p-3 bg-kc-ivory border border-kc-brass/40 rounded-xs text-xs space-y-1 mb-4">
            <div className="flex justify-between">
              <span className="text-kc-text-muted">Event Location:</span>
              <span className="font-semibold text-kc-maroon">{location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-kc-text-muted">Evaluated Time Window:</span>
              <span className="font-bold text-kc-maroon">{candidate.startTime} — {candidate.endTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-kc-text-muted">Vedic Calendar:</span>
              <span className="font-serif italic">{candidate.sanskritDate}</span>
            </div>
          </div>

          {/* Panchang Snapshot Grid */}
          <div className="mb-4">
            <span className="text-[10px] font-heading uppercase text-kc-brass font-bold block mb-1">
              PANCHANG FIVE PILLARS AT TIME WINDOW
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-kc-ivory border border-kc-brass/30 rounded-3xs">
                <span className="text-[9px] font-heading uppercase text-kc-text-muted block">TITHI</span>
                <span className="font-devanagari font-semibold text-kc-maroon">{candidate.tithi}</span>
              </div>
              <div className="p-2 bg-kc-ivory border border-kc-brass/30 rounded-3xs">
                <span className="text-[9px] font-heading uppercase text-kc-text-muted block">NAKSHATRA</span>
                <span className="font-devanagari font-semibold text-kc-maroon">{candidate.nakshatra}</span>
              </div>
              <div className="p-2 bg-kc-ivory border border-kc-brass/30 rounded-3xs">
                <span className="text-[9px] font-heading uppercase text-kc-text-muted block">YOGA</span>
                <span className="font-devanagari font-semibold text-kc-maroon">{candidate.yoga}</span>
              </div>
              <div className="p-2 bg-kc-ivory border border-kc-brass/30 rounded-3xs">
                <span className="text-[9px] font-heading uppercase text-kc-text-muted block">KARANA</span>
                <span className="font-devanagari font-semibold text-kc-maroon">{candidate.karana}</span>
              </div>
            </div>
          </div>

          {/* Favorable Factors List */}
          <div className="mb-4 text-xs">
            <span className="font-heading uppercase text-[10px] text-green-700 font-bold block mb-1">
              FAVORABLE CELESTIAL FACTORS (+)
            </span>
            <ul className="list-disc list-inside space-y-1 text-kc-text-primary">
              {suitability.positiveFactors.map((f, idx) => (
                <li key={`pos-${idx}`}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Unfavorable Factors List if present */}
          {suitability.negativeFactors.length > 0 && (
            <div className="mb-4 text-xs">
              <span className="font-heading uppercase text-[10px] text-red-700 font-bold block mb-1">
                INHERENT CHALLENGES / CONTRAINDICATIONS (-)
              </span>
              <ul className="list-disc list-inside space-y-1 text-kc-text-primary">
                {suitability.negativeFactors.map((f, idx) => (
                  <li key={`neg-${idx}`}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Controls */}
          <div className="pt-3 border-t border-kc-brass/30 flex items-center justify-between gap-2">
            <TempleButton variant="ghost" size="sm" onClick={onClose}>
              Close
            </TempleButton>
            {onExportManuscript && (
              <TempleButton
                variant="primary"
                size="sm"
                onClick={() => {
                  playSound('paper-flip');
                  onExportManuscript(candidate);
                }}
              >
                📜 Export Royal Muhurat Report
              </TempleButton>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
