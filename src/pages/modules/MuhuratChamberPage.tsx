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

import { EventRuleInfo, MuhuratResponse, MuhuratCandidate } from '../../types/muhurat';
import { fetchEventTypes, evaluateMuhurat } from '../../services/muhuratService';
import { LocationSearch } from '../../components/birth/LocationSearch';
import { RoyalMuhuratCalendar } from '../../components/muhurat/RoyalMuhuratCalendar';
import { MuhuratTimelineView } from '../../components/muhurat/MuhuratTimelineView';
import { MuhuratDetailModal } from '../../components/muhurat/MuhuratDetailModal';
import { MuhuratCompareModal } from '../../components/muhurat/MuhuratCompareModal';
import { RoyalManuscriptModal } from '../../components/manuscript/RoyalManuscriptModal';
import { getMuhuratIcon } from '../../components/icons/SacredIcons';

export const MuhuratChamberPage: React.FC = () => {
  const { playSound } = useSound();

  // State
  const [eventCatalog, setEventCatalog] = useState<EventRuleInfo[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<string>('marriage');
  const [city, setCity] = useState<string>('Ujjain');

  // Date range (Default: Today to 14 days later)
  const todayStr = new Date().toISOString().split('T')[0];
  const fourteenDaysLaterStr = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const [startDate, setStartDate] = useState<string>(todayStr);
  const [endDate, setEndDate] = useState<string>(fourteenDaysLaterStr);

  // Evaluation Response State
  const [muhuratData, setMuhuratData] = useState<MuhuratResponse | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'calendar' | 'timeline'>('calendar');

  // Modals
  const [selectedCandidate, setSelectedCandidate] = useState<MuhuratCandidate | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isManuscriptOpen, setIsManuscriptOpen] = useState<boolean>(false);

  // Load catalog on mount
  useEffect(() => {
    async function loadCatalog() {
      const cat = await fetchEventTypes();
      setEventCatalog(cat);
    }
    loadCatalog();
  }, []);

  // Run evaluation whenever eventType, dates, or city change
  useEffect(() => {
    let isMounted = true;
    async function runEval() {
      setIsEvaluating(true);
      const res = await evaluateMuhurat({
        eventType: selectedEventType,
        startDate,
        endDate,
        city,
      });
      if (isMounted) {
        setMuhuratData(res);
        setIsEvaluating(false);
      }
    }
    runEval();
    return () => {
      isMounted = false;
    };
  }, [selectedEventType, startDate, endDate, city]);

  // Handlers
  const handleToggleBookmark = (candidateId: string) => {
    playSound('ink-stroke');
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(candidateId)) next.delete(candidateId);
      else next.add(candidateId);
      return next;
    });
  };

  const selectedEventInfo = eventCatalog.find((e) => e.id === selectedEventType) || eventCatalog[0];

  return (
    <>
      {/* Royal Manuscript Export Modal */}
      <RoyalManuscriptModal
        isOpen={isManuscriptOpen}
        onClose={() => setIsManuscriptOpen(false)}
        rawBirthData={{ name: 'Muhurat Observer', place: city }}
      />

      {/* Candidate Detail Modal */}
      <MuhuratDetailModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        eventName={selectedEventInfo?.name || 'Auspicious Activity'}
        location={city}
        onExportManuscript={() => setIsManuscriptOpen(true)}
      />

      {/* Side-by-Side Compare Modal */}
      <MuhuratCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        candidates={muhuratData?.candidates || []}
        bookmarkedIds={bookmarkedIds}
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
                <SanskritHeading className="mb-1">॥ शुभ मुहूर्त चयन यन्त्र ॥</SanskritHeading>
                <HeroHeading className="mb-2">THE ROYAL MUHURAT CHAMBER</HeroHeading>
                <Subheading className="max-w-xl text-center">
                  Vedic Auspicious Time Window Recommendation System
                </Subheading>
                <Caption className="mt-1 text-center max-w-md">
                  Evaluated against Parasari & Muhurta Chintamani classical Panchang rules.
                </Caption>
              </motion.div>
            </HeroContainer>

            <AncientDivider symbol="wheel" />

            {/* Event Catalog Selection Cards */}
            <SectionWrapper className="my-4">
              <div className="text-center mb-3">
                <span className="font-heading text-[10px] uppercase tracking-widest text-kc-brass font-bold block">
                  STEP 1: SELECT EVENT TYPE (कार्य प्रकार)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
                {eventCatalog.map((ev) => {
                  const isSelected = selectedEventType === ev.id;
                  return (
                    <button
                      key={ev.id}
                      onClick={() => {
                        playSound('paper-flip');
                        setSelectedEventType(ev.id);
                      }}
                      className={`p-3 rounded-xs border flex flex-col items-center justify-between text-center transition-all ${
                        isSelected
                          ? 'bg-kc-burnt-brown border-2 border-kc-gold text-kc-gold shadow-warm font-bold transform scale-105'
                          : 'bg-kc-ivory dark:bg-kc-dark-wood border-kc-brass/40 text-kc-text-secondary hover:border-kc-brass'
                      }`}
                    >
                      <span className="mb-1.5">{getMuhuratIcon(ev.icon, 24)}</span>
                      <span className="font-devanagari text-xs leading-tight font-semibold">
                        {ev.sanskritName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </SectionWrapper>

            {/* Location & Date Range Selection Bar */}
            <SectionWrapper className="my-4">
              <div className="p-4 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/60 rounded-xs shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Location Search */}
                <div className="w-full md:w-1/3">
                  <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass font-bold block mb-1">
                    LOCATION (स्थान)
                  </span>
                  <LocationSearch
                    value={city}
                    onChange={(val) => setCity(val)}
                  />
                </div>

                {/* Start Date */}
                <div className="w-full md:w-1/3">
                  <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass font-bold block mb-1">
                    START DATE (प्रारम्भ तिथि)
                  </span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/60 rounded-3xs text-xs text-kc-text-primary focus:outline-none focus:border-kc-gold"
                  />
                </div>

                {/* End Date */}
                <div className="w-full md:w-1/3">
                  <span className="font-heading text-[10px] uppercase tracking-wider text-kc-brass font-bold block mb-1">
                    END DATE (समाप्ति तिथि)
                  </span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/60 rounded-3xs text-xs text-kc-text-primary focus:outline-none focus:border-kc-gold"
                  />
                </div>
              </div>
            </SectionWrapper>

            <AncientDivider symbol="flower" />

            {/* Evaluation Results & View Controls */}
            <SectionWrapper className="my-6">
              {isEvaluating ? (
                <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-2 border-kc-gold border-t-transparent rounded-full animate-spin" />
                  <span className="font-devanagari text-base font-bold text-kc-maroon">
                    ॥ शुभ मुहूर्त काल गणना ॥
                  </span>
                  <span className="font-serif italic text-xs text-kc-text-muted">
                    Evaluating candidate days against Panchang pillars & Muhurta Chintamani rules for {selectedEventInfo?.name}...
                  </span>
                </div>
              ) : (
                muhuratData && (
                  <div className="space-y-6">
                    {/* Summary Metrics Bar */}
                    <div className="p-4 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass rounded-xs shadow-deep flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="font-heading text-[10px] uppercase tracking-widest text-kc-brass font-bold block">
                          EVALUATION SUMMARY ({muhuratData.evaluatedDaysCount} DAYS EVALUATED)
                        </span>
                        <h3 className="font-devanagari text-lg font-bold text-kc-maroon dark:text-kc-gold">
                          {muhuratData.eventSanskrit} • {muhuratData.eventName}
                        </h3>
                        <span className="text-xs text-kc-text-muted font-serif">
                          Location: {muhuratData.location}
                        </span>
                      </div>

                      {/* View Switcher & Action Controls */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            playSound('paper-flip');
                            setViewMode('calendar');
                          }}
                          className={`px-3 py-1.5 rounded-3xs text-xs font-heading uppercase tracking-wider font-bold transition-all border ${
                            viewMode === 'calendar'
                              ? 'bg-kc-gold text-kc-maroon border-kc-gold shadow-warm'
                              : 'bg-kc-ivory dark:bg-kc-dark-wood text-kc-text-secondary border-kc-brass/40'
                          }`}
                        >
                          📅 Royal Calendar View
                        </button>
                        <button
                          onClick={() => {
                            playSound('paper-flip');
                            setViewMode('timeline');
                          }}
                          className={`px-3 py-1.5 rounded-3xs text-xs font-heading uppercase tracking-wider font-bold transition-all border ${
                            viewMode === 'timeline'
                              ? 'bg-kc-gold text-kc-maroon border-kc-gold shadow-warm'
                              : 'bg-kc-ivory dark:bg-kc-dark-wood text-kc-text-secondary border-kc-brass/40'
                          }`}
                        >
                          ⏳ Timeline View
                        </button>

                        <button
                          onClick={() => {
                            playSound('paper-flip');
                            setIsCompareOpen(true);
                          }}
                          className="px-3 py-1.5 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/60 text-xs font-serif font-bold text-kc-maroon dark:text-kc-gold rounded-3xs hover:border-kc-gold"
                        >
                          ★ Compare Saved ({bookmarkedIds.size})
                        </button>

                        <TempleButton
                          variant="secondary"
                          size="sm"
                          onClick={() => setIsManuscriptOpen(true)}
                        >
                          📜 Export Manuscript
                        </TempleButton>
                      </div>
                    </div>

                    {/* Active View Display */}
                    {viewMode === 'calendar' ? (
                      <RoyalMuhuratCalendar
                        candidates={muhuratData.candidates}
                        onSelectCandidate={(cand) => setSelectedCandidate(cand)}
                        selectedCandidateId={selectedCandidate?.candidateId}
                      />
                    ) : (
                      <MuhuratTimelineView
                        candidates={muhuratData.candidates}
                        onSelectCandidate={(cand) => setSelectedCandidate(cand)}
                        onToggleBookmark={handleToggleBookmark}
                        bookmarkedIds={bookmarkedIds}
                      />
                    )}

                    {/* Transparency & Disclaimer Footer */}
                    <div className="p-3 bg-kc-ivory dark:bg-kc-dark-wood border border-kc-brass/40 rounded-xs text-xs text-kc-text-muted italic text-center">
                      ✦ {muhuratData.transparency.disclaimer}
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
