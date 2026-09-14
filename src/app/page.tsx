'use client';

import styles from './page.module.scss';
import DayButton from '@/components/DayButton/DayButton';
import { days } from '../../data/days';

export default function Home() {

  return (
    <>
      <h1 className={styles.title}>Accessibility Advent Calendar</h1>

      <div className={styles.intro}>
        <p>24 bite-sized web accessibility tips, one per door.</p>
        <p>Click any unlocked door to discover an accessibility tip.</p>
        <p>Locked days are still to come.</p>
      </div>

      <div className={styles.grid}>
        {days.map((dayItem) => (
          <DayButton
            key={dayItem.day}
            day={dayItem.day.toString()}
            isLocked={false}
            onClick={() => console.log(`Clicked day ${dayItem.day}`)}
          />
        ))}
      </div>
    </>
  );
}
