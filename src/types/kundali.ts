export interface AscendantDetail {
  rashi: string;
  lord: string;
  nakshatra: string;
  formattedDegree: string;
  degree?: number;
  pada?: number;
}

export interface PlanetPositionDetail {
  name: string;
  sanskrit?: string;
  symbol?: string;
  rashi: string;
  degree: number;
  formattedDegree: string;
  nakshatra: string;
  house: number;
  dignity?: string;
  isRetrograde?: boolean;
}

export interface HousePlacementDetail {
  houseNumber: number;
  rashi: string;
  lord: string;
  containedPlanets: string[];
}

export interface YogaDetail {
  name: string;
  type?: string;
  description?: string;
  participatingPlanets?: string[];
}

export interface KundaliResponse {
  ascendant: AscendantDetail;
  planets: PlanetPositionDetail[];
  houses?: HousePlacementDetail[];
  yogas?: YogaDetail[];
  navamsa?: Record<string, any>;
}
