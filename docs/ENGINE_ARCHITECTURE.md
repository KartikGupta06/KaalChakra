# Kalachakra — Engine Architecture (दिव्य गणना यन्त्र)

Technical documentation for the Celestial Computation Engine powering Kalachakra's Vedic astronomical calculations.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React / Vite)                       │
│                                                                 │
│  src/services/api.ts  →  fetch('/api/...')                      │
│  src/components/panchang/LivingPanchang.tsx ← PanchangData      │
│  src/types/panchang.ts ← TypeScript interfaces                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │  HTTP (Vite proxy → localhost:8000)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                  BACKEND (FastAPI / Python)                      │
│                                                                 │
│  ┌──────────┐    ┌──────────────┐    ┌────────────────────┐     │
│  │ API Layer│───▶│ Service Layer│───▶│ Swiss Ephemeris     │     │
│  │ (Routers)│    │ (Calculation)│    │ (pyswisseph)        │     │
│  └──────────┘    └──────────────┘    └────────────────────┘     │
│       │                │                                        │
│       ▼                ▼                                        │
│  ┌──────────┐    ┌──────────────┐                               │
│  │ Pydantic │    │    Cache     │                               │
│  │ Models   │    │  (In-Memory) │                               │
│  └──────────┘    └──────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Panchang Calculation Pipeline

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

### Kundali Calculation Pipeline

```
1. Frontend calls POST /api/kundali/generate with birth data
2. Parse birth datetime + resolve location
3. Convert to UTC Julian Day
4. Swiss Ephemeris: Calculate Ascendant (Lagna)
5. For each of 9 Navagrahas:
   a. Get tropical longitude via swe.calc_ut()
   b. Subtract Ayanamsha → Sidereal longitude
   c. Map to Rashi (30° segments) and Nakshatra (13°20' segments)
   d. Calculate house from Lagna (Whole Sign system)
   e. Detect retrograde (negative daily speed)
6. Ketu = Rahu + 180°
7. Build KundaliResponse → return JSON
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

---

## API Contracts

### GET /api/panchang/today
**Query**: `?city=Ujjain` or `?lat=23.17&lng=75.78`
**Response**: `PanchangResponse` (maps 1:1 to frontend `PanchangData`)

### GET /api/panchang/date
**Query**: `?date=2026-07-22&city=Ujjain`
**Response**: `PanchangResponse`

### POST /api/kundali/generate
**Body**: `{ fullName, dateOfBirth, timeOfBirth, city }`
**Response**: `KundaliResponse` with 9 `PlanetPosition` objects

### GET /api/location/search
**Query**: `?q=Vara`
**Response**: `List[LocationResolved]`

---

## Key Assumptions

1. **Ayanamsha**: Lahiri (Chitrapaksha) — the Indian government standard.
2. **House System**: Whole Sign houses from the Ascendant (Lagna).
3. **Rahu/Ketu**: True Node is used for Rahu; Ketu = Rahu + 180°.
4. **Timezone**: Currently hardcoded to IST (+5:30) for Indian cities.
5. **Samvat**: Vikram Samvat = Gregorian Year + 57 (approximate).

---

## Running Locally

```bash
# Start the backend
python -m uvicorn backend.main:app --reload

# Start the frontend (in a separate terminal)
npm run dev
```

The Vite dev server proxies `/api/*` → `http://localhost:8000`.

---

## Future Extension Points

- **Real timezone resolution**: Use `pytz` or `zoneinfo` for dynamic UTC offset.
- **Geocoding API**: Integrate Google/OSM geocoding for arbitrary locations.
- **Dasha calculations**: Extend `services/planetary.py` for Vimshottari Dasha.
- **Festival calendar**: Create `services/calendar.py` for Hindu festival detection.
- **Muhurat engine**: Create `services/muhurat.py` for auspicious time calculations.
