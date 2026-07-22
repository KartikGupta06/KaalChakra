export interface PanchangPillar {
  name: string;
  sanskrit: string;
  meaning: string;
  value: string;
  sanskritValue: string;
  deity?: string;
  endTime?: string;
  progressPercent: number; // 0 to 100
  note: string;
}

export interface SolarLunarCycle {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  solarNoon: string;
  sunSign: string;
  moonSign: string;
  moonPhaseName: string;
  moonPhaseSanskrit: string;
  illuminationPercent: number;
  lunarAgeDays: number;
  paksha: 'Shukla Paksha (शुक्ल पक्ष)' | 'Krishna Paksha (कृष्ण पक्ष)';
  lunarMonth: string;
  samvatYear: string;
  samvatName: string;
  ritu: string; // Season (e.g., Grishma / वर्षा)
  ayana: string; // Uttarayana / Dakshinayana
}

export interface PanchangData {
  date: string;
  sanskritDate: string;
  location: string;
  vaara: PanchangPillar; // Day
  tithi: PanchangPillar; // Tithi
  nakshatra: PanchangPillar; // Nakshatra
  yoga: PanchangPillar; // Yoga
  karana: PanchangPillar; // Karana
  cycles: SolarLunarCycle;
  dayCharacter: {
    title: string;
    sanskritTitle: string;
    description: string;
    auspiciousNote: string;
    color: string;
    element: string;
  };
}
