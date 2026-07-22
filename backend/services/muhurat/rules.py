"""
Kalachakra — Muhurat Rules Catalog (rules.py)
==============================================
Defines event types and classical Parasari rules for evaluating auspicious windows.
"""

from typing import List, Dict, Any
from backend.models.muhurat import EventRuleInfo

EVENT_RULES_CATALOG: Dict[str, Dict[str, Any]] = {
    "marriage": {
        "id": "marriage",
        "name": "Marriage (Vivaha)",
        "sanskritName": "विवाह संस्कार",
        "icon": "💒",
        "description": "Sacred matrimonial ceremony uniting two lives in dharmic partnership.",
        "favorableTithis": [2, 3, 5, 7, 10, 11, 12, 13],  # Dvitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, Dvadashi, Trayodashi
        "unfavorableTithis": [4, 9, 14, 30],  # Rikta tithis (Chaturthi, Navami, Chaturdashi) & Amavasya
        "favorableNakshatras": ["Rohini", "Mrigashirsha", "Magha", "Uttara Phalguni", "Hasta", "Swati", "Anuradha", "Uttara Ashadha", "Uttara Bhadrapada", "Revati"],
        "favorableVaaras": ["Monday", "Wednesday", "Thursday", "Friday"],
        "unfavorableKaranas": ["Vishti"],  # Bhadra
        "unfavorableYogas": ["Vyatipata", "Vaidhriti"],
    },
    "housewarming": {
        "id": "housewarming",
        "name": "Griha Pravesh (Housewarming)",
        "sanskritName": "गृह प्रवेश",
        "icon": "🏡",
        "description": "First auspicious entry into a newly constructed or acquired home.",
        "favorableTithis": [2, 3, 5, 7, 10, 11, 13, 15],
        "unfavorableTithis": [4, 9, 14, 30],
        "favorableNakshatras": ["Rohini", "Mrigashirsha", "Chitra", "Anuradha", "Uttara Phalguni", "Uttara Ashadha", "Uttara Bhadrapada", "Revati"],
        "favorableVaaras": ["Monday", "Wednesday", "Thursday", "Friday"],
        "unfavorableKaranas": ["Vishti"],
        "unfavorableYogas": ["Vyatipata", "Vaidhriti"],
    },
    "business": {
        "id": "business",
        "name": "Business Opening / Inauguration",
        "sanskritName": "व्यापार आरम्भ",
        "icon": "💼",
        "description": "Inauguration of a new commercial venture, office, or shop.",
        "favorableTithis": [2, 3, 5, 7, 10, 11, 13, 15],
        "unfavorableTithis": [4, 9, 14, 30],
        "favorableNakshatras": ["Ashwini", "Rohini", "Pushya", "Uttara Phalguni", "Hasta", "Chitra", "Anuradha", "Revati"],
        "favorableVaaras": ["Wednesday", "Thursday", "Friday"],
        "unfavorableKaranas": ["Vishti"],
        "unfavorableYogas": ["Vyatipata", "Vaidhriti"],
    },
    "vehicle": {
        "id": "vehicle",
        "name": "Vehicle Purchase",
        "sanskritName": "वाहन क्रय",
        "icon": "🚗",
        "description": "Auspicious acquisition of a motor vehicle or transport asset.",
        "favorableTithis": [2, 3, 5, 7, 10, 11, 13, 15],
        "unfavorableTithis": [4, 9, 14, 30],
        "favorableNakshatras": ["Ashwini", "Rohini", "Punarvasu", "Pushya", "Hasta", "Swati", "Anuradha", "Shravana"],
        "favorableVaaras": ["Sunday", "Monday", "Wednesday", "Thursday", "Friday"],
        "unfavorableKaranas": ["Vishti"],
        "unfavorableYogas": ["Vyatipata", "Vaidhriti"],
    },
    "property": {
        "id": "property",
        "name": "Property Registration",
        "sanskritName": "भूमि / जायदाद पंजीकरण",
        "icon": "📜",
        "description": "Legal registration of land, real estate, or fixed immovable assets.",
        "favorableTithis": [2, 3, 5, 7, 10, 11, 13, 15],
        "unfavorableTithis": [4, 9, 14, 30],
        "favorableNakshatras": ["Rohini", "Mrigashirsha", "Punravasu", "Magha", "Uttara Phalguni", "Hasta", "Anuradha", "Revati"],
        "favorableVaaras": ["Tuesday", "Thursday", "Friday"],
        "unfavorableKaranas": ["Vishti"],
        "unfavorableYogas": ["Vyatipata", "Vaidhriti"],
    },
    "travel": {
        "id": "travel",
        "name": "Yatra / Long Travel",
        "sanskritName": "यात्रा प्रारम्भ",
        "icon": "✈",
        "description": "Commencement of long-distance journey, pilgrimage, or foreign travel.",
        "favorableTithis": [2, 3, 5, 7, 10, 11, 13],
        "unfavorableTithis": [4, 9, 14, 30],
        "favorableNakshatras": ["Ashwini", "Mrigashirsha", "Punarvasu", "Pushya", "Hasta", "Anuradha", "Shravana", "Revati"],
        "favorableVaaras": ["Monday", "Wednesday", "Thursday", "Friday"],
        "unfavorableKaranas": ["Vishti"],
        "unfavorableYogas": ["Vyatipata", "Vaidhriti"],
    },
    "interview": {
        "id": "interview",
        "name": "Interview / Examination",
        "sanskritName": "साक्षात्कार / परीक्षा",
        "icon": "🎓",
        "description": "Important career interview, academic exam, or public presentation.",
        "favorableTithis": [2, 3, 5, 7, 10, 11, 13, 15],
        "unfavorableTithis": [4, 9, 14, 30],
        "favorableNakshatras": ["Ashwini", "Rohini", "Pushya", "Hasta", "Swati", "Anuradha", "Shravana", "Revati"],
        "favorableVaaras": ["Sunday", "Wednesday", "Thursday", "Friday"],
        "unfavorableKaranas": ["Vishti"],
        "unfavorableYogas": ["Vyatipata", "Vaidhriti"],
    },
    "naming": {
        "id": "naming",
        "name": "Namakarana (Naming Ceremony)",
        "sanskritName": "नामकरण संस्कार",
        "icon": "👶",
        "description": "Traditional naming ceremony for a newborn infant.",
        "favorableTithis": [1, 2, 3, 5, 7, 10, 11, 12, 13, 15],
        "unfavorableTithis": [4, 9, 14, 30],
        "favorableNakshatras": ["Rohini", "Mrigashirsha", "Uttara Phalguni", "Hasta", "Chitra", "Anuradha", "Uttara Ashadha", "Uttara Bhadrapada", "Revati"],
        "favorableVaaras": ["Monday", "Wednesday", "Thursday", "Friday"],
        "unfavorableKaranas": ["Vishti"],
        "unfavorableYogas": ["Vyatipata", "Vaidhriti"],
    },
    "general": {
        "id": "general",
        "name": "General Auspicious Activity",
        "sanskritName": "सामान्य शुभ कार्य",
        "icon": "☸",
        "description": "General daily endeavors, signing contracts, or auspicious beginnings.",
        "favorableTithis": [2, 3, 5, 7, 10, 11, 13, 15],
        "unfavorableTithis": [4, 9, 14, 30],
        "favorableNakshatras": ["Ashwini", "Rohini", "Pushya", "Hasta", "Swati", "Anuradha", "Shravana", "Revati"],
        "favorableVaaras": ["Monday", "Wednesday", "Thursday", "Friday"],
        "unfavorableKaranas": ["Vishti"],
        "unfavorableYogas": ["Vyatipata", "Vaidhriti"],
    },
}


def get_event_rule(event_id: str) -> Dict[str, Any]:
    """Retrieves event rule dictionary by event ID, falling back to 'general'."""
    return EVENT_RULES_CATALOG.get(event_id, EVENT_RULES_CATALOG["general"])


def get_all_event_catalog() -> List[EventRuleInfo]:
    """Returns all event types as Pydantic models for catalog APIs."""
    catalog: List[EventRuleInfo] = []
    for ev_id, ev in EVENT_RULES_CATALOG.items():
        catalog.append(
            EventRuleInfo(
                id=ev["id"],
                name=ev["name"],
                sanskritName=ev["sanskritName"],
                icon=ev["icon"],
                description=ev["description"],
                favorableTithis=[f"Tithi #{t}" for t in ev["favorableTithis"]],
                favorableNakshatras=ev["favorableNakshatras"],
                favorableVaaras=ev["favorableVaaras"],
            )
        )
    return catalog
