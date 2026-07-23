"""
API router for Eternal Archive validation, checksum generation, comparison, and backup export/import handlers.
"""

from fastapi import APIRouter, HTTPException, status
from typing import Dict, Any
from backend.models.archive import (
    ValidationResponse,
    ComparisonRequestSchema,
    MigrationResultSchema
)
from backend.services.archive import (
    validate_archive_backup,
    compare_archive_items,
    migrate_archive_schema,
    compute_checksum
)

router = APIRouter(prefix="/api/archive", tags=["Eternal Archive"])


@router.post("/validate-backup", response_model=ValidationResponse)
def validate_backup_endpoint(payload: Dict[str, Any]):
    """Validate JSON archive backup structure and checksum."""
    try:
        return validate_archive_backup(payload)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Validation error: {str(e)}"
        )


@router.post("/checksum")
def compute_checksum_endpoint(payload: Dict[str, Any]):
    """Generate SHA-256 integrity checksum for a list of archive items."""
    items = payload.get("items", [])
    checksum = compute_checksum(items)
    return {"checksum": checksum, "itemCount": len(items)}


@router.post("/compare")
def compare_charts_endpoint(request: ComparisonRequestSchema):
    """Generate comparative matrix between 2 or more saved Kundalis."""
    try:
        return compare_archive_items(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Comparison engine error: {str(e)}"
        )


@router.post("/migrate", response_model=MigrationResultSchema)
def migrate_archive_endpoint(payload: Dict[str, Any]):
    """Migrate legacy archive schemas to current schema version."""
    try:
        return migrate_archive_schema(payload)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Migration error: {str(e)}"
        )
