"""
Pydantic models for the Muhurat Engine (recommendation layer).
Defines schemas for event types, evaluation requests, suitability scores,
individual candidate windows, and full response payloads.
"""

from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class EventRuleInfo(BaseModel):
    """Metadata for a supported event type in the catalog."""
    id: str
    name: str
    sanskritName: str
    icon: str
    description: str
    favorableTithis: List[str]
    favorableNakshatras: List[str]
    favorableVaaras: List[str]


class SuitabilityScore(BaseModel):
    """Suitability score breakdown for a candidate time window."""
    score: int  # 0 to 100
    level: str  # Excellent, Good, Acceptable, Avoid
    levelSanskrit: str  # अति उत्तम, उत्तम, मध्यम, वर्ज्य
    badgeColor: str  # Hex or Tailwind color token
    positiveFactors: List[str]
    negativeFactors: List[str]


class MuhuratCandidate(BaseModel):
    """Evaluated candidate date and time window."""
    candidateId: str
    date: str  # "YYYY-MM-DD"
    dateFormatted: str  # "Monday, August 15, 2026"
    sanskritDate: str  # e.g. "श्रावण मास, विक्रम संवत् २०८३"
    startTime: str  # "06:00 AM"
    endTime: str  # "12:00 PM"
    tithi: str
    nakshatra: str
    yoga: str
    karana: str
    vaara: str
    paksha: str
    suitability: SuitabilityScore
    isBookmarked: bool = False


class MuhuratRequest(BaseModel):
    """Request payload for evaluating Muhurats across a date range."""
    eventType: str = "general"  # marriage, housewarming, business, vehicle, property, travel, interview, naming, general
    startDate: str  # "YYYY-MM-DD"
    endDate: str  # "YYYY-MM-DD"
    city: str = "Ujjain"
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    timezone: Optional[str] = None


class MuhuratResponse(BaseModel):
    """Canonical Muhurat response payload."""
    reportId: str
    eventType: str
    eventName: str
    eventSanskrit: str
    location: str
    startDate: str
    endDate: str
    evaluatedDaysCount: int
    excellentCount: int
    goodCount: int
    acceptableCount: int
    avoidCount: int
    candidates: List[MuhuratCandidate]
    transparency: Dict[str, Any]
