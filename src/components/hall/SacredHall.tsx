import React from 'react';
import { motion } from 'framer-motion';
import { GlobalBackground } from '../backgrounds/GlobalBackground';
import { Header } from '../layout/Header';
import { PageContainer } from '../layout/AppShell';
import { KalachakraWheel } from './KalachakraWheel';
import { KnowledgeChambers } from './KnowledgeChambers';
import { WisdomPanel } from './WisdomPanel';
import { SacredFooter } from './SacredFooter';
import { HeroHeading, Subheading, SanskritHeading, Caption } from '../typography/Typography';
import { AncientDivider } from '../decorations/AncientDivider';
import { paperReveal } from '../animations/variants';

export const SacredHall: React.FC = () => {
  return (
    <GlobalBackground>
      <Header />

      <main className="flex-1 w-full">
        <PageContainer>
          {/* Temple Header Hero Area */}
          <motion.div
            variants={paperReveal}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center py-6 sm:py-8"
          >
            <SanskritHeading className="mb-1">॥ द शैनमः कालचक्राय ॥</SanskritHeading>
            <HeroHeading className="mb-2">THE SACRED HALL</HeroHeading>
            <Subheading className="max-w-xl text-center">
              The Eternal Wheel of Time • Vedic Astronomical Experience Hub
            </Subheading>
            <Caption className="mt-1 text-center max-w-md">
              Step into the royal observatory of ancient India. Explore sacred chambers of astrological wisdom preserved through millennia.
            </Caption>

            {/* Visual Centerpiece: The Rotating Kalachakra Wheel */}
            <KalachakraWheel />
          </motion.div>

          <AncientDivider symbol="wheel" />

          {/* Interactive Knowledge Chambers Grid */}
          <KnowledgeChambers />

          <AncientDivider symbol="flower" />

          {/* Vedic Wisdom Quotes Panel */}
          <WisdomPanel />
        </PageContainer>
      </main>

      <SacredFooter />
    </GlobalBackground>
  );
};
