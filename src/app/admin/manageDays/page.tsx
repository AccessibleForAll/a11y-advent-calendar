'use client';
import { useState } from 'react';

import manageDaysStyles from '@/app/admin/manageDays/ManageDays.module.scss';

import { Day, days } from '../../../../data/days';

import Card from '@/components/Card/Card';
import Button from '@/components/Buttons/Button/Button';
import Modal from '@/components/Modal/Modal';
import ManageDaysForm from '@/components/Forms/ManageDaysForm';

import { Plus, Trash2Icon, PencilLine } from 'lucide-react';

export type ModalMode = 'create' | 'edit' | 'delete';

export default function ManageDaysPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>();
  const [currentDay, setCurrentDay] = useState<Day | null>();

  function openModal(inDay: Day | null, mode: ModalMode) {
    setCurrentDay(inDay);
    setModalMode(mode);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setCurrentDay(null);
  }

  return (
    <>
      <div className={manageDaysStyles.manageDaysHeader}>
        <h1 className={`${manageDaysStyles.manageDaysTitle}`}>Manage Days</h1>
        <Button
          variant="secondary"
          icon={Plus}
          onClick={() => {
            openModal(null, 'create');
          }}
        >
          New Day
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => closeModal()}
        title={
          modalMode === 'create'
            ? 'Create Day'
            : modalMode === 'delete'
              ? 'Delete Day'
              : 'Edit Day'
        }
      >
        {/* This is a placeholder for the deleteForm component */}
        {modalMode === 'delete' ? null : (
          <ManageDaysForm
            key={currentDay?.day ?? 'newDay'}
            day={currentDay ?? null}
            onCancel={closeModal}
            onSubmit={(updatedDay) => {
              console.log(updatedDay);
              closeModal();
            }}
          />
        )}
      </Modal>
      <ul className={manageDaysStyles.cardGrid}>
        {days.map((inDay) => (
          <li key={inDay.day}>
            <Card>
              <div className={manageDaysStyles.manageDaysWrapper}>
                <p className={manageDaysStyles.dayLabel}>Day {inDay.day}</p>
                <h2>{inDay.title}</h2>
                <p className={manageDaysStyles.clampedText}>{inDay.text}</p>
                <div className={manageDaysStyles.buttonGroup}>
                  <Button
                    variant="primary"
                    icon={PencilLine}
                    onClick={() => {
                      openModal(inDay, 'edit');
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="primary"
                    icon={Trash2Icon}
                    onClick={() => {
                      openModal(inDay, 'delete');
                    }}
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
