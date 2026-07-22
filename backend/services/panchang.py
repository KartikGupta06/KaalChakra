"""
Kalachakra — Panchang Calculation Service
===========================================
Calculates the five pillars of the Vedic Panchang:
  1. Tithi    — Lunar day (Moon - Sun elongation / 12°)
  2. Nakshatra — Lunar mansion (Moon's sidereal position / 13°20')
  3. Yoga     — Sun + Moon combination ((Sun + Moon) / 13°20')
  4. Karana   — Half-Tithi
  5. Vaara    — Weekday

Plus: Paksha, Lunar Month, Samvat, Ritu, Ayana, and day interpretation.
"""

import math
from datetime import datetime, timezone, timedelta
from backend.config import (
    TITHI_NAMES, TITHI_NAMES_SANSKRIT, TITHI_DEITIES,
    NAKSHATRA_NAMES, YOGA_NAMES, KARANA_NAMES,
    VAARA_NAMES, LUNAR_MONTHS, RITU_NAMES,
    SAMVAT_OFFSET, SAMVAT_YEAR_NAMES, RASHI_NAMES,
    DEGREES_PER_TITHI, DEGREES_PER_NAKSHATRA, DEGREES_PER_YOGA,
)
from backend.services.astronomy import (
    datetime_to_jd, get_sun_longitude, get_moon_longitude,
    rashi_from_longitude, nakshatra_from_longitude, init_swe,
)
from backend.services.sun_moon import (
    calc_sunrise_sunset, calc_moonrise_moonset, calc_moon_phase,
)
from backend.models.panchang import (
    PanchangResponse, PillarData, SolarLunarData, DayCharacterData,
)


def calc_tithi(jd: float) -> dict:
    """
    Calculate the Tithi (lunar day).
    Tithi = (Moon_lng - Sun_lng) / 12°
    There are 30 tithis per lunar month.
    """
    sun_lng = get_sun_longitude(jd)
    moon_lng = get_moon_longitude(jd)

    diff = (moon_lng - sun_lng) % 360.0
    tithi_index = int(diff / DEGREES_PER_TITHI)  # 0-29
    tithi_progress = (diff % DEGREES_PER_TITHI) / DEGREES_PER_TITHI * 100.0

    tithi_name_en = TITHI_NAMES[tithi_index % 30]
    tithi_name_sa = TITHI_NAMES_SANSKRIT[tithi_index % 30]
    deity = TITHI_DEITIES[tithi_index % 30]

    # Paksha
    paksha = "Shukla" if tithi_index < 15 else "Krishna"
    paksha_num = (tithi_index % 15) + 1

    return {
        "index": tithi_index,
        "name": f"{paksha} {tithi_name_en}",
        "sanskrit": f"{paksha} {tithi_name_sa}",
        "number": paksha_num,
        "paksha": paksha,
        "deity": deity,
        "progress": round(tithi_progress, 1),
    }


def calc_nakshatra(jd: float) -> dict:
    """
    Calculate the Nakshatra based on the Moon's sidereal longitude.
    """
    moon_lng = get_moon_longitude(jd)
    nak_data = nakshatra_from_longitude(moon_lng)
    nak_index = nak_data["index"] - 1  # 0-based
    progress = (moon_lng % DEGREES_PER_NAKSHATRA) / DEGREES_PER_NAKSHATRA * 100.0

    return {
        "index": nak_index,
        "name": nak_data["english"],
        "sanskrit": nak_data["sanskrit"],
        "deity": nak_data["deity"],
        "pada": nak_data["pada"],
        "progress": round(progress, 1),
    }


