"""
Kalachakra — Wisdom Engine: Ascendant Interpretation (ascendant.py)
===================================================================
Generates educational interpretations for the Lagna (rising sign),
sign traits, and Lagna Lord governor.
"""

from backend.models.kundali import KundaliResponse
from backend.models.wisdom import AscendantWisdom

LAGNA_TRAITS_MAP = {
    1: ["Courageous", "Pioneering", "Direct", "Dynamic Initiative"],
    2: ["Steadfast", "Resourceful", "Aesthetic", "Sensory Appreciation"],
    3: ["Communicative", "Adaptable", "Intellectual", "Inquisitive"],
    4: ["Nurturing", "Intuitive", "Protective", "Emotional Strength"],
    5: ["Nobility", "Creative Expression", "Generosity", "Dignified Leadership"],
    6: ["Analytical", "Service-Oriented", "Detail-Focused", "Discriminating"],
    7: ["Harmonious", "Diplomatic", "Relational", "Equitable"],
    8: ["Transformative", "Resilient", "Perceptive", "Investigative"],
    9: ["Philosophical", "Optimistic", "Dharmic", "Truth-Seeking"],
    10: ["Ambitious", "Disciplined", "Structured", "Pragmatic Leadership"],
    11: ["Visionary", "Humanitarian", "Systematic", "Progressive"],
    12: ["Transcendent", "Compassionate", "Imaginative", "Spiritual"],
}

LAGNA_LORD_MAP = {
    1: "Mangala (Mars)",
    2: "Shukra (Venus)",
    3: "Budha (Mercury)",
    4: "Chandra (Moon)",
    5: "Surya (Sun)",
    6: "Budha (Mercury)",
    7: "Shukra (Venus)",
    8: "Mangala (Mars)",
    9: "Guru (Jupiter)",
    10: "Shani (Saturn)",
    11: "Shani (Saturn)",
    12: "Guru (Jupiter)",
}


def interpret_ascendant(kundali: KundaliResponse) -> AscendantWisdom:
    """
    Interprets the Lagna sign traits and Lagna Lord.
    """
    asc = kundali.ascendant
    sign_idx = asc.signIndex
    traits = LAGNA_TRAITS_MAP.get(sign_idx, ["Dignified", "Dynamic", "Pioneering"])

    desc = (
        f"The Ascendant (Lagna) is {asc.sign} positioned at {asc.degrees} in the Nakshatra of {asc.nakshatraSanskrit} ({asc.nakshatraName}), Pada {asc.pada}. "
        f"In Vedic astrology, the Lagna represents the lens through which life experiences are filtered, governing physical vitality, outward expression, and core perspective."
    )

    lord_meaning = (
        f"The ruler of {asc.sign} is the primary Lagna Lord. "
        f"The strength and placement of the Lagna Lord determines how naturally these inherent traits are expressed and integrated throughout life's journey."
    )

    return AscendantWisdom(
        titleSanskrit="॥ लग्न एवं लग्नेश विचार ॥",
        titleEnglish="Ascendant & Rising Sign Interpretation",
        signName=asc.sign,
        signSanskrit=asc.sign,
        traits=traits,
        description=desc,
        lagnaLordMeaning=lord_meaning,
    )
