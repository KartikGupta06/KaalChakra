/**
 * Kalachakra — API Service Layer
 * ================================
 * Thin fetch wrapper for communicating with the Celestial Computation Engine backend.
 * All API calls have graceful error handling — the frontend falls back to placeholder data.
 */

import { PanchangData } from '../types/panchang';

const API_BASE = '/api';

/**
 * Generic fetch wrapper with JSON parsing and error handling.
 */
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!response.ok) {
      console.warn(`[Kalachakra API] ${response.status} ${response.statusText} for ${url}`);
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.warn(`[Kalachakra API] Network error for ${url}:`, error);
    return null;
  }
}

/**
 * Fetch today's Panchang data from the backend.
 * Falls back to null if the backend is unavailable.
 */
export async function fetchTodayPanchang(city: string = 'Ujjain'): Promise<PanchangData | null> {
  return apiFetch<PanchangData>(`/panchang/today?city=${encodeURIComponent(city)}`);
}

/**
 * Fetch Panchang data for a specific date.
 */
export async function fetchPanchangForDate(
  date: string,
  city: string = 'Ujjain'
): Promise<PanchangData | null> {
  return apiFetch<PanchangData>(
    `/panchang/date?date=${encodeURIComponent(date)}&city=${encodeURIComponent(city)}`
  );
}

/**
 * Generate a Kundali (natal chart) from birth details.
 */
export async function generateKundali(birthData: {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  city: string;
}) {
  return apiFetch('/kundali/generate', {
    method: 'POST',
    body: JSON.stringify(birthData),
  });
}

/**
 * Search the built-in location database.
 */
export async function searchLocations(query: string) {
  return apiFetch(`/location/search?q=${encodeURIComponent(query)}`);
}
