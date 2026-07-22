# Kalachakra — Wisdom Engine (ज्ञान व्याख्या यन्त्र)

Technical documentation for the Vedic Astrological Interpretation System in Kalachakra.

---

## 1. Executive Summary & Design Principles

The Wisdom Engine (`backend/services/wisdom/` and `src/components/wisdom/`) provides clear, educational, and well-structured interpretations derived from calculated natal chart data.

### Cardinal Rule
> **The Wisdom Engine must never perform astronomical calculations or invent planetary longitudes. It strictly consumes the canonical `KundaliResponse` object produced by the Divine Kundali Engine.**

All interpretations are presented with complete transparency as **informational content based on traditional Parasari Vedic astrology**, rather than guaranteed predictions or deterministic advice.

---

## 2. Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     CANONICAL DATA PIPELINE                     │
│                                                                 │
│  User Birth Input (Name, Date, Time, Location)                  │
│       │                                                         │
│       ▼                                                         │
│  Celestial Computation Engine (Swiss Ephemeris / JD / Sidereal) │
│       │                                                         │
│       ▼                                                         │
│  Divine Kundali Engine (Lagna, Houses, 9 Grahas, D9, Yogas)     │
│       │                                                         │
│       ▼                                                         │
│  Canonical KundaliResponse (JSON Payload)                       │
│       │                                                         │
│       ▼                                                         │
│  Wisdom Engine (backend/services/wisdom/)                        │
│       ├─▶ overview.py   (Executive Summary & Themes)            │
│       ├─▶ ascendant.py  (Lagna & Rising Sign Traits)            │
│       ├─▶ planets.py    (9 Grahas Sign/House/Nakshatra/Dignity) │
│       ├─▶ houses.py     (12 Bhavas Purpose & Occupants)         │
│       ├─▶ yogas.py      (Parasari Yogas Explanations)           │
│       ├─▶ strengths.py  (Dignities & Operational States)        │
│       └─▶ panchang.py   (5 Pillars Birth Moment Commentary)     │
│       │                                                         │
│       ▼                                                         │
│  Canonical WisdomResponse Payload                               │
│       │                                                         │
│       ▼                                                         │
│  Frontend WisdomEnginePanel & Royal Manuscript Generator        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Backend Module Responsibilities

| Module | Location | Primary Responsibility |
|---|---|---|
| **Pydantic Schemas** | `backend/models/wisdom.py` | Data validation schemas (`WisdomResponse`, `ChartOverviewWisdom`, `PlanetWisdom`, `HouseWisdom`, `YogaWisdom`, `TransparencyMetadata`). |
| **Chart Overview** | `backend/services/wisdom/overview.py` | Executive chart summary, element (Agni/Prithvi/Vayu/Jala) and quality distribution, key themes. |
| **Ascendant** | `backend/services/wisdom/ascendant.py` | Lagna sign traits, degree, Nakshatra context, role of Lagna Lord without deterministic statements. |
| **Planets** | `backend/services/wisdom/planets.py` | Educational commentary for all 9 Grahas (sign, house, Nakshatra, dignity state). |
| **Houses** | `backend/services/wisdom/houses.py` | Educational commentary for all 12 Bhavas (lordship, significances, occupants). |
| **Yogas** | `backend/services/wisdom/yogas.py` | Explanations for detected Yogas (why detected, participating planets, balanced interpretation). |
| **Strengths** | `backend/services/wisdom/strengths.py` | Explanations for planetary dignities (Exalted, Debilitated, Swakshetra, Mitra, Shatru, Sama). |
| **Panchang** | `backend/services/wisdom/panchang.py` | Birth moment commentary on Tithi, Nakshatra, Yoga, Karana, and Vaara. |
| **Serializer** | `backend/services/wisdom/serializer.py` | Master orchestrator assembling all submodules into canonical `WisdomResponse`. |
| **API Router** | `backend/api/wisdom_router.py` | REST endpoints `POST /api/wisdom/interpret` and `POST /api/wisdom/generate-and-interpret`. |

---

## 4. Transparency & Disclaimer Policy

Every interpretation response includes mandatory `TransparencyMetadata`:
1. **Ayanamsha Verification**: Explicitly declaring Lahiri (Chitrapaksha) sidereal calculation baseline.
2. **House System**: Declaring Whole Sign (Rashi Bhava) system.
3. **Calculation Timestamp**: Full UTC timestamp when the underlying astronomical calculations were executed.
4. **Educational Disclaimer**: *“All interpretations are educational explanations derived from classical Parasari Vedic astrology principles. They serve as self-reflection tools, not deterministic predictions.”*

---

## 5. User Interface & Manuscript Integration

- **`WisdomEnginePanel.tsx`**: Annotated manuscript margin UI with real-time keyword search, category navigation tabs, bookmarking, and accordion expand/collapse controls.
- **Royal Manuscript Generator**: Optional inclusion of dedicated Wisdom Engine interpretation pages (`ManuscriptWisdomPage.tsx`) in exported A4 PDF and print manuscripts.

---

## 6. Localization Strategy

The response structure is designed to support multilingual rendering without altering business logic:
- `titleSanskrit`: Classical Devanagari headers (e.g. `॥ सर्वांगीण चक्र अवलोकन ॥`).
- `titleEnglish`: Standard English terminology (e.g. `Overall Chart Summary`).
- Template dictionaries support future expansion into Hindi (`titleHindi`) and other Indian languages.

---

## 7. Testing & Verification

Execute backend unit test suite:
```bash
python -m pytest backend/tests/test_wisdom.py -v
```
Validates mapping accuracy, null safety, Pydantic schema serialization, and module independence.

---
*End of Wisdom Engine Technical Documentation*
