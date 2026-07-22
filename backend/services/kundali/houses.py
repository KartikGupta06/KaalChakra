"""
Kalachakra — Kundali Engine: Houses (Bhava) Module
===================================================
Calculates Whole Sign Houses (1-12) starting from the Ascendant's sign.
"""

from typing import List
from backend.config import RASHI_NAMES
from backend.models.kundali import HouseDetails, PlanetPosition

# Planetary Rashi Lord Mapping
RASHI_LORDS = {
    1: "mars",      # Mesh -> Mars
    2: "venus",     # Vrishabh -> Venus
    3: "mercury",   # Mithun -> Mercury
    4: "moon",      # Kark -> Moon
    5: "sun",       # Simha -> Sun
    6: "mercury",   # Kanya -> Mercury
    7: "venus",     # Tula -> Venus
    8: "mars",      # Vrishchik -> Mars
    9: "jupiter",   # Dhanu -> Jupiter
    10: "saturn",   # Makar -> Saturn
    11: "saturn",   # Kumbh -> Saturn
    12: "jupiter",  # Meen -> Jupiter
}


def calc_whole_sign_houses(asc_sign_index: int, planets: List[PlanetPosition]) -> List[HouseDetails]:
    """
    Calculate the 12 Whole Sign Houses starting from asc_sign_index (1-12).
    Assigns contained planets to each house.
    """
    houses: List[HouseDetails] = []

    for house_num in range(1, 13):
        rashi_index = ((asc_sign_index - 1 + house_num - 1) % 12) + 1
        rashi_info = RASHI_NAMES[rashi_index - 1]
        lord = RASHI_LORDS.get(rashi_index, "unknown")

        # Find all planets located in this house
        contained = [p.id for p in planets if p.house == house_num]

        houses.append(HouseDetails(
            houseNumber=house_num,
            rashiName=f"{rashi_info['english']} ({rashi_info['sanskrit']})",
            rashiSanskrit=rashi_info["sanskrit"],
            startDegree="0°00'",
            endDegree="30°00'",
            lordPlanet=lord,
            containedPlanets=contained,
        ))

    return houses
