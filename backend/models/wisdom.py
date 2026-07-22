"""
Pydantic models for the Wisdom Engine (interpretation layer).
Defines schemas for chart overview, Lagna, planet interpretations,
house interpretations, Yoga explanations, Panchang commentary, and transparency metadata.
"""

from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class TransparencyMetadata(BaseModel):
    """Safety and calculation context for interpretation transparency."""
    ayanamsha: str = "Lahiri (Chitrapaksha)"
    houseSystem: str = "Whole Sign (Rashi Bhava)"
    calculatedTimestamp: str
    isAiGenerated: bool = False
    disclaimer: str = (
        "Interpretations are provided for educational and self-reflection purposes based on "
        "traditional Parasari Vedic astrology concepts. They are not guaranteed predictions or advice."
    )


class ChartOverviewWisdom(BaseModel):
    """Executive summary of the chart."""
    titleSanskrit: str = "॥ सर्वांगीण चक्र अवलोकन ॥"
    titleEnglish: str = "Overall Chart Summary"
    summary: str
    dominantElement: str  # Agni, Prithvi, Vayu, Jala
    dominantQuality: str  # Chara, Sthira, Dwiswabhava
    keyThemes: List[str]
    balancedPerspective: str


class AscendantWisdom(BaseModel):
    """Interpretation of the Lagna and Ascendant Lord."""
    titleSanskrit: str = "॥ लग्न एवं लग्नेश विचार ॥"
    titleEnglish: str = "Ascendant & Rising Sign Interpretation"
    signName: str
    signSanskrit: str
    traits: List[str]
    description: str
    lagnaLordMeaning: str


class PlanetWisdom(BaseModel):
    """Interpretation of a single Graha."""
    id: str
    name: str
    sanskrit: str
    symbol: str
    sign: str
    house: int
    nakshatra: str
    dignity: str
    signMeaning: str
    houseMeaning: str
    nakshatraMeaning: str
    dignityMeaning: str
    overallSummary: str


class HouseWisdom(BaseModel):
    """Interpretation of a single Bhava (1-12)."""
    houseNumber: int
    name: str
    rashi: str
    lord: str
    occupants: List[str]
    significance: str
    interpretation: str


class YogaWisdom(BaseModel):
    """Explanation of a detected Yoga."""
    id: str
    name: str
    sanskritName: str
    significance: str
    whyDetected: str
    contributingPlanets: List[str]
    interpretation: str
    strength: str


class PanchangWisdom(BaseModel):
    """Commentary on the 5 Panchang pillars at birth."""
    tithiMeaning: str
    nakshatraMeaning: str
    yogaMeaning: str
    karanaMeaning: str
    vaaraMeaning: str
    overallAtmosphere: str


class WisdomResponse(BaseModel):
    """Canonical Wisdom Engine response payload."""
    reportId: str
    fullName: str
    overview: ChartOverviewWisdom
    ascendant: AscendantWisdom
    planets: List[PlanetWisdom]
    houses: List[HouseWisdom]
    yogas: List[YogaWisdom]
    panchang: PanchangWisdom
    metadata: TransparencyMetadata
