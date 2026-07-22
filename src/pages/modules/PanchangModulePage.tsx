import React from 'react';
import { ModulePlaceholder } from './ModulePlaceholder';

export const PanchangModulePage: React.FC = () => {
  return (
    <ModulePlaceholder
      chamberId="panchang"
      title="Today's Panchang"
      sanskritTitle="दैनिक पञ्चाङ्गम्"
      icon="☀"
      description="The five sacred pillars of Vedic time keeping: Tithi, Vara, Nakshatra, Yoga, and Karana."
      futurePhase="Phase 5 Module Architecture"
    />
  );
};
