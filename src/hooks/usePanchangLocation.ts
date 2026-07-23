import { useState, useEffect, useCallback } from 'react';
import { useKundali } from '../context/KundaliContext';

export interface ActiveLocation {
  city: string;
  lat?: number;
  lng?: number;
  source: 'geolocation' | 'manual' | 'kundali' | 'fallback';
}

const STORAGE_KEY = 'kalachakra_panchang_location_v1';

export function usePanchangLocation() {
  const { activeKundali } = useKundali();

  const getInitialLocation = (): ActiveLocation => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.city) return parsed;
      }
    } catch (e) {
      console.warn('[usePanchangLocation] localStorage error:', e);
    }

    if (activeKundali && activeKundali.place) {
      return {
        city: activeKundali.place,
        source: 'kundali',
      };
    }

    return {
      city: 'Ujjain (उज्जैन)',
      lat: 23.1793,
      lng: 75.7849,
      source: 'fallback',
    };
  };

  const [location, setLocationState] = useState<ActiveLocation>(getInitialLocation);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [detectionError, setDetectionError] = useState<string | null>(null);

  const setLocation = useCallback((newLoc: ActiveLocation) => {
    setLocationState(newLoc);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLoc));
    } catch (e) {
      console.warn('[usePanchangLocation] Save error:', e);
    }
  }, []);

  const detectBrowserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setDetectionError('Geolocation is not supported by your browser');
      return;
    }

    setIsDetecting(true);
    setDetectionError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let detectedCity = `Observed (${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E)`;

        try {
          // Attempt reverse geocoding via OpenStreetMap Nominatim
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          if (res.ok) {
            const data = await res.json();
            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              data.address?.county ||
              data.address?.state;
            const country = data.address?.country;
            if (city) {
              detectedCity = country ? `${city}, ${country}` : city;
            }
          }
        } catch (e) {
          console.warn('[usePanchangLocation] Reverse geocode failed, using coordinates:', e);
        }

        const geoLoc: ActiveLocation = {
          city: detectedCity,
          lat: latitude,
          lng: longitude,
          source: 'geolocation',
        };

        setLocation(geoLoc);
        setIsDetecting(false);
      },
      (err) => {
        setIsDetecting(false);
        if (err.code === err.PERMISSION_DENIED) {
          setDetectionError('Location permission denied. Please select a city manually.');
        } else {
          setDetectionError('Unable to detect live location.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, [setLocation]);

  // Sync with activeKundali if location source is kundali/fallback and activeKundali changes
  useEffect(() => {
    if (activeKundali && activeKundali.place && location.source === 'fallback') {
      setLocation({
        city: activeKundali.place,
        source: 'kundali',
      });
    }
  }, [activeKundali, location.source, setLocation]);

  return {
    location,
    setLocation,
    detectBrowserLocation,
    isDetecting,
    detectionError,
  };
}
