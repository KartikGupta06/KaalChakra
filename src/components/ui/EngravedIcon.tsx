import React from 'react';

export type IconName =
  | 'home'
  | 'kundali'
  | 'panchang'
  | 'muhurat'
  | 'calendar'
  | 'timeline'
  | 'horoscope'
  | 'about'
  | 'settings'
  | 'archive'
  | 'sound-on'
  | 'sound-off'
  | 'sun'
  | 'lamp';

interface EngravedIconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName | string;
  className?: string;
}

export const EngravedIcon: React.FC<EngravedIconProps> = ({
  name,
  className = 'w-5 h-5',
  ...props
}) => {
  const defaultProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    ...props,
  };

  switch (name) {
    case 'kundali':
      // Diamond Natal Kundali Vector
      return (
        <svg {...defaultProps}>
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <line x1="3" y1="3" x2="21" y2="21" />
          <line x1="21" y1="3" x2="3" y2="21" />
          <polygon points="12,3 21,12 12,21 3,12" />
        </svg>
      );

    case 'panchang':
      // Sun & Moon Pillars Vector
      return (
        <svg {...defaultProps}>
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <path d="M18 6a6 6 0 0 1-6 6 6 6 0 0 1-6-6" opacity="0.6" />
        </svg>
      );

    case 'muhurat':
      // Sacred Diya Lamp Vector
      return (
        <svg {...defaultProps}>
          <path d="M12 2c.5 2.5 2 4.5 2 6a4 4 0 0 1-8 0c0-1.5 1.5-3.5 2-6z" />
          <path d="M4 14c0 4.4 3.6 8 8 8s8-3.6 8-8H4z" />
          <line x1="12" y1="22" x2="12" y2="18" />
        </svg>
      );

    case 'calendar':
    case 'timeline':
      // Sacred Time Almanac Scroll & Calendar Vector
      return (
        <svg {...defaultProps}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <circle cx="8" cy="14" r="1" fill="currentColor" />
          <circle cx="12" cy="14" r="1" fill="currentColor" />
          <circle cx="16" cy="14" r="1" fill="currentColor" />
        </svg>
      );

    case 'horoscope':
      // Celestial Crescent & Stars Vector
      return (
        <svg {...defaultProps}>
          <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z" />
          <path d="M19 3l.5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5z" />
        </svg>
      );

    case 'about':
      // Ancient Manuscript Scroll Vector
      return (
        <svg {...defaultProps}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="8" y1="7" x2="16" y2="7" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      );

    case 'settings':
      // Brass Astrolabe / Instrument Vector
      return (
        <svg {...defaultProps}>
          <circle cx="12" cy="12" r="8" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );

    case 'archive':
      // Temple Pillars & Archives Vector
      return (
        <svg {...defaultProps}>
          <path d="M3 21h18" />
          <path d="M5 21V10" />
          <path d="M9 21V10" />
          <path d="M15 21V10" />
          <path d="M19 21V10" />
          <path d="M2 10h20L12 3z" />
        </svg>
      );

    case 'sound-on':
      // Temple Bell / Sound Waves Vector
      return (
        <svg {...defaultProps}>
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      );

    case 'sound-off':
      // Muted Sound Vector
      return (
        <svg {...defaultProps}>
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      );

    case 'sun':
      // Solar Disc Vector
      return (
        <svg {...defaultProps}>
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );

    case 'lamp':
    default:
      // Sacred Temple Diya Vector
      return (
        <svg {...defaultProps}>
          <path d="M12 3v3" />
          <path d="M12 9a4 4 0 0 0-4 4c0 3 4 7 4 7s4-4 4-7a4 4 0 0 0-4-4z" />
          <path d="M5 20h14" />
        </svg>
      );
  }
};
