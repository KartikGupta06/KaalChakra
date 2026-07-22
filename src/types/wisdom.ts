/**
 * Kalachakra — Wisdom Engine Types
 * =================================
 * Type definitions matching the Wisdom Engine API response payload.
 */

export interface TransparencyMetadata {
  ayanamsha: string;
  houseSystem: string;
  calculatedTimestamp: string;
  isAiGenerated: boolean;
  disclaimer: string;
}

export interface ChartOverviewWisdom {
  titleSanskrit: string;
  titleEnglish: string;
  summary: string;
  dominantElement: string;
  dominantQuality: string;
  keyThemes: string[];
  balancedPerspective: string;
}

export interface AscendantWisdom {
  titleSanskrit: string;
  titleEnglish: string;
  signName: string;
  signSanskrit: string;
  traits: string[];
  description: string;
  lagnaLordMeaning: string;
}

export interface PlanetWisdom {
  id: string;
  name: string;
  sanskrit: string;
  symbol: string;
  sign: string;
  house: number;
  nakshatra: string;
  dignity: string;
  signMeaning: string;
  houseMeaning: string;
  nakshatraMeaning: string;
  dignityMeaning: string;
  overallSummary: string;
}

export interface HouseWisdom {
  houseNumber: number;
  name: string;
  rashi: string;
  lord: string;
  occupants: string[];
  significance: string;
  interpretation: string;
}

export interface YogaWisdom {
  id: string;
  name: string;
  sanskritName: string;
  significance: string;
  whyDetected: string;
  contributingPlanets: string[];
  interpretation: string;
  strength: string;
}

export interface PanchangWisdom {
  tithiMeaning: string;
  nakshatraMeaning: string;
  yogaMeaning: string;
  karanaMeaning: string;
  vaaraMeaning: string;
  overallAtmosphere: string;
}

export interface WisdomResponse {
  reportId: string;
  fullName: string;
  overview: ChartOverviewWisdom;
  ascendant: AscendantWisdom;
  planets: PlanetWisdom[];
  houses: HouseWisdom[];
  yogas: YogaWisdom[];
  panchang: PanchangWisdom;
  metadata: TransparencyMetadata;
}
