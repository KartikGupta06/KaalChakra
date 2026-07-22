"""
Kalachakra — Kundali Engine: Aspects (Drishti) Module
======================================================
Calculates classical Vedic planetary aspects (Full 7th house aspect for all planets,
plus special aspects for Mars [4, 8], Jupiter [5, 9], Saturn [3, 10]).
"""

from typing import List
from backend.models.kundali import AspectDetails, PlanetPosition


def calc_vedic_aspects(planets: List[PlanetPosition]) -> List[AspectDetails]:
    """
    Compute classical Vedic aspects between Grahas and Houses.
    """
    aspects: List[AspectDetails] = []

    for p in planets:
        house = p.house

        # 1. Universal 7th house aspect (Opposite house)
        target_house_7 = ((house - 1 + 6) % 12) + 1
        aspects.append(AspectDetails(
            aspectingPlanet=p.name,
            aspectedPlanetOrHouse=f"House {target_house_7}",
            aspectType="7th Full Drishti (पूर्ण दृष्टि)",
            strength=1.0,
        ))

        # 2. Special Aspects
        if p.id == "mars":
            # Mars aspects 4th and 8th houses from itself
            h4 = ((house - 1 + 3) % 12) + 1
            h8 = ((house - 1 + 7) % 12) + 1
            aspects.append(AspectDetails(
                aspectingPlanet="Mars",
                aspectedPlanetOrHouse=f"House {h4}",
                aspectType="Mars 4th Special Drishti",
                strength=1.0,
            ))
            aspects.append(AspectDetails(
                aspectingPlanet="Mars",
                aspectedPlanetOrHouse=f"House {h8}",
                aspectType="Mars 8th Special Drishti",
                strength=1.0,
            ))

        elif p.id == "jupiter":
            # Jupiter aspects 5th and 9th houses from itself
            h5 = ((house - 1 + 4) % 12) + 1
            h9 = ((house - 1 + 8) % 12) + 1
            aspects.append(AspectDetails(
                aspectingPlanet="Jupiter",
                aspectedPlanetOrHouse=f"House {h5}",
                aspectType="Jupiter 5th Special Drishti",
                strength=1.0,
            ))
            aspects.append(AspectDetails(
                aspectingPlanet="Jupiter",
                aspectedPlanetOrHouse=f"House {h9}",
                aspectType="Jupiter 9th Special Drishti",
                strength=1.0,
            ))

        elif p.id == "saturn":
            # Saturn aspects 3rd and 10th houses from itself
            h3 = ((house - 1 + 2) % 12) + 1
            h10 = ((house - 1 + 9) % 12) + 1
            aspects.append(AspectDetails(
                aspectingPlanet="Saturn",
                aspectedPlanetOrHouse=f"House {h3}",
                aspectType="Saturn 3rd Special Drishti",
                strength=1.0,
            ))
            aspects.append(AspectDetails(
                aspectingPlanet="Saturn",
                aspectedPlanetOrHouse=f"House {h10}",
                aspectType="Saturn 10th Special Drishti",
                strength=1.0,
            ))

    return aspects
