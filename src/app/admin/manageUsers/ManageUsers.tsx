'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import styles from './page.module.scss';
import Button from '@/components/Buttons/Button/Button';
import Modal from '@/components/Modal/Modal';
import UserForm from '@/components/ModalContent/UserForm';
import ConfirmDelete from '@/components/ModalContent/ConfirmDelete';
import UsersTable from '@/components/UsersTable/UsersTable';
import type { ModalState } from '@/types/modal';
import type { User, CreateUserInput } from '@/types/user';

function getModalTitle(modal: ModalState) {
  switch (modal.mode) {
    case 'create':
      return 'Create User';
    case 'edit':
      return 'Edit User';
    case 'delete':
      return `Remove ${modal.user.firstName} ${modal.user.lastName}?`;
  }
}

type ManageUsersProps = {
  usersPromise: Promise<User[]>;
};

export default function ManageUsers({ usersPromise }: ManageUsersProps) {
  const router = useRouter();
  const [modal, setModal] = useState<ModalState | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const closeModal = () => {
    if (isSaving || isDeleting) return;
    setModal(null);
    setFormError(null);
  };

  const handleSave = async (values: CreateUserInput) => {
    setIsSaving(true);
    setFormError(null);

    try {
      const res =
        modal?.mode === 'edit'
          ? await fetch(`/api/users/${modal.user.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            })
          : await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Failed to save user.');
      }

      router.refresh();
      setModal(null);
    } catch (error) {
      setFormError((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async (user: User) => {
    setIsDeleting(true);
    setFormError(null);

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'DELETE',
      });

      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Failed to delete user');
      }

      router.refresh();
      setModal(null);
    } catch (error) {
      setFormError((error as Error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Manage Users</h1>
        <Button
          variant="secondary"
          icon={Plus}
          onClick={() => setModal({ mode: 'create' })}
        >
          New User
        </Button>
      </div>

      <Suspense fallback={<p>Loading users…</p>}>
        <UsersTable
          usersPromise={usersPromise}
          onEdit={(user) => setModal({ mode: 'edit', user })}
          onDelete={(user) => setModal({ mode: 'delete', user })}
        />
      </Suspense>

      {/* One modal shell, the content depends on the mode. */}
      {modal && (
        <Modal isOpen onClose={closeModal} title={getModalTitle(modal)}>
          {modal.mode === 'delete' ? (
            <ConfirmDelete
              onCancel={closeModal}
              onConfirm={() => handleConfirmDelete(modal.user)}
              isDeleting={isDeleting}
              error={formError}
            >
              <p>This will permanently remove the user from the database.</p>
            </ConfirmDelete>
          ) : (
            <UserForm
              user={modal.mode === 'edit' ? modal.user : null}
              onCancel={closeModal}
              onSave={handleSave}
              isSaving={isSaving}
              error={formError}
            />
          )}
        </Modal>
      )}
    </>
  );
}
