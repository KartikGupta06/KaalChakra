"""
Kalachakra — Wisdom Engine: Yoga Explanations (yogas.py)
========================================================
Generates educational commentary for all detected Yogas in the chart.
"""

from typing import List
from backend.models.kundali import KundaliResponse
from backend.models.wisdom import YogaWisdom


def interpret_yogas(kundali: KundaliResponse) -> List[YogaWisdom]:
    """
    Generates interpretations for detected Yogas.
    """
    result: List[YogaWisdom] = []

    if not kundali.yogas:
        # Default educational entry if no specific major yogas detected
        result.append(
            YogaWisdom(
                id="general_balance",
                name="Harmonious Planetary Balance",
                sanskritName="सामान्य ग्रह संतुलन",
                significance="General alignment of natal planets without high-intensity singular Yogas.",
                whyDetected="Evaluation of natal planet house and sign distribution.",
                contributingPlanets=["All 9 Navagrahas"],
                interpretation="Presents a well-distributed chart layout where life progress develops steadily through personal effort across multiple Bhavas.",
                strength="Balanced",
            )
        )
        return result

    for y in kundali.yogas:
        why = f"Detected because {', '.join(y.contributingPlanets)} form a classical Parasari alignment: {y.description}"
        interp = (
            f"The presence of {y.sanskritName} ({y.name}) indicates a powerful combination for {y.description.lower()} "
            f"This Yoga operates with {y.strength} strength."
        )

        result.append(
            YogaWisdom(
                id=y.id,
                name=y.name,
                sanskritName=y.sanskritName,
                significance=y.description,
                whyDetected=why,
                contributingPlanets=y.contributingPlanets,
                interpretation=interp,
                strength=y.strength,
            )
        )

    return result
