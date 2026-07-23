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

export interface PanchangLocationQuery {
  city?: string;
  lat?: number;
  lng?: number;
}

function buildLocationQuery(loc?: PanchangLocationQuery | string): string {
  if (!loc) return 'city=Ujjain';
  if (typeof loc === 'string') return `city=${encodeURIComponent(loc)}`;
  const params: string[] = [];
  if (loc.lat != null && loc.lng != null) {
    params.push(`lat=${loc.lat}&lng=${loc.lng}`);
  }
  if (loc.city) {
    params.push(`city=${encodeURIComponent(loc.city)}`);
  }
  return params.length > 0 ? params.join('&') : 'city=Ujjain';
}

/**
 * Fetch today's Panchang data from the backend.
 */
export async function fetchTodayPanchang(
  location?: PanchangLocationQuery | string
): Promise<PanchangData | null> {
  const query = buildLocationQuery(location);
  return apiFetch<PanchangData>(`/panchang/today?${query}`);
}

/**
 * Fetch Panchang data for a specific date.
 */
export async function fetchPanchangForDate(
  date: string,
  location?: PanchangLocationQuery | string
): Promise<PanchangData | null> {
  const query = buildLocationQuery(location);
  return apiFetch<PanchangData>(`/panchang/date?date=${encodeURIComponent(date)}&${query}`);
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
