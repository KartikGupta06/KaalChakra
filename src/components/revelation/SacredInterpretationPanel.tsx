import React from 'react';
import { WisdomEnginePanel } from '../wisdom/WisdomEnginePanel';

interface SacredInterpretationPanelProps {
  birthData?: any;
}

export const SacredInterpretationPanel: React.FC<SacredInterpretationPanelProps> = ({ birthData }) => {
  return <WisdomEnginePanel birthData={birthData} />;
};
