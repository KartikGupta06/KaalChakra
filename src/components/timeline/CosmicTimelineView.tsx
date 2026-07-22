import React from 'react';
import { TimelineEvent } from '../../types/timeline';

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
  if (!events || events.length === 0) return null;

  return (
    <div className="w-full font-serif select-none">
      {/* Handcrafted Manuscript Timeline Container */}
      <div className="relative p-6 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep rounded-xs overflow-hidden">
        {/* Inner Hairline */}
        <div className="pointer-events-none absolute inset-1.5 border border-kc-gold/40 rounded-2xs" />

        {/* Filigree Corner Caps */}
        <span className="pointer-events-none absolute top-1.5 left-1.5 h-4 w-4 border-t-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute top-1.5 right-1.5 h-4 w-4 border-t-2 border-r-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-4 w-4 border-b-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-4 w-4 border-b-2 border-r-2 border-kc-gold" />

        {/* Header Title */}
        <div className="text-center pb-4 border-b border-kc-brass/30 mb-8 flex items-center justify-between">
          <span className="font-devanagari text-lg font-bold text-kc-maroon dark:text-kc-gold">
            ॥ काल प्रवाह - अनन्त समय चक्र ॥
          </span>
          <span className="font-heading text-xs uppercase tracking-widest text-kc-brass font-bold">
            COSMIC TIMELINE STREAM ({events.length} EVENTS)
          </span>
        </div>

        {/* Central Vertical Brass Rail Line */}
        <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-2 before:bottom-2 before:w-1 before:bg-gradient-to-b before:from-kc-gold before:via-kc-brass before:to-kc-gold before:rounded-full shadow-xs">
          {events.map((evt) => {
            const isBookmarked = bookmarkedIds.has(evt.eventId);
            const isToday = evt.date === currentDateStr;

            return (
              <div
                key={evt.eventId}
                className="relative flex flex-col sm:flex-row items-start justify-between gap-4 p-4 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/60 rounded-xs transition-all hover:border-kc-gold hover:shadow-warm group"
              >
                {/* Wax Seal / Marker Icon on Brass Rail */}
                <div
                  className={`absolute -left-6 sm:-left-10 top-4 w-7 h-7 rounded-full border-2 border-kc-gold flex items-center justify-center text-sm shadow-warm z-10 ${
                    isToday ? 'bg-kc-sindoor animate-pulse text-kc-paper' : 'bg-kc-burnt-brown text-kc-gold'
                  }`}
                  style={{ backgroundColor: evt.badgeColor }}
                >
                  {evt.icon}
                </div>

                {/* Left Node Event Details */}
                <div className="flex-1 min-w-0 pl-2">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className="px-2 py-0.5 rounded-3xs text-[10px] font-heading font-bold uppercase text-kc-paper shadow-xs"
                      style={{ backgroundColor: evt.badgeColor }}
                    >
                      {evt.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-kc-maroon">
                      {evt.dateFormatted} {evt.timeStr ? `• ${evt.timeStr}` : ''}
                    </span>
                    {isToday && (
                      <span className="px-1.5 py-0.5 bg-kc-sindoor text-kc-paper rounded-3xs text-[9px] font-heading uppercase font-bold">
                        TODAY MARKER
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-base font-bold text-kc-text-primary group-hover:text-kc-maroon transition-colors">
                    {evt.title}
                  </h3>

                  <p className="font-devanagari text-xs text-kc-maroon/80 dark:text-kc-gold/90 font-semibold mb-1">
                    {evt.sanskritTitle}
                  </p>

                  <p className="text-xs text-kc-text-secondary line-clamp-2">
                    {evt.description}
                  </p>

                  {evt.panchangContext && (
                    <span className="inline-block mt-2 text-[11px] font-serif italic text-kc-text-muted">
                      ✦ {evt.panchangContext}
                    </span>
                  )}
                </div>

                {/* Right Action Controls */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => onToggleBookmark(evt.eventId)}
                    className="p-2 text-base rounded-3xs bg-kc-paper border border-kc-brass/40 text-kc-maroon hover:border-kc-gold"
                    title="Bookmark Event"
                  >
                    {isBookmarked ? '★' : '☆'}
                  </button>
                  <button
                    onClick={() => onSelectEvent(evt)}
                    className="px-3 py-1.5 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-gold text-xs font-serif font-bold text-kc-maroon dark:text-kc-gold rounded-3xs hover:shadow-xs transition-transform hover:scale-105"
                  >
                    📜 Read Inscription
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
