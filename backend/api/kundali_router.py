"""
Kalachakra — Kundali API Router
==================================
REST endpoint for generating natal chart (Kundali) planetary positions.
"""

from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone, timedelta
from backend.models.kundali import KundaliRequest, KundaliResponse
from backend.services.planetary import calc_planet_positions, calc_ascendant
from backend.services.location import resolve_location
from backend.services.astronomy import rashi_from_longitude, format_degrees
from backend.config import DEFAULT_LATITUDE, DEFAULT_LONGITUDE, DEFAULT_TIMEZONE

router = APIRouter(prefix="/api/kundali", tags=["Kundali"])

IST_OFFSET = 5.5


@router.post("/generate", response_model=KundaliResponse)
def generate_kundali(req: KundaliRequest):
    """
    Generate a Kundali (natal chart) with 9 planetary positions
    for the given birth date, time, and location.
    """
    # Parse date and time
    try:
        birth_dt = datetime.strptime(f"{req.dateOfBirth} {req.timeOfBirth}", "%Y-%m-%d %H:%M")
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid date/time format. Use dateOfBirth: YYYY-MM-DD, timeOfBirth: HH:MM"
        )

    # Resolve location
    location = None
    if req.latitude is not None and req.longitude is not None:
        use_lat = req.latitude
        use_lng = req.longitude
        tz_name = req.timezone or DEFAULT_TIMEZONE
        city_display = req.city
    else:
        location = resolve_location(req.city)
        if location is None:
            raise HTTPException(status_code=404, detail=f"City '{req.city}' not found in database.")
        use_lat = location.latitude
        use_lng = location.longitude
        tz_name = location.timezone
        city_display = location.displayName

    # Convert to UTC
    utc_offset = IST_OFFSET  # TODO: dynamic timezone offset
    ist = timezone(timedelta(hours=utc_offset))
    birth_dt_tz = birth_dt.replace(tzinfo=ist)
    birth_dt_utc = birth_dt_tz.astimezone(timezone.utc)

    try:
        # Calculate Ascendant (Lagna)
        asc_lng = calc_ascendant(birth_dt_utc, use_lat, use_lng)
        asc_rashi = rashi_from_longitude(asc_lng)

        # Calculate all 9 planet positions
        planets = calc_planet_positions(birth_dt_utc, asc_lng)

        return KundaliResponse(
            fullName=req.fullName,
            dateOfBirth=req.dateOfBirth,
            timeOfBirth=req.timeOfBirth,
            location=city_display,
            latitude=use_lat,
            longitude=use_lng,
            timezone=tz_name,
            ascendantSign=f"{asc_rashi['english']} ({asc_rashi['sanskrit']})",
            ascendantDegrees=format_degrees(asc_lng),
            planets=planets,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calculation error: {str(e)}")
