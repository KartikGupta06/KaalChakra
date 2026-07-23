import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineEvent } from '../../types/timeline';
import { TempleButton } from '../ui/TempleButton';
import { useSound } from '../../context/AudioContext';
import { AncientDivider } from '../decorations/AncientDivider';
import {
  RoyalSealIcon,
  DashaWheelIcon,
  TransitPlanetIcon,
  EclipseSunMoonIcon,
  TempleLampIcon,
} from './TimelineIcons';

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

  const handleClose = () => {
    playSound('paper-flip');
    onClose();
  };

  const getEventIcon = (layer: string) => {
    switch (layer) {
      case 'birth':
        return <RoyalSealIcon size={22} className="text-kc-gold-royal dark:text-kc-gold" />;
      case 'dasha':
        return <DashaWheelIcon size={22} className="text-emerald-700 dark:text-emerald-400" />;
      case 'transit':
        return <TransitPlanetIcon size={22} className="text-amber-700 dark:text-amber-400" />;
      case 'eclipse':
        return <EclipseSunMoonIcon size={22} className="text-red-800 dark:text-red-400" />;
      case 'muhurat':
        return <TempleLampIcon size={22} className="text-kc-saffron dark:text-kc-gold" />;
      default:
        return <DashaWheelIcon size={22} className="text-kc-gold" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-kc-charcoal/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-xl p-6 sm:p-8 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep rounded-xs font-serif text-kc-text-primary select-none max-h-[90vh] overflow-y-auto"
        >
          {/* Inner Hairline */}
          <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/40 rounded-2xs" />

          {/* Filigree Corner Caps */}
          <span className="pointer-events-none absolute top-1.5 left-1.5 h-4 w-4 border-t-2 border-l-2 border-kc-gold" />
          <span className="pointer-events-none absolute top-1.5 right-1.5 h-4 w-4 border-t-2 border-r-2 border-kc-gold" />
          <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-4 w-4 border-b-2 border-l-2 border-kc-gold" />
          <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-4 w-4 border-b-2 border-r-2 border-kc-gold" />

          {/* Modal Header Bar */}
          <div className="flex items-start justify-between pb-3 border-b border-kc-brass/30 mb-4">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xs bg-kc-sand/50 dark:bg-kc-dark-wood border border-kc-brass/40 text-kc-maroon dark:text-kc-gold flex items-center justify-center shadow-xs">
                {getEventIcon(event.layer)}
              </span>
              <div>
                <span
                  className="inline-block px-2 py-0.5 rounded-3xs text-[10px] font-heading font-bold uppercase text-kc-paper shadow-xs mb-0.5"
                  style={{ backgroundColor: event.badgeColor }}
                >
                  {event.category} • {event.importance} Importance
                </span>
                <h3 className="font-devanagari text-lg font-bold text-kc-maroon dark:text-kc-gold leading-tight">
                  {event.sanskritTitle}
                </h3>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="text-lg text-kc-text-muted hover:text-kc-maroon dark:hover:text-kc-gold cursor-pointer p-1"
              title="Close Inscription"
            >
              ✕
            </button>
          </div>

          {/* Event Title & Date Inscription */}
          <div className="my-3 text-center sm:text-left">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-kc-maroon dark:text-kc-gold">
              {event.title}
            </h2>
            <span className="font-mono text-xs font-bold text-kc-gold-royal block mt-1">
              🗓 Date: {event.dateFormatted} {event.timeStr ? `• ${event.timeStr}` : ''}
            </span>
          </div>

          <AncientDivider symbol="flower" className="my-4" />

          {/* Body Sections */}
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
            {/* Overview Narrative */}
            <div>
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-kc-maroon dark:text-kc-gold block mb-1">
                Cosmic Overview & Inscription
              </span>
              <p className="text-kc-text-primary dark:text-kc-text-secondary bg-kc-sand/30 dark:bg-kc-dark-wood/40 p-3 rounded-2xs border border-kc-brass/20">
                {event.description}
              </p>
            </div>

            {/* Traditional Meaning */}
            {event.traditionalMeaning && (
              <div>
                <span className="font-heading text-xs font-bold uppercase tracking-wider text-kc-maroon dark:text-kc-gold block mb-1">
                  Traditional Meaning (शास्त्रीय अर्थ)
                </span>
                <p className="text-kc-text-primary dark:text-kc-text-secondary bg-kc-sand/30 dark:bg-kc-dark-wood/40 p-3 rounded-2xs border border-kc-brass/20 font-serif">
                  {event.traditionalMeaning}
                </p>
              </div>
            )}

            {/* Why This Matters */}
            {event.whyThisMatters && (
              <div>
                <span className="font-heading text-xs font-bold uppercase tracking-wider text-kc-brass dark:text-kc-gold block mb-1">
                  Why This Matters to Your Journey
                </span>
                <p className="text-kc-text-secondary dark:text-kc-text-secondary bg-kc-sand/30 dark:bg-kc-dark-wood/40 p-3 rounded-2xs border border-kc-brass/20 font-serif">
                  {event.whyThisMatters}
                </p>
              </div>
            )}

            {/* Panchang & Chart Connection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {event.panchangContext && (
                <div className="p-3 bg-kc-sand/40 dark:bg-kc-dark-wood/40 rounded-xs border border-kc-brass/30">
                  <span className="font-heading text-[10px] text-kc-brass uppercase font-bold block mb-0.5">
                    Panchang Context
                  </span>
                  <span className="font-serif text-xs font-semibold text-kc-maroon dark:text-kc-gold">
                    {event.panchangContext}
                  </span>
                </div>
              )}

              {event.chartConnection && (
                <div className="p-3 bg-kc-sand/40 dark:bg-kc-dark-wood/40 rounded-xs border border-kc-brass/30">
                  <span className="font-heading text-[10px] text-kc-brass uppercase font-bold block mb-0.5">
                    Natal Chart Connection
                  </span>
                  <span className="font-serif text-xs font-semibold text-kc-maroon dark:text-kc-gold">
                    {event.chartConnection}
                  </span>
                </div>
              )}
            </div>

            {/* Transparency Note */}
            <div className="text-[11px] font-serif italic text-kc-text-muted border-t border-kc-brass/20 pt-3">
              ✦ Computation parameters: Lahiri Ayanamsha • Whole Sign Rashi Bhavas • Swiss Ephemeris sidereal engine.
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-kc-brass/30">
            {onExportManuscript && (
              <TempleButton
                variant="secondary"
                size="sm"
                onClick={() => {
                  playSound('ink-stroke');
                  onExportManuscript(event);
                }}
              >
                📜 Export Inscription Page
              </TempleButton>
            )}

            <TempleButton variant="primary" size="sm" onClick={handleClose} className="ml-auto">
              Close Inscription
            </TempleButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
