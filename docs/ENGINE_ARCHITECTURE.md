# Kalachakra — Engine Architecture (दिव्य गणना यन्त्र)

Technical documentation for the Celestial Computation Engine powering Kalachakra's Vedic astronomical and astrological calculations.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React / Vite)                       │
│                                                                 │
│  src/services/api.ts  →  fetch('/api/...')                      │
│  src/components/panchang/LivingPanchang.tsx ← PanchangData      │
│  src/components/birth/HeroManuscript.tsx → generateKundali()   │
│  src/pages/KundaliRevelationPage.tsx ← KundaliResponse          │
└──────────────────────────┬──────────────────────────────────────┘
                           │  HTTP (Vite proxy → localhost:8000)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                  BACKEND (FastAPI / Python)                      │
│                                                                 │
│  ┌──────────┐    ┌─────────────────────────┐    ┌─────────────┐ │
│  │ API Layer│───▶│ Kundali & Panchang      │───▶│ Swiss       │ │
│  │ (Routers)│    │ Calculation Engines     │    │ Ephemeris   │ │
│  └──────────┘    └─────────────────────────┘    └─────────────┘ │
│       │                 │                                       │
│       ▼                 ▼                                       │
│  ┌──────────┐    ┌─────────────────────────┐                    │
│  │ Pydantic │    │  Modular Kundali Sub-   │                    │
│  │ Models   │    │  services (Lagna,       │                    │
│  └──────────┘    │  Houses, Navamsa,       │                    │
│                  │  Dignities, Aspects,     │                    │
│                  │  Yogas, Strengths)      │                    │
│                  └─────────────────────────┘                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. Panchang Calculation Pipeline

```
1. Frontend calls GET /api/panchang/today?city=Ujjain
2. API Router resolves city → (latitude, longitude, timezone)
3. Cache layer checks for existing result → return if found
4. Panchang Service orchestrator:
   a. Convert local datetime → UTC → Julian Day (JD)
   b. Swiss Ephemeris: Get Sun & Moon tropical longitudes
   c. Subtract Lahiri Ayanamsha → Sidereal longitudes
   d. Tithi = (Moon_lng - Sun_lng) / 12°  → 30 Tithis
   e. Nakshatra = Moon_lng / 13°20'       → 27 Nakshatras
   f. Yoga = (Sun_lng + Moon_lng) / 13°20'→ 27 Yogas
   g. Karana = half-Tithi                 → 11 Karanas
   h. Vaara = Python weekday              → 7 Vaaras
   i. Sunrise/Sunset via swe.rise_trans()
   j. Moonrise/Moonset via swe.rise_trans()
   k. Moon Phase from Sun-Moon elongation
5. Build PanchangResponse → cache → return JSON
```

### 2. Divine Kundali Engine Calculation Pipeline (Phase 8)

```
1. Frontend submits birth data via POST /api/kundali/generate
2. Resolve coordinates and timezone (Ujjain default if custom city)
3. Convert local birth time to UTC Julian Day
4. Lagna Service (lagna.py):
   a. Swiss Ephemeris swe.houses() → Tropical Ascendant
   b. Subtract Lahiri Ayanamsha → Sidereal Ascendant (Lagna)
   c. Compute Lagna degree, Rashi, Nakshatra, Pada
5. House Service (houses.py):
   a. Whole Sign System: House 1 = Lagna's Rashi, progressing 1 to 12
   b. Assign Rashi lords and contained Grahas per house
6. Planetary Engine (planetary.py & dignities.py):
   a. Sidereal longitudes, signs, Nakshatras, degrees for 9 Navagrahas
   b. Planetary Dignities: Exalted (Ucha), Debilitated (Neecha), Own Sign (Swak), Neutral (Sama)
7. Navamsa D9 Module (navamsa.py):
   a. Divide 30° Rashi into 9 segments of 3°20'
   b. Calculate D9 sign based on element rules (Fire -> Mesh, Earth -> Makar, Air -> Tula, Water -> Kark)
8. Vedic Aspects Module (aspects.py):
   a. Universal 7th house Drishti for all planets
   b. Special aspects: Mars (4th, 8th), Jupiter (5th, 9th), Saturn (3rd, 10th)
9. Yogas Framework (yogas.py):
   a. Gajakesari Yoga (Jupiter in Kendra from Moon)
   b. Budhaditya Yoga (Sun & Mercury conjunct)
   c. Chandra Mangala Yoga (Moon & Mars conjunct)
   d. Neecha Bhanga Raja Yoga (Debilitated planet cancellation)
10. Build & Serialize canonical KundaliResponse → Return JSON to frontend
```

---

## Service Responsibilities

| Service | File | Purpose |
|---|---|---|
| **Astronomy** | `services/astronomy.py` | JD conversion, Ayanamsha, sidereal longitude, Rashi/Nakshatra mapping |
| **Sun & Moon** | `services/sun_moon.py` | Sunrise/sunset, moonrise/moonset, moon phase, illumination |
| **Panchang** | `services/panchang.py` | 5 Panchang pillars, Paksha, Lunar Month, Samvat, Ritu, Ayana |
| **Planetary** | `services/planetary.py` | 9 Navagraha sidereal positions, Ascendant |
| **Location** | `services/location.py` | Built-in city database, fuzzy search, coordinate resolution |
| **Kundali Orchestrator** | `services/kundali/engine.py` | Master calculation orchestrator |
| **Lagna Engine** | `services/kundali/lagna.py` | True Sidereal Ascendant calculation |
| **House Engine** | `services/kundali/houses.py` | Whole Sign house division & planet mapping |
| **Navamsa D9** | `services/kundali/navamsa.py` | D9 Navamsa chart calculation |
| **Dignities** | `services/kundali/dignities.py` | Planetary dignities (Ucha, Neecha, Swakshetra, Sama) |
| **Aspects** | `services/kundali/aspects.py` | Classical Vedic Drishti (7th + special aspects) |
| **Yogas Engine** | `services/kundali/yogas.py` | Expandable Yoga detection engine |
| **Strengths** | `services/kundali/strengths.py` | Planetary strength evaluation framework |

---

## API Contracts

### POST /api/kundali/generate
**Body**:
```json
{
  "fullName": "Observer",
  "dateOfBirth": "1998-08-15",
  "timeOfBirth": "06:30",
  "city": "Ujjain"
}
```
**Response**: `KundaliResponse` with `ascendant`, 9 `planets`, 12 `houses`, `navamsa` D9 chart, `aspects`, and detected `yogas`.

---

## Running Automated Tests

```bash
python -m pytest backend/tests/ -v
```

Executes all 45 automated unit tests for astronomy, panchang, planetary, and Kundali engine services.
