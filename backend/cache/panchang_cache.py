"""
Kalachakra — Simple In-Memory Panchang Cache
===============================================
Caches computed Panchang data keyed by (date, lat, lng) with 1-hour TTL.
"""

import time
from typing import Optional, Any

_cache: dict = {}
_TTL_SECONDS = 3600  # 1 hour


def _make_key(date_str: str, lat: float, lng: float) -> str:
    """Create a cache key from date and coordinates."""
    return f"{date_str}|{round(lat, 4)}|{round(lng, 4)}"


def get_cached(date_str: str, lat: float, lng: float) -> Optional[Any]:
    """Retrieve cached Panchang data if it exists and hasn't expired."""
    key = _make_key(date_str, lat, lng)
    entry = _cache.get(key)
    if entry is None:
        return None
    if time.time() - entry["timestamp"] > _TTL_SECONDS:
        # Expired
        del _cache[key]
        return None
    return entry["data"]


def set_cached(date_str: str, lat: float, lng: float, data: Any) -> None:
    """Store Panchang data in cache."""
    key = _make_key(date_str, lat, lng)
    _cache[key] = {
        "data": data,
        "timestamp": time.time(),
    }


def clear_cache() -> None:
    """Clear all cached entries."""
    global _cache
    _cache = {}
