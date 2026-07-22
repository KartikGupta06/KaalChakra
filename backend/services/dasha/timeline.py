"""
Kalachakra — Dasha Timeline Formatting (timeline.py)
===================================================
Converts calculated Vimshottari Mahadasha and Antardasha periods into canonical TimelineEvent objects.
"""

from typing import List, Dict, Any
from backend.models.timeline import TimelineEvent


def dasha_periods_to_timeline_events(mahadashas: List[Dict[str, Any]]) -> List[TimelineEvent]:
    """
    Converts Mahadashas and active Antardashas into TimelineEvent nodes.
    """
    events: List[TimelineEvent] = []

    for idx, m in enumerate(mahadashas):
        m_id = f"dasha-m-{idx}-{m['lord'].lower()}"
        is_curr = m.get("isCurrent", False)

        events.append(
            TimelineEvent(
                eventId=m_id,
                layer="dasha",
                title=f"{m['lord']} Mahadasha Period",
                sanskritTitle=f"॥ {m['sanskritLord']} महादशा काल ॥",
                category="Vimshottari Dasha",
                date=m["startDate"],
                dateFormatted=m["startDate"],
                timeStr=f"Span: {m['durationYears']} Years",
                icon="⏳",
                importance="Supreme" if is_curr else "High",
                badgeColor="#D4AF37" if is_curr else "#C89B3C",
                description=(
                    f"Vimshottari Mahadasha governed by {m['lord']} ({m['sanskritLord']}) spanning {m['durationYears']} years "
                    f"from {m['startDate']} to {m['endDate']}."
                ),
                panchangContext=f"Mahadasha Lord: {m['lord']} ({m['sanskritLord']})",
                chartConnection="Governs major life phase focus, psychological state, and karmic manifestation.",
                isBookmarked=False,
                metadata={"mahadasha": m["lord"], "startDate": m["startDate"], "endDate": m["endDate"]},
            )
        )

        # Include key Antardashas
        for a_idx, a in enumerate(m.get("antardashas", [])):
            if a.get("isCurrent", False):
                a_id = f"dasha-a-{idx}-{a_idx}"
                events.append(
                    TimelineEvent(
                        eventId=a_id,
                        layer="dasha",
                        title=f"{a['lord']} Antardasha Sub-Period",
                        sanskritTitle=f"॥ {a['sanskritLord']} अन्तर्दशा ॥",
                        category="Vimshottari Sub-Period",
                        date=a["startDate"],
                        dateFormatted=a["startDate"],
                        timeStr=f"Span: {a['durationYears']} Years",
                        icon="⌛",
                        importance="Supreme",
                        badgeColor="#2E7D32",
                        description=(
                            f"Active Antardasha sub-period of {a['lord']} ({a['sanskritLord']}) "
                            f"from {a['startDate']} to {a['endDate']}."
                        ),
                        panchangContext=f"Sub-Period: {a['lord']}",
                        chartConnection="Fine-tunes the active Mahadasha focus down to specific sub-domain events.",
                        isBookmarked=False,
                        metadata={"antardasha": a["lord"], "startDate": a["startDate"], "endDate": a["endDate"]},
                    )
                )

    return events
