"""
Kalachakra — Cosmic Timeline Master Orchestrator (orchestrator.py)
===================================================================
Merges personal birth marker, Vimshottari Dashas, transits, festivals,
eclipses, and Muhurats into a unified, chronologically sorted TimelineResponse.
"""

from datetime import datetime, timezone
from typing import List, Dict, Any
from backend.models.timeline import TimelineRequest, TimelineResponse, TimelineEvent
from backend.models.kundali import KundaliRequest
from backend.services.kundali.engine import generate_full_kundali
from backend.services.dasha.vimshottari import calc_vimshottari_dashas, get_active_dasha
from backend.services.dasha.timeline import dasha_periods_to_timeline_events
from backend.services.timeline.transits import get_transit_timeline_events
from backend.services.timeline.festivals import get_festival_timeline_events
from backend.services.timeline.eclipses import get_eclipse_timeline_events
from backend.services.muhurat.engine import evaluate_muhurat
from backend.models.muhurat import MuhuratRequest
from backend.services.location import resolve_location
from backend.config import DEFAULT_TIMEZONE


def generate_cosmic_timeline(req: TimelineRequest) -> TimelineResponse:
    """
    Master pipeline generating unified Cosmic Timeline payload.
    """
    # Parse birth date & location
    birth_dt = datetime.strptime(f"{req.dateOfBirth} {req.timeOfBirth}", "%Y-%m-%d %H:%M")
    birth_dt_utc = birth_dt.replace(tzinfo=timezone.utc)

    loc = resolve_location(req.city)
    use_lat = req.latitude or (loc.latitude if loc else 23.1793)
    use_lng = req.longitude or (loc.longitude if loc else 75.7849)
    tz_name = req.timezone or (loc.timezone if loc else DEFAULT_TIMEZONE)
    city_display = loc.displayName if loc else req.city

    # 1. Compute full Kundali (to get Moon sidereal longitude)
    k_req = KundaliRequest(
        fullName=req.fullName,
        dateOfBirth=req.dateOfBirth,
        timeOfBirth=req.timeOfBirth,
        city=req.city,
        latitude=use_lat,
        longitude=use_lng,
        timezone=tz_name,
    )
    kundali = generate_full_kundali(
        req=k_req,
        lat=use_lat,
        lng=use_lng,
        tz_name=tz_name,
        city_display=city_display,
        dt_utc=birth_dt_utc,
    )

    # 2. Get natal Moon longitude for Vimshottari Dasha
    moon_p = next(p for p in kundali.planets if p.id == "moon")
    mahadashas = calc_vimshottari_dashas(moon_p.longitude, birth_dt)

    now_dt = datetime.now()
    current_dasha = get_active_dasha(mahadashas, now_dt)

    all_events: List[TimelineEvent] = []
    active_layers = req.activeLayers or ["birth", "dasha", "transit", "festival", "eclipse", "muhurat"]

    # Layer 1: Birth Marker Event
    if "birth" in active_layers:
        all_events.append(
            TimelineEvent(
                eventId="evt-birth-marker",
                layer="birth",
                title=f"Birth Moment of {req.fullName}",
                sanskritTitle="॥ जन्म समय - काल बिंदु ॥",
                category="Natal Inscription",
                date=req.dateOfBirth,
                dateFormatted=f"{req.dateOfBirth} at {req.timeOfBirth}",
                timeStr=req.timeOfBirth,
                icon="🎂",
                importance="Supreme",
                badgeColor="#D4AF37",
                description=f"Initial cosmic inscription under {kundali.ascendantSign} Lagna at {city_display}.",
                panchangContext=f"Lagna: {kundali.ascendantSign} • Moon Nakshatra: {moon_p.nakshatraSanskrit}",
                chartConnection="Primary origin marker for all Vimshottari Dasha progressions.",
                isBookmarked=True,
                metadata={"birthDate": req.dateOfBirth},
            )
        )

    # Layer 2: Vimshottari Dashas
    if "dasha" in active_layers:
        dasha_events = dasha_periods_to_timeline_events(mahadashas)
        all_events.extend(dasha_events)

    # Layer 3: Transits
    if "transit" in active_layers:
        transit_events = get_transit_timeline_events()
        all_events.extend(transit_events)

    # Layer 4: Eclipses
    if "eclipse" in active_layers:
        eclipse_events = get_eclipse_timeline_events()
        all_events.extend(eclipse_events)

    # Layer 6: Muhurat Recommendations (sample window)
    if "muhurat" in active_layers:
        m_req = MuhuratRequest(
            eventType="general",
            startDate=now_dt.strftime("%Y-%m-%d"),
            endDate=datetime(now_dt.year, now_dt.month, min(28, now_dt.day + 7)).strftime("%Y-%m-%d"),
            city=city_display,
        )
        try:
            m_res = evaluate_muhurat(m_req)
            for cand in m_res.candidates:
                if cand.suitability.score >= 70:
                    all_events.append(
                        TimelineEvent(
                            eventId=cand.candidateId,
                            layer="muhurat",
                            title=f"Auspicious Window ({cand.suitability.level})",
                            sanskritTitle=f"॥ {cand.suitability.levelSanskrit} मुहूर्त ॥",
                            category="Muhurat Window",
                            date=cand.date,
                            dateFormatted=cand.dateFormatted,
                            timeStr=f"{cand.startTime} - {cand.endTime}",
                            icon="📜",
                            importance="High" if cand.suitability.score >= 85 else "Medium",
                            badgeColor=cand.suitability.badgeColor,
                            description=f"Recommended timing window. Tithi: {cand.tithi}, Nakshatra: {cand.nakshatra}.",
                            panchangContext=f"Tithi: {cand.tithi} • Nakshatra: {cand.nakshatra}",
                            chartConnection="Evaluated against classical Parasari & Muhurta Chintamani rules.",
                            isBookmarked=False,
                            metadata={"score": cand.suitability.score},
                        )
                    )
        except Exception:
            pass

    # Sort all events chronologically
    all_events.sort(key=lambda e: e.date)

    report_id = f"KC-TIMELINE-{Date_hash(req.fullName, req.dateOfBirth)}"
    today_str = now_dt.strftime("%Y-%m-%d")

    transparency = {
        "ayanamsha": "Lahiri (Chitrapaksha)",
        "houseSystem": "Whole Sign (Rashi Bhava)",
        "dashaSystem": "Vimshottari (120-Year Lunar Nakshatra Cycle)",
        "generatedTimestamp": now_dt.strftime("%Y-%m-%d %H:%M:%S UTC"),
        "disclaimer": (
            "The Cosmic Timeline integrates astronomical transits, Vimshottari Dasha calculations, "
            "and traditional Panchang events for educational reflection."
        ),
    }

    return TimelineResponse(
        reportId=report_id,
        fullName=req.fullName,
        birthDate=req.dateOfBirth,
        birthLocation=city_display,
        currentDate=today_str,
        activeLayers=active_layers,
        totalEventsCount=len(all_events),
        currentDasha=current_dasha,
        events=all_events,
        transparency=transparency,
    )


def Date_hash(name: str, dob: str) -> str:
    raw = f"{name}_{dob}"
    h = 0
    for ch in raw:
        h = (h * 31 + ord(ch)) & 0xFFFFFFFF
    return f"{h:06X}"
