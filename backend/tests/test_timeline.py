"""
Kalachakra — Cosmic Timeline & Dasha Unit Tests (test_timeline.py)
===================================================================
Automated unit tests validating Vimshottari Dasha math, Antardasha periods,
transits, festival database, eclipse register, and unified timeline serialization.
"""

import pytest
from datetime import datetime
from backend.models.timeline import TimelineRequest
from backend.services.dasha.vimshottari import calc_vimshottari_dashas, get_active_dasha
from backend.services.timeline.transits import get_transit_timeline_events
from backend.services.timeline.festivals import get_all_festivals
from backend.services.timeline.eclipses import get_all_eclipses
from backend.services.timeline.orchestrator import generate_cosmic_timeline


class TestCosmicTimelineEngine:
    def test_vimshottari_dasha_calculation(self):
        birth_dt = datetime(1998, 8, 15, 10, 30)
        moon_lng = 45.5  # Moon in Rohini (Rohini lord is Moon)
        mahadashas = calc_vimshottari_dashas(moon_lng, birth_dt)

        assert len(mahadashas) == 9
        assert mahadashas[0]["lord"] == "Moon"
        assert len(mahadashas[0]["antardashas"]) == 9

    def test_active_dasha_resolution(self):
        birth_dt = datetime(1998, 8, 15, 10, 30)
        moon_lng = 45.5
        mahadashas = calc_vimshottari_dashas(moon_lng, birth_dt)
        active = get_active_dasha(mahadashas, datetime.now())

        assert active["mahadasha"] is not None
        assert active["sanskritMahadasha"] is not None

    def test_transit_events(self):
        transits = get_transit_timeline_events()
        assert len(transits) >= 4
        assert any("Saturn" in t.title for t in transits)

    def test_festivals_catalog(self):
        festivals = get_all_festivals()
        assert len(festivals) >= 8
        names = [f.name for f in festivals]
        assert "Makar Sankranti" in names
        assert "Diwali (Deepavali)" in names

    def test_eclipse_register(self):
        eclipses = get_all_eclipses()
        assert len(eclipses) >= 4
        assert eclipses[0].type in ["Solar Eclipse", "Lunar Eclipse"]

    def test_generate_cosmic_timeline(self):
        req = TimelineRequest(
            fullName="Kartik Gupta",
            dateOfBirth="1998-08-15",
            timeOfBirth="10:30",
            city="Ujjain",
            activeLayers=["birth", "dasha", "transit", "festival", "eclipse"],
        )
        res = generate_cosmic_timeline(req)

        assert res.fullName == "Kartik Gupta"
        assert res.totalEventsCount > 0
        assert res.currentDasha["mahadasha"] is not None
        assert res.transparency["dashaSystem"] == "Vimshottari (120-Year Lunar Nakshatra Cycle)"
