# Kalachakra — Muhurat Engine (शुभ मुहूर्त यन्त्र)

Technical documentation for the Vedic Auspicious Window Recommendation System in Kalachakra.

---

## 1. Executive Summary & Design Principles

The Muhurat Engine (`backend/services/muhurat/` and `src/components/muhurat/`) provides decision support and suitability evaluation for life events (Marriage, Housewarming, Business Opening, Vehicle Purchase, Property Registration, Travel, Interview, Naming Ceremony, and General Auspicious Activities).

### Cardinal Principle
> **The Muhurat Engine is a decision layer built on top of Kalachakra's existing canonical Panchang calculations. It NEVER duplicates astronomical math or alters celestial coordinates.**

Recommendations are presented with complete transparency regarding underlying Panchang rules (Tithi, Nakshatra, Vaara, Yoga, Karana), serving as supportive timing windows for personal endeavors.

---

## 2. Architecture & Candidate Evaluation Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    MUHURAT EVALUATION PIPELINE                  │
│                                                                 │
│  User Input (Event Type, Start Date, End Date, Location)        │
│       │                                                         │
│       ▼                                                         │
│  Date Range Candidate Generator (backend/services/muhurat/)      │
│       │                                                         │
│       ▼                                                         │
│  Canonical Panchang Service (get_full_panchang for each day)    │
│       │                                                         │
│       ▼                                                         │
│  Rules Evaluator (rules.py & evaluator.py)                      │
│       │                                                         │
│       ▼                                                         │
│  Suitability Scoring (scoring.py: 0-100 Score & Level Mapping) │
│       │                                                         │
│       ▼                                                         │
│  Canonical MuhuratResponse Payload (serializer.py)              │
│       │                                                         │
│       ▼                                                         │
│  Frontend Royal Muhurat Chamber & Interactive Views             │
│       ├─▶ Royal Muhurat Monthly Calendar                        │
│       ├─▶ Chronological Timeline View                           │
│       ├─▶ Candidate Window Detail Modal                         │
│       ├─▶ Side-by-Side Comparison Modal                         │
│       └─▶ Royal Manuscript Generator Export Integration         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Supported Event Types & Catalog (`rules.py`)

| Event ID | Event Name | Sanskrit Title | Primary Favorable Nakshatras |
|---|---|---|---|
| `marriage` | Marriage | विवाह संस्कार | Rohini, Mrigashirsha, Magha, Uttara Phalguni, Hasta, Swati, Anuradha, Revati |
| `housewarming` | Griha Pravesh | गृह प्रवेश | Rohini, Mrigashirsha, Chitra, Anuradha, Uttara Phalguni/Ashadha/Bhadrapada |
| `business` | Business Opening | व्यापार आरम्भ | Ashwini, Rohini, Pushya, Uttara Phalguni, Hasta, Chitra, Anuradha |
| `vehicle` | Vehicle Purchase | वाहन क्रय | Ashwini, Rohini, Punarvasu, Pushya, Hasta, Swati, Anuradha, Shravana |
| `property` | Property Registration | भूमि पंजीकरण | Rohini, Mrigashirsha, Punarvasu, Magha, Uttara Phalguni, Hasta, Revati |
| `travel` | Yatra / Long Travel | यात्रा प्रारम्भ | Ashwini, Mrigashirsha, Punarvasu, Pushya, Hasta, Anuradha, Revati |
| `interview` | Interview / Exam | साक्षात्कार | Ashwini, Rohini, Pushya, Hasta, Swati, Anuradha, Shravana, Revati |
| `naming` | Namakarana | नामकरण संस्कार | Rohini, Mrigashirsha, Uttara Phalguni, Hasta, Chitra, Anuradha, Revati |
| `general` | General Auspicious | सामान्य शुभ कार्य | Ashwini, Rohini, Pushya, Hasta, Swati, Anuradha, Shravana, Revati |

---

## 4. Suitability Scoring Methodology (`scoring.py`)

Suitability is evaluated on a transparent 0 to 100 scale:

$$ \text{Score} = 70 \text{ (Baseline)} + \Delta_{\text{Tithi}} + \Delta_{\text{Paksha}} + \Delta_{\text{Nakshatra}} + \Delta_{\text{Vaara}} + \Delta_{\text{Yoga}} + \Delta_{\text{Karana}} $$

### Level Mapping
- **Excellent (अति उत्तम)**: Score $\ge 85$ (Gold `#D4AF37`)
- **Good (उत्तम)**: Score $70 - 84$ (Emerald `#2E7D32`)
- **Acceptable (मध्यम)**: Score $50 - 69$ (Amber `#E67E22`)
- **Avoid (वर्ज्य / त्याज्य)**: Score $< 50$ (Sindoor `#A52A2A`)

---

## 5. API Contracts (`backend/api/muhurat_router.py`)

### `GET /api/muhurat/event-types`
Returns the catalog of all supported event types with icons, Sanskrit titles, and descriptions.

### `POST /api/muhurat/evaluate`
**Body**:
```json
{
  "eventType": "housewarming",
  "startDate": "2026-08-15",
  "endDate": "2026-08-28",
  "city": "Ujjain"
}
```

---

## 6. Verification & Automated Tests

Run backend unit tests:
```bash
python -m pytest backend/tests/test_muhurat.py -v
```

---
*End of Muhurat Engine Technical Documentation*
