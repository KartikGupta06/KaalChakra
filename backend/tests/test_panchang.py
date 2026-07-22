"""
Unit tests for the Panchang calculation service.
Validates Tithi, Nakshatra, Yoga, Karana, and Vaara calculations.
"""

import pytest
from datetime import datetime, timezone, timedelta
from backend.services.panchang import (
    calc_tithi, calc_nakshatra, calc_yoga, calc_karana, calc_vaara,
    calc_paksha, calc_lunar_month, calc_samvat, get_full_panchang,
)
from backend.services.astronomy import datetime_to_jd, init_swe


@pytest.fixture(autouse=True)
def setup():
    init_swe()


class TestTithi:
    def test_tithi_index_range(self):
        """Tithi index should be 0-29."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        result = calc_tithi(jd)
        assert 0 <= result["index"] <= 29

    def test_tithi_has_name(self):
        """Tithi should have a name."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        result = calc_tithi(jd)
        assert len(result["name"]) > 0

    def test_tithi_paksha(self):
        """Paksha should be Shukla or Krishna."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        result = calc_tithi(jd)
        assert result["paksha"] in ("Shukla", "Krishna")


class TestNakshatra:
    def test_nakshatra_index_range(self):
        """Nakshatra index should be 0-26."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        result = calc_nakshatra(jd)
        assert 0 <= result["index"] <= 26

    def test_nakshatra_has_deity(self):
        """Nakshatra should have a presiding deity."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        result = calc_nakshatra(jd)
        assert len(result["deity"]) > 0


class TestYoga:
    def test_yoga_index_range(self):
        """Yoga index should be 0-26."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        result = calc_yoga(jd)
        assert 0 <= result["index"] <= 26


class TestKarana:
    def test_karana_index_range(self):
        """Karana index should be 0-59."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        jd = datetime_to_jd(dt)
        result = calc_karana(jd)
        assert 0 <= result["index"] <= 59


class TestVaara:
    def test_wednesday(self):
        """July 22, 2026 is a Wednesday."""
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=timezone.utc)
        result = calc_vaara(dt)
        assert result["name"] == "Wednesday"
        assert result["sanskrit"] == "बुधवार"


class TestPaksha:
    def test_shukla(self):
        """Tithi index 0-14 should be Shukla Paksha."""
        result = calc_paksha(5)
        assert "Shukla" in result

    def test_krishna(self):
        """Tithi index 15-29 should be Krishna Paksha."""
        result = calc_paksha(20)
        assert "Krishna" in result


class TestSamvat:
    def test_samvat_2026(self):
        """Vikram Samvat for 2026 should be ~2083."""
        result = calc_samvat(2026)
        assert result["year"] == 2083


class TestFullPanchang:
    def test_full_panchang_returns_valid_response(self):
        """Full Panchang should return a PanchangResponse with all fields."""
        ist = timezone(timedelta(hours=5.5))
        dt = datetime(2026, 7, 22, 12, 0, 0, tzinfo=ist)
        result = get_full_panchang(dt, 23.1793, 75.7849, "Asia/Kolkata", 5.5, "Ujjain (उज्जैन)")

        assert result.date is not None
        assert result.sanskritDate is not None
        assert result.vaara.name is not None
        assert result.tithi.name is not None
        assert result.nakshatra.name is not None
        assert result.yoga.name is not None
        assert result.karana.name is not None
        assert result.cycles.sunrise is not None
        assert result.cycles.sunset is not None
