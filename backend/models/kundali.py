"""
Pydantic models for Kundali (natal chart) API endpoints.
Provides complete structured schemas for birth info, Lagna, houses,
9 Navagraha positions, D9 Navamsa chart, dignities, aspects, and Yogas.
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
    pada: int = 1  # 1-4
    house: int  # 1-12 (based on Lagna)
    degrees: str  # e.g. "15°23'"
    isRetrograde: bool = False
    dignity: Optional[str] = None  # Exalted, Debilitated, Own Sign, Friend, Enemy, Neutral


class AscendantDetails(BaseModel):
    """Calculated Ascendant (Lagna) details."""
    longitude: float
    sign: str
    signIndex: int
    degrees: str
    nakshatraName: str
    nakshatraSanskrit: str
    pada: int


class HouseDetails(BaseModel):
    """Structure for a single Bhava (house)."""
    houseNumber: int  # 1 to 12
    rashiName: str
    rashiSanskrit: str
    startDegree: str
    endDegree: str
    lordPlanet: str
    containedPlanets: List[str]  # Planet IDs


class NavamsaPosition(BaseModel):
    """D9 Navamsa placement for a planet or Lagna."""
    id: str
    name: str
    sanskrit: str
    navamsaSign: str
    navamsaSignIndex: int
    navamsaHouse: int


class AspectDetails(BaseModel):
    """Vedic planetary aspect (Drishti)."""
    aspectingPlanet: str
    aspectedPlanetOrHouse: str
    aspectType: str  # e.g. "7th Full Drishti", "Mars 4th Special Drishti"
    strength: float = 1.0


class YogaDetails(BaseModel):
    """Vedic astrological combination (Yoga)."""
    id: str
    name: str
    sanskritName: str
    description: str
    contributingPlanets: List[str]
    isBenefic: bool = True
    strength: str = "Medium"


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
    """Canonical Kundali response object."""
    fullName: str
    dateOfBirth: str
    timeOfBirth: str
    location: str
    latitude: float
    longitude: float
    timezone: str
    ascendantSign: str
    ascendantDegrees: str
    ascendant: AscendantDetails
    planets: List[PlanetPosition]
    houses: List[HouseDetails]
    navamsa: List[NavamsaPosition]
    aspects: List[AspectDetails]
    yogas: List[YogaDetails]
