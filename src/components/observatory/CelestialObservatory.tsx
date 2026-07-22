import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlobalBackground } from '../backgrounds/GlobalBackground';
import { Header } from '../layout/Header';
import { PageContainer, HeroContainer, SectionWrapper } from '../layout/AppShell';
import { HeroHeading, Subheading, SanskritHeading, Caption } from '../typography/Typography';
import { AncientDivider } from '../decorations/AncientDivider';
import { InteractiveKundaliChart } from './InteractiveKundaliChart';
import { ZodiacRing } from './ZodiacRing';
import { PlanetInspector } from './PlanetInspector';
import { KnowledgeExplorer } from './KnowledgeExplorer';
import { YogaGallery } from './YogaGallery';
import { NakshatraExplorer } from './NakshatraExplorer';
import { NavamsaExplorer } from './NavamsaExplorer';
import { ObservatoryLegend } from './ObservatoryLegend';
import { SacredFooter } from '../hall/SacredFooter';
import { paperReveal } from '../animations/variants';
import { GrahaPlacement } from '../revelation/NorthIndianKundali';
import { TempleButton } from '../ui/TempleButton';

export const CelestialObservatory: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<GrahaPlacement | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'chart' | 'zodiac' | 'navamsa' | 'nakshatra'>('chart');
  const [showAspectLines, setShowAspectLines] = useState<boolean>(true);

  const handleSelectPlanet = (p: GrahaPlacement) => {
    setSelectedPlanet(p);
    setSelectedHouse(p.house);
  };

  const handleSelectHouse = (h: number) => {
    setSelectedHouse(h);
    setSelectedPlanet(null);
  };

  return (
    <GlobalBackground>
      <Header />

      <main className="flex-1 w-full">
        <PageContainer>
          {/* Header & Title Area */}
          <HeroContainer className="py-6 sm:py-8">
            <motion.div
              variants={paperReveal}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center"
            >
              <SanskritHeading className="mb-1">॥ दिव्य वेधशाला ॥</SanskritHeading>
              <HeroHeading className="mb-2">THE CELESTIAL OBSERVATORY</HeroHeading>
              <Subheading className="max-w-xl text-center">
                Interactive Vedic Astronomical Exploration & Visual Chart Alignment
              </Subheading>
              <Caption className="mt-1 text-center max-w-md">
                Select any Graha or Bhava sector to illuminate its planetary aspect rays, Nakshatras, Rashis, and D9 Navamsa placements.
              </Caption>

              {/* View Switcher Controls */}
              <div className="flex flex-wrap items-center justify-center gap-2 my-4">
                <TempleButton
                  variant={activeTab === 'chart' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveTab('chart')}
                >
                  ❖ Interactive Chart
                </TempleButton>
                <TempleButton
                  variant={activeTab === 'zodiac' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveTab('zodiac')}
                >
                  ☸ Zodiac Ring
                </TempleButton>
                <TempleButton
                  variant={activeTab === 'navamsa' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveTab('navamsa')}
                >
                  ☯ Navamsa D9
                </TempleButton>
                <TempleButton
                  variant={activeTab === 'nakshatra' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setActiveTab('nakshatra')}
                >
                  ⭐ Nakshatras
                </TempleButton>

                {activeTab === 'chart' && (
                  <TempleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAspectLines(!showAspectLines)}
                  >
                    {showAspectLines ? '👁 Hide Aspects' : '👁 Show Aspects'}
                  </TempleButton>
                )}
              </div>
            </motion.div>
          </HeroContainer>

          <AncientDivider symbol="wheel" />

          {/* Main 3-Column Hero Layout */}
          <SectionWrapper className="my-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Knowledge Explorer */}
              <div className="lg:col-span-3 w-full order-2 lg:order-1">
                <KnowledgeExplorer />
              </div>

              {/* Center Column: Active Visualization */}
              <div className="lg:col-span-6 w-full order-1 lg:order-2 flex flex-col items-center">
                {activeTab === 'chart' && (
                  <InteractiveKundaliChart
                    selectedPlanetId={selectedPlanet?.id}
                    selectedHouse={selectedHouse}
                    onSelectPlanet={handleSelectPlanet}
                    onSelectHouse={handleSelectHouse}
                    showAspectLines={showAspectLines}
                  />
                )}

                {activeTab === 'zodiac' && <ZodiacRing />}

                {activeTab === 'navamsa' && <NavamsaExplorer />}

                {activeTab === 'nakshatra' && <NakshatraExplorer />}
              </div>

              {/* Right Column: Planet & House Inspector */}
              <div className="lg:col-span-3 w-full order-3">
                <PlanetInspector
                  selectedPlanet={selectedPlanet}
                  selectedHouse={selectedHouse}
                />
              </div>
            </div>
          </SectionWrapper>

          <ObservatoryLegend />

          <AncientDivider symbol="flower" />

          {/* Yoga Gallery */}
          <YogaGallery />
        </PageContainer>
      </main>

      <SacredFooter />
    </GlobalBackground>
  );
};
