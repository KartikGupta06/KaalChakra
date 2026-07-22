import React from 'react';
import { TempleButton } from '../ui/TempleButton';
import { useSound } from '../../context/AudioContext';

interface PanchangNavigationProps {
  onPrevDay: () => void;
  onToday: () => void;
  onNextDay: () => void;
}

export const PanchangNavigation: React.FC<PanchangNavigationProps> = ({
  onPrevDay,
  onToday,
  onNextDay,
}) => {
  const { playSound } = useSound();

  const handleAction = (cb: () => void) => {
    playSound('paper-flip');
    cb();
  };

  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <TempleButton
        variant="secondary"
        size="sm"
        onClick={() => handleAction(onPrevDay)}
      >
        📜 ← Previous Day (पूर्व दिवस)
      </TempleButton>

      <TempleButton
        variant="primary"
        size="sm"
        onClick={() => handleAction(onToday)}
      >
        ☸ Today (अद्य)
      </TempleButton>

      <TempleButton
        variant="secondary"
        size="sm"
        onClick={() => handleAction(onNextDay)}
      >
        Next Day (उत्तर दिवस) → 📜
      </TempleButton>
    </div>
  );
};
