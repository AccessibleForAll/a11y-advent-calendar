'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './page.module.scss';
import Button from '@/components/Buttons/Button/Button';
import UserFormModal from '@/components/FormModals/UserFormModal';
import ConfirmDeleteModal from '@/components/FormModals/ConfirmDeleteModal';
import UsersTable from '@/components/UsersTable/UsersTable';
import type { ModalMode } from '@/types/modal';
import type { User, CreateUserInput } from '@/types/user';

const emptyForm: CreateUserInput = { firstName: '', lastName: '', email: '' };

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [modal, setModal] = useState<{
    mode: ModalMode;
    user: User | null;
  } | null>(null);
  const [formValues, setFormValues] = useState<CreateUserInput>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/users');
      if (!res.ok) {
        throw new Error('Failed to load users.');
      }
      const data = (await res.json()) as User[];
      setUsers(data);
    } catch (error) {
      setLoadError((error as Error).message);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) {
          throw new Error('Failed to load users.');
        }
        const data = (await res.json()) as User[];
        if (!ignore) {
          setUsers(data);
        }
      } catch (error) {
        if (!ignore) {
          setLoadError((error as Error).message);
        }
      } finally {
        if (!ignore) {
          setIsLoadingUsers(false);
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const openCreateModal = () => {
    setFormValues(emptyForm);
    setFormError(null);
    setModal({ mode: 'create', user: null });
  };

  const openEditModal = (user: User) => {
    setFormValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setFormError(null);
    setModal({ mode: 'edit', user });
  };

  const openDeleteModal = (user: User) => {
    setFormError(null);
    setModal({ mode: 'delete', user });
  };

  const closeModal = () => {
    if (isSaving || isDeleting) return;
    setModal(null);
    setFormError(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFormError(null);

    try {
      const res =
        modal?.mode === 'edit' && modal.user
          ? await fetch(`/api/users/${modal.user.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formValues),
            })
          : await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formValues),
            });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Failed to save user.');
      }

      await fetchUsers();
      setModal(null);
    } catch (error) {
      setFormError((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!modal?.user) return;

    setIsDeleting(true);
    setFormError(null);

    try {
      const res = await fetch(`/api/users/${modal.user.id}`, {
        method: 'DELETE',
      });

      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Failed to delete user');
      }

      await fetchUsers();
      setModal(null);
    } catch (error) {
      setFormError((error as Error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  const isFormModalOpen = modal?.mode === 'create' || modal?.mode === 'edit';
  const isDeleteModalOpen = modal?.mode === 'delete';

  return (
    <>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Manage Users</h1>
        <Button variant="secondary" icon={Plus} onClick={openCreateModal}>
          New User
        </Button>
      </div>

      {loadError && <p role="alert">{loadError}</p>}

      <UsersTable
        users={users}
        isLoadingUsers={isLoadingUsers}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      {/* Create and edit modal have identical layout, just different text.*/}
      <UserFormModal
        isOpen={isFormModalOpen}
        isEditing={modal?.mode === 'edit'}
        values={formValues}
        onChange={setFormValues}
        onClose={closeModal}
        onSave={handleSave}
        isSaving={isSaving}
        error={formError}
      />

      {/* Modal for delete */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        title={
          modal?.user
            ? `Remove ${modal.user.firstName} ${modal.user.lastName}?`
            : ''
        }
        message="This will permanently remove the user from the database."
        isDeleting={isDeleting}
        error={formError}
      />
    </>
  );
}
