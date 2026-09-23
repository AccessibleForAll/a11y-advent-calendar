'use client';
import { useState } from 'react';
import { Trash2Icon, PencilLine } from 'lucide-react';

import { days } from '../../../../data/days';

import Card from '@/components/Card/Card';
import Button from '@/components/Buttons/Button/Button';
import Modal from '@/components/Modal/Modal';
import InputField from '@/components/Inputfield/Inputfield';

import pageStyles from '@/app/page.module.scss';
import manageDaysStyles from './ManageDays.module.scss';

export default function ManageDaysPage() {
  const [isModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className={manageDaysStyles.manageDaysHeader}>
        <h1
          className={`${pageStyles.title} ${manageDaysStyles.manageDaysTitle}`}
        >
          Manage Days
        </h1>
        <Button variant="secondary" onClick={() => setIsCreateModalOpen(true)}>
          + New Day
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Day"
      >
        <div className={manageDaysStyles.modalContentWrapper}>
          <InputField name="date" label="Date:" type="text"></InputField>
          <InputField name="heading" label="Heading:" type="text"></InputField>
          <InputField name="text" label="Text:" type="textarea"></InputField>
          <InputField
            name="linkText"
            label="Link Text:"
            type="text"
          ></InputField>
          <InputField name="linkUrl" label="Link URL:" type="text"></InputField>
          <div className={manageDaysStyles.manageDaysButton}>
            <Button
              variant="primary"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
      <ul className={manageDaysStyles.cardGrid}>
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
