# Kalachakra — Cosmic Timeline (काल प्रवाह)

Technical documentation for the living chronological experience in Kalachakra.

---

## 1. Executive Summary & Core Concept

The Cosmic Timeline (`backend/services/dasha/`, `backend/services/timeline/`, and `src/components/timeline/`) unifies point-in-time Vedic chart calculations into a continuous, interactive journey through past, present, and future celestial events.

### Integrated Timeline Layers
1. **Personal Birth Marker**: Natal origin point under Lagna & Moon Nakshatra.
2. **Vimshottari Dasha & Antardasha**: 120-year planetary progression cycles based on Moon longitude.
3. **Planetary Transits**: Sign ingresses (Gochar) of Saturn, Jupiter, Rahu, Ketu, Mars, and key planets.
4. **Vedic Festival Calendar**: Panchang-based sacred observances (Diwali, Holi, Maha Shivaratri, Navratri, etc.).
5. **Eclipse Register**: Solar and Lunar eclipses with traditional inward meditation notes.
6. **Muhurat Recommendations**: Recommended timing windows evaluated by the Muhurat Engine.

---

## 2. Vimshottari Dasha Calculation Strategy (`vimshottari.py`)

### 120-Year Cycle Sequence & Durations

| Order | Planet | Sanskrit | Symbol | Duration (Years) |
|---|---|---|---|---|
| 1 | Ketu | केतु | ☋ | 7 |
| 2 | Venus | शुक्र | ♀ | 20 |
| 3 | Sun | सूर्य | ☉ | 6 |
| 4 | Moon | चन्द्र | ☽ | 10 |
| 5 | Mars | मंगल | ♂ | 7 |
| 6 | Rahu | राहु | ☊ | 18 |
| 7 | Jupiter | गुरु | ♃ | 16 |
| 8 | Saturn | शनि | ♄ | 19 |
| 9 | Mercury | बुध | ☿ | 17 |

### Mathematical Formulae

1. **Nakshatra Lord**:
   $$ \text{Lord Index} = \left\lfloor \frac{\text{Moon Longitude}}{13^\circ 20'} \right\rfloor \pmod 9 $$

2. **Balance of Birth Mahadasha**:
   $$ \text{Traversed} = \text{Moon Longitude} \pmod{13.3333^\circ} $$
   $$ \text{Remaining Fraction} = 1 - \frac{\text{Traversed}}{13.3333^\circ} $$
   $$ \text{First Mahadasha Balance (Years)} = \text{Lord Years} \times \text{Remaining Fraction} $$

3. **Antardasha Sub-period Duration**:
   $$ \text{Antardasha Duration (Years)} = \frac{\text{Mahadasha Lord Years} \times \text{Sub Lord Years}}{120} $$

---

## 3. Unified API Contract (`backend/api/timeline_router.py`)

### `POST /api/timeline/generate`

**Request Body**:
```json
{
  "fullName": "Kartik Gupta",
  "dateOfBirth": "1998-08-15",
  "timeOfBirth": "10:30",
  "city": "Ujjain",
  "activeLayers": ["birth", "dasha", "transit", "festival", "eclipse", "muhurat"]
}
```

---

## 4. Verification & Automated Unit Tests

Run backend test suite:
```bash
python -m pytest backend/tests/test_timeline.py -v
```

---
*End of Cosmic Timeline Technical Documentation*
