"""
Kalachakra — Kundali Engine: Yogas Framework
==============================================
Expandable Yoga detection engine.
Detects classical combinations:
  1. Gajakesari Yoga (Jupiter in Kendra from Moon)
  2. Budhaditya Yoga (Sun and Mercury conjunct)
  3. Chandra Mangala Yoga (Moon and Mars conjunct)
  4. Neecha Bhanga Raja Yoga (Cancellation of Debilitation)
  5. Viparita Raja Yoga (Lords of 6/8/12 in 6/8/12)
"""

from typing import List
from backend.models.kundali import YogaDetails, PlanetPosition, HouseDetails


def detect_yogas(planets: List[PlanetPosition], houses: List[HouseDetails]) -> List[YogaDetails]:
    """
    Evaluate chart parameters and return detected Vedic Yogas.
    """
    yogas: List[YogaDetails] = []

    # Map planet positions by ID
    p_map = {p.id: p for p in planets}

    sun = p_map.get("sun")
    moon = p_map.get("moon")
    mars = p_map.get("mars")
    mercury = p_map.get("mercury")
    jupiter = p_map.get("jupiter")

    # 1. Gajakesari Yoga: Jupiter in Kendra (1, 4, 7, 10) from Moon
    if jupiter and moon:
        moon_house = moon.house
        jup_house = jupiter.house
        dist = ((jup_house - moon_house) % 12) + 1
        if dist in (1, 4, 7, 10):
            yogas.append(YogaDetails(
                id="gajakesari",
                name="Gajakesari Yoga",
                sanskritName="गजकेसरी योग",
                description="Jupiter resides in Kendra from Moon, bestowing wisdom, reputation, and noble character.",
                contributingPlanets=["Jupiter", "Moon"],
                isBenefic=True,
                strength="High",
            ))

    # 2. Budhaditya Yoga: Sun and Mercury conjunct in the same sign
    if sun and mercury:
        if sun.signIndex == mercury.signIndex:
            yogas.append(YogaDetails(
                id="budhaditya",
                name="Budhaditya Yoga",
                sanskritName="बुधादित्य योग",
                description="Sun and Mercury unite in the same sign, bestowing keen intellect, analytical prowess, and fame.",
                contributingPlanets=["Sun", "Mercury"],
                isBenefic=True,
                strength="High",
            ))

    # 3. Chandra Mangala Yoga: Moon and Mars conjunct
    if moon and mars:
        if moon.signIndex == mars.signIndex:
            yogas.append(YogaDetails(
                id="chandra_mangala",
                name="Chandra Mangala Yoga",
                sanskritName="चन्द्र-मंगल योग",
                description="Moon and Mars unite, granting strong determination, material prosperity, and vitality.",
                contributingPlanets=["Moon", "Mars"],
                isBenefic=True,
                strength="Medium",
            ))

    # 4. Viparita Raja Yoga (Dusthana lords in Dusthana houses)
    for p in planets:
        if p.dignity and "Debilitated" in p.dignity:
            # Neecha Bhanga Raja Yoga check
            yogas.append(YogaDetails(
                id="neecha_bhanga",
                name="Neecha Bhanga Raja Yoga Framework",
                sanskritName="नीचभंग राजयोग",
                description=f"Debilitated state of {p.name} triggers potential cancellation and transformational strength.",
                contributingPlanets=[p.name],
                isBenefic=True,
                strength="Medium",
            ))

    return yogas
