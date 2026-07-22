import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalBackground } from '../components/backgrounds/GlobalBackground';
import { Header } from '../components/layout/Header';
import { PageContainer, HeroContainer, SectionWrapper } from '../components/layout/AppShell';
import { HeroHeading, Subheading, SanskritHeading, BodyText, Caption, TempleLabel } from '../components/typography/Typography';
import { TempleBorder } from '../components/decorations/TempleBorder';
import { AncientDivider } from '../components/decorations/AncientDivider';
import { WaxSeal } from '../components/decorations/WaxSeal';
import { TempleButton } from '../components/ui/TempleButton';
import { SacredFooter } from '../components/hall/SacredFooter';
import { paperReveal } from '../components/animations/variants';

export const KundaliViewPlaceholderPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as {
    fullName?: string;
    gender?: string;
    date?: { day: number; month: number; year: number };
    time?: { hour: number; minute: number; period: string };
    place?: string;
  }) || {};

  const name = state.fullName || 'Observer';
  const place = state.place || 'Ujjain (उज्जैन)';
  const dateStr = state.date ? `${state.date.day}/${state.date.month}/${state.date.year}` : '15/8/1998';
  const timeStr = state.time ? `${state.time.hour}:${state.time.minute < 10 ? '0' + state.time.minute : state.time.minute} ${state.time.period}` : '6:30 AM';

  return (
    <GlobalBackground>
      <Header />

      <main className="flex-1 w-full">
        <PageContainer>
          <HeroContainer className="py-6 sm:py-8">
            <motion.div
              variants={paperReveal}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center"
            >
              <WaxSeal size="lg" label="कुण्डली" className="mb-4" />
              <SanskritHeading className="mb-1">॥ जन्मकुण्डली संकलन ॥</SanskritHeading>
              <HeroHeading className="mb-2">Kundali Visualization Engine</HeroHeading>
              <Subheading className="max-w-xl text-center">
                Record Inscribed for {name}
              </Subheading>
              <Caption className="mt-1 text-center max-w-md">
                Birth Record: {dateStr} at {timeStr} • {place}
              </Caption>
            </motion.div>
          </HeroContainer>

          <AncientDivider symbol="wheel" />

          <SectionWrapper>
            <div className="max-w-3xl mx-auto">
              <TempleBorder variant="gilded" className="text-center p-8">
                <TempleLabel>Phase 5 Module Architecture</TempleLabel>
                <h3 className="font-heading text-2xl font-bold text-kc-maroon dark:text-kc-gold my-3">
                  Kundali Chart Rendering Chamber
                </h3>
                <BodyText className="my-4 text-base leading-relaxed">
                  The natal horoscope calculation engine, South/North Indian chart rendering, Rashi chakras, and Dasha timeline calculations for <strong>{name}</strong> will awaken in Phase 5.
                </BodyText>

                <div className="my-6 p-4 rounded-xs bg-kc-sand/40 dark:bg-kc-dark-wood/50 border border-kc-brass/30 text-xs font-serif text-kc-text-secondary dark:text-kc-text-muted text-left space-y-1">
                  <div><strong>Observer Name:</strong> {name}</div>
                  <div><strong>Birth Moment:</strong> {dateStr} at {timeStr}</div>
                  <div><strong>Coordinates & City:</strong> {place}</div>
                </div>

                <div className="mt-6 flex justify-center gap-4 flex-wrap">
                  <TempleButton variant="secondary" size="md" onClick={() => navigate('/kundali')}>
                    ✏ Edit Birth Details
                  </TempleButton>
                  <TempleButton variant="gilded" size="md" onClick={() => navigate('/app')}>
                    🏛 Return to Sacred Hall
                  </TempleButton>
                </div>
              </TempleBorder>
            </div>
          </SectionWrapper>
        </PageContainer>
      </main>

      <SacredFooter />
    </GlobalBackground>
  );
};
