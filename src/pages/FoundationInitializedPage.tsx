import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppShell, PageContainer, HeroContainer, SectionWrapper } from '../components/layout/AppShell';
import { HeroHeading, Subheading, SanskritHeading, BodyText, Caption, TempleLabel } from '../components/typography/Typography';
import { ParchmentCard } from '../components/ui/ParchmentCard';
import { TempleButton } from '../components/ui/TempleButton';
import { TempleBorder } from '../components/decorations/TempleBorder';
import { AncientDivider } from '../components/decorations/AncientDivider';
import { WaxSeal } from '../components/decorations/WaxSeal';
import { paperReveal } from '../components/animations/variants';

export const FoundationInitializedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      <PageContainer>
        <HeroContainer>
          <motion.div variants={paperReveal} initial="hidden" animate="visible" className="flex flex-col items-center">
            <WaxSeal size="lg" label="कालचक्र" className="mb-4" />
            <SanskritHeading className="mb-1">॥ वैदिककालचक्रपरम्परा ॥</SanskritHeading>
            <HeroHeading className="mb-2">Kalachakra Foundation Initialized</HeroHeading>
            <Subheading className="max-w-xl text-center">
              Sacred Entry Complete • Design Engine Operational
            </Subheading>
            <Caption className="mt-2 text-center max-w-md">
              Phase 2 Cinematic Splash & Sacred Entry verified. The application architecture and design system are primed for Phase 3 module implementation.
            </Caption>
          </motion.div>
        </HeroContainer>

        <AncientDivider symbol="wheel" />

        <SectionWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TempleBorder variant="gilded">
              <TempleLabel>Phase 2 Deliverable Status</TempleLabel>
              <h3 className="font-heading text-xl font-bold text-kc-maroon dark:text-kc-gold my-2">
                Ceremonial Entry Active
              </h3>
              <BodyText>
                The splash experience orchestrates a 6-layer dark wood background, volumetric lamp lighting, golden dust particles, Devanagari Sanskrit reveals, and handcrafted button transitions.
              </BodyText>
              <div className="mt-4 flex flex-wrap gap-2">
                <TempleButton variant="primary" size="sm" onClick={() => navigate('/')}>
                  ↺ Replay Splash Intro
                </TempleButton>
              </div>
            </TempleBorder>

            <ParchmentCard>
              <TempleLabel>System Architecture Inspection</TempleLabel>
              <h3 className="font-heading text-xl font-bold text-kc-maroon dark:text-kc-gold my-2">
                Design Bible Foundation
              </h3>
              <BodyText>
                Explore all interactive UI controls, typography scales, color tokens, and motion variants in the Phase 1 Design System Showcase.
              </BodyText>
              <div className="mt-4">
                <TempleButton variant="gilded" size="sm" onClick={() => navigate('/showcase')}>
                  📜 Inspect Design System Showcase
                </TempleButton>
              </div>
            </ParchmentCard>
          </div>
        </SectionWrapper>
      </PageContainer>
    </AppShell>
  );
};
