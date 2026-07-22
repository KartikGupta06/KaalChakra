"""
Pydantic models for Kundali (natal chart) API endpoints.
Maps to frontend GrahaPlacement interface.
"""

from pydantic import BaseModel
from typing import List, Optional


class PlanetPosition(BaseModel):
    """A single planet's calculated position."""
    id: str
    symbol: str
    sanskrit: str
    name: str
    longitude: float  # sidereal longitude in degrees
    sign: str  # e.g. "Leo (सिंह)"
    signIndex: int  # 1-12
    nakshatraName: str
    nakshatraSanskrit: str
    nakshatraIndex: int  # 1-27
    house: int  # 1-12 (based on Lagna)
    degrees: str  # e.g. "15°23'"
    isRetrograde: bool = False


class KundaliRequest(BaseModel):
    """Request body for generating a Kundali."""
    fullName: str = "Observer"
    dateOfBirth: str  # "YYYY-MM-DD"
    timeOfBirth: str  # "HH:MM" (24-hour)
    city: str = "Ujjain"
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    timezone: Optional[str] = None


class KundaliResponse(BaseModel):
    """Complete Kundali response with 9 planetary positions."""
    fullName: str
    dateOfBirth: str
    timeOfBirth: str
    location: str
    latitude: float
    longitude: float
    timezone: str
    ascendantSign: str
    ascendantDegrees: str
    planets: List[PlanetPosition]
