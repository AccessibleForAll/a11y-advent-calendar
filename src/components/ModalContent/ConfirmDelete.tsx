import type { ReactNode } from 'react';
import Button from '@/components/Buttons/Button/Button';
import styles from './ModalContent.module.scss';

type ConfirmDeleteProps = {
  onCancel: () => void;
  onConfirm: () => void;
  children: ReactNode;
  isDeleting?: boolean;
  error?: string | null;
};

export default function ConfirmDelete({
  onCancel,
  onConfirm,
  children,
  isDeleting = false,
  error,
}: ConfirmDeleteProps) {
  return (
    <>
      {children}
      {error && <p role="alert">{error}</p>}
      <div className={styles.actions}>
        <Button variant="primary" onClick={onCancel} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? 'Deleting…' : 'Delete'}
        </Button>
      </div>
    </>
  );
}