def calc_yoga(jd: float) -> dict:
    """
    Calculate the Yoga.
    Yoga = (Sun_lng + Moon_lng) / 13°20'
    There are 27 yogas.
    """
    sun_lng = get_sun_longitude(jd)
    moon_lng = get_moon_longitude(jd)

    combined = (sun_lng + moon_lng) % 360.0
    yoga_index = int(combined / DEGREES_PER_YOGA)  # 0-26
    progress = (combined % DEGREES_PER_YOGA) / DEGREES_PER_YOGA * 100.0

    yoga = YOGA_NAMES[yoga_index % 27]

    return {
        "index": yoga_index,
        "name": yoga["english"],
        "sanskrit": yoga["sanskrit"],
        "progress": round(progress, 1),
    }


def calc_karana(jd: float) -> dict:
    """
    Calculate the Karana (half-tithi).
    There are 60 karanas per lunar month (2 per tithi).
    7 repeating (Bava through Vishti) + 4 fixed.
    """
    sun_lng = get_sun_longitude(jd)
    moon_lng = get_moon_longitude(jd)

    diff = (moon_lng - sun_lng) % 360.0
    karana_index = int(diff / 6.0)  # 0-59

    # Map to the 11 karana names:
    # First karana is Kimstughna (index 10 in list), then 7 repeating cycle
    if karana_index == 0:
        karana = KARANA_NAMES[10]  # Kimstughna
    elif karana_index <= 56:
        cycle_idx = (karana_index - 1) % 7
        karana = KARANA_NAMES[cycle_idx]
    elif karana_index == 57:
        karana = KARANA_NAMES[7]  # Shakuni
    elif karana_index == 58:
        karana = KARANA_NAMES[8]  # Chatushpada
    else:
        karana = KARANA_NAMES[9]  # Nagava

    progress = (diff % 6.0) / 6.0 * 100.0

    return {
        "index": karana_index,
        "name": karana["english"],
        "sanskrit": karana["sanskrit"],
        "progress": round(progress, 1),
    }


def calc_vaara(dt: datetime) -> dict:
    """
    Calculate the Vaara (weekday).
    Python weekday: Mon=0 ... Sun=6
    """
    weekday = dt.weekday()  # 0=Mon, 6=Sun
    vaara = VAARA_NAMES[weekday]

    # Progress through the day (approximate)
    progress = (dt.hour * 60 + dt.minute) / (24 * 60) * 100.0

    return {
        "index": weekday,
        "name": vaara["english"],
        "sanskrit": vaara["sanskrit"],
        "deity": vaara["deity"],
        "planet": vaara["planet"],
        "progress": round(progress, 1),
    }


def calc_paksha(tithi_index: int) -> str:
    """Determine Shukla or Krishna Paksha from tithi index."""
    if tithi_index < 15:
        return "Shukla Paksha (शुक्ल पक्ष)"
    return "Krishna Paksha (कृष्ण पक्ष)"


def calc_lunar_month(jd: float) -> dict:
    """
    Approximate the current Hindu lunar month.
    Based on the Sun's sidereal longitude (solar month determines lunar month).
    """
    sun_lng = get_sun_longitude(jd)
    month_index = int(sun_lng / 30.0) % 12  # 0-11

    # Map solar sign to lunar month (approximately):
    # Aries (0) -> Chaitra (index 0), Taurus (1) -> Vaishakha (1), etc.
    lunar_month = LUNAR_MONTHS[month_index]
    return lunar_month


def calc_samvat(year: int) -> dict:
    """Calculate Vikram Samvat year and its traditional name."""
    samvat_year = year + SAMVAT_OFFSET
    name_index = (samvat_year - 1) % 60  # 60-year Jovian cycle
    samvat_name = SAMVAT_YEAR_NAMES[name_index]
    return {
        "year": samvat_year,
        "name": samvat_name,
    }


def calc_ritu(lunar_month_index: int) -> str:
    """Determine the Ritu (season) from the lunar month index (1-12)."""
    for ritu in RITU_NAMES:
        if lunar_month_index in ritu["months"]:
            return f"{ritu['english']} ({ritu['sanskrit']})"
    return "Unknown"


