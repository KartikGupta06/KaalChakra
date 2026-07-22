"""
Unit tests for the Astronomy service.
Validates JD conversion, ayanamsha, and Rashi/Nakshatra mapping.
"""

import pytest
from datetime import datetime, timezone
from backend.services.astronomy import (
    datetime_to_jd, get_ayanamsha, rashi_from_longitude,
    nakshatra_from_longitude, format_degrees, get_sun_longitude,
    get_moon_longitude, init_swe,
)


class TestJulianDay:
    def test_known_jd_j2000(self):
        """J2000.0 epoch: Jan 1, 2000, 12:00 UTC = JD 2451545.0"""
        dt = datetime(2000, 1, 1, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        assert abs(jd - 2451545.0) < 0.001

    def test_jd_positive(self):
        """Any reasonable date should produce a positive JD."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        assert jd > 2400000


class TestAyanamsha:
    def test_ayanamsha_j2000(self):
        """Lahiri ayanamsha around J2000 should be ~23.8-24.1 degrees."""
        jd = 2451545.0  # J2000
        ayanamsha = get_ayanamsha(jd)
        assert 23.0 < ayanamsha < 25.0

    def test_ayanamsha_2026(self):
        """Lahiri ayanamsha in 2026 should be ~24.2 degrees."""
        dt = datetime(2026, 1, 1, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        ayanamsha = get_ayanamsha(jd)
        assert 24.0 < ayanamsha < 25.0


class TestRashiMapping:
    def test_aries(self):
        """0-30 degrees should map to Aries (Mesh)."""
        result = rashi_from_longitude(15.0)
        assert result["english"] == "Aries"
        assert result["sanskrit"] == "मेष"

    def test_last_sign(self):
        """330-360 degrees should map to Pisces (Meen)."""
        result = rashi_from_longitude(345.0)
        assert result["english"] == "Pisces"

    def test_boundary(self):
        """Exactly 30 degrees should be Taurus."""
        result = rashi_from_longitude(30.0)
        assert result["english"] == "Taurus"


class TestNakshatraMapping:
    def test_ashwini(self):
        """0-13.33 degrees should map to Ashwini."""
        result = nakshatra_from_longitude(5.0)
        assert result["english"] == "Ashwini"

    def test_revati(self):
        """Last nakshatra: ~346.67-360 degrees should be Revati."""
        result = nakshatra_from_longitude(355.0)
        assert result["english"] == "Revati"

    def test_pada(self):
        """Pada should be 1-4."""
        result = nakshatra_from_longitude(5.0)
        assert 1 <= result["pada"] <= 4


class TestFormatDegrees:
    def test_format(self):
        """Should produce a formatted string like '15°23'."""
        result = format_degrees(45.383)
        assert "°" in result


class TestPlanetLongitudes:
    def test_sun_in_range(self):
        """Sun longitude should be 0-360."""
        init_swe()
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        lng = get_sun_longitude(jd)
        assert 0 <= lng < 360

    def test_moon_in_range(self):
        """Moon longitude should be 0-360."""
        init_swe()
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        lng = get_moon_longitude(jd)
        assert 0 <= lng < 360
