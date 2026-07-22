"""
Kalachakra — Kundali Engine: Strengths Module
==============================================
Framework for evaluating planetary strengths (benefic/malefic classification,
directional strength, and dignity modifiers).
"""

from typing import List, Dict
from backend.models.kundali import PlanetPosition

NATURAL_BENEFICS = ["jupiter", "venus", "moon", "mercury"]
NATURAL_MALEFICS = ["saturn", "mars", "rahu", "ketu", "sun"]


def evaluate_planetary_strengths(planets: List[PlanetPosition]) -> List[PlanetPosition]:
    """
    Attach dignity and strength attributes to planet objects.
    """
    for p in planets:
        # Benefic/Malefic classification
        is_benefic = p.id in NATURAL_BENEFICS
        p.dignity = p.dignity or ("Benefic" if is_benefic else "Malefic")

    return planets
