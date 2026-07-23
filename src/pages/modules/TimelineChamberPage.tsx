import React, { useState, useEffect, useCallback } from 'react';
import { GlobalBackground } from '../../components/backgrounds/GlobalBackground';
import { Header } from '../../components/layout/Header';
import { PageContainer, SectionWrapper } from '../../components/layout/AppShell';
import { AncientDivider } from '../../components/decorations/AncientDivider';
import { SacredFooter } from '../../components/hall/SacredFooter';
import { useSound } from '../../context/AudioContext';
import { useKundali } from '../../context/KundaliContext';

import { TimelineResponse, TimelineEvent } from '../../types/timeline';
import { generateCosmicTimeline } from '../../services/timelineService';
import { TimelineHeroHeader, EditableTimelineFormData } from '../../components/timeline/TimelineHeroHeader';
import { CosmicTimelineView } from '../../components/timeline/CosmicTimelineView';
import { TimelineEventModal } from '../../components/timeline/TimelineEventModal';
import { RoyalManuscriptModal } from '../../components/manuscript/RoyalManuscriptModal';

export const TimelineChamberPage: React.FC = () => {
  const { playSound } = useSound();
  const { activeKundali, setActiveKundali } = useKundali();

  // Local Editable Form State initialized from activeKundali with safe fallbacks
  const [formData, setFormData] = useState<EditableTimelineFormData>({
    fullName: activeKundali.fullName || 'Vedic Traveler',
    day: activeKundali.date?.day || 15,
    month: activeKundali.date?.month || 8,
    year: activeKundali.date?.year || 1998,
    hour: activeKundali.time?.hour || 6,
    minute: activeKundali.time?.minute || 30,
    period: activeKundali.time?.period || 'AM',
    city: activeKundali.place?.split(' ')[0] || 'Ujjain',
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [timelineData, setTimelineData] = useState<TimelineResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  // Modals
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isManuscriptOpen, setIsManuscriptOpen] = useState<boolean>(false);

  const executeTimelineGeneration = useCallback(
    async (data: EditableTimelineFormData, filter: string) => {
      setIsGenerating(true);

      const safeYear = data.year && !isNaN(data.year) ? data.year : 1998;
      const safeMonth = data.month && !isNaN(data.month) ? data.month : 8;
      const safeDay = data.day && !isNaN(data.day) ? data.day : 15;

      const dobStr = `${safeYear}-${safeMonth < 10 ? '0' + safeMonth : safeMonth}-${safeDay < 10 ? '0' + safeDay : safeDay}`;

      let h24 = data.hour || 6;
      if (data.period === 'PM' && h24 < 12) h24 += 12;
      if (data.period === 'AM' && h24 === 12) h24 = 0;
      const tobStr = `${h24 < 10 ? '0' + h24 : h24}:${(data.minute || 0) < 10 ? '0' + (data.minute || 0) : data.minute || 0}`;

      const activeLayers =
        filter === 'all'
          ? ['birth', 'dasha', 'transit', 'eclipse', 'muhurat']
          : ['birth', filter];

      try {
        const res = await generateCosmicTimeline({
          fullName: data.fullName || 'Vedic Traveler',
          dateOfBirth: dobStr,
          timeOfBirth: tobStr,
          city: data.city || 'Ujjain',
          latitude: data.lat,
          longitude: data.lng,
          activeLayers,
        });

        if (res && res.events) {
          setTimelineData(res);
        }
      } catch (err) {
        console.error('[Timeline] Failed to generate timeline:', err);
      } finally {
        setIsGenerating(false);
        setIsInitialLoading(false);
      }
    },
    []
  );

  // Initial Load on mount
  useEffect(() => {
    executeTimelineGeneration(formData, activeFilter);
  }, []);

  // Form input changes update ONLY local form state while typing.
  // Never recalculate timeline on keystroke!
  const handleFormChange = (updated: Partial<EditableTimelineFormData>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
  };

  // Explicit button click triggers timeline regeneration
  const handleRegenerate = async () => {
    playSound('ink-stroke');

    setActiveKundali({
      fullName: formData.fullName || 'Vedic Traveler',
      date: { day: formData.day || 15, month: formData.month || 8, year: formData.year || 1998 },
      time: { hour: formData.hour || 6, minute: formData.minute || 30, period: formData.period || 'AM' },
      place: formData.city || 'Ujjain',
    });

    await executeTimelineGeneration(formData, activeFilter);
  };

  const handleFilterChange = async (filterId: string) => {
    playSound('ink-stroke');
    setActiveFilter(filterId);
    await executeTimelineGeneration(formData, filterId);
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
                formData={formData}
                onFormChange={handleFormChange}
                onRegenerateTimeline={handleRegenerate}
                isRegenerating={isGenerating}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                totalEventsCount={timelineData?.totalEventsCount || 0}
                ascendantSign={activeKundali.ascendantSign}
                moonSign={activeKundali.moonSign}
              />
            </SectionWrapper>

            <AncientDivider symbol="wheel" />

            {/* Cosmic Timeline Stream — Never unmounts while editing */}
            <SectionWrapper className="my-6">
              {isInitialLoading ? (
                <div className="p-12 text-center bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass rounded-xs my-6 shadow-deep">
                  <div className="font-devanagari text-xl font-bold text-kc-gold-royal animate-pulse">
                    ॥ काल प्रवाह संकलनम् ॥
                  </div>
                  <p className="font-heading text-base font-bold text-kc-maroon dark:text-kc-gold mt-2">
                    Unrolling Your Cosmic Timeline Manuscript...
                  </p>
                  <p className="font-serif text-xs text-kc-text-muted italic mt-1">
                    Computing Vimshottari Mahadashas, planetary transits, and celestial alignments for {formData.fullName}...
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
