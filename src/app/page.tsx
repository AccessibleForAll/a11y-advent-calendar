'use client';

import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import styles from './page.module.scss';
import DayButton from '@/components/DayButton/DayButton';
import Modal from '@/components/Modal/Modal';
import { isDayUnlocked } from '@/lib/dayUnlock';
import { readCachedDays, saveCachedDays } from '@/lib/daysCache';
import type { Day } from '@/types/day';

const calendarDays = Array.from({ length: 24 }, (_, i) => String(i + 1));

// Dates are stored at UTC midnight, so read the day number in UTC.
const getDayNumber = (day: Day) => String(new Date(day.date).getUTCDate());

// Uses the copy saved in localStorage today, otherwise fetches and saves it.
async function loadDays(): Promise<Day[]> {
  const cachedDays = readCachedDays(window.localStorage);

  if (cachedDays) {
    return cachedDays;
  }

  const response = await fetch('/api/days');

  if (!response.ok) {
    throw new Error('Failed to fetch days');
  }

  const days = (await response.json()) as Day[];
  saveCachedDays(window.localStorage, days);

  return days;
}

export default function Home() {
  const [days, setDays] = useState<Day[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    loadDays()
      .then((data) => {
        if (!ignore) {
          setDays(data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus('error');
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const selectedDay =
    days.find((d) => getDayNumber(d) === selectedDayId) ?? null;
  const isModalOpen = selectedDayId !== null;

  const handleDayClick = (dayId: string) => {
    setSelectedDayId(dayId);
  };

  const handleCloseModal = () => {
    setSelectedDayId(null);
  };

  return (
    <>
      <h1 className={styles.title}>Accessibility Advent Calendar</h1>

      <div className={styles.intro}>
        <p>24 bite-sized web accessibility tips, one per door.</p>
        <p>Click any unlocked door to discover an accessibility tip.</p>
        <p>Locked days are still to come.</p>
      </div>

      <div className={styles.grid}>
        {calendarDays.map((day) => (
          <DayButton
            key={day}
            day={day}
            isLocked={!isDayUnlocked(day)}
            onClick={() => handleDayClick(day)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Day ${selectedDayId}`}
        smallTitle={true}
      >
        {selectedDay && (
          <>
            <h2 className={styles.modalHeading}>{selectedDay.heading}</h2>
            <p className={styles.modalText}>{selectedDay.text}</p>
            {selectedDay.linkText && selectedDay.link && (
              <a
                href={selectedDay.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalLink}
              >
                {selectedDay.linkText}
                <ExternalLink
                  className={styles.modalLinkIcon}
                  aria-label="opens in a new tab"
                  role="img"
                />
              </a>
            )}
          </>
        )}
        {isModalOpen && !selectedDay && (
          <p className={styles.modalText} role="status">
            {status === 'loading' && 'Loading tip…'}
            {status === 'error' &&
              'Something went wrong while loading this tip. Please try again later.'}
            {status === 'ready' && 'No tip has been added for this day yet.'}
          </p>
        )}
      </Modal>
    </>
  );
}
