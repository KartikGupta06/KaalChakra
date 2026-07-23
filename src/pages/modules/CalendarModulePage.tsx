import React from 'react';
import { ModulePlaceholder } from './ModulePlaceholder';

export const CalendarModulePage: React.FC = () => {
  return (
    <ModulePlaceholder
      chamberId="timeline"
      title="Cosmic Timeline"
      sanskritTitle="काल प्रवाह"
      icon="⏳"
      description="Vimshottari Dasha, planetary transits, eclipses, and sacred life milestones."
      futurePhase="Phase 13.5 & Phase 13.6 Architecture"
    />
  );
};
