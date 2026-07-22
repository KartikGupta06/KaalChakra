"""
Kalachakra — Location API Router
====================================
REST endpoint for searching the built-in city database.
"""

from fastapi import APIRouter, Query
from typing import List
from backend.models.location import LocationResolved
from backend.services.location import search_cities

router = APIRouter(prefix="/api/location", tags=["Location"])


@router.get("/search", response_model=List[LocationResolved])
def search_locations(
    q: str = Query(default="", description="Search query for city name"),
):
    """
    Search the built-in city database.
    Returns matching cities with coordinates and timezone.
    """
    return search_cities(q)
