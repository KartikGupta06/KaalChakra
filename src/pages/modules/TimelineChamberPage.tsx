import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlobalBackground } from '../../components/backgrounds/GlobalBackground';
import { Header } from '../../components/layout/Header';
import { PageContainer, HeroContainer, SectionWrapper } from '../../components/layout/AppShell';
import { HeroHeading, Subheading, SanskritHeading, Caption } from '../../components/typography/Typography';
import { AncientDivider } from '../../components/decorations/AncientDivider';
import { TempleButton } from '../../components/ui/TempleButton';
import { SacredFooter } from '../../components/hall/SacredFooter';
import { paperReveal } from '../../components/animations/variants';
import { useSound } from '../../context/AudioContext';
import { useKundali } from '../../context/KundaliContext';

import { TimelineResponse, TimelineEvent } from '../../types/timeline';
import { generateCosmicTimeline } from '../../services/timelineService';
import { LocationSearch } from '../../components/birth/LocationSearch';
import { CosmicTimelineView } from '../../components/timeline/CosmicTimelineView';
import { TimelineEventModal } from '../../components/timeline/TimelineEventModal';
import { RoyalManuscriptModal } from '../../components/manuscript/RoyalManuscriptModal';

const TIMELINE_LAYERS = [
  { id: 'birth', name: 'Personal Birth', icon: '🎂', color: '#D4AF37' },
  { id: 'dasha', name: 'Vimshottari Dasha', icon: '⏳', color: '#2E7D32' },
  { id: 'transit', name: 'Planetary Transits', icon: '🪐', color: '#5C4033' },
  { id: 'festival', name: 'Vedic Festivals', icon: '🪔', color: '#E67E22' },
  { id: 'eclipse', name: 'Solar/Lunar Eclipses', icon: '🌑', color: '#7B1E1E' },
  { id: 'muhurat', name: 'Muhurat Windows', icon: '📜', color: '#C89B3C' },
];

