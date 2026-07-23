# Kalachakra — Eternal Archive (सनातन अभिलेखागार)

Technical documentation for the timeless personal knowledge library and archival system in Kalachakra.

---

## 1. Executive Summary & Core Identity

The Eternal Archive (`backend/models/archive.py`, `backend/services/archive.py`, `src/services/archiveService.ts`, and `src/components/archive/`) transforms Kalachakra from an astrology tool into a long-term personal knowledge repository.

### Core Philosophy
Instead of modern cold file explorers, the user walks into a **Sacred Temple Library** of handcrafted manuscript shelves. Every preserved chart, report, Muhurat, and timeline snapshot is treated as a physical artifact complete with parchment styling, gold filigree, wax seals, and ceremonial hover illumination.

---

## 2. Architecture & Data Schema

### 2.1 Metadata Schema (`ArchiveMetadata`)

Every preserved chart includes mandatory versioning and audit fields:

```typescript
export interface ArchiveMetadata {
  createdAt: string;                  // ISO 8601 creation timestamp
  lastViewedAt: string;               // ISO 8601 last viewed timestamp
  updatedAt: string;                  // ISO 8601 last updated timestamp
  schemaVersion: string;              // e.g. "1.0.0"
  calculationEngineVersion: string;  // e.g. "1.0.0"
  appVersion: string;                // e.g. "1.0.0"
  ayanamsha: string;                 // e.g. "Lahiri"
  houseSystem: string;                // e.g. "Whole Sign"
}
```

### 2.2 Archive Item Model (`ArchiveItem`)

```typescript
export interface ArchiveItem {
  id: string;                         // Unique ID (kc_arch_...)
  title: string;                      // Display title (e.g. "Aryabhata Chart")
  category: ArchiveCategory;          // personal | family | muhurat | manuscript | timeline | bookmark | collection
  familyGroup: FamilyGroup;          // self | parents | children | relatives | clients | custom
  tags: string[];                     // Custom searchable tags
  isFavorite: boolean;                // Starred favorite status
  notes?: string;                     // Custom study notes
  birthData: BirthInputData;         // Full birth input record
  kundaliData?: KundaliResponse;      // Cached computation payload
  wisdomData?: WisdomResponse;        // Cached interpretations
  manuscriptData?: RoyalManuscriptData; // Cached 11-page manuscript data
  metadata: ArchiveMetadata;
}
```

---

## 3. Comparative Chart Engine

The archive includes a multi-chart comparative chamber supporting side-by-side analysis of 2 to 4 saved Kundalis:
1. **Side-by-Side Kundalis**: Dual North Indian SVG charts rendered simultaneously.
2. **Planet Matrix**: Graha-by-Graha comparative table (Rashi, degree, Nakshatra, house, dignity).
3. **Lagna Comparison**: Comparative Ascendant, Lordship, and degree table.
4. **Yoga Breakdown**: Matrix of detected Parasari Yogas in each chart.
5. **Panchang Alignment**: Birth moment Tithi, Vaara, Nakshatra alignment comparison.

---

## 4. Localization Strategy (`src/context/LocalizationContext.tsx`)

The localization framework provides instant UI switching across languages without altering underlying calculation logic:
- **Languages Supported**:
  - `en`: English Terminology
  - `hi`: हिंदी Translation
  - `sa`: संस्कृतम् Headings & Devanagari Titles
- **Translation Hook**: `useLocalization()` provides `t(key, fallback)` for string resolution.

---

## 5. Backup & Restore Architecture

### 5.1 Export Payload Schema (`ArchiveExportData`)

```json
{
  "version": "1.0.0",
  "exportedAt": "2026-07-23T11:40:00Z",
  "app": "Kalachakra Eternal Archive",
  "itemsCount": 3,
  "items": [...],
  "settings": {...},
  "checksum": "a1b2c3d4e5f67890"
}
```

### 5.2 Integrity & Checksum
Backups include a 16-character SHA-256 checksum generated over serialized archive items. The backend endpoint `POST /api/archive/validate-backup` validates schema integrity and reports checksum mismatches.

---

## 6. Schema Migration Handler

When the computation engine or metadata schema evolves, `migrate_archive_schema` updates legacy items automatically:
1. Adds missing metadata fields (`schemaVersion`, `appVersion`).
2. Assigns default `familyGroup` ("self") to un-categorized records.
3. Preserves backwards compatibility without loss of historical birth data.

---

## 7. Cloud Sync & Notification Roadmap (Future Phases)

1. **End-to-End Cloud Synchronization**: Optional zero-knowledge encrypted backup sync across devices.
2. **Notification Engine**: Background notification scheduling for upcoming Muhurats, festivals, Dasha shifts, and planetary transits.

---

## 8. Verification & Testing

Execute backend test suite:
```bash
python -m pytest backend/tests/test_archive.py -v
```

Execute frontend build verification:
```bash
npx tsc --noEmit && npm run build
```
