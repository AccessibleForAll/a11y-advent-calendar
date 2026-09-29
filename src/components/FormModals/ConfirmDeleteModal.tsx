import Modal from '@/components/Modal/Modal';
import Button from '@/components/Buttons/Button/Button';
import styles from './ConfirmDeleteModal.module.scss';

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isDeleting?: boolean;
  error?: string | null;
};

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isDeleting = false,
  error,
}: ConfirmDeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p>{message}</p>
      {error && <p role="alert">{error}</p>}
      <div className={styles.actions}>
        <Button variant="primary" onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? 'Deleting…' : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
}