def calc_ayana(jd: float) -> str:
    """
    Determine Uttarayana or Dakshinayana.
    Uttarayana: Sun in Makara (Capricorn) to Mithuna (Gemini) — roughly Jan-Jun
    Dakshinayana: Sun in Karka (Cancer) to Dhanu (Sagittarius) — roughly Jul-Dec
    """
    sun_lng = get_sun_longitude(jd)
    sun_rashi_index = int(sun_lng / 30.0)  # 0-11

    # Capricorn=9, Aquarius=10, Pisces=11, Aries=0, Taurus=1, Gemini=2
    if sun_rashi_index in [9, 10, 11, 0, 1, 2]:
        return "Uttarayana (उत्तरायण)"
    return "Dakshinayana (दक्षिणायन)"


def _generate_day_character(vaara: dict, tithi: dict, nakshatra: dict, yoga: dict) -> DayCharacterData:
    """Generate an interpretation of the day's character based on Panchang pillars."""
    vaara_note = f"governed by {vaara['deity']}"
    tithi_note = f"under the {tithi['paksha']} {TITHI_NAMES[tithi['index'] % 30]} tithi"
    nak_note = f"with the Moon traversing {nakshatra['name']} Nakshatra"
    yoga_note = f"and {yoga['name']} Yoga"

    description = (
        f"This day is {vaara_note}, {tithi_note}, "
        f"{nak_note}, {yoga_note}. "
        f"The celestial alignment invites mindful reflection and purposeful action."
    )

    auspicious_note = (
        f"Favorable for activities aligned with {nakshatra['deity']}'s blessings. "
        f"The {yoga['name']} Yoga enhances spiritual endeavors and scholarly pursuits."
    )

    # Elemental correspondence based on nakshatra
    elements = ["Agni (Fire)", "Prithvi (Earth)", "Vayu (Wind)", "Jala (Water)", "Akasha (Ether)"]
    element = elements[nakshatra["index"] % 5]

    colors = ["Saffron & Gold", "Deep Crimson", "Royal Indigo", "Temple Copper", "Emerald & Brass"]
    color = colors[nakshatra["index"] % 5]

    return DayCharacterData(
        title="The Character of Today",
        sanskritTitle="अद्यतन स्वभाव एवं प्रवाह",
        description=description,
        auspiciousNote=auspicious_note,
        color=color,
        element=element,
    )


