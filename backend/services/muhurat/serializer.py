"""
Kalachakra — Muhurat Response Serializer (serializer.py)
==========================================================
Serializes candidate date evaluations into a structured MuhuratResponse object.
"""

from typing import List, Dict, Any
from datetime import datetime, timezone
from backend.models.muhurat import MuhuratCandidate, MuhuratResponse


def build_muhurat_response(
    event_rule: Dict[str, Any],
    city_display: str,
    start_date_str: str,
    end_date_str: str,
    candidates: List[MuhuratCandidate],
) -> MuhuratResponse:
    """
    Assembles candidate evaluations into MuhuratResponse payload with summary metrics.
    """
    excellent_cnt = sum(1 for c in candidates if c.suitability.level == "Excellent")
    good_cnt = sum(1 for c in candidates if c.suitability.level == "Good")
    acceptable_cnt = sum(1 for c in candidates if c.suitability.level == "Acceptable")
    avoid_cnt = sum(1 for c in candidates if c.suitability.level == "Avoid")

    now_utc = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    report_id = f"KC-MUHURAT-{event_rule['id'].upper()}-{Date_hash(start_date_str, end_date_str)}"

    transparency = {
        "ayanamsha": "Lahiri (Chitrapaksha)",
        "houseSystem": "Whole Sign (Rashi Bhava)",
        "evaluatedTimestamp": now_utc,
        "ruleSetVersion": "1.0.0 (Classical Parasari & Muhurta Chintamani Rules)",
        "disclaimer": (
            "Muhurat recommendations are informational guidance evaluated against traditional "
            "Panchang criteria. They serve as supportive timing windows, not guaranteed outcomes."
        ),
    }

    return MuhuratResponse(
        reportId=report_id,
        eventType=event_rule["id"],
        eventName=event_rule["name"],
        eventSanskrit=event_rule["sanskritName"],
        location=city_display,
        startDate=start_date_str,
        endDate=end_date_str,
        evaluatedDaysCount=len(candidates),
        excellentCount=excellent_cnt,
        goodCount=good_cnt,
        acceptableCount=acceptable_cnt,
        avoidCount=avoid_cnt,
        candidates=candidates,
        transparency=transparency,
    )


def Date_hash(d1: str, d2: str) -> str:
    """Helper for generating sub-id hash."""
    raw = f"{d1}_{d2}"
    h = 0
    for ch in raw:
        h = (h * 31 + ord(ch)) & 0xFFFFFFFF
    return f"{h:06X}"
