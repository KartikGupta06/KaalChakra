"""
Kalachakra — Vimshottari Dasha Engine (vimshottari.py)
======================================================
Calculates 120-year Vimshottari Mahadashas and Antardashas based on natal Moon longitude.
"""

from datetime import datetime, timedelta
from typing import List, Dict, Any

# 9 Nakshatra Lords in fixed Vimshottari order & years
DASHA_LORDS = [
    {"id": "ketu", "name": "Ketu", "sanskrit": "केतु", "symbol": "☋", "years": 7},
    {"id": "venus", "name": "Venus", "sanskrit": "शुक्र", "symbol": "♀", "years": 20},
    {"id": "sun", "name": "Sun", "sanskrit": "सूर्य", "symbol": "☉", "years": 6},
    {"id": "moon", "name": "Moon", "sanskrit": "चन्द्र", "symbol": "☽", "years": 10},
    {"id": "mars", "name": "Mars", "sanskrit": "मंगर", "symbol": "♂", "years": 7},
    {"id": "rahu", "name": "Rahu", "sanskrit": "राहु", "symbol": "☊", "years": 18},
    {"id": "jupiter", "name": "Jupiter", "sanskrit": "गुरु", "symbol": "♃", "years": 16},
    {"id": "saturn", "name": "Saturn", "sanskrit": "शनि", "symbol": "♄", "years": 19},
    {"id": "mercury", "name": "Mercury", "sanskrit": "बुध", "symbol": "☿", "years": 17},
]

TOTAL_DASHA_CYCLE_YEARS = 120.0
DEGREES_PER_NAKSHATRA = 13.333333333333334


def calc_vimshottari_dashas(moon_longitude: float, birth_dt: datetime) -> List[Dict[str, Any]]:
    """
    Calculates 120-year Vimshottari Mahadasha sequence and Antardashas from birth date.
    """
    # 1. Determine Nakshatra index (0-26) and lord index (0-8)
    nak_index = int(moon_longitude / DEGREES_PER_NAKSHATRA) % 27
    lord_start_index = nak_index % 9

    # 2. Traversed and remaining balance of first Mahadasha
    lng_in_nak = moon_longitude % DEGREES_PER_NAKSHATRA
    fraction_remaining = 1.0 - (lng_in_nak / DEGREES_PER_NAKSHATRA)

    first_lord = DASHA_LORDS[lord_start_index]
    first_mahadasha_years = first_lord["years"] * fraction_remaining

    mahadashas: List[Dict[str, Any]] = []
    current_start = birth_dt

    today_dt = datetime.now()

    # Build sequence of 9 Mahadashas (120 years total span)
    for i in range(9):
        l_idx = (lord_start_index + i) % 9
        lord = DASHA_LORDS[l_idx]

        m_years = first_mahadasha_years if i == 0 else float(lord["years"])
        days = m_years * 365.2425
        current_end = current_start + timedelta(days=days)

        is_current_m = current_start <= today_dt <= current_end

        # Calculate Antardashas for this Mahadasha
        antardashas = _calc_antardashas(lord, m_years, current_start, today_dt)

        mahadashas.append({
            "lord": lord["name"],
            "sanskritLord": lord["sanskrit"],
            "lordSymbol": lord["symbol"],
            "startDate": current_start.strftime("%Y-%m-%d"),
            "endDate": current_end.strftime("%Y-%m-%d"),
            "durationYears": round(m_years, 2),
            "isCurrent": is_current_m,
            "antardashas": antardashas,
        })

        current_start = current_end

    return mahadashas


def _calc_antardashas(
    mahadasha_lord: Dict[str, Any],
    mahadasha_duration: float,
    m_start: datetime,
    today_dt: datetime,
) -> List[Dict[str, Any]]:
    """
    Calculates the 9 Antardasha sub-periods for a Mahadasha.
    Antardasha lord sequence starts from the Mahadasha lord itself.
    """
    m_lord_idx = next(idx for idx, l in enumerate(DASHA_LORDS) if l["id"] == mahadasha_lord["id"])
    antardashas: List[Dict[str, Any]] = []

    a_start = m_start

    for j in range(9):
        sub_idx = (m_lord_idx + j) % 9
        sub_lord = DASHA_LORDS[sub_idx]

        # Antardasha years = (Mahadasha_years * SubLord_years) / 120
        ratio = (mahadasha_lord["years"] * sub_lord["years"]) / TOTAL_DASHA_CYCLE_YEARS
        # Scale proportionally if first mahadasha is partial
        if mahadasha_duration != float(mahadasha_lord["years"]):
            ratio = ratio * (mahadasha_duration / float(mahadasha_lord["years"]))

        a_days = ratio * 365.2425
        a_end = a_start + timedelta(days=a_days)

        is_current_a = a_start <= today_dt <= a_end

        antardashas.append({
            "lord": f"{mahadasha_lord['name']} - {sub_lord['name']}",
            "sanskritLord": f"{mahadasha_lord['sanskrit']} - {sub_lord['sanskrit']}",
            "lordSymbol": f"{mahadasha_lord['symbol']} {sub_lord['symbol']}",
            "startDate": a_start.strftime("%Y-%m-%d"),
            "endDate": a_end.strftime("%Y-%m-%d"),
            "durationYears": round(ratio, 3),
            "isCurrent": is_current_a,
        })

        a_start = a_end

    return antardashas


def get_active_dasha(mahadashas: List[Dict[str, Any]], target_dt: datetime) -> Dict[str, Any]:
    """
    Extracts the active Mahadasha and Antardasha for a target date.
    """
    target_str = target_dt.strftime("%Y-%m-%d")

    for m in mahadashas:
        if m["startDate"] <= target_str <= m["endDate"]:
            active_antar = None
            for a in m.get("antardashas", []):
                if a["startDate"] <= target_str <= a["endDate"]:
                  active_antar = a
                  break

            return {
                "mahadasha": m["lord"],
                "sanskritMahadasha": m["sanskritLord"],
                "mahadashaRange": f"{m['startDate']} to {m['endDate']}",
                "antardasha": active_antar["lord"] if active_antar else "General",
                "sanskritAntardasha": active_antar["sanskritLord"] if active_antar else "सामान्य",
                "antardashaRange": f"{active_antar['startDate']} to {active_antar['endDate']}" if active_antar else m["startDate"],
            }

    # Default fallback if out of 120-year range
    return {
        "mahadasha": mahadashas[0]["lord"],
        "sanskritMahadasha": mahadashas[0]["sanskritLord"],
        "mahadashaRange": f"{mahadashas[0]['startDate']} to {mahadashas[0]['endDate']}",
        "antardasha": "General",
        "sanskritAntardasha": "सामान्य",
        "antardashaRange": mahadashas[0]["startDate"],
    }
