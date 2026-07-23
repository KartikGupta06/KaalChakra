import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TempleButton } from '../ui/TempleButton';
import { useSound } from '../../context/AudioContext';
import { ArchiveService } from '../../services/archiveService';

interface ExportSectionProps {
  onReplaySequence?: () => void;
  onOpenManuscriptModal?: () => void;
  birthData?: any;
  kundaliData?: any;
}

export const ExportSection: React.FC<ExportSectionProps> = ({
  onReplaySequence,
  onOpenManuscriptModal,
  birthData,
  kundaliData,
}) => {
  const navigate = useNavigate();
  const { playSound } = useSound();

  const handleOpenManuscript = () => {
    playSound('paper-flip');
    if (onOpenManuscriptModal) {
      onOpenManuscriptModal();
    }
  };

  const handlePreserveInArchive = () => {
    playSound('temple-bell');
    const name = birthData?.fullName || birthData?.name || 'Vedic Observer Chart';
    const dateOfBirth = birthData?.date ? `${birthData.date.year}-${birthData.date.month < 10 ? '0' + birthData.date.month : birthData.date.month}-${birthData.date.day < 10 ? '0' + birthData.date.day : birthData.date.day}` : '1998-08-15';
    const timeOfBirth = birthData?.time ? `${birthData.time.hour}:${birthData.time.minute < 10 ? '0' + birthData.time.minute : birthData.time.minute}` : '06:30';
    const city = birthData?.place || 'Ujjain';

    ArchiveService.saveArchiveItem({
      title: `${name}'s Janma Kundali`,
      category: 'personal',
      familyGroup: 'self',
      tags: ['JanmaKundali', 'PreservedChart'],
      isFavorite: true,
      birthData: {
        fullName: name,
        dateOfBirth,
        timeOfBirth,
        city,
      },
      kundaliData,
    });

    navigate('/archive');
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-6">
      <TempleButton
        variant="primary"
        size="sm"
        onClick={handlePreserveInArchive}
      >
        🪔 Preserve in Eternal Archive
      </TempleButton>

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
