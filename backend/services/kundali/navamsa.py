"""
Kalachakra — Kundali Engine: Navamsa (D9) Module
=================================================
Calculates D9 Navamsa sign and house placements for all 9 Grahas and Lagna.

Rules:
- Each 30° Rashi is divided into 9 Navamsas of 3°20' (3.3333°).
- Fire signs (1, 5, 9): Navamsa sequence starts from Aries (1).
- Earth signs (2, 6, 10): Navamsa sequence starts from Capricorn (10).
- Air signs (3, 7, 11): Navamsa sequence starts from Libra (7).
- Water signs (4, 8, 12): Navamsa sequence starts from Cancer (4).
"""

from typing import List
from backend.config import RASHI_NAMES
from backend.models.kundali import NavamsaPosition, PlanetPosition, AscendantDetails


def calc_navamsa_sign_index(sidereal_lng: float) -> int:
    """
    Calculate the Navamsa Rashi index (1-12) for a sidereal longitude.
    """
    rashi_idx = int(sidereal_lng / 30.0) + 1  # 1-12
    deg_in_sign = sidereal_lng % 30.0
    nav_segment = int(deg_in_sign / (30.0 / 9.0))  # 0-8

    # Determine starting Rashi based on element
    if rashi_idx in (1, 5, 9):       # Fire
        start_rashi = 1
    elif rashi_idx in (2, 6, 10):    # Earth
        start_rashi = 10
    elif rashi_idx in (3, 7, 11):    # Air
        start_rashi = 7
    else:                            # Water (4, 8, 12)
        start_rashi = 4

    nav_rashi_idx = ((start_rashi - 1 + nav_segment) % 12) + 1
    return nav_rashi_idx


def calc_navamsa_chart(
    asc: AscendantDetails,
    planets: List[PlanetPosition]
) -> List[NavamsaPosition]:
    """
    Generate D9 Navamsa placements for Lagna and all planets.
    """
    nav_lagna_rashi = calc_navamsa_sign_index(asc.longitude)
    nav_list: List[NavamsaPosition] = []

    # Lagna Navamsa
    lagna_rashi_info = RASHI_NAMES[nav_lagna_rashi - 1]
    nav_list.append(NavamsaPosition(
        id="lagna",
        name="Lagna",
        sanskrit="लग्न",
        navamsaSign=f"{lagna_rashi_info['english']} ({lagna_rashi_info['sanskrit']})",
        navamsaSignIndex=nav_lagna_rashi,
        navamsaHouse=1,
    ))

    # Planets Navamsa
    for p in planets:
        nav_rashi = calc_navamsa_sign_index(p.longitude)
        nav_rashi_info = RASHI_NAMES[nav_rashi - 1]
        nav_house = ((nav_rashi - nav_lagna_rashi) % 12) + 1

        nav_list.append(NavamsaPosition(
            id=p.id,
            name=p.name,
            sanskrit=p.sanskrit,
            navamsaSign=f"{nav_rashi_info['english']} ({nav_rashi_info['sanskrit']})",
            navamsaSignIndex=nav_rashi,
            navamsaHouse=nav_house,
        ))

    return nav_list
