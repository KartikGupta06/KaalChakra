"""
Automated unit tests for Eternal Archive (Phase 14) models, validation, comparison engine, and migration handlers.
"""

import pytest
from backend.services.archive import (
    compute_checksum,
    validate_archive_backup,
    compare_archive_items,
    migrate_archive_schema
)
from backend.models.archive import ArchiveItemSchema, ComparisonRequestSchema


@pytest.fixture
def sample_archive_item():
    return {
        "id": "kc_arch_test_1",
        "title": "Ancient Ujjain Observer",
        "category": "personal",
        "familyGroup": "self",
        "tags": ["Royal", "Observatory"],
        "isFavorite": True,
        "birthData": {
            "fullName": "Ancient Ujjain Observer",
            "dateOfBirth": "1998-08-15",
            "timeOfBirth": "06:30",
            "city": "Ujjain",
            "latitude": 23.1765,
            "longitude": 75.7885,
            "timezone": "Asia/Kolkata"
        },
        "kundaliData": {
            "ascendant": {
                "rashi": "Kark (Cancer)",
                "lord": "Moon",
                "nakshatra": "Pushya",
                "formattedDegree": "14°22'"
            },
            "planets": [
                {
                    "name": "Sun",
                    "rashi": "Simha (Leo)",
                    "degree": 28.5,
                    "formattedDegree": "28°30'",
                    "nakshatra": "Uttara Phalguni",
                    "house": 2,
                    "dignity": "Swakshetra"
                },
                {
                    "name": "Moon",
                    "rashi": "Vrishabha (Taurus)",
                    "degree": 15.0,
                    "formattedDegree": "15°00'",
                    "nakshatra": "Rohini",
                    "house": 11,
                    "dignity": "Ucha"
                }
            ],
            "yogas": [
                {"name": "Gajakesari Yoga", "type": "Auspicious"}
            ]
        },
        "metadata": {
            "createdAt": "2026-07-23T10:00:00Z",
            "lastViewedAt": "2026-07-23T10:00:00Z",
            "updatedAt": "2026-07-23T10:00:00Z",
            "schemaVersion": "1.0.0",
            "calculationEngineVersion": "1.0.0",
            "appVersion": "1.0.0",
            "ayanamsha": "Lahiri",
            "houseSystem": "Whole Sign"
        }
    }


def test_checksum_computation(sample_archive_item):
    items = [sample_archive_item]
    checksum = compute_checksum(items)
    assert isinstance(checksum, str)
    assert len(checksum) == 16
    # Same items produce identical checksum
    assert compute_checksum(items) == checksum


def test_backup_validation(sample_archive_item):
    payload = {
        "version": "1.0.0",
        "exportedAt": "2026-07-23T10:00:00Z",
        "app": "Kalachakra Eternal Archive",
        "itemsCount": 1,
        "items": [sample_archive_item],
        "checksum": compute_checksum([sample_archive_item])
    }
    
    val_res = validate_archive_backup(payload)
    assert val_res.valid is True
    assert val_res.itemCount == 1
    assert len(val_res.errors) == 0


def test_invalid_backup_payload():
    payload = {"version": "1.0.0", "items": "invalid_type"}
    val_res = validate_archive_backup(payload)
    assert val_res.valid is False
    assert len(val_res.errors) > 0


def test_compare_archive_items(sample_archive_item):
    item2 = dict(sample_archive_item)
    item2["id"] = "kc_arch_test_2"
    item2["title"] = "Royal Regent"
    item2["familyGroup"] = "parents"

    req = ComparisonRequestSchema(
        itemIds=["kc_arch_test_1", "kc_arch_test_2"],
        items=[ArchiveItemSchema(**sample_archive_item), ArchiveItemSchema(**item2)]
    )

    matrix = compare_archive_items(req)
    assert "items" in matrix
    assert len(matrix["items"]) == 2
    assert "planetMatrix" in matrix
    assert len(matrix["planetMatrix"]) == 9
    assert len(matrix["lagnas"]) == 2
    assert len(matrix["yogas"]) == 2


def test_schema_migration():
    legacy_payload = {
        "version": "0.9.0",
        "items": [
            {
                "id": "legacy_1",
                "title": "Legacy Manuscript",
                "category": "personal",
                "birthData": {"fullName": "Legacy", "dateOfBirth": "1990-01-01", "timeOfBirth": "12:00", "city": "Delhi"}
            }
        ]
    }

    mig_res = migrate_archive_schema(legacy_payload, target_version="1.0.0")
    assert mig_res.success is True
    assert mig_res.migratedCount == 1
    assert mig_res.targetVersion == "1.0.0"
