"""
Kalachakra — Wisdom Engine: Panchang Commentary (panchang.py)
=============================================================
Generates educational commentary for the 5 Panchang pillars at birth.
"""

from backend.models.kundali import KundaliResponse
from backend.models.wisdom import PanchangWisdom


def interpret_panchang_commentary(kundali: KundaliResponse) -> PanchangWisdom:
    """
    Builds educational commentary on Panchang pillars.
    """
    tithi_desc = (
        "The Tithi governs psychological energy and emotional vitality. "
        "It reflects the angular elongation between the Sun and the Moon at birth."
    )

    nakshatra_desc = (
        f"The birth Nakshatra governs the mind (Manas) and innate karmic tendencies. "
        f"It establishes the starting point for Dasha timing systems."
    )

    yoga_desc = (
        "The Nitya Yoga governs physical health, vitality, and systemic harmony. "
        "It is computed from the combined sidereal longitudes of the Sun and Moon."
    )

    karana_desc = (
        "The Karana (half-Tithi) governs executive action, professional endeavors, and daily execution."
    )

    vaara_desc = (
        "The Vaara (solar weekday) designates the planetary Lord of the day, governing vitality and stamina."
    )

    atmosphere = (
        f"Born under the astronomical baseline of {kundali.ascendantSign} Lagna. "
        f"The Panchang pillars establish a serene, balanced celestial atmosphere at the moment of birth."
    )

    return PanchangWisdom(
        tithiMeaning=tithi_desc,
        nakshatraMeaning=nakshatra_desc,
        yogaMeaning=yoga_desc,
        karanaMeaning=karana_desc,
        vaaraMeaning=vaara_desc,
        overallAtmosphere=atmosphere,
    )
