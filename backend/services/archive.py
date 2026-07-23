"""
Backend service for Eternal Archive validation, checksum generation, migration, and comparative matrix aggregation.
"""

import hashlib
import json
from typing import Dict, Any, List
from backend.models.archive import (
    ArchiveBackupPayload,
    ValidationResponse,
    ComparisonRequestSchema,
    MigrationResultSchema,
    ArchiveItemSchema
)


def compute_checksum(items: List[Dict[str, Any]]) -> str:
    """Compute SHA-256 checksum over serialized archive items for integrity verification."""
    serialized = json.dumps(items, sort_keys=True)
    return hashlib.sha256(serialized.encode('utf-8')).hexdigest()[:16]


def validate_archive_backup(payload: Dict[str, Any]) -> ValidationResponse:
    """Validate archive import payload for schema correctness and data integrity."""
    errors = []
    warnings = []
    
    if not isinstance(payload, dict):
        return ValidationResponse(valid=False, version="unknown", itemCount=0, errors=["Payload is not a valid JSON object"])
    
    version = payload.get("version", "1.0.0")
    items = payload.get("items", [])
    
    if not isinstance(items, list):
        errors.append("Field 'items' must be an array")
        return ValidationResponse(valid=False, version=str(version), itemCount=0, errors=errors)
    
    valid_count = 0
    for idx, raw_item in enumerate(items):
        try:
            ArchiveItemSchema(**raw_item)
            valid_count += 1
        except Exception as e:
            errors.append(f"Item #{idx+1} ({raw_item.get('title', 'Unknown')}): {str(e)}")

    if valid_count < len(items):
        warnings.append(f"{len(items) - valid_count} items have schema validation warnings.")

    checksum = payload.get("checksum")
    if checksum:
        expected = compute_checksum(items)
        if checksum != expected:
            warnings.append("Checksum verification failed: Backup data may have been modified.")

    return ValidationResponse(
        valid=len(errors) == 0,
        version=str(version),
        itemCount=valid_count,
        errors=errors,
        warnings=warnings
    )


def compare_archive_items(request: ComparisonRequestSchema) -> Dict[str, Any]:
    """
    Generate comparative analysis matrix between multiple saved charts.
    Includes Lagna comparison, Planet placement matrix, detected Yogas comparison, and Panchang comparison.
    """
    items = request.items
    if not items:
        return {"items": [], "comparisons": {}}

    result = {
        "items": [
            {
                "id": item.id,
                "title": item.title,
                "familyGroup": item.familyGroup,
                "birthData": item.birthData,
                "lagna": item.kundaliData.get("ascendant", {}) if item.kundaliData else {},
            }
            for item in items
        ],
        "planetMatrix": [],
        "lagnas": [],
        "yogas": [],
        "panchang": []
    }

    # Extract all planet names present across charts
    planet_names = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"]

    for p_name in planet_names:
        row = {"planet": p_name, "placements": {}}
        for item in items:
            p_data = {}
            if item.kundaliData and "planets" in item.kundaliData:
                matched = next((p for p in item.kundaliData["planets"] if p.get("name") == p_name), None)
                if matched:
                    p_data = {
                        "rashi": matched.get("rashi"),
                        "degree": matched.get("formattedDegree", f"{matched.get('degree', 0):.2f}°"),
                        "nakshatra": matched.get("nakshatra"),
                        "house": matched.get("house"),
                        "dignity": matched.get("dignity")
                    }
            row["placements"][item.id] = p_data
        result["planetMatrix"].append(row)

    # Collect Lagnas
    for item in items:
        asc = item.kundaliData.get("ascendant", {}) if item.kundaliData else {}
        result["lagnas"].append({
            "itemId": item.id,
            "title": item.title,
            "rashi": asc.get("rashi", "Unknown"),
            "lord": asc.get("lord", "Unknown"),
            "nakshatra": asc.get("nakshatra", "Unknown"),
            "degree": asc.get("formattedDegree", "0°")
        })

    # Collect Yogas
    for item in items:
        y_list = item.kundaliData.get("yogas", []) if item.kundaliData else []
        result["yogas"].append({
            "itemId": item.id,
            "title": item.title,
            "yogaNames": [y.get("name") for y in y_list if isinstance(y, dict)]
        })

    # Collect Panchang birth moment details
    for item in items:
        bd = item.birthData
        result["panchang"].append({
            "itemId": item.id,
            "title": item.title,
            "date": bd.get("dateOfBirth"),
            "time": bd.get("timeOfBirth"),
            "city": bd.get("city")
        })

    return result


def migrate_archive_schema(payload: Dict[str, Any], target_version: str = "1.0.0") -> MigrationResultSchema:
    """Migrate legacy archive schemas to current target schema version."""
    orig_ver = payload.get("version", "0.9.0")
    items = payload.get("items", [])
    
    migrated_count = 0
    details = []

    for item in items:
        if "metadata" not in item:
            item["metadata"] = {
                "schemaVersion": target_version,
                "calculationEngineVersion": "1.0.0",
                "appVersion": "1.0.0"
            }
            details.append(f"Added missing metadata object to chart '{item.get('title', 'Untitled')}'")
        if "familyGroup" not in item:
            item["familyGroup"] = "self"
        migrated_count += 1

    return MigrationResultSchema(
        originalVersion=orig_ver,
        targetVersion=target_version,
        migratedCount=migrated_count,
        success=True,
        details=details
    )
