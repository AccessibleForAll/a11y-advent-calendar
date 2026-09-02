'use client';

import styles from './DayButton.module.scss';
import { Star, Lock } from 'lucide-react';

type DayButtonProps = {
  day: number;
  isLocked: boolean;
  onClick: () => void;
};

export default function DayButton({ day, isLocked, onClick }: DayButtonProps) {
  return (
    <button
      type="button"
      className={styles.dayButton}
      onClick={onClick}
      disabled={isLocked}
    >
      <h3> Day {day}</h3>
      {isLocked ? (
        <Lock className={styles.icon} />
      ) : (
        <Star className={styles.icon} />
      )}
    </button>
  );
}
