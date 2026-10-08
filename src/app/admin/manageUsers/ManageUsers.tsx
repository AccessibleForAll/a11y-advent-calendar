'use client';
import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/admin/manageUsers/page.module.scss';
import type { CreateUserInput, User } from '@/types/user';
import type { ModalMode } from '@/app/admin/manageDays/page';
import Button from '@/components/Buttons/Button/Button';
import ConfirmDelete from '@/components/Forms/ConfirmDelete';
import Modal from '@/components/Modal/Modal';
import UserForm from '@/components/Forms/UserForm';
import UsersList from '@/components/UsersList/UsersList';
import { Plus } from 'lucide-react';

// Reads the error message the API sends back, or uses the fallback.
async function getErrorMessage(res: Response, fallback: string) {
  const data = await res.json().catch(() => null);
  return data?.message ?? fallback;
}

type ManageUsersProps = {
  usersPromise: Promise<User[]>;
};

export default function ManageUsers({ usersPromise }: ManageUsersProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function openModal(inUser: User | null, mode: ModalMode) {
    setCurrentUser(inUser);
    setModalMode(mode);
    setError(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setCurrentUser(null);
  }

  async function handleSave(data: CreateUserInput) {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(
        currentUser ? `/api/users/${currentUser.id}` : '/api/users',
        {
          method: currentUser ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        throw new Error(await getErrorMessage(res, 'Failed to save user.'));
      }

      router.refresh();
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save user.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(inUser: User) {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/users/${inUser.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(await getErrorMessage(res, 'Failed to delete user.'));
      }

      router.refresh();
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Manage Users</h1>
        <Button
          variant="secondary"
          icon={Plus}
          onClick={() => {
            openModal(null, 'create');
          }}
        >
          New User
        </Button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
          modalMode === 'create'
            ? 'Create User'
            : modalMode === 'delete'
              ? 'Delete User'
              : 'Edit User'
        }
      >
        {modalMode === 'delete' && currentUser ? (
          <ConfirmDelete
            name={`${currentUser.firstName} ${currentUser.lastName}`}
            onCancel={closeModal}
            onSubmit={() => handleDelete(currentUser)}
            isSubmitting={isSubmitting}
            error={error}
          />
        ) : (
          <UserForm
            key={currentUser?.id ?? 'newUser'}
            user={currentUser ?? null}
            onCancel={closeModal}
            onSubmit={handleSave}
            isSubmitting={isSubmitting}
            error={error}
          />
        )}
      </Modal>
      <Suspense fallback={<p role="status">Loading users…</p>}>
        <UsersList
          usersPromise={usersPromise}
          onEdit={(inUser) => {
            openModal(inUser, 'edit');
          }}
          onDelete={(inUser) => {
            openModal(inUser, 'delete');
          }}
        />
      </Suspense>
    </>
  );
}
