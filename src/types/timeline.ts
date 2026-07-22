/**
 * Kalachakra — Cosmic Timeline Types
 * ===================================
 * Type definitions for the Cosmic Timeline (काल प्रवाह) system.
 */

export interface TimelineEvent {
  eventId: string;
  layer: 'birth' | 'dasha' | 'transit' | 'festival' | 'eclipse' | 'muhurat';
  title: string;
  sanskritTitle: string;
  category: string;
  date: string; // YYYY-MM-DD
  dateFormatted: string;
  timeStr?: string;
  icon: string;
  importance: 'Supreme' | 'High' | 'Medium' | 'Subtle';
  badgeColor: string;
  description: string;
  panchangContext?: string;
  chartConnection?: string;
  isBookmarked?: boolean;
  metadata?: Record<string, any>;
}

export interface FestivalEvent {
  id: string;
  name: string;
  sanskritName: string;
  date: string;
  paksha: string;
  tithi: string;
  significance: string;
  deity: string;
}

export interface EclipseEvent {
  id: string;
  type: string;
  typeSanskrit: string;
  date: string;
  timeWindow: string;
  sign: string;
  nakshatra: string;
  traditionalNotes: string;
}

export interface TimelineRequest {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  city: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  startDate?: string;
  endDate?: string;
  activeLayers?: string[];
}

export interface TimelineResponse {
  reportId: string;
  fullName: string;
  birthDate: string;
  birthLocation: string;
  currentDate: string;
  activeLayers: string[];
  totalEventsCount: number;
  currentDasha: {
    mahadasha: string;
    sanskritMahadasha: string;
    mahadashaRange: string;
    antardasha: string;
    sanskritAntardasha: string;
    antardashaRange: string;
  };
  events: TimelineEvent[];
  transparency: {
    ayanamsha: string;
    houseSystem: string;
    dashaSystem: string;
    generatedTimestamp: string;
    disclaimer: string;
  };
}
