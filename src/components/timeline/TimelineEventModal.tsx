import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineEvent } from '../../types/timeline';
import { TempleButton } from '../ui/TempleButton';
import { useSound } from '../../context/AudioContext';

interface TimelineEventModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
  onExportManuscript?: (event: TimelineEvent) => void;
}

export const TimelineEventModal: React.FC<TimelineEventModalProps> = ({
  event,
  onClose,
  onExportManuscript,
}) => {
  const { playSound } = useSound();

  if (!event) return null;

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
              <span
                className="inline-block px-2 py-0.5 rounded-3xs text-[10px] font-heading font-bold uppercase text-kc-paper mb-1 shadow-xs"
                style={{ backgroundColor: event.badgeColor }}
              >
                {event.category} • {event.importance} Importance
              </span>
              <h3 className="font-devanagari text-lg font-bold text-kc-maroon dark:text-kc-gold">
                {event.sanskritTitle}
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

          {/* Node Title & Date Bar */}
          <div className="p-3 bg-kc-ivory border border-kc-brass/40 rounded-xs text-xs space-y-1 mb-4">
            <h4 className="font-serif text-base font-bold text-kc-maroon">
              {event.icon} {event.title}
            </h4>
            <div className="flex justify-between text-kc-text-muted">
              <span>Date: <strong>{event.dateFormatted}</strong></span>
              {event.timeStr && <span>Time: <strong>{event.timeStr}</strong></span>}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4 text-xs space-y-2">
            <span className="text-[10px] font-heading uppercase text-kc-brass font-bold block">
              INSCRIPTION EXPLANATION
            </span>
            <p className="leading-relaxed text-kc-text-primary">
              {event.description}
            </p>
          </div>

          {/* Panchang & Birth Chart Connection */}
          {event.panchangContext && (
            <div className="p-3 bg-kc-paper border border-kc-brass/30 rounded-xs text-xs mb-3 space-y-1">
              <span className="font-heading uppercase text-[9px] text-kc-brass font-bold block">
                PANCHANG CONTEXT
              </span>
              <p className="font-serif text-kc-text-secondary">{event.panchangContext}</p>
            </div>
          )}

          {event.chartConnection && (
            <div className="p-3 bg-kc-paper border border-kc-brass/30 rounded-xs text-xs mb-4 space-y-1">
              <span className="font-heading uppercase text-[9px] text-kc-brass font-bold block">
                BIRTH CHART MANIFESTATION
              </span>
              <p className="font-serif text-kc-text-secondary">{event.chartConnection}</p>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-3 border-t border-kc-brass/30 flex items-center justify-between gap-2">
            <TempleButton variant="ghost" size="sm" onClick={onClose}>
              Close Inscription
            </TempleButton>
            {onExportManuscript && (
              <TempleButton
                variant="primary"
                size="sm"
                onClick={() => {
                  playSound('paper-flip');
                  onExportManuscript(event);
                }}
              >
                📜 Export Cosmic Report
              </TempleButton>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
