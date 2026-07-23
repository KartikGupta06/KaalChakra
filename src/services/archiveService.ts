import {
  ArchiveItem,
  ArchiveExportData,
  FilterOptions,
  ChartComparisonResult,
} from '../types/archive';

const STORAGE_KEY = 'kalachakra_eternal_archive_v1';
const SETTINGS_KEY = 'kalachakra_user_settings_v1';

// Initial curated sample manuscripts for an instant rich temple library experience
const INITIAL_SAMPLE_MANUSCRIPTS: ArchiveItem[] = [
  {
    id: 'kc_arch_samp_1',
    title: 'Astronomer Royal of Ujjain',
    category: 'manuscript',
    familyGroup: 'self',
    tags: ['Observatory', 'Surya Siddhanta', 'Royal'],
    isFavorite: true,
    notes: 'Preserved astronomical records from the ancient Ujjain Meridian Observatory.',
    birthData: {
      fullName: 'Astronomer Royal of Ujjain',
      dateOfBirth: '1998-08-15',
      timeOfBirth: '06:30',
      city: 'Ujjain',
      latitude: 23.1765,
      longitude: 75.7885,
      timezone: 'Asia/Kolkata',
    },
    metadata: {
      createdAt: '2026-07-23T06:00:00Z',
      lastViewedAt: '2026-07-23T06:00:00Z',
      updatedAt: '2026-07-23T06:00:00Z',
      schemaVersion: '1.0.0',
      calculationEngineVersion: '1.0.0',
      appVersion: '1.0.0',
      ayanamsha: 'Lahiri',
      houseSystem: 'Whole Sign',
    },
  },
  {
    id: 'kc_arch_samp_2',
    title: 'Aryabhata Celestial Chart',
    category: 'personal',
    familyGroup: 'parents',
    tags: ['Kusumapura', 'Siddhanta', 'Mathematician'],
    isFavorite: true,
    notes: 'Historical chart calculation inspired by the Aryabhatiya astronomical treatise.',
    birthData: {
      fullName: 'Aryabhata Celestial Chart',
      dateOfBirth: '1985-04-21',
      timeOfBirth: '12:00',
      city: 'Patna',
      latitude: 25.5941,
      longitude: 85.1376,
      timezone: 'Asia/Kolkata',
    },
    metadata: {
      createdAt: '2026-07-22T14:30:00Z',
      lastViewedAt: '2026-07-23T05:00:00Z',
      updatedAt: '2026-07-22T14:30:00Z',
      schemaVersion: '1.0.0',
      calculationEngineVersion: '1.0.0',
      appVersion: '1.0.0',
      ayanamsha: 'Lahiri',
      houseSystem: 'Whole Sign',
    },
  },
  {
    id: 'kc_arch_samp_3',
    title: 'Vashishta Shubha Muhurat',
    category: 'muhurat',
    familyGroup: 'custom',
    tags: ['Abhijit', 'Foundation', 'Sacred'],
    isFavorite: false,
    notes: 'Auspicious foundation timing for sacred temple consecration.',
    birthData: {
      fullName: 'Vashishta Shubha Muhurat',
      dateOfBirth: '2026-11-01',
      timeOfBirth: '11:45',
      city: 'Varanasi',
      latitude: 25.3176,
      longitude: 82.9739,
      timezone: 'Asia/Kolkata',
    },
    metadata: {
      createdAt: '2026-07-21T09:15:00Z',
      lastViewedAt: '2026-07-21T09:15:00Z',
      updatedAt: '2026-07-21T09:15:00Z',
      schemaVersion: '1.0.0',
      calculationEngineVersion: '1.0.0',
      appVersion: '1.0.0',
      ayanamsha: 'Lahiri',
      houseSystem: 'Whole Sign',
    },
  },
];

