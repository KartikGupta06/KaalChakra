"""
Kalachakra — FastAPI Application Entry Point
================================================
The Celestial Computation Engine (दिव्य गणना यन्त्र)
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.panchang_router import router as panchang_router
from backend.api.kundali_router import router as kundali_router
from backend.api.location_router import router as location_router
from backend.api.wisdom_router import router as wisdom_router
from backend.api.muhurat_router import router as muhurat_router

app = FastAPI(
    title="Kalachakra — Celestial Computation Engine",
    description="Vedic astronomical computation backend powered by Swiss Ephemeris.",
    version="1.0.0",
)

# CORS middleware for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(panchang_router)
app.include_router(kundali_router)
app.include_router(location_router)
app.include_router(wisdom_router)
app.include_router(muhurat_router)


@app.get("/")
def root():
    """Health check endpoint."""
    return {
        "name": "Kalachakra — Celestial Computation Engine",
        "sanskrit": "कालचक्र — दिव्य गणना यन्त्र",
        "status": "operational",
        "version": "1.0.0",
    }


@app.get("/health")
def health():
    """Detailed health check."""
    return {"status": "healthy", "engine": "Swiss Ephemeris (pyswisseph)"}
