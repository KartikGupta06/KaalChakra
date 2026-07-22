# Kalachakra — Royal Manuscript Generator (राजकीय जन्म पत्रिका)

Technical documentation for the 11-page Royal Manuscript Document Generation Engine in Kalachakra.

---

## 1. Overview & Architectural Principles

The Royal Manuscript Generator (`src/components/manuscript/`) transforms birth coordinates and astronomical calculations into an 11-page printable, digital, and archival Vedic document.

Unlike typical web app reports, the document is designed as a **royal manuscript prepared by an ancient Vedic observatory**.

### Core Pillars
1. **Reverence & Craftsmanship**: Employs parchment backgrounds, brass cornerfiligrees, Devanagari calligraphy, and embossed wax seals.
2. **Vector-First Precision**: North Indian Kundali charts and astronomical symbols render as crisp SVG vectors without raster pixelation.
3. **100% Modular Architecture**: Every page is an independent component wrapped in `ManuscriptPageWrapper.tsx`.
4. **Export Flexibility**: Supports multi-page A4 PDF export, high-resolution PNG rendering, native browser print (`@media print`), and digital verification QR links.

---

## 2. Report Architecture (11-Page Structure)

```
┌─────────────────────────────────────────────────────────────────┐
│                    11-PAGE MANUSCRIPT MAP                       │
├────────┬─────────────────────────┬──────────────────────────────┤
│ Page # │ Section Name            │ Primary Content & Motifs     │
├────────┼─────────────────────────┼──────────────────────────────┤
│ Page 1 │ Cover Page              │ Emblem, Title, Seal, ID      │
│ Page 2 │ Birth Record            │ Name, Date, Time, Coordinates│
│ Page 3 │ Janma Kundali           │ North Indian SVG Chart       │
│ Page 4 │ Planetary Summary       │ 9 Navagraha Sidereal Table   │
│ Page 5 │ House Summary           │ 12 Bhavas, Lords, Occupants  │
│ Page 6 │ Lagna Details           │ Rising Sign Showcase Card    │
│ Page 7 │ Yoga Gallery            │ Parasari Yogas & Strengths   │
│ Page 8 │ Navamsa Overview        │ D9 Placements & Vargottama   │
│ Page 9 │ Panchang Snapshot       │ Tithi, Vaara, Nakshatra, etc.│
│ Page 10│ Vedic Glossary          │ Educational Terminology      │
│ Page 11│ Certification Page      │ Observatory Seal & Vector QR │
└────────┴─────────────────────────┴──────────────────────────────┘
```

---

## 3. Component Hierarchy

- **`src/types/manuscript.ts`**: TypeScript interfaces for `RoyalManuscriptData` and page sub-models.
- **`src/services/manuscriptService.ts`**: Data builder mapping API responses or raw birth state into `RoyalManuscriptData`.
- **`src/components/manuscript/ManuscriptQRCode.tsx`**: Pure SVG vector QR code component with central Kalachakra wheel motif.
- **`src/components/manuscript/sections/ManuscriptPageWrapper.tsx`**: Standardized A4 frame container (`210mm x 297mm`) with filigree borders, watermarks, and page numbers.
- **`src/components/manuscript/sections/`**: 11 individual page components (`ManuscriptCoverPage.tsx` through `ManuscriptCertificationPage.tsx`).
- **`src/components/manuscript/RoyalManuscriptDocument.tsx`**: Master document compiler assembling all 11 pages.
- **`src/components/manuscript/RoyalManuscriptModal.tsx`**: Interactive modal viewer featuring ceremonial loading sequence, page thumbnails, zoom controls, and export triggers.

---

## 4. Generation & Export Pipeline

### 4.1 Generation Flow
```
User selects 'Download Royal Manuscript' / 'Share' / 'Print'
  ↓
RoyalManuscriptModal opens
  ↓
Ceremonial Loading Animation (Unrolling Palm Leaves -> Ephemeris -> Seal)
  ↓
RoyalManuscriptDocument renders 11 pages
  ↓
Interactive Preview (Zoom, Thumbnails, Prev/Next, Full Scroll)
  ↓
User chooses Export: PDF | PNG | Print | Share
```

### 4.2 PDF & Image Export Pipeline
- **PDF Generation**: Powered by `jsPDF` + `html2canvas` rendering each `.kc-manuscript-page` at `2x` retina scale for crisp vector typography.
- **PNG Export**: Captures selected active manuscript page to a high-resolution 300DPI equivalent image.
- **A4 Direct Printing**: `@media print` rules target `.kc-manuscript-page` with exact background color enforcement (`-webkit-print-color-adjust: exact`) and strict page breaks (`page-break-after: always`).

---

## 5. Verification & QR Code

Every generated manuscript includes a unique Report Identifier (`KC-XXXXXX`) and a discreet vector QR code on the Certification Page linking to `https://kalachakra.app/verify/<report_id>`.

---

## 6. Future Expansion Points & Customization Hooks

1. **AI Interpretation Hooks**: `ManuscriptYogaGalleryPage.tsx` and `ManuscriptHouseSummaryPage.tsx` include pre-styled reservation blocks ready to accept LLM/AI interpretations without altering page dimensions or layout bounds.
2. **Additional Divisional Charts (D10, D7, D12)**: Additional pages can be added to `RoyalManuscriptDocument.tsx` by extending `pages` array and updating `totalPages` prop in `ManuscriptPageWrapper`.

---
*End of Royal Manuscript Generator Technical Documentation*
