"""
Kalachakra — Transit Engine (transits.py)
=========================================
Generates major planetary transits, sign ingresses, and retrograde milestones.
"""

from datetime import datetime
from typing import List
from backend.models.timeline import TimelineEvent

TRANSIT_MILESTONES = [
    {
        "id": "tr-saturn-aquarius",
        "date": "2026-03-29",
        "planet": "Saturn (Shani)",
        "sanskritPlanet": "शनि",
        "fromSign": "Capricorn (मकर)",
        "toSign": "Aquarius (कुम्भ)",
        "icon": "🪐",
        "importance": "High",
        "badgeColor": "#5C4033",
        "description": "Saturn transits into Aquarius (Kumbha), activating 11th house gain dynamics and social duty.",
    },
    {
        "id": "tr-jupiter-taurus",
        "date": "2026-05-14",
        "planet": "Jupiter (Guru)",
        "sanskritPlanet": "गुरु",
        "fromSign": "Aries (मेष)",
        "toSign": "Taurus (वृषभ)",
        "icon": "♃",
        "importance": "Supreme",
        "badgeColor": "#D4AF37",
        "description": "Jupiter transits into Taurus (Vrishabha), bringing expansion to assets, speech, and artistic endeavors.",
    },
    {
        "id": "tr-rahu-aquarius",
        "date": "2026-11-20",
        "planet": "Rahu",
        "sanskritPlanet": "राहु",
        "fromSign": "Pisces (मीन)",
        "toSign": "Aquarius (कुम्भ)",
        "icon": "☊",
        "importance": "High",
        "badgeColor": "#E67E22",
        "description": "Rahu transits into Aquarius (Kumbha), initiating major technological and unconventional collective shifts.",
    },
    {
        "id": "tr-mars-leo",
        "date": "2026-07-02",
        "planet": "Mars (Mangala)",
        "sanskritPlanet": "मंगल",
        "fromSign": "Cancer (कर्क)",
        "toSign": "Leo (सिंह)",
        "icon": "♂",
        "importance": "Medium",
        "badgeColor": "#A52A2A",
        "description": "Mars enters Leo (Simha), igniting executive ambition, courage, and leadership focus.",
    },
]


def get_transit_timeline_events() -> List[TimelineEvent]:
    """
    Returns structured TimelineEvents for planetary transits.
    """
    events: List[TimelineEvent] = []

    for tr in TRANSIT_MILESTONES:
        events.append(
            TimelineEvent(
                eventId=tr["id"],
                layer="transit",
                title=f"{tr['planet']} Transit to {tr['toSign'].split()[0]}",
                sanskritTitle=f"॥ {tr['sanskritPlanet']} राशि परिवर्तन ॥",
                category="Planetary Transit",
                date=tr["date"],
                dateFormatted=tr["date"],
                timeStr="Sign Ingress",
                icon=tr["icon"],
                importance=tr["importance"],
                badgeColor=tr["badgeColor"],
                description=tr["description"],
                panchangContext=f"Ingress from {tr['fromSign']} to {tr['toSign']}",
                chartConnection="Activates new Bhava themes based on house placement from natal Lagna and Moon.",
                isBookmarked=False,
                metadata={"planet": tr["planet"], "toSign": tr["toSign"]},
            )
        )

    return events
