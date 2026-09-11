"use client";
import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.scss'

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};


export default function Modal({ isOpen, onClose, title, children }: ModalProps) {

    const closeButtonRef = useRef <HTMLButtonElement>(null);

    useEffect (() => {
        if (!isOpen) {
            return
        }
        closeButtonRef.current?.focus();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) {
        return null;
    }

  return (
    <div className={styles.overlay}>
        <button
            type="button"
            className={styles.backdrop}
            onClick={onClose}
            aria-label="Close modal"
        />
        <div
            className={styles.modal}
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-title'
        >
            <div className={styles.header}>
                <h2 id='modal-title'>{title}</h2>
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
            <div className={styles.content}>
                {children}
            </div>
        </div>
    </div>
  )
}
