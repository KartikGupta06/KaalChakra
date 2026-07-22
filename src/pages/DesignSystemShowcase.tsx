import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AppShell, PageContainer, HeroContainer, SectionWrapper } from '../components/layout/AppShell';
import {
  HeroHeading,
  SectionHeading,
  Subheading,
  SanskritHeading,
  BodyText,
  Caption,
  Quote,
  TempleLabel,
  CardTitle,
} from '../components/typography/Typography';
import { TempleBorder } from '../components/decorations/TempleBorder';
import { AncientDivider } from '../components/decorations/AncientDivider';
import { WaxSeal } from '../components/decorations/WaxSeal';
import { ScrollFrame } from '../components/decorations/ScrollFrame';
import { TempleButton } from '../components/ui/TempleButton';
import { ParchmentCard } from '../components/ui/ParchmentCard';
import { EngravedInput } from '../components/ui/EngravedInput';
import { inkSpread, paperReveal } from '../components/animations/variants';
import { useSound } from '../context/AudioContext';
import { useNavigation } from '../context/NavigationContext';

export const DesignSystemShowcase: React.FC = () => {
  const { playSound, isMuted, toggleMute } = useSound();
  const { activeItem, navItems, setActiveNavId } = useNavigation();
  const [animationKey, setAnimationKey] = useState<number>(0);

  const colorsList = [
    { name: 'Ancient Paper', hex: '#F4E7C8', class: 'bg-[#F4E7C8] text-[#2F1B14]' },
    { name: 'Parchment', hex: '#E7D1A3', class: 'bg-[#E7D1A3] text-[#2F1B14]' },
    { name: 'Temple Sand', hex: '#E9D8B4', class: 'bg-[#E9D8B4] text-[#2F1B14]' },
    { name: 'Warm Ivory', hex: '#F8F0DD', class: 'bg-[#F8F0DD] text-[#2F1B14]' },
    { name: 'Temple Brown', hex: '#5C4033', class: 'bg-[#5C4033] text-[#F4E7C8]' },
    { name: 'Dark Wood', hex: '#3A2414', class: 'bg-[#3A2414] text-[#F4E7C8]' },
    { name: 'Burnt Brown', hex: '#2B1A10', class: 'bg-[#2B1A10] text-[#F4E7C8]' },
    { name: 'Royal Gold', hex: '#D4AF37', class: 'bg-[#D4AF37] text-[#2F1B14]' },
    { name: 'Brass', hex: '#C89B3C', class: 'bg-[#C89B3C] text-[#2F1B14]' },
    { name: 'Copper', hex: '#B87333', class: 'bg-[#B87333] text-[#F4E7C8]' },
    { name: 'Saffron', hex: '#E67E22', class: 'bg-[#E67E22] text-[#2F1B14]' },
    { name: 'Deep Maroon', hex: '#7B1E1E', class: 'bg-[#7B1E1E] text-[#F4E7C8]' },
    { name: 'Sindoor', hex: '#A52A2A', class: 'bg-[#A52A2A] text-[#F4E7C8]' },
    { name: 'Lotus Pink', hex: '#C97A7E', class: 'bg-[#C97A7E] text-[#2F1B14]' },
  ];

  return (
    <AppShell>
      <PageContainer>
        {/* Hero Section */}
        <HeroContainer>
          <motion.div variants={inkSpread} initial="hidden" animate="visible" className="flex flex-col items-center">
            <WaxSeal size="lg" className="mb-4" label="कालचक्र" />
            <SanskritHeading className="mb-1">कालचक्र • Design Engine Foundation</SanskritHeading>
            <HeroHeading className="mb-2">KALACHAKRA</HeroHeading>
            <Subheading className="mb-4 max-w-xl text-center">
              The Eternal Wheel of Time • Ancient Wisdom • Modern Experience
            </Subheading>
            <Caption className="text-center max-w-lg">
              Phase 1 Design Engine Showcase — Verifying global background, manuscript typography, sacred color tokens, warm lighting, animation presets, and audio architecture.
            </Caption>
          </motion.div>
        </HeroContainer>

        <AncientDivider symbol="flower" />

        {/* Section 1: Typography System */}
        <SectionWrapper>
          <SectionHeading>1. Typography System</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ParchmentCard>
              <TempleLabel>Headings & Script</TempleLabel>
              <HeroHeading className="text-2xl sm:text-3xl my-2">Cinzel Hero Heading</HeroHeading>
              <SanskritHeading>श्रीमद्भागवतम् • Tiro Devanagari</SanskritHeading>
              <Subheading className="mt-2">Subheading in Garamond Serif</Subheading>
              <CardTitle className="mt-2">Card Title Element</CardTitle>
            </ParchmentCard>

            <ParchmentCard>
              <TempleLabel>Body & Verses</TempleLabel>
              <BodyText className="mt-2">
                Kalachakra is an immersive digital recreation of India's timeless Vedic astronomical and astrological heritage. The interface mimics sacred manuscripts preserved within a modern digital museum.
              </BodyText>
              <Quote>“Yatha Pinde Tatha Brahmande” — As is the individual, so is the universe.</Quote>
              <Caption>Classical Sanskrit Manuscript Typography Standard</Caption>
            </ParchmentCard>
          </div>
        </SectionWrapper>

        {/* Section 2: Color Palette Tokens */}
        <SectionWrapper>
          <SectionHeading>2. Color System & Semantic Tokens</SectionHeading>
          <BodyText className="mb-4">
            Organic pigment and metallic tokens specified in the Kalachakra Design Bible.
          </BodyText>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {colorsList.map((c) => (
              <div
                key={c.name}
                className={`p-3 rounded-xs border border-kc-brass/40 shadow-sm flex flex-col justify-between ${c.class}`}
              >
                <span className="font-heading text-xs font-bold leading-tight">{c.name}</span>
                <span className="font-mono text-[10px] opacity-80 mt-2">{c.hex}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Section 3: Decorative Components */}
        <SectionWrapper>
          <SectionHeading>3. Decorative Manuscript Component Library</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TempleBorder variant="gilded">
              <TempleLabel>Temple Border (Gilded Variant)</TempleLabel>
              <CardTitle className="my-2">Carved Wooden Tablet Motif</CardTitle>
              <BodyText>
                Features double-line borders, soft inner padding, and filigree corner ornaments.
              </BodyText>
            </TempleBorder>

            <ScrollFrame title="Unrolled Scroll Frame">
              <CardTitle className="mb-2">Palm-Leaf Scroll Container</CardTitle>
              <BodyText>
                Unrolls gracefully with top and bottom wooden dowels and inner side-crease lighting shadows.
              </BodyText>
            </ScrollFrame>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-around gap-6 p-6 bg-kc-sand/30 dark:bg-kc-dark-wood/40 border border-kc-brass/30 rounded-xs">
            <div className="flex items-center gap-3">
              <WaxSeal size="sm" label="ॐ" />
              <WaxSeal size="md" label="काल" />
              <WaxSeal size="lg" label="चक्र" />
            </div>
            <div className="flex flex-col gap-2">
              <AncientDivider symbol="diamond" className="my-0 w-48" />
              <AncientDivider symbol="wheel" className="my-0 w-48" />
              <AncientDivider symbol="om" className="my-0 w-48" />
            </div>
          </div>
        </SectionWrapper>

        {/* Section 4: Handcrafted Controls & Form Inputs */}
        <SectionWrapper>
          <SectionHeading>4. Interactive Controls & Form Inputs</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ParchmentCard>
              <TempleLabel className="mb-3 block">Temple Buttons</TempleLabel>
              <div className="flex flex-wrap gap-3">
                <TempleButton variant="primary">Primary Sand</TempleButton>
                <TempleButton variant="gilded">Gilded Royal Gold</TempleButton>
                <TempleButton variant="secondary">Secondary Ivory</TempleButton>
                <TempleButton variant="ghost">Ghost Trigger</TempleButton>
              </div>
            </ParchmentCard>

            <ParchmentCard>
              <TempleLabel className="mb-3 block">Engraved Inputs</TempleLabel>
              <div className="space-y-4">
                <EngravedInput
                  label="Observer Birth City"
                  placeholder="e.g. Ujjain, Varanasi, New Delhi..."
                  icon="📌"
                />
                <EngravedInput
                  label="Astronomical Longitude"
                  placeholder="75.7772° E"
                  icon="🌐"
                />
              </div>
            </ParchmentCard>
          </div>
        </SectionWrapper>

        {/* Section 5: Animation Engine & Audio Architecture */}
        <SectionWrapper>
          <SectionHeading>5. Motion Engine & Audio Synthesizer Test</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ParchmentCard>
              <TempleLabel>Motion Variants Preset</TempleLabel>
              <div className="my-4">
                <TempleButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setAnimationKey((prev) => prev + 1)}
                >
                  Re-trigger Animation
                </TempleButton>
              </div>

              <motion.div
                key={animationKey}
                variants={paperReveal}
                initial="hidden"
                animate="visible"
                className="p-4 bg-kc-paper border border-kc-brass/40 rounded-xs"
              >
                <CardTitle>Paper Reveal Motion</CardTitle>
                <BodyText className="text-sm">
                  Smooth 700ms scroll reveal with organic cubic-bezier easing.
                </BodyText>
              </motion.div>
            </ParchmentCard>

            <ParchmentCard>
              <TempleLabel>Web Audio Synthesizer Engine</TempleLabel>
              <BodyText className="my-2 text-sm">
                Sound Status: <strong>{isMuted ? 'Muted 🔇' : 'Active 🔔'}</strong> (No Autoplay)
              </BodyText>
              <div className="flex flex-wrap gap-2 mt-4">
                <TempleButton size="sm" variant="ghost" onClick={toggleMute}>
                  {isMuted ? 'Unmute Audio' : 'Mute Audio'}
                </TempleButton>
                <TempleButton size="sm" onClick={() => playSound('temple-bell')}>
                  🔔 Temple Bell (432Hz)
                </TempleButton>
                <TempleButton size="sm" onClick={() => playSound('paper-flip')}>
                  📜 Paper Flip
                </TempleButton>
                <TempleButton size="sm" onClick={() => playSound('ink-stroke')}>
                  🖋 Ink Tick
                </TempleButton>
              </div>
            </ParchmentCard>
          </div>
        </SectionWrapper>

        {/* Section 6: Future Navigation Framework */}
        <SectionWrapper>
          <SectionHeading>6. Module Navigation Framework</SectionHeading>
          <ParchmentCard>
            <TempleLabel>Active Module Context</TempleLabel>
            <div className="my-2 flex items-center gap-3">
              <span className="text-3xl">{activeItem.icon}</span>
              <div>
                <CardTitle>{activeItem.label} ({activeItem.sanskritLabel})</CardTitle>
                <Caption>{activeItem.description}</Caption>
              </div>
            </div>

            <AncientDivider symbol="diamond" className="my-4" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNavId(item.id)}
                  className={`p-3 rounded-xs border text-left transition-all cursor-pointer ${
                    item.id === activeItem.id
                      ? 'bg-kc-sand border-kc-gold-royal text-kc-maroon dark:bg-kc-dark-wood dark:text-kc-gold'
                      : 'bg-kc-paper/50 border-kc-brass/30 text-kc-text-secondary hover:border-kc-brass'
                  }`}
                >
                  <div className="font-heading text-xs font-bold flex items-center justify-between">
                    <span>{item.label}</span>
                    <span>{item.icon}</span>
                  </div>
                  <div className="font-devanagari text-[10px] text-kc-gold-royal mt-1">
                    {item.sanskritLabel}
                  </div>
                </button>
              ))}
            </div>
          </ParchmentCard>
        </SectionWrapper>
      </PageContainer>
    </AppShell>
  );
};
