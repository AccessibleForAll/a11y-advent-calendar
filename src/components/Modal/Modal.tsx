'use client';

import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
  type ToggleEvent,
} from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  smallTitle?: boolean;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  smallTitle = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.matches(':popover-open')) {
      dialog.showPopover();

      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }

    if (!isOpen && dialog.matches(':popover-open')) {
      dialog.hidePopover();
    }
  }, [isOpen]);

  const handleToggle = (event: ToggleEvent) => {
    if (event.newState === 'closed' && isOpen) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      aria-labelledby={titleId}
      popover="auto"
      onToggle={handleToggle}
    >
      <div className={styles.header}>
        {smallTitle ? (
          <p id={titleId} className={styles.modalTitleSmall}>
            {title}
          </p>
        ) : (
          <h2 id={titleId}>{title}</h2>
        )}

        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X aria-hidden="true" />
        </button>
      </div>

      <div className={styles.content}>{children}</div>
    </dialog>
  );
}
