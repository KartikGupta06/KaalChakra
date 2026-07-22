import React from 'react';
import { ModulePlaceholder } from './ModulePlaceholder';

export const AboutModulePage: React.FC = () => {
  return (
    <ModulePlaceholder
      chamberId="about"
      title="About Jyotish"
      sanskritTitle="वैदिकज्योतिष इतिहास"
      icon="📖"
      description="Exploration of India’s astronomical heritage, ancient observatories, Jantar Mantar, and Surya Siddhanta."
      futurePhase="Phase 9 Module Architecture"
    />
  );
};
