'use client';
import { useState } from 'react';
import { Trash2Icon, PencilLine } from 'lucide-react';

import { days } from '../../../../data/days';
import pageStyles from '@/app/page.module.scss';

import Card from '@/components/Card/Card';
import cardStyles from '@/components/Card/Card.module.scss';
import Button from '@/components/Buttons/Button/Button';
import Modal from '@/components/Modal/Modal';
import modalStyles from '@/components/Modal/Modal.module.scss';

import manageDaysStyles from './manageDays.module.scss';

export default function ManageDaysPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={manageDaysStyles.manageDaysHeader}>
        <h1
          className={`${pageStyles.title} ${manageDaysStyles.manageDaysTitle}`}
        >
          Manage Days
        </h1>
        <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
          + New Day
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Day"
      >
        <p className={modalStyles.modalText}>
          This is a modal for creating a new day. You can add the form or
          content here.
        </p>
      </Modal>
      <ul className={cardStyles.cardGrid}>
        {days.slice(0, 4).map((d) => (
          <li key={d.day}>
            <Card>
              <div className={manageDaysStyles.manageDaysWrapper}>
                <p className={manageDaysStyles.dayLabel}>Day {d.day}</p>
                <h2>{d.title}</h2>
                <p className={manageDaysStyles.clampedText}>{d.text}</p>
                <div className={manageDaysStyles.manageDaysButton}>
                  <Button
                    variant="primary"
                    icon={PencilLine}
                    onClick={() => console.log('Edit pressed', d.day)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="primary"
                    icon={Trash2Icon}
                    onClick={() => console.log('Delete pressed', d.day)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
