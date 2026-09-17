'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import styles from './page.module.scss';
import DayButton from '@/components/DayButton/DayButton';
import Modal from '@/components/Modal/Modal';
import { days } from '../../data/days';

export default function Home() {
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  const selectedDay = days.find((d) => d.day === selectedDayId) ?? null;
  const isModalOpen = selectedDay !== null;

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
        {days.map((dayItem) => (
          <DayButton
            key={dayItem.day}
            day={dayItem.day.toString()}
            isLocked={false}
            onClick={() => handleDayClick(dayItem.day)}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Day ${selectedDay?.day}`}
        smallTitle={true}
      >
        {selectedDay && (
          <>
            <h3 className={styles.modalHeading}>{selectedDay.title}</h3>
            <p className={styles.modalText}>{selectedDay.text}</p>
            {selectedDay.linkText && selectedDay.linkUrl && (
              <a
                href={selectedDay.linkUrl}
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
      </Modal>
    </>
  );
}
