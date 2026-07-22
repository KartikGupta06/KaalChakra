import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { GlobalBackground } from '../backgrounds/GlobalBackground';
import { Header } from '../layout/Header';
import { PageContainer, HeroContainer } from '../layout/AppShell';
import { HeroHeading, Subheading, SanskritHeading, Caption } from '../typography/Typography';
import { AncientDivider } from '../decorations/AncientDivider';
import { LivingWheelOfTime } from './LivingWheelOfTime';
import { SacredEightPanels } from './SacredEightPanels';
import { SolarJourneySection } from './SolarJourneySection';
import { MoonPhaseSection } from './MoonPhaseSection';
import { DayInterpretationPanel } from './DayInterpretationPanel';
import { PanchangNavigation } from './PanchangNavigation';
import { SacredFooter } from '../hall/SacredFooter';
import { TODAY_PANCHANG } from '../../constants/panchangDefaults';
import { PanchangData } from '../../types/panchang';
import { paperReveal } from '../animations/variants';
import { fetchTodayPanchang, fetchPanchangForDate } from '../../services/api';

export const LivingPanchang: React.FC = () => {
  const [data, setData] = useState<PanchangData>(TODAY_PANCHANG);
  const [dayOffset, setDayOffset] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(false);

  // Fetch Panchang from backend on mount and when day changes
  const loadPanchang = useCallback(async (offset: number) => {
    if (offset === 0) {
      // Today
      const result = await fetchTodayPanchang('Ujjain');
      if (result) {
        setData(result);
        setIsLive(true);
      } else {
        setData(TODAY_PANCHANG);
        setIsLive(false);
      }
    } else {
      // Offset day
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + offset);
      const dateStr = targetDate.toISOString().split('T')[0]; // YYYY-MM-DD
      const result = await fetchPanchangForDate(dateStr, 'Ujjain');
      if (result) {
        setData(result);
        setIsLive(true);
      }
      // If API fails for offset days, keep current data
    }
  }, []);

  useEffect(() => {
    loadPanchang(dayOffset);
  }, [dayOffset, loadPanchang]);

  const handlePrevDay = () => {
    setDayOffset((prev) => prev - 1);
  };

  const handleToday = () => {
    setDayOffset(0);
  };

  const handleNextDay = () => {
    setDayOffset((prev) => prev + 1);
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
              <SanskritHeading className="mb-1">॥ जीवंत पञ्चाङ्ग गणन ॥</SanskritHeading>
              <HeroHeading className="mb-2">THE LIVING PANCHANG</HeroHeading>
              <Subheading className="max-w-xl text-center">
                The Living Flow & Heartbeat of Celestial Time
              </Subheading>
              <Caption className="mt-1 text-center max-w-md">
                Observe the live astronomical motion of the Sun, Moon, and 27 Nakshatras governing the five pillars of Vedic time.
              </Caption>
              {isLive && (
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-heading font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live Computation Engine Active
                </span>
              )}

              {/* Manuscript Page Turn Controls */}
              <PanchangNavigation
                onPrevDay={handlePrevDay}
                onToday={handleToday}
                onNextDay={handleNextDay}
              />
            </motion.div>
          </HeroContainer>

          <AncientDivider symbol="wheel" />

          {/* Hero Centerpiece: The Living Wheel of Time */}
          <LivingWheelOfTime data={data} />

          <AncientDivider symbol="flower" />

          {/* Eight Sacred Information Panels */}
          <SacredEightPanels data={data} />

          {/* Solar Trajectory Arc & Lunar Illumination Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            <SolarJourneySection data={data} />
            <MoonPhaseSection data={data} />
          </div>

          <AncientDivider symbol="om" />

          {/* Day Character Interpretation Manuscript */}
          <DayInterpretationPanel data={data} />
        </PageContainer>
      </main>

      <SacredFooter />
    </GlobalBackground>
  );
};
