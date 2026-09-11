'use client';

import styles from './page.module.scss';
import DayButton from '@/components/DayButton/DayButton';

const totalDays = 24;

export default function Home() {

    const days = Array.from({ length: totalDays }, (_, i) => i + 1);


  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Accessibility Advent Calendar</h1>

      <div className={styles.intro}>
        <p>24 bite-sized web accessibility tips, one per door.</p>
        <p>Click any unlocked door to discover an accessibility tip.</p>
        <p>Locked days are still to come.</p>
      </div>

        <div className={styles.grid}>
          {days.map((day) => (
            <DayButton
                key={day}
                day={day.toString()}
                isLocked={false}
                onClick={() => console.log(`Clicked day ${day}`)}
            />
          ))}
      </div>
    </main>
    );
}
