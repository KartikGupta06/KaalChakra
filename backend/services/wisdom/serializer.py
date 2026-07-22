"""
Kalachakra — Wisdom Engine: Master Serializer (serializer.py)
=============================================================
Orchestrates all independent wisdom services to assemble the canonical
WisdomResponse from a KundaliResponse object.
"""

from datetime import datetime, timezone
from backend.models.kundali import KundaliResponse
from backend.models.wisdom import WisdomResponse, TransparencyMetadata
from backend.services.wisdom.overview import interpret_chart_overview
from backend.services.wisdom.ascendant import interpret_ascendant
from backend.services.wisdom.planets import interpret_planets
from backend.services.wisdom.houses import interpret_houses
from backend.services.wisdom.yogas import interpret_yogas
from backend.services.wisdom.panchang import interpret_panchang_commentary


def generate_wisdom_response(kundali: KundaliResponse) -> WisdomResponse:
    """
    Master pipeline consuming a KundaliResponse object and producing a WisdomResponse.
    Strictly read-only: never alters planetary coordinates or calculations.
    """
    overview = interpret_chart_overview(kundali)
    ascendant = interpret_ascendant(kundali)
    planets = interpret_planets(kundali)
    houses = interpret_houses(kundali)
    yogas = interpret_yogas(kundali)
    panchang = interpret_panchang_commentary(kundali)

    now_utc = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

    report_id = f"KC-WISDOM-{Math_hash(kundali.fullName, kundali.dateOfBirth)}"

    metadata = TransparencyMetadata(
        ayanamsha="Lahiri (Chitrapaksha)",
        houseSystem="Whole Sign (Rashi Bhava)",
        calculatedTimestamp=now_utc,
        isAiGenerated=False,
        disclaimer=(
            "All interpretations are educational explanations derived from classical Parasari "
            "Vedic astrology principles. They serve as self-reflection tools, not deterministic predictions."
        ),
    )

    return WisdomResponse(
        reportId=report_id,
        fullName=kundali.fullName,
        overview=overview,
        ascendant=ascendant,
        planets=planets,
        houses=houses,
        yogas=yogas,
        panchang=panchang,
        metadata=metadata,
    )


def Math_hash(name: str, dob: str) -> str:
    """Helper for generating deterministic report sub-ids."""
    raw = f"{name}_{dob}"
    h = 0
    for ch in raw:
        h = (h * 31 + ord(ch)) & 0xFFFFFFFF
    return f"{h:08X}"
