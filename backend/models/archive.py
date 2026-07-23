"""
Pydantic schemas for Phase 14 - Eternal Archive (सनातन अभिलेखागार)
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime


class ArchiveMetadataSchema(BaseModel):
    createdAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    lastViewedAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    updatedAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    schemaVersion: str = "1.0.0"
    calculationEngineVersion: str = "1.0.0"
    appVersion: str = "1.0.0"
    ayanamsha: str = "Lahiri"
    houseSystem: str = "Whole Sign"


class ArchiveItemSchema(BaseModel):
    id: str
    title: str
    category: str = Field(..., description="personal | family | muhurat | manuscript | timeline | bookmark | collection")
    familyGroup: str = Field("self", description="self | parents | children | relatives | clients | custom")
    tags: List[str] = Field(default_factory=list)
    isFavorite: bool = False
    notes: Optional[str] = None
    birthData: Dict[str, Any]
    kundaliData: Optional[Dict[str, Any]] = None
    wisdomData: Optional[Dict[str, Any]] = None
    manuscriptData: Optional[Dict[str, Any]] = None
    muhuratData: Optional[Dict[str, Any]] = None
    timelineData: Optional[Dict[str, Any]] = None
    metadata: ArchiveMetadataSchema = Field(default_factory=ArchiveMetadataSchema)


class ArchiveBackupPayload(BaseModel):
    version: str = "1.0.0"
    exportedAt: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    app: str = "Kalachakra Eternal Archive"
    itemsCount: int
    items: List[ArchiveItemSchema]
    settings: Optional[Dict[str, Any]] = None
    checksum: Optional[str] = None


class ValidationResponse(BaseModel):
    valid: bool
    version: str
    itemCount: int
    errors: List[str] = Field(default_factory=list)
    warnings: List[str] = Field(default_factory=list)


class ComparisonRequestSchema(BaseModel):
    itemIds: List[str]
    items: List[ArchiveItemSchema]


class MigrationResultSchema(BaseModel):
    originalVersion: str
    targetVersion: str
    migratedCount: int
    success: bool
    details: List[str] = Field(default_factory=list)
