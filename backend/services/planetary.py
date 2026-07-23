"""
Kalachakra — Planetary Position Service
=========================================
Calculates sidereal positions of the 9 Navagrahas using Swiss Ephemeris.
"""

import swisseph as swe
from datetime import datetime, timezone
from typing import List
from backend.config import GRAHA_INFO, RASHI_NAMES
from backend.services.astronomy import (
    datetime_to_jd, get_sidereal_longitude, rashi_from_longitude,
    nakshatra_from_longitude, format_degrees, init_swe, get_ayanamsha,
)
from backend.models.kundali import PlanetPosition


def calc_planet_positions(dt: datetime, ascendant_lng: float = 0.0) -> List[PlanetPosition]:
    """
    Calculate sidereal positions of all 9 Navagrahas.

    Args:
        dt: UTC datetime for the calculation.
        ascendant_lng: Sidereal longitude of the ascendant (Lagna) for house calculation.

    Returns:
        List of PlanetPosition objects.
    """
    init_swe()
    jd = datetime_to_jd(dt)
    positions: List[PlanetPosition] = []

    rahu_lng = 0.0

    for graha in GRAHA_INFO:
        if graha["id"] == "ketu":
            # Ketu is diametrically opposite to Rahu
            sid_lng = (rahu_lng + 180.0) % 360.0
        else:
            sid_lng = get_sidereal_longitude(jd, graha["swe_id"])
            if graha["id"] == "rahu":
                rahu_lng = sid_lng

        rashi = rashi_from_longitude(sid_lng)
        nak = nakshatra_from_longitude(sid_lng)

        asc_sign_idx = rashi_from_longitude(ascendant_lng)["index"] if ascendant_lng is not None else 1
        rashi_idx = rashi["index"]
        house = ((rashi_idx - asc_sign_idx) % 12) + 1

        # Retrograde detection (for real planets, not nodes)
        is_retro = False
        if graha["swe_id"] >= 0 and graha["id"] not in ("sun", "moon", "rahu"):
            result, _ = swe.calc_ut(jd, graha["swe_id"])
            # Speed in longitude (result[3]) — negative means retrograde
            if len(result) > 3 and result[3] < 0:
                is_retro = True

        positions.append(PlanetPosition(
            id=graha["id"],
            symbol=graha["symbol"],
            sanskrit=graha["sanskrit"],
            name=graha["english"],
            longitude=round(sid_lng, 4),
            sign=f"{rashi['english']} ({rashi['sanskrit']})",
            signIndex=rashi["index"],
            nakshatraName=nak["english"],
            nakshatraSanskrit=nak["sanskrit"],
            nakshatraIndex=nak["index"],
            house=house,
            degrees=format_degrees(sid_lng),
            isRetrograde=is_retro,
        ))

    return positions


def calc_ascendant(dt: datetime, lat: float, lng: float) -> float:
    """
    Calculate the sidereal ascendant (Lagna) longitude.
    """
    init_swe()
    jd = datetime_to_jd(dt)
    ayanamsha = get_ayanamsha(jd)

    # Calculate houses using Placidus system
    cusps, ascmc = swe.houses(jd, lat, lng)
    # ascmc[0] is the Ascendant in tropical longitude
    tropical_asc = ascmc[0]
    sidereal_asc = (tropical_asc - ayanamsha) % 360.0

    return sidereal_asc
