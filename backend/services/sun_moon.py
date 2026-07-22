"""
Kalachakra — Sun & Moon Rise/Set and Moon Phase Service
========================================================
Calculates sunrise, sunset, moonrise, moonset, solar noon, and moon phase
using Swiss Ephemeris rise/transit functions.
"""

import swisseph as swe
import math
from datetime import datetime, timezone, timedelta
from backend.services.astronomy import datetime_to_jd, init_swe, get_ayanamsha


def _jd_to_local_time_str(jd: float, utc_offset_hours: float) -> str:
    """Convert a Julian Day to a local time string like '05:42 AM'."""
    if jd <= 0 or math.isnan(jd):
        return "N/A"
    # Convert JD to UTC datetime components
    year, month, day, hour_frac = swe.revjul(jd)
    total_minutes = hour_frac * 60 + utc_offset_hours * 60
    # Normalize
    total_minutes = total_minutes % (24 * 60)
    h = int(total_minutes // 60)
    m = int(total_minutes % 60)
    period = "AM" if h < 12 else "PM"
    h12 = h % 12
    if h12 == 0:
        h12 = 12
    return f"{h12:02d}:{m:02d} {period}"


def calc_sunrise_sunset(dt: datetime, lat: float, lng: float, utc_offset_hours: float) -> dict:
    """
    Calculate sunrise and sunset for a given date and location.
    Returns dict with 'sunrise', 'sunset', 'solar_noon' as time strings.
    """
    init_swe()
    jd = datetime_to_jd(dt)

    geopos = (lng, lat, 0)  # (longitude, latitude, altitude)

    # Sunrise: upper limb of Sun rises above horizon
    try:
        res_rise = swe.rise_trans(
            jd, swe.SUN, geopos=geopos,
            rsmi=swe.CALC_RISE | swe.BIT_DISC_CENTER
        )
        sunrise_jd = res_rise[1][0] if res_rise[1][0] > 0 else 0
    except Exception:
        sunrise_jd = 0

    # Sunset: upper limb of Sun sets below horizon
    try:
        res_set = swe.rise_trans(
            jd, swe.SUN, geopos=geopos,
            rsmi=swe.CALC_SET | swe.BIT_DISC_CENTER
        )
        sunset_jd = res_set[1][0] if res_set[1][0] > 0 else 0
    except Exception:
        sunset_jd = 0

    # Solar noon: approximate as midpoint of sunrise and sunset
    solar_noon_jd = 0
    if sunrise_jd > 0 and sunset_jd > 0:
        solar_noon_jd = (sunrise_jd + sunset_jd) / 2.0

    return {
        "sunrise": _jd_to_local_time_str(sunrise_jd, utc_offset_hours),
        "sunset": _jd_to_local_time_str(sunset_jd, utc_offset_hours),
        "solar_noon": _jd_to_local_time_str(solar_noon_jd, utc_offset_hours),
    }


def calc_moonrise_moonset(dt: datetime, lat: float, lng: float, utc_offset_hours: float) -> dict:
    """
    Calculate moonrise and moonset for a given date and location.
    """
    init_swe()
    jd = datetime_to_jd(dt)

    geopos = (lng, lat, 0)

    try:
        res_rise = swe.rise_trans(
            jd, swe.MOON, geopos=geopos,
            rsmi=swe.CALC_RISE | swe.BIT_DISC_CENTER
        )
        moonrise_jd = res_rise[1][0] if res_rise[1][0] > 0 else 0
    except Exception:
        moonrise_jd = 0

    try:
        res_set = swe.rise_trans(
            jd, swe.MOON, geopos=geopos,
            rsmi=swe.CALC_SET | swe.BIT_DISC_CENTER
        )
        moonset_jd = res_set[1][0] if res_set[1][0] > 0 else 0
    except Exception:
        moonset_jd = 0

    return {
        "moonrise": _jd_to_local_time_str(moonrise_jd, utc_offset_hours),
        "moonset": _jd_to_local_time_str(moonset_jd, utc_offset_hours),
    }


def calc_moon_phase(jd: float) -> dict:
    """
    Calculate the current moon phase.
    Returns phase name, Sanskrit name, illumination %, and lunar age in days.

    Moon phase is based on the elongation (Moon longitude - Sun longitude).
    """
    init_swe()

    # Get tropical longitudes (for phase calculation, tropical is fine)
    sun_result, _ = swe.calc_ut(jd, swe.SUN)
    moon_result, _ = swe.calc_ut(jd, swe.MOON)

    sun_lng = sun_result[0]
    moon_lng = moon_result[0]

    # Elongation (Moon - Sun), normalized to 0-360
    elongation = (moon_lng - sun_lng) % 360.0

    # Lunar age: one synodic month ~ 29.53 days
    lunar_age = elongation / 360.0 * 29.53

    # Illumination: approximation using elongation
    illumination = (1 - math.cos(math.radians(elongation))) / 2.0 * 100.0

    # Determine phase name based on elongation ranges
    phase_name, phase_sanskrit = _get_phase_name(elongation)

    return {
        "phase_name": phase_name,
        "phase_sanskrit": phase_sanskrit,
        "illumination_percent": round(illumination, 1),
        "lunar_age_days": round(lunar_age, 1),
        "elongation": round(elongation, 2),
    }


def _get_phase_name(elongation: float) -> tuple:
    """Determine moon phase name from elongation degrees."""
    if elongation < 22.5:
        return ("New Moon", "अमावस्या")
    elif elongation < 67.5:
        return ("Waxing Crescent", "शुक्ल पक्ष (बढ़ता)")
    elif elongation < 112.5:
        return ("First Quarter", "शुक्ल अष्टमी")
    elif elongation < 157.5:
        return ("Waxing Gibbous", "शुक्ल पक्ष")
    elif elongation < 202.5:
        return ("Full Moon", "पूर्णिमा")
    elif elongation < 247.5:
        return ("Waning Gibbous", "कृष्ण पक्ष")
    elif elongation < 292.5:
        return ("Last Quarter", "कृष्ण अष्टमी")
    elif elongation < 337.5:
        return ("Waning Crescent", "कृष्ण पक्ष (घटता)")
    else:
        return ("New Moon", "अमावस्या")
