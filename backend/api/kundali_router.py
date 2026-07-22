"""
Kalachakra — Kundali API Router
==================================
REST endpoint for generating complete Vedic natal chart (Janma Kundali).
"""

from fastapi import APIRouter, HTTPException
from datetime import datetime, timezone, timedelta
from backend.models.kundali import KundaliRequest, KundaliResponse
from backend.services.kundali.engine import generate_full_kundali
from backend.services.location import resolve_location
from backend.config import DEFAULT_TIMEZONE

router = APIRouter(prefix="/api/kundali", tags=["Kundali"])

IST_OFFSET = 5.5


@router.post("/generate", response_model=KundaliResponse)
def generate_kundali_endpoint(req: KundaliRequest):
    """
    Generate a complete Vedic Janma Kundali with Lagna, Houses, 9 Navagraha positions,
    D9 Navamsa placements, Dignities, Aspects, and Yogas.
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
    if req.latitude is not None and req.longitude is not None:
        use_lat = req.latitude
        use_lng = req.longitude
        tz_name = req.timezone or DEFAULT_TIMEZONE
        city_display = req.city
    else:
        location = resolve_location(req.city)
        if location is None:
            # Fallback to Ujjain coordinates if city search yields no exact match
            use_lat = 23.1793
            use_lng = 75.7849
            tz_name = DEFAULT_TIMEZONE
            city_display = f"{req.city} (Observatory)"
        else:
            use_lat = location.latitude
            use_lng = location.longitude
            tz_name = location.timezone
            city_display = location.displayName

    # Convert to UTC
    utc_offset = IST_OFFSET  # Default IST offset
    ist = timezone(timedelta(hours=utc_offset))
    birth_dt_tz = birth_dt.replace(tzinfo=ist)
    birth_dt_utc = birth_dt_tz.astimezone(timezone.utc)

    try:
        return generate_full_kundali(
            req=req,
            lat=use_lat,
            lng=use_lng,
            tz_name=tz_name,
            city_display=city_display,
            dt_utc=birth_dt_utc,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Kundali Calculation error: {str(e)}")
