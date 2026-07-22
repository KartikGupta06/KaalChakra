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
 * Generates local fallback WisdomResponse if backend is unavailable.
 */
export function buildFallbackWisdom(birthData: any): WisdomResponse {
  const name = birthData?.fullName || birthData?.name || 'Observer';
  const now = new Date().toISOString();

  return {
    reportId: `KC-WISDOM-LOCAL-${Date.now().toString(36).toUpperCase()}`,
    fullName: name,
    overview: {
      titleSanskrit: '॥ सर्वांगीण चक्र अवलोकन ॥',
      titleEnglish: 'Overall Chart Summary',
      summary: `The natal horoscope for ${name} features Simha (Leo) as the Ascendant (Lagna), placing solar leadership, vitality, and purposive expression at the center of life's path.`,
      dominantElement: 'Agni (Fire)',
      dominantQuality: 'Sthira (Fixed)',
      keyThemes: [
        'Vitality, Courage, and Executive Purpose',
        'Intuitive Wisdom & Dharmic Alignment',
        'Gajakesari & Budhaditya Yoga Combinations',
      ],
      balancedPerspective:
        'Vedic astrology provides a blueprint of cosmic potential. Conscious action (Purushartha) and dharmic awareness guide how these tendencies manifest.',
    },
    ascendant: {
      titleSanskrit: '॥ लग्न एवं लग्नेश विचार ॥',
      titleEnglish: 'Ascendant & Rising Sign Interpretation',
      signName: 'Simha (Leo)',
      signSanskrit: 'सिंह',
      traits: ['Dignified Leadership', 'Generosity of Spirit', 'Creative Expression', 'Vital Force'],
      description:
        'Simha (Leo) Lagna establishes an innate drive for self-mastery, dignity, and authentic self-expression. It governs vitality and physical constitution.',
      lagnaLordMeaning:
        'Surya (Sun) rules Simha Lagna. Its strength in the 1st House illuminates personal authority and clarity of purpose.',
    },
    planets: [
      {
        id: 'sun',
        name: 'Sun',
        sanskrit: 'सूर्य',
        symbol: '☉',
        sign: 'Simha (सिंह)',
        house: 1,
        nakshatra: 'पूर्वाफाल्गुनी (Purva Phalguni)',
        dignity: 'Swakshetra (Moolatrikona)',
        signMeaning: 'Sun in its own sign Simha bestows strong willpower, natural dignity, and vitality.',
        houseMeaning: '1st House placement enhances personal magnetism and leadership capacity.',
        nakshatraMeaning: 'Purva Phalguni grants creative refinement and appreciation for harmony.',
        dignityMeaning: 'Operating in Swakshetra dignity, allowing unhindered solar vitality.',
        overallSummary: 'Surya represents the Soul (Atman). Positioned in Simha (House 1) in Swakshetra dignity.',
      },
      {
        id: 'moon',
        name: 'Moon',
        sanskrit: 'चन्द्र',
        symbol: '☽',
        sign: 'Vrishabha (वृषभ)',
        house: 4,
        nakshatra: 'रोहिणी (Rohini)',
        dignity: 'Exalted (उच्च)',
        signMeaning: 'Moon exalted in Vrishabha grants emotional stability, calm reflection, and contentment.',
        houseMeaning: '4th House placement brings happiness through home, mother, and land.',
        nakshatraMeaning: 'Rohini Nakshatra enhances aesthetic charm and nurturing capacity.',
        dignityMeaning: 'Exalted (Ucha) status grants supreme emotional clarity and peace of mind.',
        overallSummary: 'Chandra represents the Mind (Manas). Positioned in Vrishabha (House 4) in Exalted dignity.',
      },
      {
        id: 'jupiter',
        name: 'Jupiter',
        sanskrit: 'गुरु',
        symbol: '♃',
        sign: 'Dhanu (धनु)',
        house: 9,
        nakshatra: 'पूर्वाषाढा (Purva Ashadha)',
        dignity: 'Swakshetra (स्वक्षेत्र)',
        signMeaning: 'Jupiter in own sign Dhanu confers deep devotion to dharma, philosophy, and higher learning.',
        houseMeaning: '9th House placement expands spiritual wisdom, luck, and guidance from preceptors.',
        nakshatraMeaning: 'Purva Ashadha bestows invincible determination and pursuit of truth.',
        dignityMeaning: 'Swakshetra dignity ensures pure expression of wisdom and benefic grace.',
        overallSummary: 'Guru represents divine wisdom. Positioned in Dhanu (House 9) in Swakshetra dignity.',
      },
    ],
    houses: [
      {
        houseNumber: 1,
        name: 'Tanu Bhava (तनू भाव) • Self & Body',
        rashi: 'Simha (सिंह)',
        lord: 'Surya (Sun)',
        occupants: ['Surya ☉', 'Budha ☿'],
        significance: 'Governs physical vitality, appearance, character, and primary life direction.',
        interpretation: '1st House in Simha with Sun and Mercury creates Budhaditya Yoga, conferring sharp intellect and magnetic presence.',
      },
      {
        houseNumber: 4,
        name: 'Matru Bhava (मातृ भाव) • Home & Peace',
        rashi: 'Vrishchika (वृश्चिक)',
        lord: 'Mangala (Mars)',
        occupants: ['Chandra ☽'],
        significance: 'Governs emotional peace, mother, landed property, vehicles, and inner contentment.',
        interpretation: '4th House with Exalted Moon grants profound emotional stability and deep contentment.',
      },
      {
        houseNumber: 9,
        name: 'Dharma Bhava (धर्म भाव) • Wisdom & Fortune',
        rashi: 'Dhanu (धनु)',
        lord: 'Guru (Jupiter)',
        occupants: ['Guru ♃'],
        significance: 'Governs spiritual dharma, fortune, father, gurus, and higher philosophical knowledge.',
        interpretation: '9th House in Dhanu with Swakshetra Jupiter grants divine protection and dharmic wisdom.',
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
        whyDetected: 'Sun and Mercury conjunct in the 1st House within tight orbital orb.',
        contributingPlanets: ['Surya (Sun)', 'Budha (Mercury)'],
        interpretation: 'Grants analytical sharpness, eloquent speech, leadership, and professional success.',
        strength: 'High',
      },
    ],
    panchang: {
      tithiMeaning: 'Tithi Krishna Ashtami reflects inward spiritual strength and mental fortitude.',
      nakshatraMeaning: 'Rohini Nakshatra endows the mind with creativity, peace, and appreciation for beauty.',
      yogaMeaning: 'Harshana Yoga brings joyfulness, vitality, and pleasant dispositions.',
      karanaMeaning: 'Kaulava Karana enhances execution capacity and social harmony.',
      vaaraMeaning: 'Ravivaara (Sunday) bestows solar vitality and strong sense of purpose.',
      overallAtmosphere: 'Auspicious celestial alignment combining solar vitality with exalted lunar serenity.',
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
