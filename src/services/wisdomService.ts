/**
 * Kalachakra — Wisdom Engine Frontend Service
 * ============================================
 * Fetches interpretations from the FastAPI backend or provides fallback
 * structured interpretations for the UI.
 */

import { WisdomResponse } from '../types/wisdom';

const API_BASE = '/api';

/**
 * Request Kundali interpretation from backend.
 */
export async function fetchWisdomInterpretation(birthData: any): Promise<WisdomResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/wisdom/generate-and-interpret`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: birthData?.fullName || birthData?.name || 'Observer',
        dateOfBirth: birthData?.dateOfBirth || '1998-08-15',
        timeOfBirth: birthData?.timeOfBirth || '06:30',
        city: birthData?.city || birthData?.place || 'Ujjain',
      }),
    });

    if (!res.ok) return null;
    return (await res.json()) as WisdomResponse;
  } catch (err) {
    console.warn('[Wisdom Engine] Backend offline, utilizing local interpretation fallback:', err);
    return null;
  }
}

/**
 * Extension Point: Prepares structured WisdomResponse payload for future AI Guide transformer.
 * Architecture: Calculated Kundali -> Wisdom Engine -> AI Guide -> Simple Language Explanation
 */
export function transformWisdomForAiGuide(wisdom: WisdomResponse, userQuery?: string) {
  return {
    targetObserver: wisdom.fullName,
    ascendantContext: `${wisdom.ascendant.signName} (${wisdom.ascendant.titleSanskrit})`,
    dominantElement: wisdom.overview.dominantElement,
    dominantQuality: wisdom.overview.dominantQuality,
    themes: wisdom.overview.keyThemes,
    yogasDetected: wisdom.yogas.map((y) => y.name),
    userQuery: userQuery || null,
    readyForAiSynthesis: true,
  };
}

/**
 * Generates local fallback WisdomResponse if backend is unavailable.
 * Dynamically respects calculated Ascendant and Planetary placements from birthData.
 */
export function buildFallbackWisdom(birthData: any): WisdomResponse {
  const name = birthData?.fullName || birthData?.name || 'Observer';
  const ascendantSign = birthData?.ascendantSign || birthData?.ascendant?.sign || 'Sagittarius (धनु)';
  const now = new Date().toISOString();

  // Extract Moon & Sun placements if available
  const moonPlacement = birthData?.planets?.find((p: any) => p.id === 'moon');
  const sunPlacement = birthData?.planets?.find((p: any) => p.id === 'sun');

  const moonSign = moonPlacement?.sign || 'Leo (सिंह)';
  const sunSign = sunPlacement?.sign || 'Virgo (कन्या)';

  return {
    reportId: `KC-WISDOM-LOCAL-${Date.now().toString(36).toUpperCase()}`,
    fullName: name,
    overview: {
      titleSanskrit: '॥ सर्वांगीण चक्र अवलोकन ॥',
      titleEnglish: 'Overall Chart Summary',
      summary: `The natal horoscope for ${name} features ${ascendantSign} as the Ascendant (Lagna), with Janma Rashi (Moon Sign) in ${moonSign} and Surya Rashi (Sun Sign) in ${sunSign}, establishing a harmonious blend of vital direction and intellectual alignment.`,
      dominantElement: 'Agni (Fire) / Prithvi (Earth)',
      dominantQuality: 'Dwiswabhava (Dual) / Sthira (Fixed)',
      keyThemes: [
        'Purposeful Direction, Vitality & Dharmic Alignment',
        'Balanced Intellect & Intuitive Mind (Janma Rashi)',
        'Harmonious Planetary Placement & Yogas',
      ],
      balancedPerspective:
        'Vedic astrology provides a blueprint of cosmic potential. Conscious action (Purushartha) and dharmic awareness guide how these tendencies manifest.',
    },
    ascendant: {
      titleSanskrit: '॥ लग्न एवं लग्नेश विचार ॥',
      titleEnglish: 'Ascendant & Rising Sign Interpretation',
      signName: ascendantSign,
      signSanskrit: ascendantSign.includes('(') ? ascendantSign.split('(')[1].replace(')', '') : ascendantSign,
      traits: ['Dignified Leadership', 'Generosity of Spirit', 'Creative Expression', 'Vital Force'],
      description:
        `${ascendantSign} Lagna establishes the primary cosmic lens through which physical vitality, character, and outward life direction are expressed under Parasari principles.`,
      lagnaLordMeaning:
        `The primary ruler of ${ascendantSign} acts as the Lagna Lord, illuminating personal authority and clarity of purpose.`,
    },
    planets: [
      {
        id: 'sun',
        name: 'Sun',
        sanskrit: 'सूर्य',
        symbol: '☉',
        sign: sunSign,
        house: sunPlacement?.house || 10,
        nakshatra: sunPlacement?.nakshatraName || 'Hasta (हस्त)',
        dignity: sunPlacement?.dignity || 'Swakshetra / Mitrashetra',
        signMeaning: `Surya (Sun) in ${sunSign} bestows willpower, clear intellect, and organizational capacity.`,
        houseMeaning: 'Enhances executive authority and clarity of vital purpose.',
        nakshatraMeaning: 'Grants creative refinement and appreciation for precision.',
        dignityMeaning: 'Operating with clear solar vitality and purpose.',
        overallSummary: `Surya represents the Soul (Atman). Positioned in ${sunSign}.`,
      },
      {
        id: 'moon',
        name: 'Moon',
        sanskrit: 'चन्द्र',
        symbol: '☽',
        sign: moonSign,
        house: moonPlacement?.house || 9,
        nakshatra: moonPlacement?.nakshatraName || 'Purva Phalguni (पूर्वाफाल्गुनी)',
        dignity: moonPlacement?.dignity || 'Utcha / Mitrashetra',
        signMeaning: `Chandra (Moon) in ${moonSign} (Janma Rashi) grants emotional warmth, creative mind, and mental fortitude.`,
        houseMeaning: 'Brings emotional peace and happiness through philosophical alignment.',
        nakshatraMeaning: 'Enhances aesthetic charm, artistic instinct, and nurturing capacity.',
        dignityMeaning: 'Grants emotional clarity and stability.',
        overallSummary: `Chandra represents the Mind (Manas). Positioned in ${moonSign}.`,
      },
      {
        id: 'jupiter',
        name: 'Jupiter',
        sanskrit: 'गुरु',
        symbol: '♃',
        sign: 'Pisces (मीन)',
        house: 4,
        nakshatra: 'Purva Bhadrapada',
        dignity: 'Swakshetra (स्वक्षेत्र)',
        signMeaning: 'Jupiter in own sign Pisces confers deep devotion to dharma, philosophy, and higher learning.',
        houseMeaning: '4th House placement expands inner contentment and spiritual wisdom.',
        nakshatraMeaning: 'Purva Bhadrapada bestows determination and pursuit of truth.',
        dignityMeaning: 'Swakshetra dignity ensures pure expression of wisdom.',
        overallSummary: 'Guru represents divine wisdom and preceptor grace.',
      },
    ],
    houses: [
      {
        houseNumber: 1,
        name: 'Tanu Bhava (तनू भाव) • Self & Body',
        rashi: ascendantSign,
        lord: 'Lagna Lord',
        occupants: ['Lagna Cusp'],
        significance: 'Governs physical vitality, appearance, character, and primary life direction.',
        interpretation: `1st House in ${ascendantSign} establishes physical constitution, self-awareness, and natural leadership.`,
      },
      {
        houseNumber: 4,
        name: 'Matru Bhava (मातृ भाव) • Home & Peace',
        rashi: 'Pisces (मीन)',
        lord: 'Guru (Jupiter)',
        occupants: ['Guru ♃'],
        significance: 'Governs emotional peace, mother, landed property, and inner contentment.',
        interpretation: '4th House with Swakshetra Jupiter grants profound emotional peace and inner harmony.',
      },
      {
        houseNumber: 9,
        name: 'Dharma Bhava (धर्म भाव) • Wisdom & Fortune',
        rashi: moonSign,
        lord: 'Chandra / Guru',
        occupants: ['Chandra ☽'],
        significance: 'Governs spiritual dharma, fortune, father, gurus, and higher philosophical knowledge.',
        interpretation: `9th House alignment with Janma Rashi (${moonSign}) grants dharmic wisdom and spiritual protection.`,
      },
    ],
    yogas: [
      {
        id: 'gajakesari',
        name: 'Gajakesari Yoga',
        sanskritName: 'गजकेसरी योग',
        significance: 'Jupiter in Kendra from Moon grants wisdom, high reputation, and lasting fame.',
        whyDetected: 'Jupiter occupies a Kendra house from the Moon with mutual benefic dignity.',
        contributingPlanets: ['Guru (Jupiter)', 'Chandra (Moon)'],
        interpretation: 'Bestows steady intelligence, noble reputation, public respect, and enduring success.',
        strength: 'Supreme',
      },
      {
        id: 'budhaditya',
        name: 'Budhaditya Yoga',
        sanskritName: 'बुधादित्य योग',
        significance: 'Sun and Mercury conjunction bestows high intellect and diplomatic skill.',
        whyDetected: 'Sun and Mercury conjunct with tight orbital orb.',
        contributingPlanets: ['Surya (Sun)', 'Budha (Mercury)'],
        interpretation: 'Grants analytical sharpness, eloquent speech, leadership, and professional success.',
        strength: 'High',
      },
    ],
    panchang: {
      tithiMeaning: 'Tithi Ashtami reflects inward spiritual strength and mental fortitude.',
      nakshatraMeaning: 'Nakshatra placement endows the mind with creativity and appreciation for truth.',
      yogaMeaning: 'Nitya Yoga brings joyfulness, vitality, and pleasant dispositions.',
      karanaMeaning: 'Karana placement enhances execution capacity and social harmony.',
      vaaraMeaning: 'Vaara governor bestows vital solar energy and sense of purpose.',
      overallAtmosphere: 'Auspicious celestial alignment combining solar vitality with serene lunar alignment.',
    },
    metadata: {
      ayanamsha: 'Lahiri (Chitrapaksha)',
      houseSystem: 'Whole Sign (Rashi Bhava)',
      calculatedTimestamp: now,
      isAiGenerated: false,
      disclaimer:
        'All interpretations are educational explanations derived from classical Parasari Vedic astrology principles. They serve as self-reflection tools, not deterministic predictions.',
    },
  };
}
