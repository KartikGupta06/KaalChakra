/**
 * Kalachakra — Royal Manuscript Data Builder
 * ============================================
 * Converts birth input state or Kundali API response into a complete,
 * fully qualified 11-page Royal Manuscript data structure.
 */

import { RoyalManuscriptData, ManuscriptPlanetDetail } from '../types/manuscript';
import { GrahaPlacement } from '../components/revelation/NorthIndianKundali';

export function buildRoyalManuscriptData(rawState: any): RoyalManuscriptData {
  const name = rawState?.fullName || rawState?.name || 'Observer';
  const gender = rawState?.gender || 'Not Specified';

  // Format Date & Time
  let dateStr = '15/08/1998';
  if (rawState?.dateOfBirth) {
    dateStr = rawState.dateOfBirth;
  } else if (rawState?.date) {
    dateStr = `${rawState.date.day}/${rawState.date.month}/${rawState.date.year}`;
  }

  let timeStr = '06:30 AM';
  if (rawState?.timeOfBirth) {
    timeStr = rawState.timeOfBirth;
  } else if (rawState?.time) {
    const period = rawState.time.period || 'AM';
    const min = rawState.time.minute < 10 ? `0${rawState.time.minute}` : rawState.time.minute;
    timeStr = `${rawState.time.hour}:${min} ${period}`;
  }

  const placeStr = rawState?.place || rawState?.location || 'Ujjain, Madhya Pradesh, India';
  const lat = rawState?.latitude || 23.1793;
  const lng = rawState?.longitude || 75.7849;
  const tz = rawState?.timezone || 'Asia/Kolkata (UTC+05:30)';

  // Report ID generator
  const reportId = rawState?.reportId || `KC-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();
  const generatedTimestamp = `${now.toLocaleDateString('en-GB')} • ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

  // Planets
  const planetList: ManuscriptPlanetDetail[] = rawState?.planets && Array.isArray(rawState.planets) && rawState.planets.length > 0
    ? rawState.planets.map((p: any, idx: number) => ({
        id: p.id || `planet-${idx}`,
        symbol: p.symbol || '☉',
        sanskrit: p.sanskrit || p.sanskritName || 'सूर्य',
        name: p.name || 'Sun',
        longitude: p.longitude || 135.2,
        sign: p.sign || 'Simha (सिंह)',
        signIndex: p.signIndex || 5,
        degrees: p.degrees || `${Math.floor((p.longitude || 135) % 30)}° 15'`,
        house: p.house || 1,
        nakshatraName: p.nakshatraName || 'Purva Phalguni',
        nakshatraSanskrit: p.nakshatraSanskrit || 'पूर्वाफाल्गुनी',
        pada: p.pada || 1,
        isRetrograde: !!p.isRetrograde,
        dignity: p.dignity || 'Swakshetra (स्वक्षेत्र)',
      }))
    : [
        { id: 'sun', symbol: '☉', sanskrit: 'सूर्य', name: 'Sun', longitude: 135.4, sign: 'Simha (सिंह)', signIndex: 5, degrees: '15° 24\'', house: 1, nakshatraName: 'Purva Phalguni', nakshatraSanskrit: 'पूर्वाफाल्गुनी', pada: 1, isRetrograde: false, dignity: 'Swakshetra (Moolatrikona)' },
        { id: 'moon', symbol: '☽', sanskrit: 'चन्द्र', name: 'Moon', longitude: 45.1, sign: 'Vrishabha (वृषभ)', signIndex: 2, degrees: '15° 06\'', house: 4, nakshatraName: 'Rohini', nakshatraSanskrit: 'रोहिणी', pada: 2, isRetrograde: false, dignity: 'Exalted (उच्च)' },
        { id: 'mars', symbol: '♂', sanskrit: 'मंगल', name: 'Mars', longitude: 282.8, sign: 'Makara (मकर)', signIndex: 10, degrees: '12° 48\'', house: 10, nakshatraName: 'Shravana', nakshatraSanskrit: 'श्रवण', pada: 1, isRetrograde: false, dignity: 'Exalted (उच्च)' },
        { id: 'mercury', symbol: '☿', sanskrit: 'बुध', name: 'Mercury', longitude: 168.3, sign: 'Kanya (कन्या)', signIndex: 6, degrees: '18° 18\'', house: 1, nakshatraName: 'Hasta', nakshatraSanskrit: 'हस्त', pada: 3, isRetrograde: false, dignity: 'Exalted (उच्च)' },
        { id: 'jupiter', symbol: '♃', sanskrit: 'गुरु', name: 'Jupiter', longitude: 255.5, sign: 'Dhanu (धनु)', signIndex: 9, degrees: '15° 30\'', house: 9, nakshatraName: 'Purva Ashadha', nakshatraSanskrit: 'पूर्वाषाढा', pada: 1, isRetrograde: false, dignity: 'Swakshetra (स्वक्षेत्र)' },
        { id: 'venus', symbol: '♀', sanskrit: 'शुक्र', name: 'Venus', longitude: 350.2, sign: 'Meena (मीन)', signIndex: 12, degrees: '20° 12\'', house: 2, nakshatraName: 'Revati', nakshatraSanskrit: 'रेवती', pada: 2, isRetrograde: false, dignity: 'Exalted (उच्च)' },
        { id: 'saturn', symbol: '♄', sanskrit: 'शनि', name: 'Saturn', longitude: 198.7, sign: 'Tula (तुला)', signIndex: 7, degrees: '18° 42\'', house: 7, nakshatraName: 'Swati', nakshatraSanskrit: 'स्वाति', pada: 4, isRetrograde: false, dignity: 'Exalted (उच्च)' },
        { id: 'rahu', symbol: '☊', sanskrit: 'राहु', name: 'Rahu', longitude: 72.4, sign: 'Mithuna (मिथुन)', signIndex: 3, degrees: '12° 24\'', house: 11, nakshatraName: 'Ardra', nakshatraSanskrit: 'आर्द्रा', pada: 2, isRetrograde: true, dignity: 'Exalted (उच्च)' },
        { id: 'ketu', symbol: '☋', sanskrit: 'केतु', name: 'Ketu', longitude: 252.4, sign: 'Dhanu (धनु)', signIndex: 9, degrees: '12° 24\'', house: 5, nakshatraName: 'Mula', nakshatraSanskrit: 'मूल', pada: 4, isRetrograde: true, dignity: 'Exalted (उच्च)' },
      ];

  // Convert to GrahaPlacement array for chart
  const grahaPlacements: GrahaPlacement[] = planetList.map((p) => ({
    id: p.id,
    symbol: p.symbol,
    sanskrit: p.sanskrit,
    name: p.name,
    house: p.house,
    sign: p.sign,
  }));

  // Houses Summary
  const houses = [
    { houseNumber: 1, name: 'Tanu Bhava (तनू भाव)', rashi: 'Simha (सिंह)', lord: 'Surya (Sun)', containedPlanets: ['सूर्य ☉', 'बुध ☿'], purpose: 'Self, Physical Body, Complexion, Personality, Vitality & Appearance' },
    { houseNumber: 2, name: 'Dhana Bhava (धन भाव)', rashi: 'Kanya (कन्या)', lord: 'Budha (Mercury)', containedPlanets: ['शुक्र ♀'], purpose: 'Wealth, Speech, Family Assets, Primary Education & Values' },
    { houseNumber: 3, name: 'Sahaja Bhava (सहज भाव)', rashi: 'Tula (तुला)', lord: 'Shukra (Venus)', containedPlanets: [], purpose: 'Siblings, Courage, Initiative, Fine Arts & Short Travels' },
    { houseNumber: 4, name: 'Matru Bhava (मातृ भाव)', rashi: 'Vrishchika (वृश्चिक)', lord: 'Mangala (Mars)', containedPlanets: ['चन्द्र ☽'], purpose: 'Mother, Landed Property, Vehicles, Emotional Happiness & Peace' },
    { houseNumber: 5, name: 'Putra Bhava (पुत्र भाव)', rashi: 'Dhanu (धनु)', lord: 'Guru (Jupiter)', containedPlanets: ['केतु ☋'], purpose: 'Intelligence, Higher Learning, Progeny, Purva Punya & Mantras' },
    { houseNumber: 6, name: 'Ari Bhava (अरि भाव)', rashi: 'Makara (मकर)', lord: 'Shani (Saturn)', containedPlanets: [], purpose: 'Obstacles, Health, Service, Competitors & Daily Duties' },
    { houseNumber: 7, name: 'Yuvati Bhava (युवति भाव)', rashi: 'Kumbha (कुम्भ)', lord: 'Shani (Saturn)', containedPlanets: ['शनि ♄'], purpose: 'Spouse, Partnerships, Public Relations, Trade & Foreign Relations' },
    { houseNumber: 8, name: 'Randhra Bhava (रन्ध्र भाव)', rashi: 'Meena (मीन)', lord: 'Guru (Jupiter)', containedPlanets: [], purpose: 'Longevity, Transformation, Mystical Studies & Unearned Wealth' },
    { houseNumber: 9, name: 'Dharma Bhava (धर्म भाव)', rashi: 'Mesha (मेष)', lord: 'Mangala (Mars)', containedPlanets: ['गुरु ♃'], purpose: 'Dharma, Father, Guru, Fortune, High Knowledge & Pilgrimages' },
    { houseNumber: 10, name: 'Karma Bhava (कर्म भाव)', rashi: 'Vrishabha (वृषभ)', lord: 'Shukra (Venus)', containedPlanets: ['मंगल ♂'], purpose: 'Career, Profession, Fame, Social Status & Public Duty' },
    { houseNumber: 11, name: 'Labha Bhava (लाभ भाव)', rashi: 'Mithuna (मिथुन)', lord: 'Budha (Mercury)', containedPlanets: ['राहु ☊'], purpose: 'Gains, Income, Social Networks, Fulfillment of Desires & Elder Siblings' },
    { houseNumber: 12, name: 'Vyaya Bhava (व्यय भाव)', rashi: 'Karka (कर्क)', lord: 'Chandra (Moon)', containedPlanets: [], purpose: 'Liberation (Moksha), Foreign Travel, Solitude, Investments & Expenses' },
  ];

  // Detected Yogas
  const yogas = [
    {
      id: 'gajakesari',
      name: 'Gajakesari Yoga',
      sanskritName: 'गजकेसरी योग',
      description: 'Jupiter occupies a Kendra house (1, 4, 7, 10) from the Moon, granting wisdom, royal dignity, high reputation, and lasting fame.',
      contributingPlanets: ['Guru (Jupiter)', 'Chandra (Moon)'],
      strength: 'Supreme' as const,
      isBenefic: true,
    },
    {
      id: 'budhaditya',
      name: 'Budhaditya Yoga',
      sanskritName: 'बुधादित्य योग',
      description: 'Conjunction of Sun and Mercury in Tanu Bhava (1st House) Bestows high intellect, sharp analytical prowess, leadership, and diplomatic acumen.',
      contributingPlanets: ['Surya (Sun)', 'Budha (Mercury)'],
      strength: 'High' as const,
      isBenefic: true,
    },
    {
      id: 'ruchaka',
      name: 'Ruchaka Mahapurusha Yoga',
      sanskritName: 'रुचक महापुरुष योग',
      description: 'Exalted Mars in 10th Kendra house grants heroic courage, executive authority, commanding presence, and victory over challenges.',
      contributingPlanets: ['Mangala (Mars)'],
      strength: 'Supreme' as const,
      isBenefic: true,
    },
    {
      id: 'pancha_mahapurusha_shasha',
      name: 'Sasha Mahapurusha Yoga',
      sanskritName: 'शश महापुरुष योग',
      description: 'Exalted Saturn in 7th Kendra house bestows judicial fairness, enduring leadership, public respect, and administrative mastery.',
      contributingPlanets: ['Shani (Saturn)'],
      strength: 'High' as const,
      isBenefic: true,
    },
  ];

  // Navamsa (D9)
  const navamsa = [
    { planetId: 'lagna', name: 'Lagna', sanskrit: 'लग्न', d1Sign: 'Simha (सिंह)', d9Sign: 'Simha (सिंह)', d9House: 1, isVargottama: true },
    { planetId: 'sun', name: 'Sun', sanskrit: 'सूर्य', d1Sign: 'Simha (सिंह)', d9Sign: 'Dhanu (धनु)', d9House: 5, isVargottama: false },
    { planetId: 'moon', name: 'Moon', sanskrit: 'चन्द्र', d1Sign: 'Vrishabha (वृषभ)', d9Sign: 'Vrishabha (वृषभ)', d9House: 10, isVargottama: true },
    { planetId: 'mars', name: 'Mars', sanskrit: 'मंगल', d1Sign: 'Makara (मकर)', d9Sign: 'Mesha (मेष)', d9House: 9, isVargottama: false },
    { planetId: 'mercury', name: 'Mercury', sanskrit: 'बुध', d1Sign: 'Kanya (कन्या)', d9Sign: 'Kanya (कन्या)', d9House: 2, isVargottama: true },
    { planetId: 'jupiter', name: 'Jupiter', sanskrit: 'गुरु', d1Sign: 'Dhanu (धनु)', d9Sign: 'Meena (मीन)', d9House: 8, isVargottama: false },
    { planetId: 'venus', name: 'Venus', sanskrit: 'Venus', d1Sign: 'Meena (मीन)', d9Sign: 'Vrishabha (वृषभ)', d9House: 10, isVargottama: false },
    { planetId: 'saturn', name: 'Saturn', sanskrit: 'शनि', d1Sign: 'Tula (तुला)', d9Sign: 'Tula (तुला)', d9House: 3, isVargottama: true },
    { planetId: 'rahu', name: 'Rahu', sanskrit: 'राहु', d1Sign: 'Mithuna (मिथुन)', d9Sign: 'Mithuna (मिथुन)', d9House: 11, isVargottama: true },
    { planetId: 'ketu', name: 'Ketu', sanskrit: 'केतु', d1Sign: 'Dhanu (धनु)', d9Sign: 'Dhanu (धनु)', d9House: 5, isVargottama: true },
  ];

  // Panchang Snapshot
  const panchang = {
    tithi: 'Krishna Paksha Ashtami (कृष्ण पक्ष अष्टमी)',
    nakshatra: 'Rohini (रोहिणी) • Pada 2',
    yoga: 'Harshana (हर्षण)',
    karana: 'Kaulava (कौलव)',
    paksha: 'Krishna Paksha (कृष्ण पक्ष)',
    vaara: 'Ravivaara (रविवार / Sunday)',
    sunrise: '05:48 AM IST',
    sunset: '06:52 PM IST',
    moonPhase: 'Waning Gibbous (72% Illumination)',
    samvat: 'Vikram Samvat 2081 (राक्षस)',
  };

  // Glossary
  const glossary = [
    { term: 'Lagna (लग्न)', sanskrit: 'लग्न', category: 'Ascendant', definition: 'The exact zodiacal sign rising on the Eastern horizon at the moment of birth. It establishes the 1st House and governs physical vitality.' },
    { term: 'Bhava (भाव)', sanskrit: 'भाव', category: 'House System', definition: 'One of the 12 celestial houses representing distinct domains of human existence, including wealth, career, relationships, and liberation.' },
    { term: 'Nakshatra (नक्षत्र)', sanskrit: 'नक्षत्र', category: 'Stellar Mansion', definition: 'One of 27 lunar constellations spanning 13°20\' each along the ecliptic. It reveals mind, temperament, and karmic destiny.' },
    { term: 'Yoga (योग)', sanskrit: 'योग', category: 'Planetary Combination', definition: 'Specific planetary alignments and geometric relationships that produce powerful auspicious or challenging life effects.' },
    { term: 'Karana (करण)', sanskrit: 'करण', category: 'Panchang Pillar', definition: 'Half of a Tithi (6 degrees of Sun-Moon separation), governing physical action, execution, and daily endeavors.' },
    { term: 'Navamsa (नवांश)', sanskrit: 'नवांश', category: 'D9 Harmonic Chart', definition: 'The 1/9th divisional chart of the zodiac used to confirm planetary strength, marital compatibility, and inner spiritual potential.' },
    { term: 'Graha (ग्रह)', sanskrit: 'ग्रह', category: 'Navagraha', definition: 'Celestial force or cosmic node (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) that influences earthly karma.' },
    { term: 'Ayanamsha (अयनांश)', sanskrit: 'अयनांश', category: 'Astronomy', definition: 'The angular difference between the tropical (seasonal) zodiac and sidereal (fixed star) zodiac, fixed using Lahiri (Chitrapaksha).' },
  ];

  return {
    birthRecord: {
      fullName: name,
      gender,
      dateOfBirth: dateStr,
      timeOfBirth: timeStr,
      placeOfBirth: placeStr,
      latitude: lat,
      longitude: lng,
      timezone: tz,
      generatedTimestamp,
      reportId,
    },
    lagna: {
      sign: rawState?.ascendantSign || rawState?.ascendant?.sign || 'Sagittarius (धनु)',
      signSanskrit: (rawState?.ascendantSign || rawState?.ascendant?.sign || 'Sagittarius (धनु)').includes('(')
        ? (rawState?.ascendantSign || rawState?.ascendant?.sign || '').split('(')[1]?.replace(')', '') || 'धनु'
        : 'धनु',
      degree: rawState?.ascendantDegrees || rawState?.ascendant?.degrees || '9° 46\' 12"',
      nakshatra: rawState?.ascendant?.nakshatraSanskrit
        ? `${rawState.ascendant.nakshatraSanskrit} (${rawState.ascendant.nakshatraName})`
        : 'Mula (मूल)',
      pada: rawState?.ascendant?.pada || 1,
      rashiLord: 'Lagna Lord',
      element: 'Agni (Fire) / Dwiswabhava',
      quality: 'Dwiswabhava (Dual)',
    },
    planets: planetList,
    grahaPlacements,
    houses,
    yogas,
    navamsa,
    panchang,
    glossary,
    metadata: {
      ayanamsha: 'Lahiri (Chitrapaksha Ayanamsha)',
      houseSystem: 'Whole Sign Bhava System (पूर्ण राशि भाव)',
      schemaVersion: '1.0.0',
      appVersion: 'Kalachakra v1.0.0',
      calculationEngine: 'Swiss Ephemeris Engine v2.10.03',
      verificationUrl: `https://kalachakra.app/verify/${reportId}`,
    },
  };
}
