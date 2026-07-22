"""
Kalachakra — Core Astronomical Service
========================================
Julian Day conversion, Ayanamsha, Sidereal longitude, Rashi & Nakshatra mapping.
Uses Swiss Ephemeris (pyswisseph) for high-precision calculations.
"""

import swisseph as swe
from datetime import datetime, timezone
from backend.config import (
    AYANAMSHA_MODE,
    RASHI_NAMES,
    NAKSHATRA_NAMES,
    DEGREES_PER_RASHI,
    DEGREES_PER_NAKSHATRA,
)


def init_swe():
    """Initialize Swiss Ephemeris with Lahiri ayanamsha."""
    swe.set_sid_mode(AYANAMSHA_MODE)


def datetime_to_jd(dt: datetime) -> float:
    """
    Convert a datetime object to Julian Day Number.
    The datetime should be in UTC.
    """
    # Ensure UTC
    if dt.tzinfo is not None:
        dt = dt.astimezone(timezone.utc)

    hour_decimal = dt.hour + dt.minute / 60.0 + dt.second / 3600.0
    jd = swe.julday(dt.year, dt.month, dt.day, hour_decimal)
    return jd


def get_ayanamsha(jd: float) -> float:
    """Get Lahiri ayanamsha value for a given Julian Day."""
    init_swe()
    return swe.get_ayanamsa_ut(jd)


def get_tropical_longitude(jd: float, planet_id: int) -> float:
    """
    Get the tropical (western) longitude of a planet at the given JD.
    Returns longitude in degrees (0-360).
    """
    result, _flag = swe.calc_ut(jd, planet_id)
    return result[0]  # longitude


def get_sidereal_longitude(jd: float, planet_id: int) -> float:
    """
    Get the sidereal (Vedic/Indian) longitude of a planet.
    Tropical longitude minus Ayanamsha, normalized to 0-360.
    """
    tropical_lng = get_tropical_longitude(jd, planet_id)
    ayanamsha = get_ayanamsha(jd)
    sidereal_lng = (tropical_lng - ayanamsha) % 360.0
    return sidereal_lng


def rashi_from_longitude(longitude: float) -> dict:
    """
    Determine the Rashi (zodiac sign) from a sidereal longitude.
    Returns the rashi entry from config.
    """
    rashi_index = int(longitude / DEGREES_PER_RASHI)  # 0-11
    rashi = RASHI_NAMES[rashi_index % 12]
    degrees_in_sign = longitude % DEGREES_PER_RASHI
    return {
        **rashi,
        "degrees_in_sign": degrees_in_sign,
    }


def nakshatra_from_longitude(longitude: float) -> dict:
    """
    Determine the Nakshatra (lunar mansion) from a sidereal longitude.
    Returns the nakshatra entry from config.
    """
    nak_index = int(longitude / DEGREES_PER_NAKSHATRA)  # 0-26
    nakshatra = NAKSHATRA_NAMES[nak_index % 27]
    degrees_in_nakshatra = longitude % DEGREES_PER_NAKSHATRA
    pada = int(degrees_in_nakshatra / (DEGREES_PER_NAKSHATRA / 4)) + 1  # 1-4
    return {
        **nakshatra,
        "pada": pada,
        "degrees_in_nakshatra": degrees_in_nakshatra,
    }


def format_degrees(longitude: float) -> str:
    """Format a longitude as degrees°minutes' string."""
    degrees = int(longitude % 30)
    minutes = int((longitude % 30 - degrees) * 60)
    return f"{degrees}°{abs(minutes):02d}'"


def get_sun_longitude(jd: float) -> float:
    """Get sidereal Sun longitude."""
    return get_sidereal_longitude(jd, swe.SUN)


def get_moon_longitude(jd: float) -> float:
    """Get sidereal Moon longitude."""
    return get_sidereal_longitude(jd, swe.MOON)
