import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GlobalBackground } from '../../components/backgrounds/GlobalBackground';
import { Header } from '../../components/layout/Header';
import { PageContainer, HeroContainer, SectionWrapper } from '../../components/layout/AppShell';
import { HeroHeading, Subheading, SanskritHeading, BodyText, Caption, TempleLabel } from '../../components/typography/Typography';
import { TempleBorder } from '../../components/decorations/TempleBorder';
import { AncientDivider } from '../../components/decorations/AncientDivider';
import { WaxSeal } from '../../components/decorations/WaxSeal';
import { TempleButton } from '../../components/ui/TempleButton';
import { SacredFooter } from '../../components/hall/SacredFooter';
import { paperReveal } from '../../components/animations/variants';
import { useSound } from '../../context/AudioContext';

interface ModulePlaceholderProps {
  chamberId: string;
  title: string;
  sanskritTitle: string;
  icon: string;
  description: string;
  futurePhase: string;
}

export const ModulePlaceholder: React.FC<ModulePlaceholderProps> = ({
  title,
  sanskritTitle,
  icon,
  description,
  futurePhase,
}) => {
  const navigate = useNavigate();
  const { playSound } = useSound();

  const handleReturn = () => {
    playSound('paper-flip');
    navigate('/app');
  };

  return (
    <GlobalBackground>
      <Header />

      <main className="flex-1 w-full">
        <PageContainer>
          <HeroContainer>
            <motion.div
              variants={paperReveal}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center"
            >
              <WaxSeal size="lg" label={icon} className="mb-4" />
              <SanskritHeading className="mb-1">॥ {sanskritTitle} ॥</SanskritHeading>
              <HeroHeading className="mb-2">{title}</HeroHeading>
              <Subheading className="max-w-xl text-center">{description}</Subheading>
              <Caption className="mt-2 text-center max-w-md">
                Chamber destination connected to The Sacred Hall of Kalachakra.
              </Caption>
            </motion.div>
          </HeroContainer>

          <AncientDivider symbol="flower" />

          <SectionWrapper>
            <div className="max-w-3xl mx-auto">
              <TempleBorder variant="gilded" className="text-center p-8">
                <TempleLabel>{futurePhase}</TempleLabel>
                <h3 className="font-heading text-2xl font-bold text-kc-maroon dark:text-kc-gold my-3">
                  Sacred Chamber Awakening
                </h3>
                <BodyText className="my-4 text-base leading-relaxed">
                  This sacred chamber will awaken in a future phase. The celestial algorithms, astronomical charts, and observational data structures for {title} are being prepared according to ancient Vedic manuscripts.
                </BodyText>

                <div className="my-6 p-4 rounded-xs bg-kc-sand/40 dark:bg-kc-dark-wood/50 border border-kc-brass/30 text-xs font-serif text-kc-text-secondary dark:text-kc-text-muted">
                  ✦ All layout architecture, theme systems, and manuscript component frameworks are operational and ready for feature implementation.
                </div>

                <div className="mt-6 flex justify-center">
                  <TempleButton variant="primary" size="lg" onClick={handleReturn}>
                    ↩ Return to Sacred Hall
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
