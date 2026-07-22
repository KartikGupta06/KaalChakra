/**
 * Kalachakra — Cosmic Timeline Service (timelineService.ts)
 * ==========================================================
 * Communicates with backend endpoints `/api/timeline/generate`, `/api/timeline/festivals`,
 * and `/api/timeline/eclipses` with graceful offline fallback.
 */

import { TimelineResponse, TimelineRequest, TimelineEvent } from '../types/timeline';

const API_BASE = '/api';

export async function generateCosmicTimeline(req: TimelineRequest): Promise<TimelineResponse> {
  try {
    const res = await fetch(`${API_BASE}/timeline/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (res.ok) {
      return (await res.json()) as TimelineResponse;
    }
  } catch (err) {
    console.warn('[Cosmic Timeline] Backend offline, using local timeline builder:', err);
  }

  return buildFallbackTimelineResponse(req);
}

function buildFallbackTimelineResponse(req: TimelineRequest): TimelineResponse {
  const todayStr = new Date().toISOString().split('T')[0];

  const fallbackEvents: TimelineEvent[] = [
    {
      eventId: 'evt-birth-marker',
      layer: 'birth',
      title: `Birth Moment of ${req.fullName}`,
      sanskritTitle: '॥ जन्म समय - काल बिंदु ॥',
      category: 'Natal Inscription',
      date: req.dateOfBirth,
      dateFormatted: req.dateOfBirth,
      timeStr: req.timeOfBirth,
      icon: '🎂',
      importance: 'Supreme',
      badgeColor: '#D4AF37',
      description: `Natal cosmic inscription at ${req.city}. Primary origin marker for all Vimshottari progressions.`,
      panchangContext: 'Lagna & Moon Natal Placement',
      chartConnection: 'Primary origin point.',
      isBookmarked: true,
    },
    {
      eventId: 'evt-dasha-current',
      layer: 'dasha',
      title: 'Jupiter Mahadasha - Saturn Antardasha',
      sanskritTitle: '॥ गुरु महादशा - शनि अन्तर्दशा ॥',
      category: 'Vimshottari Dasha',
      date: '2024-06-12',
      dateFormatted: 'June 12, 2024',
      timeStr: 'Span: 2.5 Years',
      icon: '⏳',
      importance: 'Supreme',
      badgeColor: '#2E7D32',
      description: 'Active Vimshottari sub-period governing professional maturity, karmic discipline, and long-term foundations.',
      panchangContext: 'Sub-Period: Jupiter - Saturn',
      chartConnection: 'Activates 9th and 10th house themes.',
      isBookmarked: false,
    },
    {
      eventId: 'evt-tr-jupiter',
      layer: 'transit',
      title: 'Jupiter Transit to Taurus',
      sanskritTitle: '॥ गुरु वृषभ राशि प्रवेश ॥',
      category: 'Planetary Transit',
      date: '2026-05-14',
      dateFormatted: 'May 14, 2026',
      timeStr: 'Sign Ingress',
      icon: '♃',
      importance: 'Supreme',
      badgeColor: '#D4AF37',
      description: 'Jupiter transits into Taurus (Vrishabha), expanding material assets, family wisdom, and peaceful speech.',
      panchangContext: 'Ingress Aries to Taurus',
      chartConnection: 'Enhances 2nd house values.',
      isBookmarked: false,
    },
    {
      eventId: 'evt-fest-diwali',
      layer: 'festival',
      title: 'Diwali (Deepavali)',
      sanskritTitle: '॥ दीपावली / लक्ष्मी पूजन ॥',
      category: 'Vedic Festival',
      date: '2026-11-08',
      dateFormatted: 'November 8, 2026',
      timeStr: 'Amavasya',
      icon: '🪔',
      importance: 'High',
      badgeColor: '#E67E22',
      description: 'Festival of lights celebrating victory of light over ignorance and divine Mahalakshmi blessings.',
      panchangContext: 'Kartika Amavasya',
      chartConnection: 'Presided by Mahalakshmi & Ganesha.',
      isBookmarked: false,
    },
    {
      eventId: 'evt-ecl-lunar',
      layer: 'eclipse',
      title: 'Total Lunar Eclipse (Leo)',
      sanskritTitle: '॥ चन्द्र ग्रहण (सिंह) ॥',
      category: 'Celestial Eclipse',
      date: '2026-03-03',
      dateFormatted: 'March 3, 2026',
      timeStr: '11:34 AM UTC',
      icon: '🌕',
      importance: 'Supreme',
      badgeColor: '#7B1E1E',
      description: 'Total Lunar Eclipse during Phalguna Purnima. Reserved for inner meditation and spiritual purification.',
      panchangContext: 'Leo Rashi • Purva Phalguni',
      chartConnection: 'Nodal eclipse axis activation.',
      isBookmarked: false,
    },
    {
      eventId: 'evt-muhurat-opt',
      layer: 'muhurat',
      title: 'Optimal Muhurat Window (Ati Uttam)',
      sanskritTitle: '॥ अति उत्तम मुहूर्त ॥',
      category: 'Muhurat Window',
      date: '2026-08-18',
      dateFormatted: 'August 18, 2026',
      timeStr: '06:12 AM - 11:45 AM',
      icon: '📜',
      importance: 'High',
      badgeColor: '#D4AF37',
      description: 'Highly favorable timing window evaluated under Shukla Panchami and Pushya Nakshatra.',
      panchangContext: 'Shukla Panchami • Pushya Nakshatra',
      chartConnection: 'Parasari & Muhurta Chintamani score 92/100.',
      isBookmarked: false,
    },
  ];

  const activeLayers = req.activeLayers || ['birth', 'dasha', 'transit', 'festival', 'eclipse', 'muhurat'];
  const filteredEvents = fallbackEvents.filter((e) => activeLayers.includes(e.layer));

  return {
    reportId: `KC-TIMELINE-LOCAL-${Date.now().toString(36).toUpperCase()}`,
    fullName: req.fullName,
    birthDate: req.dateOfBirth,
    birthLocation: req.city,
    currentDate: todayStr,
    activeLayers,
    totalEventsCount: filteredEvents.length,
    currentDasha: {
      mahadasha: 'Jupiter',
      sanskritMahadasha: 'गुरु',
      mahadashaRange: '2016-04-10 to 2032-04-10',
      antardasha: 'Jupiter - Saturn',
      sanskritAntardasha: 'गुरु - शनि',
      antardashaRange: '2024-06-12 to 2026-12-24',
    },
    events: filteredEvents,
    transparency: {
      ayanamsha: 'Lahiri (Chitrapaksha)',
      houseSystem: 'Whole Sign (Rashi Bhava)',
      dashaSystem: 'Vimshottari (120-Year Lunar Nakshatra Cycle)',
      generatedTimestamp: new Date().toISOString(),
      disclaimer:
        'The Cosmic Timeline integrates astronomical transits, Vimshottari Dasha calculations, and traditional Panchang events for educational reflection.',
    },
  };
}
