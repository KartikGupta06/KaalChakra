"""
Kalachakra — Muhurat Engine Unit Tests (test_muhurat.py)
=========================================================
Automated unit tests validating event catalog rules, suitability scoring,
candidate evaluation, and API response integrity.
"""

import pytest
from datetime import datetime, timezone
from backend.models.muhurat import MuhuratRequest
from backend.services.muhurat.rules import get_event_rule, get_all_event_catalog
from backend.services.muhurat.engine import evaluate_muhurat


class TestMuhuratEngine:
    def test_event_catalog(self):
        catalog = get_all_event_catalog()
        assert len(catalog) >= 9
        event_ids = [e.id for e in catalog]
        assert "marriage" in event_ids
        assert "housewarming" in event_ids
        assert "business" in event_ids
        assert "vehicle" in event_ids

    def test_get_event_rule(self):
        rule = get_event_rule("marriage")
        assert rule["id"] == "marriage"
        assert len(rule["favorableNakshatras"]) > 0

    def test_evaluate_muhurat(self):
        req = MuhuratRequest(
            eventType="housewarming",
            startDate="2026-08-15",
            endDate="2026-08-21",  # 7 days
            city="Ujjain",
        )
        res = evaluate_muhurat(req)
        assert res.eventType == "housewarming"
        assert res.location is not None
        assert len(res.candidates) == 7
        assert res.evaluatedDaysCount == 7
        assert res.candidates[0].suitability.score >= 0
        assert res.candidates[0].suitability.score <= 100
        assert res.transparency["ayanamsha"] == "Lahiri (Chitrapaksha)"

    def test_invalid_event_fallback(self):
        req = MuhuratRequest(
            eventType="non_existent_event",
            startDate="2026-08-15",
            endDate="2026-08-16",
            city="Ujjain",
        )
        res = evaluate_muhurat(req)
        assert res.eventType == "general"
        assert len(res.candidates) == 2
