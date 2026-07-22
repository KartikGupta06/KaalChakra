"""
Unit tests for the Phase 8 Kundali Engine.
Validates Lagna, Whole Sign Houses, Navamsa (D9), Dignities, Aspects, and Yogas.
"""

import pytest
from datetime import datetime, timezone
from backend.models.kundali import KundaliRequest
from backend.services.kundali.engine import generate_full_kundali
from backend.services.kundali.lagna import calc_lagna_details
from backend.services.kundali.navamsa import calc_navamsa_sign_index
from backend.services.kundali.dignities import calc_planetary_dignity
from backend.services.astronomy import init_swe


@pytest.fixture(autouse=True)
def setup():
    init_swe()


class TestLagnaEngine:
    def test_lagna_calculation(self):
        """Lagna longitude should be within 0-360."""
        dt = datetime(1998, 8, 15, 6, 30, 0, tzinfo=timezone.utc)
        lagna = calc_lagna_details(dt, 23.1793, 75.7849)
        assert 0 <= lagna.longitude < 360
        assert 1 <= lagna.signIndex <= 12
        assert 1 <= lagna.pada <= 4


class TestNavamsaEngine:
    def test_navamsa_range(self):
        """Navamsa sign index should be 1-12."""
        for lng in [0.0, 15.5, 45.0, 120.0, 270.0, 359.9]:
            nav_idx = calc_navamsa_sign_index(lng)
            assert 1 <= nav_idx <= 12


class TestDignitiesEngine:
    def test_sun_exalted_in_aries(self):
        """Sun should be exalted in Aries (Mesh = 1)."""
        dignity = calc_planetary_dignity("sun", 1)
        assert "Exalted" in dignity

    def test_sun_debilitated_in_libra(self):
        """Sun should be debilitated in Libra (Tula = 7)."""
        dignity = calc_planetary_dignity("sun", 7)
        assert "Debilitated" in dignity

    def test_sun_own_sign_in_leo(self):
        """Sun should be in Own Sign in Leo (Simha = 5)."""
        dignity = calc_planetary_dignity("sun", 5)
        assert "Own Sign" in dignity


class TestFullKundaliEngine:
    def test_generate_full_kundali(self):
        """Generate full Kundali payload and verify structure."""
        req = KundaliRequest(
            fullName="Vedic Traveler",
            dateOfBirth="1998-08-15",
            timeOfBirth="06:30",
            city="Ujjain",
        )
        dt_utc = datetime(1998, 8, 15, 1, 0, 0, tzinfo=timezone.utc)

        res = generate_full_kundali(
            req=req,
            lat=23.1793,
            lng=75.7849,
            tz_name="Asia/Kolkata",
            city_display="Ujjain (उज्जैन)",
            dt_utc=dt_utc,
        )

        assert res.fullName == "Vedic Traveler"
        assert len(res.planets) == 9
        assert len(res.houses) == 12
        assert len(res.navamsa) == 10  # Lagna + 9 planets
        assert len(res.aspects) > 0
        assert res.ascendant.longitude >= 0
