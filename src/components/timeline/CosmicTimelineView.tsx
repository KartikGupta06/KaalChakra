import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { TimelineEvent } from '../../types/timeline';
import {
  RoyalSealIcon,
  DashaWheelIcon,
  TransitPlanetIcon,
  EclipseSunMoonIcon,
  TempleLampIcon,
  YouAreHerePinIcon,
} from './TimelineIcons';
import { useSound } from '../../context/AudioContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CosmicTimelineViewProps {
  events: TimelineEvent[];
  onSelectEvent: (evt: TimelineEvent) => void;
  onToggleBookmark: (eventId: string) => void;
  bookmarkedIds: Set<string>;
  currentDateStr: string;
}

export const CosmicTimelineView: React.FC<CosmicTimelineViewProps> = ({
  events,
  onSelectEvent,
  onToggleBookmark,
  bookmarkedIds,
  currentDateStr,
}) => {
  const { playSound } = useSound();
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedCardIds, setExpandedCardIds] = useState<Set<string>>(new Set());

  // Scroll Progress Engine for Brass Rail Illumination
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const railHeightPercent = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Dynamic Scroll Story Chapter derived from scroll progress
  const chapterTitle = useTransform(smoothProgress, (p) => {
    if (p < 0.15) return { text: '🌅 Janma Chapter • The Birth Moment', sanskrit: '॥ जन्म अध्याय ॥' };
    if (p < 0.35) return { text: '🪐 Active Planetary Cycle & Dasha', sanskrit: '॥ महादशा एवं गोचर ॥' };
    if (p < 0.6) return { text: '☀ Major Planetary Transits & Ingress', sanskrit: '॥ ग्रह गोचर प्रवाह ॥' };
    if (p < 0.8) return { text: '🌑 Eclipse Windows & Nodal Shifts', sanskrit: '॥ ग्रहण एवं छाया काल ॥' };
    return { text: '🌄 The Road Ahead • Future Celestial Milestones', sanskrit: '॥ उत्तर काल ॥' };
  });

  const [currentChapter, setCurrentChapter] = useState<{ text: string; sanskrit: string }>({
    text: '🌅 Janma Chapter • The Birth Moment',
    sanskrit: '॥ जन्म अध्याय ॥',
  });

  chapterTitle.on('change', (latest) => {
    setCurrentChapter(latest);
  });

  if (!events || events.length === 0) {
    return (
      <div className="p-8 text-center bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass rounded-xs my-6">
        <p className="font-serif text-sm text-kc-text-muted italic">
          No celestial milestones found for the selected filter layer. Select another layer to observe your cosmic stream.
        </p>
      </div>
    );
  }

  const toggleExpand = (eventId: string) => {
    playSound('ink-stroke');
    setExpandedCardIds((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
  };

  const getEventIcon = (layer: string) => {
    switch (layer) {
      case 'birth':
        return <RoyalSealIcon size={18} className="text-kc-gold-royal dark:text-kc-gold" />;
      case 'dasha':
        return <DashaWheelIcon size={18} className="text-emerald-700 dark:text-emerald-400" />;
      case 'transit':
        return <TransitPlanetIcon size={18} className="text-amber-700 dark:text-amber-400" />;
      case 'eclipse':
        return <EclipseSunMoonIcon size={18} className="text-red-800 dark:text-red-400" />;
      case 'muhurat':
        return <TempleLampIcon size={18} className="text-kc-saffron dark:text-kc-gold" />;
      default:
        return <DashaWheelIcon size={18} className="text-kc-gold" />;
    }
  };

  return (
    <div ref={containerRef} className="w-full font-serif select-none my-6 relative">
      {/* Sticky Floating Scroll Story Chapter Strip */}
      <div className="sticky top-16 z-30 mb-4 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter.text}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-1.5 bg-kc-paper/95 dark:bg-kc-burnt-brown/95 border-2 border-kc-gold/70 shadow-deep rounded-full backdrop-blur-md flex items-center gap-2 pointer-events-auto"
          >
            <span className="h-2 w-2 rounded-full bg-kc-gold-royal animate-pulse" />
            <span className="font-heading text-xs font-bold text-kc-maroon dark:text-kc-gold tracking-wider uppercase">
              {currentChapter.text}
            </span>
            <span className="font-devanagari text-xs text-kc-gold-royal dark:text-kc-saffron font-semibold">
              {currentChapter.sanskrit}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Handcrafted Manuscript Timeline Outer Shell */}
      <div className="relative p-4 sm:p-8 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep rounded-xs overflow-hidden">
        {/* Inner Hairline */}
        <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/30 rounded-2xs" />

        {/* Filigree Corner Caps */}
        <span className="pointer-events-none absolute top-1.5 left-1.5 h-4 w-4 border-t-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute top-1.5 right-1.5 h-4 w-4 border-t-2 border-r-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-4 w-4 border-b-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-4 w-4 border-b-2 border-r-2 border-kc-gold" />

        {/* Header Title Bar */}
        <div className="text-center pb-4 border-b border-kc-brass/30 mb-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-devanagari text-lg font-bold text-kc-maroon dark:text-kc-gold">
            ॥ काल प्रवाह - अनन्त समय चक्र ॥
          </span>
          <span className="font-heading text-xs uppercase tracking-widest text-kc-brass font-bold">
            CHRONOLOGICAL STREAM ({events.length} CELESTIAL MILESTONES)
          </span>
        </div>

        {/* Engraved Vertical Brass Rail Container */}
        <div className="relative pl-8 sm:pl-12 space-y-10">
          {/* Static Dim Rail Background Line */}
          <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-1 bg-kc-sand/60 dark:bg-kc-dark-wood border-x border-kc-brass/30 rounded-full" />

          {/* Illuminated Dynamic Brass Rail Overlay */}
          <motion.div
            className="absolute left-4 sm:left-6 top-2 w-1 bg-gradient-to-b from-kc-gold via-kc-gold-royal to-kc-saffron rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)] z-0"
            style={{ height: railHeightPercent }}
          />

          {events.map((evt, idx) => {
            const isBookmarked = bookmarkedIds.has(evt.eventId);
            const isToday = evt.date === currentDateStr;
            const isExpanded = expandedCardIds.has(evt.eventId);
            const isPast = evt.date < currentDateStr;

            return (
              <motion.div
                key={evt.eventId}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 35, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: Math.min(idx * 0.04, 0.25) }}
                className="relative"
              >
                {/* Engraved Brass Node Badge on Rail */}
                <div
                  className={`absolute -left-8 sm:-left-12 top-3 h-8 w-8 rounded-full border-2 border-kc-gold flex items-center justify-center shadow-warm z-10 transition-all ${
                    isToday
                      ? 'bg-kc-maroon text-kc-gold ring-4 ring-kc-gold/60 shadow-[0_0_15px_rgba(212,175,55,0.9)] animate-pulse'
                      : isPast
                      ? 'bg-kc-sand/90 dark:bg-kc-dark-wood text-kc-maroon dark:text-kc-gold opacity-90 border-kc-gold-royal'
                      : 'bg-kc-paper dark:bg-kc-burnt-brown text-kc-brass/60 border-kc-brass/40'
                  }`}
                >
                  {isToday ? <YouAreHerePinIcon size={18} className="text-kc-gold-royal" /> : getEventIcon(evt.layer)}
                </div>

                {/* Handcrafted Manuscript Card */}
                <div
                  className={`relative p-5 bg-kc-ivory dark:bg-kc-dark-wood border rounded-xs transition-all ${
                    isToday
                      ? 'border-2 border-kc-gold-royal shadow-[0_0_20px_rgba(212,175,55,0.25)] bg-gradient-to-r from-kc-ivory via-kc-sand/30 to-kc-ivory dark:from-kc-dark-wood dark:via-kc-burnt-brown dark:to-kc-dark-wood'
                      : 'border-kc-brass/50 hover:border-kc-gold hover:shadow-warm'
                  }`}
                >
                  {/* Inner Hairline */}
                  <div className="pointer-events-none absolute inset-1 border border-kc-gold/20 rounded-2xs" />

                  {/* Node Header Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-kc-brass/20">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="px-2 py-0.5 rounded-3xs text-[10px] font-heading font-bold uppercase text-kc-paper shadow-xs"
                        style={{ backgroundColor: evt.badgeColor }}
                      >
                        {evt.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-kc-maroon dark:text-kc-gold">
                        {evt.dateFormatted} {evt.timeStr ? `• ${evt.timeStr}` : ''}
                      </span>
                      {isToday && (
                        <span className="px-2 py-0.5 bg-kc-gold-royal text-kc-maroon rounded-3xs text-[10px] font-heading uppercase font-bold tracking-wider animate-pulse flex items-center gap-1 shadow-xs">
                          📍 YOU ARE HERE
                        </span>
                      )}
                    </div>

                    <span className="font-heading text-[10px] uppercase tracking-widest text-kc-text-muted">
                      Importance: {evt.importance}
                    </span>
                  </div>

                  {/* Title & Inscriptions */}
                  <h3 className="font-serif text-lg font-bold text-kc-maroon dark:text-kc-gold mb-0.5">
                    {evt.title}
                  </h3>

                  <p className="font-devanagari text-xs text-kc-saffron dark:text-kc-saffron font-semibold mb-2">
                    {evt.sanskritTitle}
                  </p>

                  <p className="text-xs sm:text-sm text-kc-text-primary dark:text-kc-text-secondary leading-relaxed">
                    {evt.description}
                  </p>

                  {/* Context Note */}
                  {evt.panchangContext && (
                    <div className="mt-2 text-[11px] font-serif italic text-kc-text-muted flex items-center gap-1">
                      <span>✦</span>
                      <span>{evt.panchangContext}</span>
                    </div>
                  )}

                  {/* Expandable Panel Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-3 border-t border-kc-brass/30 space-y-3"
                      >
                        {evt.traditionalMeaning && (
                          <div className="p-3 bg-kc-sand/40 dark:bg-kc-burnt-brown/60 rounded-2xs border border-kc-brass/30">
                            <span className="font-heading text-[10px] uppercase tracking-wider text-kc-maroon dark:text-kc-gold font-bold block mb-1">
                              Traditional Meaning (शास्त्रीय अर्थ)
                            </span>
                            <p className="font-serif text-xs text-kc-text-primary dark:text-kc-text-secondary leading-relaxed">
                              {evt.traditionalMeaning}
                            </p>
                          </div>
                        )}

                        {evt.whyThisMatters && (
                          <div className="p-3 bg-kc-sand/40 dark:bg-kc-burnt-brown/60 rounded-2xs border border-kc-brass/30">
                            <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass dark:text-kc-gold font-bold block mb-1">
                              Why This Matters to Your Journey
                            </span>
                            <p className="font-serif text-xs text-kc-text-secondary leading-relaxed">
                              {evt.whyThisMatters}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Bar */}
                  <div className="mt-4 pt-3 border-t border-kc-brass/20 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleExpand(evt.eventId)}
                      className="font-serif text-xs italic text-kc-text-muted hover:text-kc-maroon dark:hover:text-kc-gold cursor-pointer transition-colors"
                    >
                      {isExpanded ? '▲ Collapse Scroll' : '▼ Unroll Inscription'}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleBookmark(evt.eventId)}
                        className="px-2.5 py-1 text-xs rounded-3xs bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/40 text-kc-maroon dark:text-kc-gold hover:border-kc-gold transition-colors"
                        title="Bookmark Milestone"
                      >
                        {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectEvent(evt)}
                        className="px-3 py-1 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-gold text-xs font-serif font-bold text-kc-maroon dark:text-kc-gold rounded-3xs hover:shadow-xs transition-transform hover:scale-105"
                      >
                        📜 Read Inscription
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