export class ArchiveService {
  /**
   * Fetch all items stored in Eternal Archive
   */
  static getArchiveItems(): ArchiveItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Initialize with sample curated manuscripts on first load
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_MANUSCRIPTS));
        return INITIAL_SAMPLE_MANUSCRIPTS;
      }
      return JSON.parse(data) as ArchiveItem[];
    } catch (err) {
      console.error('Failed to read Eternal Archive from storage:', err);
      return INITIAL_SAMPLE_MANUSCRIPTS;
    }
  }

  /**
   * Save or update an archive item
   */
  static saveArchiveItem(item: Partial<ArchiveItem> & { title: string; birthData: any }): ArchiveItem {
    const items = this.getArchiveItems();
    const now = new Date().toISOString();

    const existingIdx = item.id ? items.findIndex((i) => i.id === item.id) : -1;

    let savedItem: ArchiveItem;

    if (existingIdx >= 0) {
      savedItem = {
        ...items[existingIdx],
        ...item,
        metadata: {
          ...items[existingIdx].metadata,
          updatedAt: now,
          lastViewedAt: now,
        },
      } as ArchiveItem;
      items[existingIdx] = savedItem;
    } else {
      const newId = item.id || `kc_arch_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      savedItem = {
        id: newId,
        title: item.title,
        category: item.category || 'personal',
        familyGroup: item.familyGroup || 'self',
        tags: item.tags || ['Kundali'],
        isFavorite: item.isFavorite || false,
        notes: item.notes || '',
        birthData: item.birthData,
        kundaliData: item.kundaliData,
        wisdomData: item.wisdomData,
        manuscriptData: item.manuscriptData,
        muhuratData: item.muhuratData,
        timelineData: item.timelineData,
        metadata: {
          createdAt: now,
          lastViewedAt: now,
          updatedAt: now,
          schemaVersion: '1.0.0',
          calculationEngineVersion: '1.0.0',
          appVersion: '1.0.0',
          ayanamsha: 'Lahiri',
          houseSystem: 'Whole Sign',
        },
      };
      items.unshift(savedItem);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return savedItem;
  }

  /**
   * Delete an item by ID
   */
  static deleteArchiveItem(id: string): void {
    const items = this.getArchiveItems().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  /**
   * Toggle favorite status
   */
  static toggleFavorite(id: string): boolean {
    const items = this.getArchiveItems();
    const item = items.find((i) => i.id === id);
    if (item) {
      item.isFavorite = !item.isFavorite;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return item.isFavorite;
    }
    return false;
  }

  /**
   * Filter and search items in Eternal Archive
   */
  static searchAndFilter(options: FilterOptions): ArchiveItem[] {
    let items = this.getArchiveItems();

    // Category filter
    if (options.category !== 'all') {
      items = items.filter((i) => i.category === options.category);
    }

    // Family Group filter
    if (options.familyGroup !== 'all') {
      items = items.filter((i) => i.familyGroup === options.familyGroup);
    }

    // Favorites filter
    if (options.favoritesOnly) {
      items = items.filter((i) => i.isFavorite);
    }

    // Text search query (Name, City, Nakshatra, Rashi, Tags, Notes)
    if (options.searchQuery.trim()) {
      const q = options.searchQuery.toLowerCase();
      items = items.filter((i) => {
        const nameMatch = i.title.toLowerCase().includes(q) || i.birthData.fullName.toLowerCase().includes(q);
        const cityMatch = i.birthData.city.toLowerCase().includes(q);
        const tagMatch = i.tags.some((t) => t.toLowerCase().includes(q));
        const notesMatch = i.notes ? i.notes.toLowerCase().includes(q) : false;
        
        let astroMatch = false;
        if (i.kundaliData) {
          const asc = i.kundaliData.ascendant;
          if (asc && (asc.rashi.toLowerCase().includes(q) || asc.nakshatra.toLowerCase().includes(q))) {
            astroMatch = true;
          }
        }
        return nameMatch || cityMatch || tagMatch || notesMatch || astroMatch;
      });
    }

    // Sorting
    items.sort((a, b) => {
      let valA: any = a.metadata.createdAt;
      let valB: any = b.metadata.createdAt;

      if (options.sortBy === 'name') {
        valA = a.title.toLowerCase();
        valB = b.title.toLowerCase();
      } else if (options.sortBy === 'dateOfBirth') {
        valA = a.birthData.dateOfBirth;
        valB = b.birthData.dateOfBirth;
      } else if (options.sortBy === 'lastViewed') {
        valA = a.metadata.lastViewedAt;
        valB = b.metadata.lastViewedAt;
      }

      if (valA < valB) return options.sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return options.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return items;
  }

  /**
   * Export archive data to JSON file string
   */
  static exportArchiveJSON(): string {
    const items = this.getArchiveItems();
    let settings = {};
    try {
      const storedSettings = localStorage.getItem(SETTINGS_KEY);
      if (storedSettings) settings = JSON.parse(storedSettings);
    } catch (e) {
      // ignore
    }

    const payload: ArchiveExportData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      app: 'Kalachakra Eternal Archive',
      itemsCount: items.length,
      items,
      settings,
    };

    return JSON.stringify(payload, null, 2);
  }

  /**
   * Import archive data from JSON string
   */
  static importArchiveJSON(jsonContent: string, overwrite: boolean = false): { success: boolean; importedCount: number; message: string } {
    try {
      const payload: ArchiveExportData = JSON.parse(jsonContent);

      if (!payload.items || !Array.isArray(payload.items)) {
        return { success: false, importedCount: 0, message: 'Invalid file format: Missing items array.' };
      }

      const existingItems = overwrite ? [] : this.getArchiveItems();
      const existingIds = new Set(existingItems.map((i) => i.id));

      let importedCount = 0;
      for (const item of payload.items) {
        if (!item.id || !item.title || !item.birthData) continue;
        if (!existingIds.has(item.id)) {
          existingItems.push(item);
          existingIds.add(item.id);
          importedCount++;
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingItems));
      return {
        success: true,
        importedCount,
        message: `Successfully imported ${importedCount} manuscripts into Eternal Archive.`,
      };
    } catch (err: any) {
      return { success: false, importedCount: 0, message: `Import failed: ${err.message}` };
    }
  }

  /**
   * Generate multi-chart comparison data client-side
   */
  static getComparisonData(itemIds: string[]): ChartComparisonResult {
    const allItems = this.getArchiveItems();
    const selectedItems = allItems.filter((i) => itemIds.includes(i.id));

    const planetNames = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

    const planetMatrix = planetNames.map((pName) => {
      const placements: Record<string, any> = {};
      selectedItems.forEach((item) => {
        let pData = {};
        if (item.kundaliData && item.kundaliData.planets) {
          const matched = item.kundaliData.planets.find((p: any) => p.name === pName);
          if (matched) {
            pData = {
              rashi: matched.rashi,
              degree: matched.formattedDegree || `${matched.degree.toFixed(2)}°`,
              nakshatra: matched.nakshatra,
              house: matched.house,
              dignity: matched.dignity,
            };
          }
        }
        placements[item.id] = pData;
      });
      return { planet: pName, placements };
    });

    const lagnas = selectedItems.map((item) => {
      const asc = item.kundaliData?.ascendant;
      return {
        itemId: item.id,
        title: item.title,
        rashi: asc?.rashi || 'N/A',
        lord: asc?.lord || 'N/A',
        nakshatra: asc?.nakshatra || 'N/A',
        degree: asc?.formattedDegree || '0°',
      };
    });

    const yogas = selectedItems.map((item) => {
      const yList = item.kundaliData?.yogas || [];
      return {
        itemId: item.id,
        title: item.title,
        yogaNames: yList.map((y: any) => (typeof y === 'string' ? y : y.name)),
      };
    });

    const panchang = selectedItems.map((item) => ({
      itemId: item.id,
      title: item.title,
      date: item.birthData.dateOfBirth,
      time: item.birthData.timeOfBirth,
      city: item.birthData.city,
    }));

    return {
      items: selectedItems.map((i) => ({
        id: i.id,
        title: i.title,
        familyGroup: i.familyGroup,
        birthData: i.birthData,
        kundaliData: i.kundaliData,
      })),
      planetMatrix,
      lagnas,
      yogas,
      panchang,
    };
  }
}