export const TimelineChamberPage: React.FC = () => {
  const { playSound } = useSound();
  const { activeKundali } = useKundali();

  const formattedDob = activeKundali.date
    ? `${activeKundali.date.year}-${activeKundali.date.month < 10 ? '0' + activeKundali.date.month : activeKundali.date.month}-${activeKundali.date.day < 10 ? '0' + activeKundali.date.day : activeKundali.date.day}`
    : '1998-08-15';

  let h24 = activeKundali.time?.hour || 6;
  if (activeKundali.time?.period === 'PM' && h24 < 12) h24 += 12;
  if (activeKundali.time?.period === 'AM' && h24 === 12) h24 = 0;
  const formattedTob = `${h24 < 10 ? '0' + h24 : h24}:${(activeKundali.time?.minute || 30) < 10 ? '0' + (activeKundali.time?.minute || 30) : activeKundali.time?.minute || 30}`;

  // State
  const [fullName, setFullName] = useState<string>(activeKundali.fullName || 'Observer');
  const [dob, setDob] = useState<string>(formattedDob);
  const [tob, setTob] = useState<string>(formattedTob);
  const [city, setCity] = useState<string>(activeKundali.place?.split(' ')[0] || 'Ujjain');

  const [activeLayers, setActiveLayers] = useState<Set<string>>(
    new Set(['birth', 'dasha', 'transit', 'festival', 'eclipse', 'muhurat'])
  );

  const [searchTerm, setSearchTerm] = useState<string>('');

  const [timelineData, setTimelineData] = useState<TimelineResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);

  // Modals
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isManuscriptOpen, setIsManuscriptOpen] = useState<boolean>(false);

  // Fetch / Generate Timeline
  useEffect(() => {
    let isMounted = true;
    async function loadTimeline() {
      setIsGenerating(true);
      const res = await generateCosmicTimeline({
        fullName,
        dateOfBirth: dob,
        timeOfBirth: tob,
        city,
        activeLayers: Array.from(activeLayers),
      });
      if (isMounted) {
        setTimelineData(res);
        setIsGenerating(false);
      }
    }
    loadTimeline();
    return () => {
      isMounted = false;
    };
  }, [fullName, dob, tob, city, activeLayers]);

  // Handlers
  const handleToggleLayer = (layerId: string) => {
    playSound('ink-stroke');
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layerId)) {
        if (next.size > 1) next.delete(layerId);
      } else {
        next.add(layerId);
      }
      return next;
    });
  };

  const handleToggleBookmark = (eventId: string) => {
    playSound('ink-stroke');
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) next.delete(eventId);
      else next.add(eventId);
      return next;
    });
  };

  // Filter events based on search term
  let displayedEvents = timelineData?.events || [];
  if (searchTerm.trim() !== '') {
    const q = searchTerm.toLowerCase();
    displayedEvents = displayedEvents.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.sanskritTitle.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    );
  }

  return (
    <>
      {/* Royal Manuscript Modal */}
      <RoyalManuscriptModal
        isOpen={isManuscriptOpen}
        onClose={() => setIsManuscriptOpen(false)}
        rawBirthData={{ name: fullName, dob, tob, place: city }}
      />

      {/* Timeline Event Detail Modal */}
      <TimelineEventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onExportManuscript={() => setIsManuscriptOpen(true)}
      />

      <GlobalBackground>
        <Header />

        <main className="flex-1 w-full font-serif">
          <PageContainer>
            {/* Hero Header */}
            <HeroContainer className="py-6 sm:py-8">
              <motion.div
                variants={paperReveal}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center"
              >
                <SanskritHeading className="mb-1">॥ काल प्रवाह - अनन्त समय चक्र ॥</SanskritHeading>
                <HeroHeading className="mb-2">THE COSMIC TIMELINE CHAMBER</HeroHeading>
                <Subheading className="max-w-xl text-center">
                  Vimshottari Dasha, Transits, Festivals, Eclipses & Auspicious Streams
                </Subheading>
                <Caption className="mt-1 text-center max-w-md">
                  A living manuscript journey connecting personal chart data with celestial rhythms.
                </Caption>
              </motion.div>
            </HeroContainer>

            <AncientDivider symbol="wheel" />

            {/* Birth Details Input Bar */}
            <SectionWrapper className="my-4">
              <div className="p-4 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/60 rounded-xs shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="w-full md:w-1/4">
                  <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass font-bold block mb-1">
                    OBSERVER NAME
                  </span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/60 rounded-3xs text-xs text-kc-text-primary focus:outline-none focus:border-kc-gold"
                  />
                </div>

                <div className="w-full md:w-1/4">
                  <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass font-bold block mb-1">
                    DATE OF BIRTH
                  </span>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/60 rounded-3xs text-xs text-kc-text-primary focus:outline-none focus:border-kc-gold"
                  />
                </div>

                <div className="w-full md:w-1/4">
                  <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass font-bold block mb-1">
                    TIME OF BIRTH
                  </span>
                  <input
                    type="time"
                    value={tob}
                    onChange={(e) => setTob(e.target.value)}
                    className="w-full px-3 py-2 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/60 rounded-3xs text-xs text-kc-text-primary focus:outline-none focus:border-kc-gold"
                  />
                </div>

                <div className="w-full md:w-1/4">
                  <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass font-bold block mb-1">
                    LOCATION
                  </span>
                  <LocationSearch
                    value={city}
                    onChange={(val) => setCity(val)}
                  />
                </div>
              </div>
            </SectionWrapper>

            {/* Toggleable Layer Toggles & Search Bar */}
            <SectionWrapper className="my-4">
              <div className="p-4 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/60 rounded-xs space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="font-heading text-[10px] uppercase tracking-widest text-kc-brass font-bold">
                    TOGGLEABLE TIMELINE LAYERS (धारा नियन्त्रण):
                  </span>

                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="🔍 Search timeline inscriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-1.5 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/40 rounded-3xs text-xs text-kc-text-primary focus:outline-none focus:border-kc-gold w-full sm:w-64"
                  />
                </div>

                {/* Layer Checkbox Chips */}
                <div className="flex flex-wrap items-center gap-2">
                  {TIMELINE_LAYERS.map((lyr) => {
                    const isActive = activeLayers.has(lyr.id);
                    return (
                      <button
                        key={lyr.id}
                        onClick={() => handleToggleLayer(lyr.id)}
                        className={`px-3 py-1.5 rounded-3xs text-xs font-heading font-bold flex items-center gap-1.5 transition-all border ${
                          isActive
                            ? 'bg-kc-burnt-brown text-kc-gold border-kc-gold shadow-warm'
                            : 'bg-kc-ivory dark:bg-kc-dark-wood text-kc-text-muted border-kc-brass/30 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <span>{lyr.icon}</span>
                        <span>{lyr.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </SectionWrapper>

            <AncientDivider symbol="flower" />

            {/* Timeline Stream & Active Dasha Summary */}
            <SectionWrapper className="my-6">
              {isGenerating ? (
                <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-2 border-kc-gold border-t-transparent rounded-full animate-spin" />
                  <span className="font-devanagari text-base font-bold text-kc-maroon">
                    ॥ काल प्रवाह निर्माण ॥
                  </span>
                  <span className="font-serif italic text-xs text-kc-text-muted">
                    Generating Vimshottari Dashas & merging cosmic timeline events...
                  </span>
                </div>
              ) : (
                timelineData && (
                  <div className="space-y-6">
                    {/* Active Dasha Header Banner */}
                    <div className="p-4 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass rounded-xs shadow-deep flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="font-heading text-[10px] uppercase tracking-widest text-kc-brass font-bold block">
                          ACTIVE VIMSHOTTARI DASHA PERIOD
                        </span>
                        <h3 className="font-devanagari text-lg font-bold text-kc-maroon dark:text-kc-gold">
                          {timelineData.currentDasha.sanskritMahadasha} ({timelineData.currentDasha.mahadasha}) • {timelineData.currentDasha.antardasha}
                        </h3>
                        <span className="text-xs text-kc-text-muted font-serif">
                          Span: {timelineData.currentDasha.antardashaRange}
                        </span>
                      </div>

                      <TempleButton
                        variant="secondary"
                        size="sm"
                        onClick={() => setIsManuscriptOpen(true)}
                      >
                        📜 Export Royal Timeline Manuscript
                      </TempleButton>
                    </div>

                    {/* Timeline View Stream */}
                    <CosmicTimelineView
                      events={displayedEvents}
                      onSelectEvent={(evt) => setSelectedEvent(evt)}
                      onToggleBookmark={handleToggleBookmark}
                      bookmarkedIds={bookmarkedIds}
                      currentDateStr={timelineData.currentDate}
                    />

                    {/* Transparency Disclaimer Footer */}
                    <div className="p-3 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/40 rounded-xs text-xs text-kc-text-muted italic text-center">
                      ✦ {timelineData.transparency.disclaimer}
                    </div>
                  </div>
                )
              )}
            </SectionWrapper>
          </PageContainer>
        </main>

        <SacredFooter />
      </GlobalBackground>
    </>
  );
};
