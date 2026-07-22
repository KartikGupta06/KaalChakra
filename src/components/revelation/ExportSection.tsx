import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TempleButton } from '../ui/TempleButton';
import { useSound } from '../../context/AudioContext';

interface ExportSectionProps {
  onReplaySequence?: () => void;
  onOpenManuscriptModal?: () => void;
}

export const ExportSection: React.FC<ExportSectionProps> = ({
  onReplaySequence,
  onOpenManuscriptModal,
}) => {
  const navigate = useNavigate();
  const { playSound } = useSound();

  const handleOpenManuscript = () => {
    playSound('paper-flip');
    if (onOpenManuscriptModal) {
      onOpenManuscriptModal();
    }
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
        variant="primary"
        size="sm"
        onClick={handleOpenManuscript}
      >
        📜 Download Royal Manuscript
      </TempleButton>

      <TempleButton
        variant="secondary"
        size="sm"
        onClick={handleOpenManuscript}
      >
        🔗 Share Manuscript
      </TempleButton>

      <TempleButton
        variant="ghost"
        size="sm"
        onClick={handleOpenManuscript}
      >
        🖨 Print Manuscript
      </TempleButton>
    </div>
  );
};
