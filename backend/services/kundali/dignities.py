"""
Kalachakra — Kundali Engine: Dignities Module
===============================================
Evaluates classical Vedic planetary dignities (Ucha, Neecha, Swakshetra, Mitra, Shatru, Sama).
"""

from typing import Dict

# Exaltation (Ucha) & Debilitation (Neecha) Rashis (1-12)
EXALTATION_RASHIS = {
    "sun": 1,        # Aries (Mesh)
    "moon": 2,       # Taurus (Vrishabh)
    "mars": 10,      # Capricorn (Makar)
    "mercury": 6,    # Virgo (Kanya)
    "jupiter": 4,    # Cancer (Kark)
    "venus": 12,     # Pisces (Meen)
    "saturn": 7,     # Libra (Tula)
    "rahu": 3,       # Gemini (Mithun)
    "ketu": 9,       # Sagittarius (Dhanu)
}

DEBILITATION_RASHIS = {
    "sun": 7,        # Libra
    "moon": 8,       # Scorpio
    "mars": 4,       # Cancer
    "mercury": 12,   # Pisces
    "jupiter": 10,   # Capricorn
    "venus": 6,      # Virgo
    "saturn": 1,     # Aries
    "rahu": 9,       # Sagittarius
    "ketu": 3,       # Gemini
}

OWN_RASHIS = {
    "sun": [5],
    "moon": [4],
    "mars": [1, 8],
    "mercury": [3, 6],
    "jupiter": [9, 12],
    "venus": [2, 7],
    "saturn": [10, 11],
    "rahu": [11],
    "ketu": [8],
}


def calc_planetary_dignity(planet_id: str, sign_index: int) -> str:
    """
    Evaluate dignity status for a planet in a given sign (1-12).
    """
    if EXALTATION_RASHIS.get(planet_id) == sign_index:
        return "Exalted (उच्च)"
    if DEBILITATION_RASHIS.get(planet_id) == sign_index:
        return "Debilitated (नीच)"
    if sign_index in OWN_RASHIS.get(planet_id, []):
        return "Own Sign (स्वक्षेत्र)"

    return "Neutral (सम)"
