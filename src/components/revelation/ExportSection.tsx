import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TempleButton } from '../ui/TempleButton';
import { useSound } from '../../context/AudioContext';

interface ExportSectionProps {
  onReplaySequence?: () => void;
}

export const ExportSection: React.FC<ExportSectionProps> = ({ onReplaySequence }) => {
  const navigate = useNavigate();
  const { playSound } = useSound();

  const handleDisabledAction = (label: string) => {
    playSound('ink-stroke');
    alert(`${label} will awaken in a future calculation phase.`);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-6">
      <TempleButton
        variant="primary"
        size="sm"
        onClick={() => navigate('/observatory')}
      >
        🔭 Open Celestial Observatory
      </TempleButton>

      {onReplaySequence && (
        <TempleButton variant="secondary" size="sm" onClick={onReplaySequence}>
          ↺ Replay Cosmic Reveal
        </TempleButton>
      )}

      <TempleButton
        variant="secondary"
        size="sm"
        onClick={() => handleDisabledAction('Download Kundali PDF')}
      >
        📥 Download Kundali (Coming Soon)
      </TempleButton>

      <TempleButton
        variant="secondary"
        size="sm"
        onClick={() => handleDisabledAction('Share Chart')}
      >
        🔗 Share Chart (Coming Soon)
      </TempleButton>

      <TempleButton
        variant="ghost"
        size="sm"
        onClick={() => handleDisabledAction('Print Manuscript')}
      >
        🖨 Print Manuscript (Coming Soon)
      </TempleButton>
    </div>
  );
};
