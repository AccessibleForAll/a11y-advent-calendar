'use client';
import { useEffect, useState } from 'react';
import styles from '@/app/admin/manageDays/ManageDays.module.scss';
import type { Day, CreateDayInput } from '@/types/day';
import Card from '@/components/Card/Card';
import Button from '@/components/Buttons/Button/Button';
import Modal from '@/components/Modal/Modal';
import ManageDaysForm from '@/components/Forms/ManageDaysForm';
import { Plus, Trash2Icon, PencilLine } from 'lucide-react';

export type ModalMode = 'create' | 'edit' | 'delete';

export default function ManageDaysPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [currentDay, setCurrentDay] = useState<Day | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<Day[]>([]);

  function openModal(inDay: Day | null, mode: ModalMode) {
    setError(null);
    setCurrentDay(inDay);
    setModalMode(mode);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setCurrentDay(null);
  }

  useEffect(() => {
    async function loadDays() {
      try {
        const res = await fetch('/api/days');
        if (!res.ok) throw new Error('Could not load days');
        const data: Day[] = await res.json();
        setDays(data);
      } catch (err) {
        setError((err as Error).message);
      }
    }
    loadDays();
  }, []);

  async function handleSubmit(formData: CreateDayInput) {
    if (isSubmitting) return;

    const isEdit = modalMode === 'edit' && currentDay;

    try {
      setIsSubmitting(true);
      const res = await fetch(
        isEdit ? `/api/days/${currentDay.id}` : '/api/days',
        {
          method: isEdit ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      );

      if (!res.ok) {
        throw new Error(
          isEdit ? 'Could not update day' : 'Could not create day',
        );
      }
      const saved: Day = await res.json();
      setDays((prev) =>
        isEdit
          ? prev.map((day) => (day.id === saved.id ? saved : day))
          : [...prev, saved],
      );
      closeModal();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!currentDay || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/days/${currentDay.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Could not delete day');
      }
      setDays((prev) => prev.filter((day) => day.id !== currentDay.id));
      closeModal();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className={styles.manageDaysHeader}>
        <h1 className={styles.manageDaysTitle}>Manage Days</h1>
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
      {error && <p>{error}</p>}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          modalMode === 'create'
            ? 'Create Day'
            : modalMode === 'delete'
              ? 'Delete Day'
              : 'Edit Day'
        }
      >
        {modalMode === 'delete' ? (
          <>
            <p>
              Are you sure you want to delete{' '}
              <strong>{currentDay?.heading}</strong>?
            </p>
            <div className={styles.buttonGroup}>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </>
        ) : (
          <ManageDaysForm
            key={currentDay?.id ?? 'newDay'}
            day={currentDay ?? null}
            onCancel={closeModal}
            onSubmit={handleSubmit}
          />
        )}
      </Modal>
      <ul className={styles.cardGrid}>
        {days.map((inDay) => (
          <li key={inDay.id}>
            <Card>
              <div className={styles.manageDaysWrapper}>
                <p className={styles.dayLabel}>Day {inDay.date}</p>
                <h2>{inDay.heading}</h2>
                <p className={styles.clampedText}>{inDay.text}</p>
                <div className={styles.buttonGroup}>
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
