/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kc: {
          paper: 'var(--kc-bg-paper)',
          parchment: 'var(--kc-bg-parchment)',
          sand: 'var(--kc-bg-sand)',
          ivory: 'var(--kc-bg-ivory)',
          'temple-brown': 'var(--kc-bg-temple-brown)',
          'dark-wood': 'var(--kc-bg-dark-wood)',
          'burnt-brown': 'var(--kc-bg-burnt-brown)',
          charcoal: 'var(--kc-bg-charcoal)',
          gold: {
            DEFAULT: 'var(--kc-gold-royal)',
            royal: 'var(--kc-gold-royal)',
            light: '#E6C65A',
            dark: '#B08E23',
          },
          brass: 'var(--kc-brass)',
          copper: 'var(--kc-copper)',
          saffron: 'var(--kc-saffron)',
          maroon: 'var(--kc-maroon)',
          sindoor: 'var(--kc-sindoor)',
          lotus: 'var(--kc-lotus)',
          text: {
            primary: 'var(--kc-text-primary)',
            secondary: 'var(--kc-text-secondary)',
            muted: 'var(--kc-text-muted)',
            disabled: 'var(--kc-text-disabled)',
          },
        },
      },
      fontFamily: {
        heading: ['Cinzel', 'EB Garamond', 'Cormorant Garamond', 'serif'],
        serif: ['EB Garamond', 'Cormorant Garamond', 'Georgia', 'serif'],
        devanagari: ['"Tiro Devanagari Sanskrit"', '"Noto Serif Devanagari"', 'serif'],
        display: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
      },
      boxShadow: {
        warm: 'var(--kc-shadow-warm)',
        deep: 'var(--kc-shadow-deep)',
        inset: 'inset 0 2px 4px rgba(47, 27, 20, 0.12)',
      },
      dropShadow: {
        amber: '0 0 10px rgba(212, 175, 55, 0.4)',
        lamp: '0 0 20px rgba(230, 126, 34, 0.3)',
      },
      animation: {
        'mandala-spin': 'spin 120s linear infinite',
        'mandala-spin-reverse': 'spin 180s linear infinite reverse',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.85', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
