import type { ReactNode } from 'react';
import Modal from '@/components/Modal/Modal';
import Button from '@/components/Buttons/Button/Button';
import styles from './FormModal.module.scss';

type FormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSave: () => void;
  isSaving?: boolean;
  error?: string | null;
  children: ReactNode;
};

export default function FormModal({
  isOpen,
  onClose,
  title,
  onSave,
  isSaving = false,
  error,
  children,
}: FormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {children}
      {error && <p role="alert">{error}</p>}
      <div className={styles.actions}>
        <Button variant="primary" onClick={onClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={onSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </Modal>
  );
}
