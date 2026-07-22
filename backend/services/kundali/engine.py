"""
Kalachakra — Kundali Engine: Master Orchestrator (engine.py)
============================================================
Integrates Lagna, Houses, Navamsa, Dignities, Aspects, and Yogas
into a canonical KundaliResponse.
"""

from datetime import datetime, timezone, timedelta
from backend.services.planetary import calc_planet_positions
from backend.services.kundali.lagna import calc_lagna_details
from backend.services.kundali.houses import calc_whole_sign_houses
from backend.services.kundali.navamsa import calc_navamsa_chart
from backend.services.kundali.dignities import calc_planetary_dignity
from backend.services.kundali.aspects import calc_vedic_aspects
from backend.services.kundali.yogas import detect_yogas
from backend.services.kundali.strengths import evaluate_planetary_strengths
from backend.models.kundali import KundaliRequest, KundaliResponse, PlanetPosition


def generate_full_kundali(
    req: KundaliRequest,
    lat: float,
    lng: float,
    tz_name: str,
    city_display: str,
    dt_utc: datetime,
) -> KundaliResponse:
    """
    Master computation pipeline for generating a full Janma Kundali.
    """
    # 1. Ascendant (Lagna)
    asc = calc_lagna_details(dt_utc, lat, lng)

    # 2. Planetary positions
    planets = calc_planet_positions(dt_utc, asc.longitude)

    # 3. Dignities
    for p in planets:
        p.dignity = calc_planetary_dignity(p.id, p.signIndex)

    # 4. Strength evaluation
    planets = evaluate_planetary_strengths(planets)

    # 5. Houses (Whole Sign)
    houses = calc_whole_sign_houses(asc.signIndex, planets)

    # 6. Navamsa D9 Chart
    navamsa = calc_navamsa_chart(asc, planets)

    # 7. Aspects (Drishti)
    aspects = calc_vedic_aspects(planets)

    # 8. Yogas Detection
    yogas = detect_yogas(planets, houses)

    return KundaliResponse(
        fullName=req.fullName,
        dateOfBirth=req.dateOfBirth,
        timeOfBirth=req.timeOfBirth,
        location=city_display,
        latitude=lat,
        longitude=lng,
        timezone=tz_name,
        ascendantSign=asc.sign,
        ascendantDegrees=asc.degrees,
        ascendant=asc,
        planets=planets,
        houses=houses,
        navamsa=navamsa,
        aspects=aspects,
        yogas=yogas,
    )
