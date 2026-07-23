import React, { useState, useEffect } from 'react';
import { GlobalBackground } from '../../components/backgrounds/GlobalBackground';
import { Header } from '../../components/layout/Header';
import { PageContainer, SectionWrapper } from '../../components/layout/AppShell';
import { AncientDivider } from '../../components/decorations/AncientDivider';
import { SacredFooter } from '../../components/hall/SacredFooter';
import { useSound } from '../../context/AudioContext';
import { useKundali } from '../../context/KundaliContext';

import { TimelineResponse, TimelineEvent } from '../../types/timeline';
import { generateCosmicTimeline } from '../../services/timelineService';
import { TimelineHeroHeader } from '../../components/timeline/TimelineHeroHeader';
import { CosmicTimelineView } from '../../components/timeline/CosmicTimelineView';
import { TimelineEventModal } from '../../components/timeline/TimelineEventModal';
import { RoyalManuscriptModal } from '../../components/manuscript/RoyalManuscriptModal';

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
  const [activeFilter, setActiveFilter] = useState<string>('all');
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
      const activeLayers =
        activeFilter === 'all'
          ? ['birth', 'dasha', 'transit', 'eclipse', 'muhurat']
          : ['birth', activeFilter];

      const res = await generateCosmicTimeline({
        fullName: activeKundali.fullName || 'Observer',
        dateOfBirth: formattedDob,
        timeOfBirth: formattedTob,
        city: activeKundali.place?.split(' ')[0] || 'Ujjain',
        activeLayers,
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
  }, [activeKundali, formattedDob, formattedTob, activeFilter]);

  // Handlers
  const handleFilterChange = (filterId: string) => {
    playSound('ink-stroke');
    setActiveFilter(filterId);
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

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Royal Manuscript Modal */}
      <RoyalManuscriptModal
        isOpen={isManuscriptOpen}
        onClose={() => setIsManuscriptOpen(false)}
        rawBirthData={activeKundali}
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
            <SectionWrapper className="py-6 sm:py-8">
              <TimelineHeroHeader
                kundali={activeKundali}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                totalEventsCount={timelineData?.totalEventsCount || 0}
              />
            </SectionWrapper>

            <AncientDivider symbol="wheel" />

            {/* Cosmic Timeline View */}
            <SectionWrapper className="my-6">
              {isGenerating ? (
                <div className="p-12 text-center bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass rounded-xs my-6">
                  <div className="font-devanagari text-xl font-bold text-kc-gold-royal animate-pulse">
                    ॥ काल प्रवाह संकलनम् ॥
                  </div>
                  <p className="font-heading text-base font-bold text-kc-maroon dark:text-kc-gold mt-2">
                    Unrolling Your Cosmic Timeline Manuscript...
                  </p>
                  <p className="font-serif text-xs text-kc-text-muted italic mt-1">
                    Computing Vimshottari Mahadashas, planetary transits, and celestial alignments for {activeKundali.fullName}...
                  </p>
                </div>
              ) : (
                <CosmicTimelineView
                  events={timelineData?.events || []}
                  onSelectEvent={(evt) => {
                    playSound('paper-flip');
                    setSelectedEvent(evt);
                  }}
                  onToggleBookmark={handleToggleBookmark}
                  bookmarkedIds={bookmarkedIds}
                  currentDateStr={todayStr}
                />
              )}
            </SectionWrapper>
          </PageContainer>
        </main>

        <SacredFooter />
      </GlobalBackground>
    </>
  );
};
