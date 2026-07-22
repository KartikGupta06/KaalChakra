"""
Kalachakra — Muhurat Engine Master Orchestrator (engine.py)
===========================================================
High-level entry point for executing candidate Muhurat evaluations.
"""

from datetime import datetime, timezone
from backend.models.muhurat import MuhuratRequest, MuhuratResponse
from backend.services.muhurat.rules import get_event_rule
from backend.services.muhurat.evaluator import evaluate_date_range_candidates
from backend.services.muhurat.serializer import build_muhurat_response
from backend.services.location import resolve_location
from backend.config import DEFAULT_TIMEZONE


def evaluate_muhurat(req: MuhuratRequest) -> MuhuratResponse:
    """
    Master computation pipeline for evaluating Muhurat candidates across a date range.
    """
    # 1. Get Event Rule
    event_rule = get_event_rule(req.eventType)

    # 2. Parse Start & End dates
    start_dt = datetime.strptime(req.startDate, "%Y-%m-%d")
    end_dt = datetime.strptime(req.endDate, "%Y-%m-%d")

    # 3. Resolve location
    if req.latitude is not None and req.longitude is not None:
        lat = req.latitude
        lng = req.longitude
        tz_name = req.timezone or DEFAULT_TIMEZONE
        city_display = req.city
    else:
        loc = resolve_location(req.city)
        if loc is None:
            lat = 23.1793
            lng = 75.7849
            tz_name = DEFAULT_TIMEZONE
            city_display = f"{req.city} (Observatory)"
        else:
            lat = loc.latitude
            lng = loc.longitude
            tz_name = loc.timezone
            city_display = loc.displayName

    # 4. Evaluate candidates
    candidates = evaluate_date_range_candidates(
        event_rule=event_rule,
        start_dt=start_dt,
        end_dt=end_dt,
        lat=lat,
        lng=lng,
        tz_name=tz_name,
        city_display=city_display,
    )

    # 5. Serialize payload
    return build_muhurat_response(
        event_rule=event_rule,
        city_display=city_display,
        start_date_str=req.startDate,
        end_date_str=req.endDate,
        candidates=candidates,
    )
