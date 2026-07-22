"""
Pydantic models for location resolution.
"""

from pydantic import BaseModel
from typing import Optional


class LocationResolved(BaseModel):
    """A resolved location with coordinates and timezone."""
    city: str
    state: str
    country: str
    displayName: str
    latitude: float
    longitude: float
    timezone: str
    elevation: Optional[float] = None
