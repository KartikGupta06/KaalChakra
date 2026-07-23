"""
Kalachakra — Wisdom Engine Extension Points (ai_extension.py)
=============================================================
Architecture preparation for future AI Guide integration.

Pipeline Architecture:
  Calculated Kundali
         ↓
  Wisdom Engine (Structural Parasari Analysis)
         ↓
  AI Guide (Synthesized Context Transformer)
         ↓
  Simple Language Explanation (Accessible Wisdom)
"""

from typing import Dict, Any, Optional
from backend.models.wisdom import WisdomResponse


class AIGuideExtensionPoint:
    """
    Extension interface and placeholder adapter for AI Guide integration.
    Allows future AI models (e.g. Gemini) to receive structured Kundali
    and WisdomResponse context and produce natural, accessible guidance.
    """

    def __init__(self, model_name: str = "gemini-3.5-flash"):
        self.model_name = model_name
        self.is_active = False

    def build_prompt_payload(self, wisdom: WisdomResponse, language: str = "en") -> Dict[str, Any]:
        """
        Formats calculated Kundali and Wisdom Engine analysis into a clean
        prompt payload optimized for AI Guide synthesis.
        """
        return {
            "fullName": wisdom.fullName,
            "ascendant": wisdom.ascendant.signName,
            "dominantElement": wisdom.overview.dominantElement,
            "dominantQuality": wisdom.overview.dominantQuality,
            "keyThemes": wisdom.overview.keyThemes,
            "planetsCount": len(wisdom.planets),
            "yogasDetected": [y.name for y in wisdom.yogas],
            "requestedLanguage": language,
            "systemInstruction": (
                "You are an empathetic, educational Vedic astrology guide. "
                "Synthesize the provided structural chart analysis into clear, accessible language "
                "without adding superstitious or deterministic predictions."
            ),
        }

    def generate_simple_explanation(
        self, wisdom: WisdomResponse, user_query: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Placeholder extension method for generating simple language explanations.
        Ready for live API binding in future phases.
        """
        payload = self.build_prompt_payload(wisdom)
        return {
            "status": "prepared",
            "extensionActive": self.is_active,
            "payloadSummary": f"Payload compiled for {payload['fullName']} ({payload['ascendant']})",
            "futureAiGuideReady": True,
            "query": user_query,
        }
