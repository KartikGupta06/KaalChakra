"""
Unit tests for the Planetary Position service.
Validates 9-planet sidereal longitude calculations.
"""

import pytest
from datetime import datetime, timezone
from backend.services.planetary import calc_planet_positions, calc_ascendant
from backend.services.astronomy import datetime_to_jd, init_swe


@pytest.fixture(autouse=True)
def setup():
    init_swe()


class TestPlanetPositions:
    def test_returns_nine_planets(self):
        """Should return exactly 9 planet positions."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        positions = calc_planet_positions(dt, 0.0)
        assert len(positions) == 9

    def test_planet_ids(self):
        """Should contain all 9 Navagraha IDs."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        positions = calc_planet_positions(dt, 0.0)
        ids = [p.id for p in positions]
        expected = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu"]
        assert ids == expected

    def test_longitudes_in_range(self):
        """All longitudes should be 0-360."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        positions = calc_planet_positions(dt, 0.0)
        for p in positions:
            assert 0 <= p.longitude < 360, f"{p.name} longitude out of range: {p.longitude}"

    def test_houses_in_range(self):
        """All house numbers should be 1-12."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        positions = calc_planet_positions(dt, 0.0)
        for p in positions:
            assert 1 <= p.house <= 12, f"{p.name} house out of range: {p.house}"

    def test_rahu_ketu_opposite(self):
        """Rahu and Ketu should be approximately 180 degrees apart."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        positions = calc_planet_positions(dt, 0.0)
        rahu = next(p for p in positions if p.id == "rahu")
        ketu = next(p for p in positions if p.id == "ketu")
        diff = abs(rahu.longitude - ketu.longitude)
        # Should be close to 180 (within 1 degree tolerance)
        assert abs(diff - 180) < 1.0 or abs(diff - 180 - 360) < 1.0

    def test_sign_index_in_range(self):
        """Sign indices should be 1-12."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        positions = calc_planet_positions(dt, 0.0)
        for p in positions:
            assert 1 <= p.signIndex <= 12


class TestAscendant:
    def test_ascendant_in_range(self):
        """Ascendant longitude should be 0-360."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        asc = calc_ascendant(dt, 23.1793, 75.7849)
        assert 0 <= asc < 360
