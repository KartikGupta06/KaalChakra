"""
Kalachakra — Wisdom Engine: Planet Interpretations (planets.py)
================================================================
Generates educational interpretations for all 9 Navagrahas:
sign meaning, house placement, Nakshatra context, and dignity explanation.
"""

from typing import List
from backend.models.kundali import KundaliResponse, PlanetPosition
from backend.models.wisdom import PlanetWisdom

GRAHA_DESCRIPTIONS = {
    "sun": "Surya represents the Soul (Atman), vitality, willpower, ego, and executive authority.",
    "moon": "Chandra represents the Mind (Manas), emotions, perception, memory, and nurturing capacity.",
    "mars": "Mangala represents courage (Parakrama), energy, physical strength, initiative, and focus.",
    "mercury": "Budha represents intellect (Buddhi), speech, analytical capacity, trade, and learning.",
    "jupiter": "Guru represents wisdom, higher knowledge, spirituality, dharma, and expansion.",
    "venus": "Shukra represents harmony, beauty, relationships, fine arts, and refinement.",
    "saturn": "Shani represents discipline, perseverance, time (Kala), structure, and karmic lessons.",
    "rahu": "Rahu represents innovation, unconventional growth, worldly ambition, and desire.",
    "ketu": "Ketu represents spiritual liberation (Moksha), detachment, intuition, and mastery.",
}


def interpret_planets(kundali: KundaliResponse) -> List[PlanetWisdom]:
    """
    Generates interpretations for each of the 9 Grahas.
    """
    result: List[PlanetWisdom] = []

    for p in kundali.planets:
        base_desc = GRAHA_DESCRIPTIONS.get(
            p.id, f"{p.sanskrit} ({p.name}) governs essential karmic archetypes in the chart."
        )

        sign_meaning = (
            f"{p.sanskrit} is placed in {p.sign} at {p.degrees}. "
            f"This sign placement colors the expression of {p.name}'s natural archetype with {p.sign}'s qualities."
        )

        house_meaning = (
            f"Occupying Bhava {p.house}, {p.sanskrit} focuses its energy on matters pertaining to House {p.house}."
        )

        nakshatra_meaning = (
            f"Residing in Nakshatra {p.nakshatraSanskrit} ({p.nakshatraName}), Pada {p.pada}, "
            f"adding stellar nuance to {p.name}'s psychological expression."
        )

        dignity_str = p.dignity or "Sama (Neutral)"
        dignity_meaning = (
            f"Operating in {dignity_str} dignity. "
            f"Dignity indicates how easily and harmoniously the planet's inherent qualities can manifest."
        )

        retro_note = " (in Vakri/Retrograde motion, indicating internalized focus)" if p.isRetrograde else ""

        overall = (
            f"{base_desc} Positioned in {p.sign} (House {p.house}) under {p.nakshatraName}{retro_note}. "
            f"Dignity state is {dignity_str}."
        )

        result.append(
            PlanetWisdom(
                id=p.id,
                name=p.name,
                sanskrit=p.sanskrit,
                symbol=p.symbol,
                sign=p.sign,
                house=p.house,
                nakshatra=f"{p.nakshatraSanskrit} ({p.nakshatraName})",
                dignity=dignity_str,
                signMeaning=sign_meaning,
                houseMeaning=house_meaning,
                nakshatraMeaning=nakshatra_meaning,
                dignityMeaning=dignity_meaning,
                overallSummary=overall,
            )
        )

    return result
