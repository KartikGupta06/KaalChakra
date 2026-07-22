import React, { useState } from 'react';
import { ParchmentCard } from '../ui/ParchmentCard';
import { TempleLabel, CardTitle } from '../typography/Typography';
import { useSound } from '../../context/AudioContext';

interface KnowledgeItem {
  id: string;
  title: string;
  sanskrit: string;
  content: string;
}

const KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: 'lagna',
    title: 'What is Lagna (Ascendant)?',
    sanskrit: 'लग्न',
    content:
      'The Lagna is the eastern horizon zodiac sign at the exact moment and location of birth. It establishes House 1 and defines the personal physical and spiritual perspective.',
  },
  {
    id: 'rashi',
    title: 'What is a Rashi (Zodiac Sign)?',
    sanskrit: 'राशि',
    content:
      'The zodiac belt is divided into 12 equal 30-degree arcs called Rashis, starting from Mesh (Aries) through Meen (Pisces).',
  },
  {
    id: 'nakshatra',
    title: 'What is a Nakshatra (Lunar Mansion)?',
    sanskrit: 'नक्षत्र',
    content:
      'The 360-degree ecliptic is partitioned into 27 stellar asterisms of 13°20\' each. Nakshatras govern emotional mindscapes and Vimshottari Dasha periods.',
  },
  {
    id: 'bhava',
    title: 'What is a Bhava (House)?',
    sanskrit: 'भाव',
    content:
      'Houses represent 12 life domains (Tanu, Dhana, Sahaja, Matru, Putra, Ari, Yuvati, Randhra, Dharma, Karma, Labha, Vyaya).',
  },
  {
    id: 'drishti',
    title: 'What is Drishti (Planetary Aspect)?',
    sanskrit: 'दृष्टि',
    content:
      'Grahas cast energy across the chart. All planets aspect the 7th house opposite them, while Mars, Jupiter, and Saturn cast special additional Drishtis.',
  },
];

export const KnowledgeExplorer: React.FC = () => {
  const { playSound } = useSound();
  const [openId, setOpenId] = useState<string | null>('lagna');

  const toggle = (id: string) => {
    playSound('paper-flip');
    setOpenId(openId === id ? null : id);
  };

  return (
    <ParchmentCard className="w-full">
      <div className="border-b border-kc-brass/30 pb-3 mb-3">
        <TempleLabel>Vedic Astronomical Guide</TempleLabel>
        <CardTitle className="my-0.5">Knowledge Explorer (ज्ञान वेध)</CardTitle>
      </div>

      <div className="space-y-2">
        {KNOWLEDGE_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="border border-kc-brass/30 rounded-xs overflow-hidden bg-kc-sand/20 dark:bg-kc-dark-wood/30"
            >
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full p-3 text-left flex items-center justify-between font-serif text-xs font-bold text-kc-maroon dark:text-kc-gold cursor-pointer hover:bg-kc-sand/40"
              >
                <span>
                  {item.title} <span className="font-devanagari font-normal text-kc-gold-royal">({item.sanskrit})</span>
                </span>
                <span className="text-sm">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <div className="p-3 pt-0 border-t border-kc-brass/20 font-serif text-xs text-kc-text-secondary leading-relaxed">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ParchmentCard>
  );
};
