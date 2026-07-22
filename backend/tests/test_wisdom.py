"""
Kalachakra — Wisdom Engine Tests (test_wisdom.py)
==================================================
Automated unit tests validating Kundali interpretation serialization,
mapping, null-safety, and API response integrity.
"""

import pytest
from datetime import datetime, timezone
from backend.models.kundali import KundaliRequest
from backend.services.kundali.engine import generate_full_kundali
from backend.services.wisdom.serializer import generate_wisdom_response
from backend.services.wisdom.overview import interpret_chart_overview
from backend.services.wisdom.ascendant import interpret_ascendant
from backend.services.wisdom.planets import interpret_planets
from backend.services.wisdom.houses import interpret_houses
from backend.services.wisdom.yogas import interpret_yogas
from backend.services.wisdom.panchang import interpret_panchang_commentary


@pytest.fixture
def sample_kundali():
    req = KundaliRequest(
        fullName="Test Observer",
        dateOfBirth="1998-08-15",
        timeOfBirth="06:30",
        city="Ujjain",
    )
    dt_utc = datetime(1998, 8, 15, 1, 0, tzinfo=timezone.utc)
    return generate_full_kundali(
        req=req,
        lat=23.1793,
        lng=75.7849,
        tz_name="Asia/Kolkata",
        city_display="Ujjain",
        dt_utc=dt_utc,
    )


class TestWisdomEngine:
    def test_generate_wisdom_response(self, sample_kundali):
        res = generate_wisdom_response(sample_kundali)
        assert res.fullName == "Test Observer"
        assert res.overview.summary is not None
        assert res.ascendant.signName == sample_kundali.ascendantSign
        assert len(res.planets) == 9
        assert len(res.houses) == 12
        assert res.metadata.ayanamsha == "Lahiri (Chitrapaksha)"
        assert res.metadata.isAiGenerated is False

    def test_overview_module(self, sample_kundali):
        overview = interpret_chart_overview(sample_kundali)
        assert overview.dominantElement is not None
        assert overview.dominantQuality is not None
        assert len(overview.keyThemes) > 0

    def test_ascendant_module(self, sample_kundali):
        asc = interpret_ascendant(sample_kundali)
        assert asc.signName == sample_kundali.ascendantSign
        assert len(asc.traits) > 0
        assert "Lagna" in asc.description

    def test_planets_module(self, sample_kundali):
        planets = interpret_planets(sample_kundali)
        assert len(planets) == 9
        p_sun = next(p for p in planets if p.id == "sun")
        assert p_sun.name == "Sun"
        assert "Surya" in p_sun.overallSummary
        assert p_sun.signMeaning is not None

    def test_houses_module(self, sample_kundali):
        houses = interpret_houses(sample_kundali)
        assert len(houses) == 12
        assert houses[0].houseNumber == 1
        assert houses[11].houseNumber == 12

    def test_yogas_module(self, sample_kundali):
        yogas = interpret_yogas(sample_kundali)
        assert len(yogas) > 0
        assert yogas[0].sanskritName is not None

    def test_panchang_module(self, sample_kundali):
        panchang = interpret_panchang_commentary(sample_kundali)
        assert panchang.tithiMeaning is not None
        assert panchang.nakshatraMeaning is not None
