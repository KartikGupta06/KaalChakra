"""
Kalachakra — Wisdom Engine: Chart Overview Interpretation (overview.py)
======================================================================
Generates an executive summary of the Kundali structure, dominant element,
quality themes, and key planetary highlights.
"""

from typing import List
from backend.models.kundali import KundaliResponse
from backend.models.wisdom import ChartOverviewWisdom

ELEMENT_MAP = {
    1: "Agni (Fire)", 2: "Prithvi (Earth)", 3: "Vayu (Air)", 4: "Jala (Water)",
    5: "Agni (Fire)", 6: "Prithvi (Earth)", 7: "Vayu (Air)", 8: "Jala (Water)",
    9: "Agni (Fire)", 10: "Prithvi (Earth)", 11: "Vayu (Air)", 12: "Jala (Water)"
}

QUALITY_MAP = {
    1: "Chara (Movable)", 2: "Sthira (Fixed)", 3: "Dwiswabhava (Dual)",
    4: "Chara (Movable)", 5: "Sthira (Fixed)", 6: "Dwiswabhava (Dual)",
    7: "Chara (Movable)", 8: "Sthira (Fixed)", 9: "Dwiswabhava (Dual)",
    10: "Chara (Movable)", 11: "Sthira (Fixed)", 12: "Dwiswabhava (Dual)"
}


def interpret_chart_overview(kundali: KundaliResponse) -> ChartOverviewWisdom:
    """
    Builds a structured overview interpretation of the Kundali response.
    """
    asc_sign = kundali.ascendant.signIndex
    dom_element = ELEMENT_MAP.get(asc_sign, "Agni (Fire)")
    dom_quality = QUALITY_MAP.get(asc_sign, "Sthira (Fixed)")

    # Analyze key themes
    themes: List[str] = []
    if "Agni" in dom_element:
        themes.append("Leadership, Vitality, and Purpose-Driven Action")
    elif "Prithvi" in dom_element:
        themes.append("Practicality, Material Stability, and Structure")
    elif "Vayu" in dom_element:
        themes.append("Intellectual Curiosity, Communication, and Ideas")
    else:
        themes.append("Intuition, Emotional Depth, and Spiritual Wisdom")

    if kundali.yogas:
        themes.append(f"Auspicious Yogas ({len(kundali.yogas)} detected)")

    summary_text = (
        f"The natal horoscope for {kundali.fullName} is rooted in {kundali.ascendantSign} as the Ascendant (Lagna). "
        f"The primary celestial emphasis centers around the {dom_element} element and {dom_quality} qualitative mode, "
        f"establishing a baseline of {themes[0].lower()}."
    )

    balanced_perspective = (
        "In Vedic astrology, planetary placements represent potential and natural inclinations rather than fixed fates. "
        "Conscious effort, ethical action (Dharma), and self-awareness dynamically shape how these planetary energies express throughout life."
    )

    return ChartOverviewWisdom(
        titleSanskrit="॥ सर्वांगीण चक्र अवलोकन ॥",
        titleEnglish="Overall Chart Summary",
        summary=summary_text,
        dominantElement=dom_element,
        dominantQuality=dom_quality,
        keyThemes=themes,
        balancedPerspective=balanced_perspective,
    )
