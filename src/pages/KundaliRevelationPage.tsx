import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalBackground } from '../components/backgrounds/GlobalBackground';
import { Header } from '../components/layout/Header';
import { PageContainer, HeroContainer, SectionWrapper } from '../components/layout/AppShell';
import { HeroHeading, Subheading, SanskritHeading, Caption } from '../components/typography/Typography';
import { AncientDivider } from '../components/decorations/AncientDivider';
import { NorthIndianKundali } from '../components/revelation/NorthIndianKundali';
import { BirthSummaryPanel } from '../components/revelation/BirthSummaryPanel';
import { PlanetaryPanel } from '../components/revelation/PlanetaryPanel';
import { SacredInterpretationPanel } from '../components/revelation/SacredInterpretationPanel';
import { ExportSection } from '../components/revelation/ExportSection';
import { CosmicRevealSequence } from '../components/revelation/CosmicRevealSequence';
import { RoyalManuscriptModal } from '../components/manuscript/RoyalManuscriptModal';
import { SacredFooter } from '../components/hall/SacredFooter';
import { paperReveal } from '../components/animations/variants';
import { TempleButton } from '../components/ui/TempleButton';

export const KundaliRevelationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as {
    fullName?: string;
    gender?: string;
    date?: { day: number; month: number; year: number };
    time?: { hour: number; minute: number; period: string };
    place?: string;
    planets?: any[];
  }) || {};

  const name = state.fullName || 'Observer';
  const place = state.place || 'Ujjain (उज्जैन)';
  const dateStr = state.date ? `${state.date.day}/${state.date.month}/${state.date.year}` : '15/8/1998';
  const timeStr = state.time ? `${state.time.hour}:${state.time.minute < 10 ? '0' + state.time.minute : state.time.minute} ${state.time.period}` : '6:30 AM';

  const [isPlayingSequence, setIsPlayingSequence] = useState<boolean>(true);
  const [isManuscriptModalOpen, setIsManuscriptModalOpen] = useState<boolean>(false);

  return (
    <>
      {/* 8-Scene Cinematic Reveal Sequence Modal */}
      <AnimatePresence>
        {isPlayingSequence && (
          <CosmicRevealSequence onComplete={() => setIsPlayingSequence(false)} />
        )}
      </AnimatePresence>

      {/* Royal Manuscript Generator & Interactive Preview Modal */}
      <RoyalManuscriptModal
        isOpen={isManuscriptModalOpen}
        onClose={() => setIsManuscriptModalOpen(false)}
        rawBirthData={state}
      />

      {/* Main Masterpiece View */}
      <GlobalBackground>
        <Header />

        <main className="flex-1 w-full">
          <PageContainer>
            {/* Page Header */}
            <HeroContainer className="py-6 sm:py-8">
              <motion.div
                variants={paperReveal}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center"
              >
                <SanskritHeading className="mb-1">॥ जन्म कुण्डली प्राकट्य ॥</SanskritHeading>
                <HeroHeading className="mb-2">THE COSMIC REVELATION</HeroHeading>
                <Subheading className="max-w-xl text-center">
                  Vedic Natal Horoscope for {name}
                </Subheading>
                <Caption className="mt-1 text-center max-w-md">
                  Inscribed celestial chart under Surya Siddhanta observational rules.
                </Caption>
              </motion.div>
            </HeroContainer>

            <AncientDivider symbol="wheel" />

            {/* Main 3-Column Hero Layout */}
            <SectionWrapper className="my-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Birth Record Summary */}
                <div className="lg:col-span-3 w-full order-2 lg:order-1">
                  <BirthSummaryPanel
                    name={name}
                    dateStr={dateStr}
                    timeStr={timeStr}
                    placeStr={place}
                  />
                  <div className="mt-4 flex justify-center">
                    <TempleButton variant="secondary" size="sm" onClick={() => navigate('/kundali')}>
                      ✏ Edit Birth Moment
                    </TempleButton>
                  </div>
                </div>

                {/* Center Column: North Indian Kundali Chart */}
                <div className="lg:col-span-6 w-full order-1 lg:order-2">
                  <NorthIndianKundali planets={state.planets} />
                </div>

                {/* Right Column: Planetary Alignment Table */}
                <div className="lg:col-span-3 w-full order-3">
                  <PlanetaryPanel planets={state.planets} />
                </div>
              </div>
            </SectionWrapper>

            <AncientDivider symbol="flower" />

            {/* Sacred Margin Interpretation Card */}
            <SacredInterpretationPanel birthData={state} />

            {/* Export Actions (Download Royal Manuscript, Share, Print, Replay, Preserve in Archive) */}
            <ExportSection
              onReplaySequence={() => setIsPlayingSequence(true)}
              onOpenManuscriptModal={() => setIsManuscriptModalOpen(true)}
              birthData={state}
              kundaliData={(state as any).kundaliData}
            />
          </PageContainer>
        </main>

        <SacredFooter />
      </GlobalBackground>
    </>
  );
};
