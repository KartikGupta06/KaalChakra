/**
 * Kalachakra — Muhurat Engine Types
 * ==================================
 * Type definitions for the Muhurat recommendation system.
 */

export interface EventRuleInfo {
  id: string;
  name: string;
  sanskritName: string;
  icon: string;
  description: string;
  favorableTithis: string[];
  favorableNakshatras: string[];
  favorableVaaras: string[];
}

export interface SuitabilityScore {
  score: number;
  level: 'Excellent' | 'Good' | 'Acceptable' | 'Avoid';
  levelSanskrit: string;
  badgeColor: string;
  positiveFactors: string[];
  negativeFactors: string[];
}

export interface MuhuratCandidate {
  candidateId: string;
  date: string; // YYYY-MM-DD
  dateFormatted: string;
  sanskritDate: string;
  startTime: string;
  endTime: string;
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  vaara: string;
  paksha: string;
  suitability: SuitabilityScore;
  isBookmarked?: boolean;
}

export interface MuhuratResponse {
  reportId: string;
  eventType: string;
  eventName: string;
  eventSanskrit: string;
  location: string;
  startDate: string;
  endDate: string;
  evaluatedDaysCount: number;
  excellentCount: number;
  goodCount: number;
  acceptableCount: number;
  avoidCount: number;
  candidates: MuhuratCandidate[];
  transparency: {
    ayanamsha: string;
    houseSystem: string;
    evaluatedTimestamp: string;
    ruleSetVersion: string;
    disclaimer: string;
  };
}
