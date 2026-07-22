"""
Kalachakra — Wisdom Engine: House Interpretations (houses.py)
============================================================
Generates educational commentary for all 12 Bhavas (houses):
significance, lordship, occupants, and traditional meaning.
"""

from typing import List
from backend.models.kundali import KundaliResponse
from backend.models.wisdom import HouseWisdom

BHAVA_NAMES = {
    1: "Tanu Bhava (तनू भाव) • Self & Physical Body",
    2: "Dhana Bhava (धन भाव) • Wealth & Family Speech",
    3: "Sahaja Bhava (सहज भाव) • Courage & Siblings",
    4: "Matru Bhava (मातृ भाव) • Mother & Property",
    5: "Putra Bhava (पुत्र भाव) • Intellect & Progeny",
    6: "Ari Bhava (अरि भाव) • Health & Obstacles",
    7: "Yuvati Bhava (युवति भाव) • Spouse & Partnerships",
    8: "Randhra Bhava (रन्ध्र भाव) • Longevity & Transformation",
    9: "Dharma Bhava (धर्म भाव) • Dharma & Higher Wisdom",
    10: "Karma Bhava (कर्म भाव) • Career & Social Status",
    11: "Labha Bhava (लाभ भाव) • Gains & Desires",
    12: "Vyaya Bhava (व्यय भाव) • Liberation & Expenses",
}

BHAVA_SIGNIFICANCES = {
    1: "Self, physical body, complexion, vital energy, personal identity, and life direction.",
    2: "Accumulated assets, family lineage, speech, early childhood education, and values.",
    3: "Younger siblings, courage, fine arts, communication skills, and short journeys.",
    4: "Mother, landed property, vehicles, inner emotional peace, and heart center.",
    5: "Higher education, creative intelligence, past life merit (Purva Punya), and mantra.",
    6: "Health challenges, service, overcoming obstacles, competitors, and daily duties.",
    7: "Marriage, life partner, business partnerships, public relations, and trade.",
    8: "Longevity, sudden transformations, occult research, secrets, and shared resources.",
    9: "Dharma, spiritual preceptors (Gurus), father, fortune, and long pilgrimages.",
    10: "Profession, public reputation, executive responsibilities, and civic duty.",
    11: "Financial gains, income streams, elder siblings, social networks, and goal achievement.",
    12: "Spiritual liberation (Moksha), foreign travels, solitude, meditation, and expenses.",
}


def interpret_houses(kundali: KundaliResponse) -> List[HouseWisdom]:
    """
    Generates interpretations for each of the 12 Bhavas.
    """
    result: List[HouseWisdom] = []

    for h in kundali.houses:
        h_num = h.houseNumber
        name = BHAVA_NAMES.get(h_num, f"Bhava {h_num}")
        sig = BHAVA_SIGNIFICANCES.get(h_num, "General life domain governed by this house.")

        occupants_str = ", ".join(h.containedPlanets) if h.containedPlanets else "None (Unoccupied)"

        interp = (
            f"House {h_num} falls in {h.rashiName} ({h.rashiSanskrit}), governed by {h.lordPlanet}. "
            f"Occupying Grahas: {occupants_str}. "
            f"This Bhava represents {sig.lower()}"
        )

        result.append(
            HouseWisdom(
                houseNumber=h_num,
                name=name,
                rashi=f"{h.rashiName} ({h.rashiSanskrit})",
                lord=h.lordPlanet,
                occupants=h.containedPlanets,
                significance=sig,
                interpretation=interp,
            )
        )

    return result
