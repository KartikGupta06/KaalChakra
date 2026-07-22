"""
Kalachakra — Cosmic Timeline API Router (timeline_router.py)
=============================================================
REST endpoints for generating the unified Cosmic Timeline payload, festival calendar, and eclipse register.
"""

from fastapi import APIRouter, HTTPException
from typing import List
from backend.models.timeline import (
    TimelineRequest, TimelineResponse, FestivalEvent, EclipseEvent
)
from backend.services.timeline.orchestrator import generate_cosmic_timeline
from backend.services.timeline.festivals import get_all_festivals
from backend.services.timeline.eclipses import get_all_eclipses

router = APIRouter(prefix="/api/timeline", tags=["Cosmic Timeline"])


@router.post("/generate", response_model=TimelineResponse)
def generate_timeline_endpoint(req: TimelineRequest):
    """
    Generates a unified Cosmic Timeline combining birth marker, Vimshottari Dasha,
    planetary transits, Vedic festivals, eclipses, and Muhurat windows.
    """
    try:
        return generate_cosmic_timeline(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cosmic Timeline Error: {str(e)}")


@router.get("/festivals", response_model=List[FestivalEvent])
def get_festivals_endpoint():
    """
    Returns the handcrafted Vedic festival catalog.
    """
    try:
        return get_all_festivals()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching festivals: {str(e)}")


@router.get("/eclipses", response_model=List[EclipseEvent])
def get_eclipses_endpoint():
    """
    Returns the eclipse register.
    """
    try:
        return get_all_eclipses()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching eclipses: {str(e)}")