def get_full_panchang(
    dt: datetime,
    lat: float,
    lng: float,
    tz_name: str,
    utc_offset_hours: float,
    city_display: str,
) -> PanchangResponse:
    """
    Master orchestrator: compute the complete Panchang for a given date/location.
    Returns a PanchangResponse matching the frontend PanchangData interface.
    """
    init_swe()

    # Convert local time to UTC for calculations
    dt_utc = dt.astimezone(timezone.utc) if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
    jd = datetime_to_jd(dt_utc)

    # Calculate all five pillars
    tithi = calc_tithi(jd)
    nakshatra = calc_nakshatra(jd)
    yoga = calc_yoga(jd)
    karana = calc_karana(jd)
    vaara = calc_vaara(dt)

    # Solar / Lunar cycle data
    sun_rise_set = calc_sunrise_sunset(dt_utc, lat, lng, utc_offset_hours)
    moon_rise_set = calc_moonrise_moonset(dt_utc, lat, lng, utc_offset_hours)
    moon_phase = calc_moon_phase(jd)

    # Rashi of Sun and Moon
    sun_lng = get_sun_longitude(jd)
    moon_lng = get_moon_longitude(jd)
    sun_rashi = rashi_from_longitude(sun_lng)
    moon_rashi = rashi_from_longitude(moon_lng)

    # Lunar month, Samvat, Ritu, Ayana
    lunar_month = calc_lunar_month(jd)
    samvat = calc_samvat(dt.year)
    ritu = calc_ritu(lunar_month["index"])
    ayana = calc_ayana(jd)
    paksha = calc_paksha(tithi["index"])

    # Day character interpretation
    day_character = _generate_day_character(vaara, tithi, nakshatra, yoga)

    # Format date strings
    date_str = dt.strftime("%A, %B %d, %Y")
    sanskrit_date = f"{lunar_month['sanskrit']} मास, विक्रम संवत् {samvat['year']}"

    # Build response
    return PanchangResponse(
        date=date_str,
        sanskritDate=sanskrit_date,
        location=city_display,
        vaara=PillarData(
            name=f"{vaara['name']} ({vaara['sanskrit']})",
            sanskrit=vaara["sanskrit"],
            meaning=f"Governed by {vaara['deity']}",
            value=f"{vaara['name']}",
            sanskritValue=f"{vaara['sanskrit']}",
            deity=vaara["deity"],
            progressPercent=vaara["progress"],
            note=f"Planetary lord: {vaara['planet']}. Favorable for activities aligned with {vaara['deity']}.",
        ),
        tithi=PillarData(
            name=tithi["name"],
            sanskrit=tithi["sanskrit"],
            meaning=f"Tithi #{tithi['number']} of {tithi['paksha']} Paksha",
            value=f"{TITHI_NAMES[tithi['index'] % 30]} ({TITHI_NAMES_SANSKRIT[tithi['index'] % 30]})",
            sanskritValue=f"{TITHI_NAMES_SANSKRIT[tithi['index'] % 30]} तिथि",
            deity=tithi["deity"],
            progressPercent=tithi["progress"],
            note=f"The {tithi['name']} tithi is presided by {tithi['deity']}.",
        ),
        nakshatra=PillarData(
            name=f"{nakshatra['name']} Nakshatra",
            sanskrit=f"{nakshatra['sanskrit']} नक्षत्र",
            meaning=f"Lunar Mansion #{nakshatra['index'] + 1}",
            value=f"{nakshatra['name']} ({nakshatra['sanskrit']})",
            sanskritValue=nakshatra["sanskrit"],
            deity=nakshatra["deity"],
            progressPercent=nakshatra["progress"],
            note=f"Presided by {nakshatra['deity']}. Pada {nakshatra['pada']}.",
        ),
        yoga=PillarData(
            name=f"{yoga['name']} Yoga",
            sanskrit=f"{yoga['sanskrit']} योग",
            meaning=f"Solar-Lunar Combination #{yoga['index'] + 1}",
            value=f"{yoga['name']} ({yoga['sanskrit']})",
            sanskritValue=f"{yoga['sanskrit']} योग",
            progressPercent=yoga["progress"],
            note=f"The {yoga['name']} Yoga influences the day's cosmic energy.",
        ),
        karana=PillarData(
            name=f"{karana['name']} Karana",
            sanskrit=f"{karana['sanskrit']} करण",
            meaning="Half-Tithi Period",
            value=f"{karana['name']} ({karana['sanskrit']})",
            sanskritValue=karana["sanskrit"],
            progressPercent=karana["progress"],
            note=f"Current Karana: {karana['name']}.",
        ),
        cycles=SolarLunarData(
            sunrise=sun_rise_set["sunrise"],
            sunset=sun_rise_set["sunset"],
            moonrise=moon_rise_set["moonrise"],
            moonset=moon_rise_set["moonset"],
            solarNoon=sun_rise_set["solar_noon"],
            sunSign=f"{sun_rashi['english']} ({sun_rashi['sanskrit']})",
            moonSign=f"{moon_rashi['english']} ({moon_rashi['sanskrit']})",
            moonPhaseName=moon_phase["phase_name"],
            moonPhaseSanskrit=moon_phase["phase_sanskrit"],
            illuminationPercent=moon_phase["illumination_percent"],
            lunarAgeDays=moon_phase["lunar_age_days"],
            paksha=paksha,
            lunarMonth=f"{lunar_month['english']} ({lunar_month['sanskrit']})",
            samvatYear=f"Vikram Samvat {samvat['year']}",
            samvatName=samvat["name"],
            ritu=ritu,
            ayana=ayana,
        ),
        dayCharacter=day_character,
    )
