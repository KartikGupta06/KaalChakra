"""
Kalachakra — Kundali Engine: Lagna (Ascendant) Module
======================================================
Calculates high-precision sidereal Ascendant (Lagna) longitude, sign, degrees,
Nakshatra, and pada.
"""

from datetime import datetime
from backend.services.astronomy import (
    datetime_to_jd, get_ayanamsha, rashi_from_longitude,
    nakshatra_from_longitude, format_degrees, init_swe,
)
from backend.models.kundali import AscendantDetails
import swisseph as swe


def calc_lagna_details(dt: datetime, lat: float, lng: float) -> AscendantDetails:
    """
    Calculate the sidereal Lagna (Ascendant) details for a birth datetime and coordinates.
    """
    init_swe()
    jd = datetime_to_jd(dt)
    ayanamsha = get_ayanamsha(jd)

    # Tropical houses calculation (Placidus cusps and ascmc)
    _cusps, ascmc = swe.houses(jd, lat, lng)
    tropical_asc = ascmc[0]
    sidereal_asc = (tropical_asc - ayanamsha) % 360.0

    rashi = rashi_from_longitude(sidereal_asc)
    nak = nakshatra_from_longitude(sidereal_asc)

    return AscendantDetails(
        longitude=round(sidereal_asc, 4),
        sign=f"{rashi['english']} ({rashi['sanskrit']})",
        signIndex=rashi["index"],
        degrees=format_degrees(sidereal_asc),
        nakshatraName=nak["english"],
        nakshatraSanskrit=nak["sanskrit"],
        pada=nak["pada"],
    )
