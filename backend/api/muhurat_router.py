"""
Kalachakra — Muhurat API Router (muhurat_router.py)
====================================================
REST endpoints for requesting auspicious Muhurat window evaluations and catalog data.
"""

from fastapi import APIRouter, HTTPException
from typing import List
from backend.models.muhurat import MuhuratRequest, MuhuratResponse, EventRuleInfo
from backend.services.muhurat.rules import get_all_event_catalog
from backend.services.muhurat.engine import evaluate_muhurat

router = APIRouter(prefix="/api/muhurat", tags=["Muhurat Engine"])


@router.get("/event-types", response_model=List[EventRuleInfo])
def get_event_types_endpoint():
    """
    Returns the catalog of all supported event types with icons, Sanskrit titles, and descriptions.
    """
    try:
        return get_all_event_catalog()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching event catalog: {str(e)}")


@router.post("/evaluate", response_model=MuhuratResponse)
def evaluate_muhurat_endpoint(req: MuhuratRequest):
    """
    Evaluates candidate date & time windows for a selected event across a date range.
    """
    try:
        return evaluate_muhurat(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Muhurat Evaluation Error: {str(e)}")
