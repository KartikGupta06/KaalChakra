/**
 * Kalachakra — Royal Manuscript Types
 * =====================================
 * Type definitions for the 11-page Royal Manuscript (राजकीय जन्म पत्रिका) generator.
 */

import { GrahaPlacement } from '../components/revelation/NorthIndianKundali';

export interface ManuscriptBirthRecord {
  fullName: string;
  gender?: string;
  dateOfBirth: string; // e.g. "15/08/1998" or "1998-08-15"
  timeOfBirth: string; // e.g. "06:30 AM"
  placeOfBirth: string; // e.g. "Ujjain, Madhya Pradesh, India"
  latitude: number;
  longitude: number;
  timezone: string; // e.g. "Asia/Kolkata (UTC+05:30)"
  generatedTimestamp: string;
  reportId: string; // Unique Report Identifier e.g. "KC-19980815-7729"
}

export interface ManuscriptPlanetDetail {
  id: string;
  symbol: string;
  sanskrit: string;
  name: string;
  longitude: number; // degrees e.g. 134.52
  sign: string; // e.g. "Leo (सिंह)"
  signIndex: number; // 1-12
  degrees: string; // e.g. "14° 31' 12\""
  house: number; // 1-12
  nakshatraName: string; // e.g. "Purva Phalguni"
  nakshatraSanskrit: string; // e.g. "पूर्वाफाल्गुनी"
  pada: number; // 1-4
  isRetrograde: boolean;
  dignity?: string; // e.g. "Swakshetra (स्वक्षेत्र)", "Exalted (उच्च)", "Debilitated (नीच)", "Neutral"
}

export interface ManuscriptHouseDetail {
  houseNumber: number; // 1-12
  name: string; // e.g. "Tanu Bhava (तनू भाव)"
  rashi: string; // e.g. "Leo (सिंह)"
  lord: string; // e.g. "Surya (Sun)"
  containedPlanets: string[]; // planet sanskrit/names e.g. ["सूर्य ☉", "बुध ☿"]
  purpose: string; // Classical astrological significance
}

export interface ManuscriptLagnaDetail {
  sign: string;
  signSanskrit: string;
  degree: string;
  nakshatra: string;
  pada: number;
  rashiLord: string;
  element: string; // Fire, Earth, Air, Water
  quality: string; // Chara (Movable), Sthira (Fixed), Dwiswabhava (Dual)
}

export interface ManuscriptYogaDetail {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  contributingPlanets: string[];
  strength: 'Supreme' | 'High' | 'Medium' | 'Subtle';
  isBenefic: boolean;
}

export interface ManuscriptNavamsaDetail {
  planetId: string;
  name: string;
  sanskrit: string;
  d1Sign: string;
  d9Sign: string;
  d9House: number;
  isVargottama: boolean;
}

export interface ManuscriptPanchangSnapshot {
  tithi: string; // e.g. "Krishna Paksha Ashtami (कृष्ण पक्ष अष्टमी)"
  nakshatra: string; // e.g. "Rohini (रोहिणी) - Pada 2"
  yoga: string; // e.g. "Harshana (हर्षण)"
  karana: string; // e.g. "Kaulava (कौलव)"
  paksha: string; // "Krishna Paksha (कृष्ण पक्ष)" or "Shukla Paksha (शुक्ल पक्ष)"
  vaara: string; // e.g. "Ravivaara (रविवार / Sunday)"
  sunrise: string; // e.g. "05:48 AM"
  sunset: string; // e.g. "06:52 PM"
  moonPhase: string; // e.g. "Waning Gibbous (72% Illumination)"
  samvat: string; // e.g. "Vikram Samvat 2081 (राक्षस)"
}

export interface ManuscriptGlossaryItem {
  term: string;
  sanskrit: string;
  category: string;
  definition: string;
}

export interface RoyalManuscriptData {
  birthRecord: ManuscriptBirthRecord;
  lagna: ManuscriptLagnaDetail;
  planets: ManuscriptPlanetDetail[];
  grahaPlacements: GrahaPlacement[];
  houses: ManuscriptHouseDetail[];
  yogas: ManuscriptYogaDetail[];
  navamsa: ManuscriptNavamsaDetail[];
  panchang: ManuscriptPanchangSnapshot;
  glossary: ManuscriptGlossaryItem[];
  metadata: {
    ayanamsha: string; // "Lahiri (Chitrapaksha)"
    houseSystem: string; // "Whole Sign (Rashi Bhava)"
    schemaVersion: string; // "1.0.0"
    appVersion: string; // "Kalachakra v1.0.0"
    calculationEngine: string; // "Swiss Ephemeris v2.10.03"
    verificationUrl: string;
  };
}
