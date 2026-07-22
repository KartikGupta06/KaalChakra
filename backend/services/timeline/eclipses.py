"""
Kalachakra — Eclipse Register (eclipses.py)
===========================================
Register of Solar and Lunar eclipses with traditional commentary and visibility notes.
"""

from typing import List
from backend.models.timeline import TimelineEvent, EclipseEvent

ECLIPSE_CATALOG = [
    {
        "id": "ecl-solar-2026-02-17",
        "type": "Solar Eclipse",
        "typeSanskrit": "सूर्य ग्रहण (Annular)",
        "date": "2026-02-17",
        "timeWindow": "12:01 PM to 04:27 PM UTC",
        "sign": "Aquarius (कुम्भ)",
        "nakshatra": "Shatabhisha (शतभिषा)",
        "traditionalNotes": "Solar alignment with Rahu/Ketu nodes. Traditional observation suggests inward meditation and mantra repetition.",
    },
    {
        "id": "ecl-lunar-2026-03-03",
        "type": "Lunar Eclipse",
        "typeSanskrit": "चन्द्र ग्रहण (Total)",
        "date": "2026-03-03",
        "timeWindow": "11:34 AM to 03:15 PM UTC",
        "sign": "Leo (सिंह)",
        "nakshatra": "Purva Phalguni (पूर्वाफाल्गुनी)",
        "traditionalNotes": "Total Lunar Eclipse during Phalguna Purnima. Favorable for inner contemplation and spiritual purification.",
    },
    {
        "id": "ecl-solar-2026-08-12",
        "type": "Solar Eclipse",
        "typeSanskrit": "सूर्य ग्रहण (Total)",
        "date": "2026-08-12",
        "timeWindow": "03:45 PM to 07:30 PM UTC",
        "sign": "Cancer (कर्क)",
        "nakshatra": "Ashlesha (अश्लेषा)",
        "traditionalNotes": "Total Solar Eclipse in Cancer. Highlights emotional recalibration and ancestral honors.",
    },
    {
        "id": "ecl-lunar-2026-08-28",
        "type": "Lunar Eclipse",
        "typeSanskrit": "चन्द्र ग्रहण (Partial)",
        "date": "2026-08-28",
        "timeWindow": "02:10 AM to 05:40 AM UTC",
        "sign": "Aquarius (कुम्भ)",
        "nakshatra": "Shatabhisha (शतभिषा)",
        "traditionalNotes": "Partial Lunar Eclipse on Raksha Bandhan Purnima. Mindful contemplation recommended during peak shadow.",
    },
]


def get_eclipse_timeline_events() -> List[TimelineEvent]:
    """
    Returns structured TimelineEvents for Eclipses.
    """
    events: List[TimelineEvent] = []

    for ecl in ECLIPSE_CATALOG:
        events.append(
            TimelineEvent(
                eventId=ecl["id"],
                layer="eclipse",
                title=f"{ecl['type']} in {ecl['sign'].split()[0]}",
                sanskritTitle=f"॥ {ecl['typeSanskrit']} ॥",
                category="Celestial Eclipse",
                date=ecl["date"],
                dateFormatted=ecl["date"],
                timeStr=ecl["timeWindow"],
                icon="🌑" if "Solar" in ecl["type"] else "🌕",
                importance="Supreme",
                badgeColor="#7B1E1E",
                description=ecl["traditionalNotes"],
                panchangContext=f"Occurs in {ecl['sign']} under {ecl['nakshatra']}",
                chartConnection="Temporarily veils solar/lunar illumination; traditionally reserved for inner spiritual work.",
                isBookmarked=False,
                metadata={"sign": ecl["sign"], "nakshatra": ecl["nakshatra"]},
            )
        )

    return events


def get_all_eclipses() -> List[EclipseEvent]:
    """Returns all eclipses as Pydantic models."""
    return [
        EclipseEvent(
            id=e["id"],
            type=e["type"],
            typeSanskrit=e["typeSanskrit"],
            date=e["date"],
            timeWindow=e["timeWindow"],
            sign=e["sign"],
            nakshatra=e["nakshatra"],
            traditionalNotes=e["traditionalNotes"],
        )
        for e in ECLIPSE_CATALOG
    ]
