"""
Kalachakra — Wisdom Engine: Strength Interpretations (strengths.py)
===================================================================
Generates educational commentary on planetary dignities and strengths.
"""

from typing import Dict
from backend.models.kundali import KundaliResponse

DIGNITY_EXPLANATIONS: Dict[str, str] = {
    "Exalted": "Ucha (Exalted) status indicates maximum expression of a planet's noble qualities.",
    "Debilitated": "Neecha (Debilitated) status indicates lessons in refining how a planet's energy is channeled.",
    "Own Sign": "Swakshetra status provides comfort, stability, and natural strength.",
    "Friend": "Mitra (Friendly) status promotes smooth and harmonious manifestation.",
    "Enemy": "Shatru (Enemy) status requires extra conscious effort to harmonize conflicting energies.",
    "Neutral": "Sama (Neutral) status allows balanced expression dependent on house placement.",
}


def explain_planetary_dignity(dignity: str) -> str:
    """
    Returns an educational explanation for a given dignity status.
    """
    for key, desc in DIGNITY_EXPLANATIONS.items():
        if key.lower() in dignity.lower():
            return desc
    return "Neutral operational state."
