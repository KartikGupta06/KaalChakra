"""
Pydantic models for the Cosmic Timeline (काल प्रवाह) system.
Defines schemas for timeline events, Vimshottari Dasha periods,
planetary transits, festivals, eclipses, requests, and unified response payloads.
"""

from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class TimelineEvent(BaseModel):
    """Canonical single timeline node/event across any layer."""
    eventId: str
    layer: str  # birth, dasha, transit, festival, eclipse, muhurat
    title: str
    sanskritTitle: str
    category: str
    date: str  # YYYY-MM-DD
    dateFormatted: str  # "August 15, 1998"
    timeStr: Optional[str] = None
    icon: str
    importance: str  # Supreme, High, Medium, Subtle
    badgeColor: str
    description: str
    panchangContext: Optional[str] = None
    chartConnection: Optional[str] = None
    isBookmarked: bool = False
    metadata: Dict[str, Any] = {}


class DashaPeriod(BaseModel):
    """Vimshottari Dasha or Antardasha period definition."""
    lord: str
    sanskritLord: str
    lordSymbol: str
    startDate: str  # YYYY-MM-DD
    endDate: str  # YYYY-MM-DD
    durationYears: float
    isCurrent: bool = False
    antardashas: Optional[List["DashaPeriod"]] = None


class TransitEvent(BaseModel):
    """Planetary transit or sign ingress event."""
    planet: str
    sanskritPlanet: str
    fromSign: str
    toSign: str
    ingressDate: str
    isRetrograde: bool = False
    description: str


class FestivalEvent(BaseModel):
    """Vedic festival item."""
    id: str
    name: str
    sanskritName: str
    date: str
    paksha: str
    tithi: str
    significance: str
    deity: str


class EclipseEvent(BaseModel):
    """Solar or Lunar eclipse item."""
    id: str
    type: str  # Solar, Lunar
    typeSanskrit: str
    date: str
    timeWindow: str
    sign: str
    nakshatra: str
    traditionalNotes: str


class TimelineRequest(BaseModel):
    """Request body for generating a unified Cosmic Timeline."""
    fullName: str = "Observer"
    dateOfBirth: str  # YYYY-MM-DD
    timeOfBirth: str  # HH:MM
    city: str = "Ujjain"
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    timezone: Optional[str] = None
    startDate: Optional[str] = None  # YYYY-MM-DD
    endDate: Optional[str] = None  # YYYY-MM-DD
    activeLayers: List[str] = ["birth", "dasha", "transit", "festival", "eclipse", "muhurat"]


class TimelineResponse(BaseModel):
    """Canonical unified Cosmic Timeline response payload."""
    reportId: str
    fullName: str
    birthDate: str
    birthLocation: str
    currentDate: str
    activeLayers: List[str]
    totalEventsCount: int
    currentDasha: Dict[str, Any]
    events: List[TimelineEvent]
    transparency: Dict[str, Any]
