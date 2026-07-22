"""
Unit tests for Sun/Moon rise-set and Moon phase calculations.
"""

import pytest
from datetime import datetime, timezone
from backend.services.sun_moon import (
    calc_sunrise_sunset, calc_moonrise_moonset, calc_moon_phase,
)
from backend.services.astronomy import datetime_to_jd, init_swe


@pytest.fixture(autouse=True)
def setup():
    init_swe()


class TestSunriseSunset:
    def test_sunrise_not_na(self):
        """Sunrise should not be N/A for Ujjain in July."""
        dt = datetime(2026, 7, 22, 0, 0, 0, tzinfo=timezone.utc)
        result = calc_sunrise_sunset(dt, 23.1793, 75.7849, 5.5)
        assert result["sunrise"] != "N/A"

    def test_sunset_not_na(self):
        """Sunset should not be N/A for Ujjain in July."""
        dt = datetime(2026, 7, 22, 0, 0, 0, tzinfo=timezone.utc)
        result = calc_sunrise_sunset(dt, 23.1793, 75.7849, 5.5)
        assert result["sunset"] != "N/A"

    def test_sunrise_format(self):
        """Sunrise should be in HH:MM AM/PM format."""
        dt = datetime(2026, 7, 22, 0, 0, 0, tzinfo=timezone.utc)
        result = calc_sunrise_sunset(dt, 23.1793, 75.7849, 5.5)
        assert "AM" in result["sunrise"] or "PM" in result["sunrise"]


class TestMoonriseMoonset:
    def test_moonrise_format(self):
        """Moonrise should be formatted or N/A."""
        dt = datetime(2026, 7, 22, 0, 0, 0, tzinfo=timezone.utc)
        result = calc_moonrise_moonset(dt, 23.1793, 75.7849, 5.5)
        moonrise = result["moonrise"]
        assert "AM" in moonrise or "PM" in moonrise or moonrise == "N/A"


class TestMoonPhase:
    def test_phase_has_name(self):
        """Moon phase should have a name."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        result = calc_moon_phase(jd)
        assert len(result["phase_name"]) > 0

    def test_illumination_range(self):
        """Illumination should be 0-100."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        result = calc_moon_phase(jd)
        assert 0 <= result["illumination_percent"] <= 100

    def test_lunar_age_range(self):
        """Lunar age should be 0-30 days."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        result = calc_moon_phase(jd)
        assert 0 <= result["lunar_age_days"] <= 30
