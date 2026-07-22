"""
Kalachakra — Wisdom Engine API Router (wisdom_router.py)
=========================================================
REST endpoints for requesting educational interpretations of a Vedic Janma Kundali.
"""

from fastapi import APIRouter, HTTPException
from backend.models.kundali import KundaliResponse, KundaliRequest
from backend.models.wisdom import WisdomResponse
from backend.services.wisdom.serializer import generate_wisdom_response
from backend.services.kundali.engine import generate_full_kundali
from backend.api.kundali_router import generate_kundali_endpoint

router = APIRouter(prefix="/api/wisdom", tags=["Wisdom Engine"])


@router.post("/interpret", response_model=WisdomResponse)
def interpret_kundali_endpoint(kundali: KundaliResponse):
    """
    Consumes a canonical KundaliResponse object and returns comprehensive,
    structured educational interpretations for Lagna, planets, houses, yogas, and panchang.
    """
    try:
        return generate_wisdom_response(kundali)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Wisdom Engine Interpretation Error: {str(e)}"
        )


@router.post("/generate-and-interpret", response_model=WisdomResponse)
def generate_and_interpret_endpoint(req: KundaliRequest):
    """
    Convenience endpoint: generates full Kundali calculations then immediately
    passes the result to the Wisdom Engine.
    """
    try:
        kundali = generate_kundali_endpoint(req)
        return generate_wisdom_response(kundali)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Wisdom Engine Pipeline Error: {str(e)}"
        )
