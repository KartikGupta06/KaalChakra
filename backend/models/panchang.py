"""
Pydantic response models for Panchang API endpoints.
Maps 1:1 to the frontend PanchangData TypeScript interface.
"""

from pydantic import BaseModel
from typing import Optional


class PillarData(BaseModel):
    """A single Panchang pillar (Tithi, Nakshatra, Yoga, Karana, Vaara)."""
    name: str
    sanskrit: str
    meaning: str
    value: str
    sanskritValue: str
    deity: Optional[str] = None
    endTime: Optional[str] = None
    progressPercent: float = 0.0
    note: str = ""


class SolarLunarData(BaseModel):
    """Solar and lunar cycle data."""
    sunrise: str
    sunset: str
    moonrise: str
    moonset: str
    solarNoon: str
    sunSign: str
    moonSign: str
    moonPhaseName: str
    moonPhaseSanskrit: str
    illuminationPercent: float
    lunarAgeDays: float
    paksha: str
    lunarMonth: str
    samvatYear: str
    samvatName: str
    ritu: str
    ayana: str


class DayCharacterData(BaseModel):
    """Interpretation of the day's character."""
    title: str = "The Character of Today"
    sanskritTitle: str = "अद्यतन स्वभाव एवं प्रवाह"
    description: str = ""
    auspiciousNote: str = ""
    color: str = ""
    element: str = ""


class PanchangResponse(BaseModel):
    """Complete Panchang response — matches frontend PanchangData interface."""
    date: str
    sanskritDate: str
    location: str
    vaara: PillarData
    tithi: PillarData
    nakshatra: PillarData
    yoga: PillarData
    karana: PillarData
    cycles: SolarLunarData
    dayCharacter: DayCharacterData
