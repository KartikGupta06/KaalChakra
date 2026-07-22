import React from 'react';
import { ModulePlaceholder } from './ModulePlaceholder';

export const CalendarModulePage: React.FC = () => {
  return (
    <ModulePlaceholder
      chamberId="calendar"
      title="Festival Calendar"
      sanskritTitle="उत्सवपञ्चाङ्गम्"
      icon="📅"
      description="Sacred Vedic festivals, lunar tithi dates, Ekadashi observances, and astronomical events."
      futurePhase="Phase 6 Module Architecture"
    />
  );
};
