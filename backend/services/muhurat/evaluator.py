"""
Kalachakra — Muhurat Candidate Evaluator (evaluator.py)
========================================================
Iterates through candidate date ranges, invoking the Panchang service for each date,
and evaluates suitability against event rules.
"""

from datetime import datetime, timedelta, timezone
from typing import List, Dict, Any
from backend.services.panchang import get_full_panchang
from backend.services.muhurat.scoring import evaluate_suitability
from backend.models.muhurat import MuhuratCandidate


def evaluate_date_range_candidates(
    event_rule: Dict[str, Any],
    start_dt: datetime,
    end_dt: datetime,
    lat: float,
    lng: float,
    tz_name: str,
    city_display: str,
) -> List[MuhuratCandidate]:
    """
    Evaluates every day in the date range [start_dt, end_dt] for the given event type.
    """
    candidates: List[MuhuratCandidate] = []

    current = start_dt
    day_offset = 0

    while current <= end_dt and day_offset < 60:  # Max 60-day window per request safety cap
        # Calculate full Panchang for the day at 09:00 AM local time (standard morning inauguration window)
        eval_dt = current.replace(hour=9, minute=0, second=0, microsecond=0)
        panchang = get_full_panchang(
            dt=eval_dt,
            lat=lat,
            lng=lng,
            tz_name=tz_name,
            utc_offset_hours=5.5,  # Default IST
            city_display=city_display,
        )

        suitability = evaluate_suitability(panchang, event_rule)

        # Build candidate window times (Sunrise to Sunset or Abhijit window)
        sunrise_str = panchang.cycles.sunrise
        sunset_str = panchang.cycles.sunset

        cand_id = f"muhurat-{eval_dt.strftime('%Y%m%d')}-{event_rule['id']}"

        candidates.append(
            MuhuratCandidate(
                candidateId=cand_id,
                date=eval_dt.strftime("%Y-%m-%d"),
                dateFormatted=panchang.date,
                sanskritDate=panchang.sanskritDate,
                startTime=f"{sunrise_str} (Sunrise)",
                endTime=f"{sunset_str} (Sunset)",
                tithi=panchang.tithi.name,
                nakshatra=panchang.nakshatra.name,
                yoga=panchang.yoga.name,
                karana=panchang.karana.name,
                vaara=panchang.vaara.name,
                paksha=panchang.cycles.paksha,
                suitability=suitability,
                isBookmarked=False,
            )
        )

        current += timedelta(days=1)
        day_offset += 1

    return candidates
