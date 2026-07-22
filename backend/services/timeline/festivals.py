"""
Kalachakra — Vedic Festival Calendar (festivals.py)
===================================================
Handcrafted catalog of major Vedic festivals with dates, traditional significance,
and Panchang basis.
"""

from typing import List, Dict, Any
from backend.models.timeline import TimelineEvent, FestivalEvent

FESTIVAL_CATALOG = [
    {
        "id": "fest-makar-sankranti",
        "name": "Makar Sankranti",
        "sanskritName": "मकर संक्रान्ति",
        "date": "2026-01-14",
        "paksha": "Shukla Paksha",
        "tithi": "Makar Ingress",
        "deity": "Surya Dev",
        "icon": "☀",
        "significance": "Solar transition into Capricorn (Makara Rashi), signaling Uttarayana and the return of growing light.",
    },
    {
        "id": "fest-maha-shivaratri",
        "name": "Maha Shivaratri",
        "sanskritName": "महाशिवरात्रि",
        "date": "2026-02-15",
        "paksha": "Krishna Paksha",
        "tithi": "Chaturdashi (14th Tithi)",
        "deity": "Lord Shiva",
        "icon": "🔱",
        "significance": "The great night of Shiva celebrating cosmic consciousness, deep meditation, and spiritual awakening.",
    },
    {
        "id": "fest-holi",
        "name": "Holi (Phalguna Purnima)",
        "sanskritName": "होली / फाल्गुन पूर्णिमा",
        "date": "2026-03-03",
        "paksha": "Shukla Paksha",
        "tithi": "Purnima (Full Moon)",
        "deity": "Radha Krishna & Prahlad",
        "icon": "🎨",
        "significance": "Festival of colors, victory of devotion over arrogance, and arrival of Vasant Ritu (Spring).",
    },
    {
        "id": "fest-rama-navami",
        "name": "Rama Navami",
        "sanskritName": "राम नवमी",
        "date": "2026-03-27",
        "paksha": "Shukla Paksha",
        "tithi": "Navami (9th Tithi)",
        "deity": "Lord Rama",
        "icon": "🏹",
        "significance": "Birth moment of Maryada Purushottama Lord Rama during Chaitra Navratri.",
    },
    {
        "id": "fest-guru-purnima",
        "name": "Guru Purnima",
        "sanskritName": "गुरु पूर्णिमा",
        "date": "2026-07-29",
        "paksha": "Shukla Paksha",
        "tithi": "Purnima (Full Moon)",
        "deity": "Maharishi Ved Vyasa",
        "icon": "📿",
        "significance": "Sacred day of honoring spiritual preceptors, gurus, and ancestral wisdom lineages.",
    },
    {
        "id": "fest-raksha-bandhan",
        "name": "Raksha Bandhan",
        "sanskritName": "रक्षा बन्धन",
        "date": "2026-08-28",
        "paksha": "Shukla Paksha",
        "tithi": "Purnima (Full Moon)",
        "deity": "Devi Lakshmi & Lord Vishnu",
        "icon": "🏵",
        "significance": "Sacred thread ceremony celebrating protective brother-sister bonds and dharmic duty.",
    },
    {
        "id": "fest-janmashtami",
        "name": "Krishna Janmashtami",
        "sanskritName": "श्री कृष्ण जन्माष्टमी",
        "date": "2026-09-04",
        "paksha": "Krishna Paksha",
        "tithi": "Ashtami (8th Tithi)",
        "deity": "Lord Krishna",
        "icon": "🪈",
        "significance": "Midnight advent of Lord Krishna in Rohini Nakshatra during Shravana/Bhadrapada month.",
    },
    {
        "id": "fest-sharad-navratri",
        "name": "Sharad Navratri Start",
        "sanskritName": "शरद् नवरात्रि प्रारम्भ",
        "date": "2026-10-11",
        "paksha": "Shukla Paksha",
        "tithi": "Pratipada (1st Tithi)",
        "deity": "Navadurga",
        "icon": "🌺",
        "significance": "Nine sacred nights dedicated to the divine feminine Shakti in her nine cosmic forms.",
    },
    {
        "id": "fest-diwali",
        "name": "Diwali (Deepavali)",
        "sanskritName": "दीपावली / लक्ष्मी पूजन",
        "date": "2026-11-08",
        "paksha": "Krishna Paksha",
        "tithi": "Amavasya (New Moon)",
        "deity": "Mahalakshmi & Lord Ganesha",
        "icon": "🪔",
        "significance": "Festival of lights celebrating victory of light over darkness and divine prosperity.",
    },
]


def get_festival_timeline_events() -> List[TimelineEvent]:
    """
    Returns structured TimelineEvents for Vedic festivals.
    """
    events: List[TimelineEvent] = []

    for f in FESTIVAL_CATALOG:
        events.append(
            TimelineEvent(
                eventId=f["id"],
                layer="festival",
                title=f.get("name", "Vedic Festival"),
                sanskritTitle=f"॥ {f.get('sanskritName', 'उत्सव')} ॥",
                category="Vedic Festival",
                date=f["date"],
                dateFormatted=f["date"],
                timeStr="Panchang Day",
                icon=f.get("icon", "🪔"),
                importance="High",
                badgeColor="#E67E22",
                description=f.get("significance", "Vedic festival celebration."),
                panchangContext=f"Observed under {f.get('paksha', 'Shukla')} {f.get('tithi', 'Tithi')}",
                chartConnection=f"Presided by {f.get('deity', 'Devatas')}. Auspicious for spiritual reflection.",
                isBookmarked=False,
                metadata={"deity": f.get("deity", "Devata"), "tithi": f.get("tithi", "")},
            )
        )

    return events


def get_all_festivals() -> List[FestivalEvent]:
    """Returns all festivals as Pydantic models."""
    return [
        FestivalEvent(
            id=f["id"],
            name=f["name"],
            sanskritName=f["sanskritName"],
            date=f["date"],
            paksha=f["paksha"],
            tithi=f["tithi"],
            significance=f["significance"],
            deity=f["deity"],
        )
        for f in FESTIVAL_CATALOG
    ]
