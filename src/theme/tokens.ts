export const COLOR_TOKENS = {
  paper: '#F4E7C8',
  parchment: '#E7D1A3',
  sand: '#E9D8B4',
  ivory: '#F8F0DD',
  templeBrown: '#5C4033',
  darkWood: '#3A2414',
  burntBrown: '#2B1A10',
  charcoal: '#20140D',
  goldRoyal: '#D4AF37',
  brass: '#C89B3C',
  copper: '#B87333',
  saffron: '#E67E22',
  maroon: '#7B1E1E',
  sindoor: '#A52A2A',
  lotus: '#C97A7E',
  textPrimary: '#2F1B14',
  textSecondary: '#5C4033',
  textMuted: '#7D6B57',
  textDisabled: '#A79A87',
} as const;

export const ANIMATION_TIMINGS = {
  micro: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  component: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  hero: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  mandalaSpin: { duration: 120, ease: 'linear' },
} as const;

export const SHADOW_PRESETS = {
  warm: '0 8px 24px rgba(47, 27, 20, 0.12)',
  deep: '0 16px 40px rgba(32, 20, 13, 0.25)',
  glowAmber: '0 0 15px rgba(212, 175, 55, 0.35)',
  glowLamp: '0 0 30px rgba(230, 126, 34, 0.25)',
} as const;
