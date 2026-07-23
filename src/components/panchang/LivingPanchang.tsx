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
import { usePanchangLocation } from '../../hooks/usePanchangLocation';
import { LocationSearch, LocationData } from '../birth/LocationSearch';
import { LocationPinIcon } from './PanchangIcons';
import { TempleButton } from '../ui/TempleButton';

export const LivingPanchang: React.FC = () => {
  const { location, setLocation, detectBrowserLocation, isDetecting, detectionError } =
    usePanchangLocation();
  const [data, setData] = useState<PanchangData>(TODAY_PANCHANG);
  const [dayOffset, setDayOffset] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [showManualSearch, setShowManualSearch] = useState<boolean>(false);

  // Fetch Panchang from backend on mount and when location or day changes
  const loadPanchang = useCallback(async (offset: number) => {
    const locQuery = {
      city: location.city.split(' ')[0] || location.city,
      lat: location.lat,
      lng: location.lng,
    };

    if (offset === 0) {
      // Today
      const result = await fetchTodayPanchang(locQuery);
      if (result) {
        setData(result);
        setIsLive(true);
      } else {
        setData({ ...TODAY_PANCHANG, location: location.city });
        setIsLive(false);
      }
    } else {
      // Offset day
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + offset);
      const dateStr = targetDate.toISOString().split('T')[0]; // YYYY-MM-DD
      const result = await fetchPanchangForDate(dateStr, locQuery);
      if (result) {
        setData(result);
        setIsLive(true);
      }
    }
  }, [location]);

  useEffect(() => {
    loadPanchang(dayOffset);
  }, [dayOffset, location, loadPanchang]);

  const handlePrevDay = () => {
    setDayOffset((prev) => prev - 1);
  };

  const handleToday = () => {
    setDayOffset(0);
  };

  const handleNextDay = () => {
    setDayOffset((prev) => prev + 1);
  };

  const handleCitySelect = (cityName: string, details?: LocationData) => {
    setLocation({
      city: cityName,
      lat: details?.lat,
      lng: details?.lng,
      source: 'manual',
    });
    setShowManualSearch(false);
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

              {/* Location Controls & Detection Bar */}
              <div className="mt-4 p-3 bg-kc-paper dark:bg-kc-burnt-brown border border-kc-brass/50 rounded-xs shadow-warm flex flex-col sm:flex-row items-center gap-3 max-w-lg w-full justify-between">
                <div className="flex items-center gap-2 text-left">
                  <LocationPinIcon size={18} className="text-kc-gold-royal dark:text-kc-saffron shrink-0" />
                  <div>
                    <span className="font-heading text-[10px] uppercase tracking-widest text-kc-text-muted block">
                      Observatory Location
                    </span>
                    <span className="font-serif text-xs font-bold text-kc-maroon dark:text-kc-gold">
                      {location.city}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <TempleButton
                    variant="secondary"
                    size="sm"
                    onClick={detectBrowserLocation}
                    disabled={isDetecting}
                  >
                    {isDetecting ? 'Detecting...' : '📍 Detect Live'}
                  </TempleButton>
                  <TempleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowManualSearch(!showManualSearch)}
                  >
                    {showManualSearch ? 'Cancel' : '✏ Change'}
                  </TempleButton>
                </div>
              </div>

              {detectionError && (
                <span className="mt-1 text-[11px] font-serif italic text-kc-sindoor">
                  {detectionError}
                </span>
              )}

              {/* Manual City Search Dropdown Drawer */}
              {showManualSearch && (
                <div className="mt-3 max-w-md w-full">
                  <LocationSearch value={location.city} onChange={handleCitySelect} />
                </div>
              )}

              {isLive && (
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-heading font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live Astronomical Computation Engine Active
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
