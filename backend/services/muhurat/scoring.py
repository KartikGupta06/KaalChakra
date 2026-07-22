"""
Kalachakra — Muhurat Suitability Scoring Engine (scoring.py)
=============================================================
Calculates a transparent 0-100 suitability score for candidate time windows
and builds traditional positive and negative factor lists.
"""

from typing import Dict, Any, List
from backend.models.panchang import PanchangResponse
from backend.models.muhurat import SuitabilityScore


def evaluate_suitability(panchang: PanchangResponse, event_rule: Dict[str, Any]) -> SuitabilityScore:
    """
    Evaluates a single day's Panchang against event rules and produces a SuitabilityScore.
    """
    score = 70  # Baseline start
    positives: List[str] = []
    negatives: List[str] = []

    # 1. Tithi Evaluation
    tithi_name = panchang.tithi.name
    # Extract tithi number from tithi response or raw index
    is_shukla = "Shukla" in tithi_name
    
    # Check unfavorable tithis (Rikta: Chaturthi 4, Navami 9, Chaturdashi 14, Amavasya 30)
    if "Chaturthi" in tithi_name or "Navami" in tithi_name or "Chaturdashi" in tithi_name:
        score -= 25
        negatives.append(f"Rikta Tithi ({tithi_name}) — Traditionally avoided for major inaugurations.")
    elif "Amavasya" in tithi_name:
        score -= 30
        negatives.append(f"Amavasya ({tithi_name}) — Low lunar light; reserved for ancestral rites.")
    else:
        score += 10
        positives.append(f"Auspicious Tithi ({tithi_name}) — Favorable lunar day energy.")

    if is_shukla:
        score += 5
        positives.append("Shukla Paksha (Waxing Moon) — Growing lunar brightness.")

    # 2. Nakshatra Evaluation
    nak_name = panchang.nakshatra.name.split()[0]  # Get primary nakshatra name
    fav_naks = event_rule.get("favorableNakshatras", [])
    if any(fn in panchang.nakshatra.name for fn in fav_naks):
        score += 15
        positives.append(f"Highly Favorable Nakshatra ({panchang.nakshatra.name}) for {event_rule['name']}.")
    else:
        score += 0
        positives.append(f"Neutral Stellar Mansion ({panchang.nakshatra.name}).")

    # 3. Vaara (Weekday) Evaluation
    vaara_name = panchang.vaara.value.split()[0]  # E.g. "Monday"
    fav_vaaras = event_rule.get("favorableVaaras", [])
    if any(fv in panchang.vaara.name for fv in fav_vaaras):
        score += 10
        positives.append(f"Favorable Weekday ({panchang.vaara.name}) presided by {panchang.vaara.deity}.")
    else:
        score -= 5
        negatives.append(f"Secondary Weekday ({panchang.vaara.name}).")

    # 4. Yoga Evaluation
    yoga_name = panchang.yoga.name
    unfav_yogas = event_rule.get("unfavorableYogas", ["Vyatipata", "Vaidhriti"])
    if any(uy in yoga_name for uy in unfav_yogas):
        score -= 20
        negatives.append(f"Inauspicious Nitya Yoga ({yoga_name}) — Angular solar-lunar conflict.")
    else:
        score += 5
        positives.append(f"Benefic Nitya Yoga ({yoga_name}).")

    # 5. Karana (Half-Tithi) Evaluation
    karana_name = panchang.karana.name
    if "Vishti" in karana_name or "Bhadra" in karana_name:
        score -= 25
        negatives.append(f"Vishti (Bhadra) Karana ({karana_name}) — Highly inauspicious time window.")
    else:
        score += 5
        positives.append(f"Favorable Karana ({karana_name}).")

    # Clamp score to 0 - 100
    final_score = max(0, min(100, score))

    # Map level
    if final_score >= 85:
        level = "Excellent"
        level_sa = "अति उत्तम"
        color = "#D4AF37"  # Gold
    elif final_score >= 70:
        level = "Good"
        level_sa = "उत्तम"
        color = "#2E7D32"  # Emerald Green
    elif final_score >= 50:
        level = "Acceptable"
        level_sa = "मध्यम"
        color = "#E67E22"  # Amber
    else:
        level = "Avoid"
        level_sa = "वर्ज्य / त्याज्य"
        color = "#A52A2A"  # Sindoor Red

    return SuitabilityScore(
        score=final_score,
        level=level,
        levelSanskrit=level_sa,
        badgeColor=color,
        positiveFactors=positives,
        negativeFactors=negatives,
    )
