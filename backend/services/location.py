"""
Kalachakra — Location Service
================================
Built-in city database for Indian cities with coordinates and timezones.
Provides fuzzy search and location resolution.
"""

import json
import os
from typing import List, Optional
from backend.models.location import LocationResolved


# Load built-in city database
_CITIES_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "cities.json")
_CITIES: List[dict] = []


def _load_cities():
    """Load cities database from JSON file."""
    global _CITIES
    if not _CITIES:
        try:
            with open(_CITIES_PATH, "r", encoding="utf-8") as f:
                _CITIES = json.load(f)
        except FileNotFoundError:
            _CITIES = _get_default_cities()
    return _CITIES


def _get_default_cities() -> List[dict]:
    """Hardcoded fallback city database."""
    return [
        {"city": "Ujjain", "state": "Madhya Pradesh", "country": "India", "lat": 23.1793, "lng": 75.7849, "tz": "Asia/Kolkata", "display": "Ujjain (उज्जैन)"},
        {"city": "Varanasi", "state": "Uttar Pradesh", "country": "India", "lat": 25.3176, "lng": 82.9739, "tz": "Asia/Kolkata", "display": "Varanasi (वाराणसी)"},
        {"city": "New Delhi", "state": "Delhi", "country": "India", "lat": 28.6139, "lng": 77.2090, "tz": "Asia/Kolkata", "display": "New Delhi (नई दिल्ली)"},
        {"city": "Jaipur", "state": "Rajasthan", "country": "India", "lat": 26.9124, "lng": 75.7873, "tz": "Asia/Kolkata", "display": "Jaipur (जयपुर)"},
        {"city": "Mumbai", "state": "Maharashtra", "country": "India", "lat": 19.0760, "lng": 72.8777, "tz": "Asia/Kolkata", "display": "Mumbai (मुम्बई)"},
        {"city": "Ayodhya", "state": "Uttar Pradesh", "country": "India", "lat": 26.7922, "lng": 82.1998, "tz": "Asia/Kolkata", "display": "Ayodhya (अयोध्या)"},
        {"city": "Haridwar", "state": "Uttarakhand", "country": "India", "lat": 29.9457, "lng": 78.1642, "tz": "Asia/Kolkata", "display": "Haridwar (हरिद्वार)"},
        {"city": "Prayagraj", "state": "Uttar Pradesh", "country": "India", "lat": 25.4358, "lng": 81.8463, "tz": "Asia/Kolkata", "display": "Prayagraj (प्रयागराज)"},
        {"city": "Chennai", "state": "Tamil Nadu", "country": "India", "lat": 13.0827, "lng": 80.2707, "tz": "Asia/Kolkata", "display": "Chennai (चेन्नई)"},
        {"city": "Kolkata", "state": "West Bengal", "country": "India", "lat": 22.5726, "lng": 88.3639, "tz": "Asia/Kolkata", "display": "Kolkata (कोलकाता)"},
        {"city": "Bangalore", "state": "Karnataka", "country": "India", "lat": 12.9716, "lng": 77.5946, "tz": "Asia/Kolkata", "display": "Bangalore (बेंगलुरु)"},
        {"city": "Hyderabad", "state": "Telangana", "country": "India", "lat": 17.3850, "lng": 78.4867, "tz": "Asia/Kolkata", "display": "Hyderabad (हैदराबाद)"},
        {"city": "Pune", "state": "Maharashtra", "country": "India", "lat": 18.5204, "lng": 73.8567, "tz": "Asia/Kolkata", "display": "Pune (पुणे)"},
        {"city": "Ahmedabad", "state": "Gujarat", "country": "India", "lat": 23.0225, "lng": 72.5714, "tz": "Asia/Kolkata", "display": "Ahmedabad (अहमदाबाद)"},
        {"city": "Lucknow", "state": "Uttar Pradesh", "country": "India", "lat": 26.8467, "lng": 80.9462, "tz": "Asia/Kolkata", "display": "Lucknow (लखनऊ)"},
        {"city": "Patna", "state": "Bihar", "country": "India", "lat": 25.6093, "lng": 85.1376, "tz": "Asia/Kolkata", "display": "Patna (पटना)"},
        {"city": "Indore", "state": "Madhya Pradesh", "country": "India", "lat": 22.7196, "lng": 75.8577, "tz": "Asia/Kolkata", "display": "Indore (इन्दौर)"},
        {"city": "Bhopal", "state": "Madhya Pradesh", "country": "India", "lat": 23.2599, "lng": 77.4126, "tz": "Asia/Kolkata", "display": "Bhopal (भोपाल)"},
        {"city": "Mathura", "state": "Uttar Pradesh", "country": "India", "lat": 27.4924, "lng": 77.6737, "tz": "Asia/Kolkata", "display": "Mathura (मथुरा)"},
        {"city": "Kashi", "state": "Uttar Pradesh", "country": "India", "lat": 25.3176, "lng": 82.9739, "tz": "Asia/Kolkata", "display": "Kashi (काशी)"},
    ]


def search_cities(query: str) -> List[LocationResolved]:
    """
    Search the built-in city database by name (case-insensitive substring match).
    """
    cities = _load_cities()
    query_lower = query.lower().strip()
    if not query_lower:
        return [_to_location(c) for c in cities[:10]]

    results = []
    for c in cities:
        if (query_lower in c["city"].lower() or
            query_lower in c.get("state", "").lower() or
            query_lower in c.get("display", "").lower()):
            results.append(_to_location(c))

    return results[:15]


def resolve_location(city_name: str) -> Optional[LocationResolved]:
    """
    Resolve a city name to coordinates and timezone.
    Returns the first match, or None if not found.
    """
    cities = _load_cities()
    city_lower = city_name.lower().strip()

    for c in cities:
        if c["city"].lower() == city_lower or city_lower in c.get("display", "").lower():
            return _to_location(c)

    return None


def _to_location(c: dict) -> LocationResolved:
    """Convert a raw city dict to a LocationResolved model."""
    return LocationResolved(
        city=c["city"],
        state=c.get("state", ""),
        country=c.get("country", "India"),
        displayName=c.get("display", c["city"]),
        latitude=c["lat"],
        longitude=c["lng"],
        timezone=c.get("tz", "Asia/Kolkata"),
    )
