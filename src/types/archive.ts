import { KundaliResponse } from './kundali';
import { WisdomResponse } from './wisdom';
import { RoyalManuscriptData } from './manuscript';
import { MuhuratResponse } from './muhurat';
import { TimelineResponse } from './timeline';

export type ArchiveCategory =
  | 'personal'
  | 'family'
  | 'muhurat'
  | 'manuscript'
  | 'timeline'
  | 'bookmark'
  | 'collection';

export type FamilyGroup =
  | 'self'
  | 'parents'
  | 'children'
  | 'relatives'
  | 'clients'
  | 'custom';

export interface ArchiveMetadata {
  createdAt: string;
  lastViewedAt: string;
  updatedAt: string;
  schemaVersion: string;
  calculationEngineVersion: string;
  appVersion: string;
  ayanamsha: string;
  houseSystem: string;
}

export interface BirthInputData {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  city: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  gender?: string;
  notes?: string;
}

export interface ArchiveItem {
  id: string;
  title: string;
  category: ArchiveCategory;
  familyGroup: FamilyGroup;
  tags: string[];
  isFavorite: boolean;
  notes?: string;
  birthData: BirthInputData;
  kundaliData?: KundaliResponse;
  wisdomData?: WisdomResponse;
  manuscriptData?: RoyalManuscriptData;
  muhuratData?: MuhuratResponse;
  timelineData?: TimelineResponse;
  metadata: ArchiveMetadata;
}

export interface ArchiveExportData {
  version: string;
  exportedAt: string;
  app: string;
  itemsCount: number;
  items: ArchiveItem[];
  settings?: Record<string, any>;
  checksum?: string;
}

export interface FilterOptions {
  searchQuery: string;
  category: ArchiveCategory | 'all';
  familyGroup: FamilyGroup | 'all';
  rashiFilter: string | 'all';
  nakshatraFilter: string | 'all';
  favoritesOnly: boolean;
  sortBy: 'recent' | 'name' | 'dateOfBirth' | 'lastViewed';
  sortOrder: 'asc' | 'desc';
}

export interface ComparisonMatrixItem {
  id: string;
  title: string;
  familyGroup: FamilyGroup;
  birthData: BirthInputData;
  kundaliData?: KundaliResponse;
}

export interface ChartComparisonResult {
  items: ComparisonMatrixItem[];
  planetMatrix: {
    planet: string;
    placements: Record<string, {
      rashi?: string;
      degree?: string;
      nakshatra?: string;
      house?: number;
      dignity?: string;
    }>;
  }[];
  lagnas: {
    itemId: string;
    title: string;
    rashi: string;
    lord: string;
    nakshatra: string;
    degree: string;
  }[];
  yogas: {
    itemId: string;
    title: string;
    yogaNames: string[];
  }[];
  panchang: {
    itemId: string;
    title: string;
    date?: string;
    time?: string;
    city?: string;
  }[];
}
