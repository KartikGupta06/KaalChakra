import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// 1. Marriage / Vivaha: Sacred Wedding Mandap & Kalash
export const MarriageKalashIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2s-3 3.5-3 5.5c0 1.657 1.343 3 3 3s3-1.343 3-3C15 5.5 12 2 12 2z" fill="currentColor" fillOpacity="0.2" />
    <path d="M6 14c0 3 2.5 6 6 6s6-3 6-6H6z" />
    <path d="M8 10h8" />
    <path d="M4 21h16" />
    <path d="M5 21v-4M19 21v-4" />
  </svg>
);

// 2. Griha Pravesh / Housewarming: Traditional Indian House Engraving
export const GrihaPraveshIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z" />
    <path d="M9 21v-6a3 3 0 016 0v6" />
    <path d="M12 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  </svg>
);

// 3. Vyapar / Business: Royal Merchant Scale / Chest
export const MerchantChestIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="3" y="7" width="18" height="13" rx="1.5" />
    <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    <path d="M12 12v3" />
    <circle cx="12" cy="11" r="1.5" fill="currentColor" />
  </svg>
);

// 4. Vahan / Vehicle: Ceremonial Chariot Wheel
export const ChariotWheelIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M5.636 18.364L18.364 5.636" strokeWidth="1" />
  </svg>
);

// 5. Bhumi / Property: Temple Pillar & Land Marker
export const LandMarkerIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2L4 6v14l8 4 8-4V6l-8-4z" />
    <path d="M12 6v12M4 6l8 4 8-4" />
  </svg>
);

// 6. Yatra / Travel: Ancient Celestial Navigation Compass Star
export const CelestialCompassIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <polygon points="12,4 14.5,9.5 20,12 14.5,14.5 12,20 9.5,14.5 4,12 9.5,9.5" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

// 7. Vidya / Education: Palm-Leaf Manuscript & Quill Pen
export const PalmLeafPenIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M9 7h6M9 11h6" />
  </svg>
);

// 8. Namkaran / Naming: Sacred Infant Cradle / Lotus
export const SacredCradleIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 3c-4 0-7 3-7 7 0 5.25 7 11 7 11s7-5.75 7-11c0-4-3-7-7-7z" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

// 9. General Auspicious: 8-Petaled Sacred Yantra
export const YantraMandalaIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <polygon points="12,3 18,12 12,21 6,12" strokeWidth="1" />
    <polygon points="3,12 12,6 21,12 12,18" strokeWidth="1" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

// 10. SearchLensIcon: Engraved Brass Search Lens
export const SearchLensIcon: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" />
  </svg>
);

// 11. ExportScrollIcon: Royal Manuscript Export Seal
export const ExportScrollIcon: React.FC<IconProps> = ({ size = 18, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// Helper function to resolve icon key or fallback emoji string to SVG component
export const getMuhuratIcon = (iconKey: string, size = 20, className = '') => {
  switch (iconKey) {
    case 'marriage':
    case '💒':
      return <MarriageKalashIcon size={size} className={className} />;
    case 'housewarming':
    case '🏡':
      return <GrihaPraveshIcon size={size} className={className} />;
    case 'business':
    case '💼':
      return <MerchantChestIcon size={size} className={className} />;
    case 'vehicle':
    case '🚗':
      return <ChariotWheelIcon size={size} className={className} />;
    case 'property':
    case '📜':
      return <LandMarkerIcon size={size} className={className} />;
    case 'travel':
    case '✈':
    case '✈️':
      return <CelestialCompassIcon size={size} className={className} />;
    case 'interview':
    case '🎓':
      return <PalmLeafPenIcon size={size} className={className} />;
    case 'naming':
    case '👶':
      return <SacredCradleIcon size={size} className={className} />;
    case 'general':
    case '☸':
    default:
      return <YantraMandalaIcon size={size} className={className} />;
  }
};
