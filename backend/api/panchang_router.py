"""
Kalachakra — Panchang API Router
===================================
REST endpoints for Panchang calculations.
"""

from fastapi import APIRouter, Query, HTTPException
from datetime import datetime, timezone, timedelta
from backend.services.panchang import get_full_panchang
from backend.services.location import resolve_location
from backend.cache.panchang_cache import get_cached, set_cached
from backend.config import DEFAULT_LATITUDE, DEFAULT_LONGITUDE, DEFAULT_TIMEZONE, DEFAULT_CITY

router = APIRouter(prefix="/api/panchang", tags=["Panchang"])

# IST offset
IST_OFFSET = 5.5


@router.get("/today")
def get_today_panchang(
    city: str = Query(default="Ujjain", description="City name for location"),
    lat: float = Query(default=None, description="Override latitude"),
    lng: float = Query(default=None, description="Override longitude"),
):
    """
    Get the Panchang for today based on the specified city or coordinates.
    """
    # Resolve location
    location = resolve_location(city) if lat is None else None
    use_lat = lat if lat is not None else (location.latitude if location else DEFAULT_LATITUDE)
    use_lng = lng if lng is not None else (location.longitude if location else DEFAULT_LONGITUDE)
    tz_name = location.timezone if location else DEFAULT_TIMEZONE
    city_display = location.displayName if location else city

    # UTC offset for IST
    utc_offset = IST_OFFSET  # TODO: resolve from timezone dynamically

    # Current time in IST
    ist = timezone(timedelta(hours=utc_offset))
    now = datetime.now(ist)
    date_str = now.strftime("%Y-%m-%d")

    # Check cache
    cached = get_cached(date_str, use_lat, use_lng)
    if cached:
        return cached

    try:
        result = get_full_panchang(now, use_lat, use_lng, tz_name, utc_offset, city_display)
        result_dict = result.model_dump()
        set_cached(date_str, use_lat, use_lng, result_dict)
        return result_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calculation error: {str(e)}")


@router.get("/date")
def get_panchang_for_date(
    date: str = Query(..., description="Date in YYYY-MM-DD format"),
    city: str = Query(default="Ujjain", description="City name"),
    lat: float = Query(default=None, description="Override latitude"),
    lng: float = Query(default=None, description="Override longitude"),
):
    """
    Get the Panchang for a specific date and location.
    """
    # Parse date
    try:
        parsed_date = datetime.strptime(date, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")

    # Resolve location
    location = resolve_location(city) if lat is None else None
    use_lat = lat if lat is not None else (location.latitude if location else DEFAULT_LATITUDE)
    use_lng = lng if lng is not None else (location.longitude if location else DEFAULT_LONGITUDE)
    tz_name = location.timezone if location else DEFAULT_TIMEZONE
    city_display = location.displayName if location else city

    utc_offset = IST_OFFSET

    # Set to noon local time for the date
    ist = timezone(timedelta(hours=utc_offset))
    dt = parsed_date.replace(hour=12, minute=0, second=0, tzinfo=ist)

    # Check cache
    cached = get_cached(date, use_lat, use_lng)
    if cached:
        return cached

    try:
        result = get_full_panchang(dt, use_lat, use_lng, tz_name, utc_offset, city_display)
        result_dict = result.model_dump()
        set_cached(date, use_lat, use_lng, result_dict)
        return result_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calculation error: {str(e)}")
