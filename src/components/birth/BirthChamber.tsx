import React from 'react';
import { motion } from 'framer-motion';
import { GlobalBackground } from '../backgrounds/GlobalBackground';
import { Header } from '../layout/Header';
import { PageContainer, HeroContainer, SectionWrapper } from '../layout/AppShell';
import { HeroHeading, Subheading, SanskritHeading, Caption } from '../typography/Typography';
import { AncientDivider } from '../decorations/AncientDivider';
import { HeroManuscript } from './HeroManuscript';
import { SacredFooter } from '../hall/SacredFooter';
import { paperReveal } from '../animations/variants';

export const BirthChamber: React.FC = () => {
  return (
    <GlobalBackground>
      <Header />

      <main className="flex-1 w-full">
        <PageContainer>
          {/* Header Area */}
          <HeroContainer className="py-6 sm:py-8">
            <motion.div
              variants={paperReveal}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center"
            >
              <SanskritHeading className="mb-1">॥ जन्म संकल्प विन्यास ॥</SanskritHeading>
              <HeroHeading className="mb-2">THE BIRTH CHAMBER</HeroHeading>
              <Subheading className="max-w-xl text-center">
                Reveal the Moment That Began Your Celestial Journey
              </Subheading>
              <Caption className="mt-1 text-center max-w-md">
                Inscribe your birth coordinates into the sacred manuscript to unveil your Vedic natal horoscope and planetary alignment.
              </Caption>
            </motion.div>
          </HeroContainer>

          <AncientDivider symbol="flower" />

          {/* Hero Manuscript Container */}
          <SectionWrapper className="my-6">
            <HeroManuscript />
          </SectionWrapper>

          {/* Footer Inscription Note */}
          <div className="text-center my-6">
            <p className="font-serif text-xs italic text-kc-text-muted">
              “Every celestial journey begins with a single sacred moment inscribed under the cosmic sky.”
            </p>
          </div>
        </PageContainer>
      </main>

      <SacredFooter />
    </GlobalBackground>
  );
};
