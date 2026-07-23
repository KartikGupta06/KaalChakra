import React from 'react';
import { TempleButton } from '../ui/TempleButton';
import { useSound } from '../../context/AudioContext';
import { CalendarScrollIcon } from './PanchangIcons';

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
        <span className="flex items-center gap-1.5">
          <CalendarScrollIcon size={14} />
          <span>← Previous Day (पूर्व दिवस)</span>
        </span>
      </TempleButton>

      <TempleButton
        variant="primary"
        size="sm"
        onClick={() => handleAction(onToday)}
      >
        <span className="flex items-center gap-1.5">
          <span>Today (अद्य)</span>
        </span>
      </TempleButton>

      <TempleButton
        variant="secondary"
        size="sm"
        onClick={() => handleAction(onNextDay)}
      >
        <span className="flex items-center gap-1.5">
          <span>Next Day (उत्तर दिवस) →</span>
          <CalendarScrollIcon size={14} />
        </span>
      </TempleButton>
    </div>
  );
};
