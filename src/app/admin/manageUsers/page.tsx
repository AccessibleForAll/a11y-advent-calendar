'use client';

import { useEffect, useState } from 'react';
import { Plus, PencilLine, Trash2 } from 'lucide-react';
import styles from './page.module.scss';
import Modal from '@/components/Modal/Modal';
import InputField from '@/components/Inputfield/Inputfield';

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

//what modal is picked if any..
type ModalMode = 'create' | 'edit' | 'delete' | null;

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    setLoadError(null);
    try {
      const res = await fetch('/api/users');
      if (!res.ok) {
        throw new Error('Failed to load  users.');
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
    setSelectedUser(null);
    setFirstNameInput('');
    setLastNameInput('');
    setEmailInput('');
    setFormError(null);
    setModalMode('create');
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFirstNameInput(user.firstName);
    setLastNameInput(user.lastName);
    setEmailInput(user.email);
    setFormError(null);
    setModalMode('edit');
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setFormError(null);
    setModalMode('delete');
  };

  const closeModal = () => {
    if (isSaving || isDeleting) return;
    setModalMode(null);
    setSelectedUser(null);
    setFormError(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFormError(null);

    const payload = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
    };

    try {
      const res =
        modalMode === 'edit' && selectedUser
          ? await fetch(`/api/users/${selectedUser.id}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            })
          : await fetch('/api/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload),
            });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Failed to save user.');
      }

      await fetchUsers();
      setModalMode(null);
      setSelectedUser(null);
    } catch (error) {
      setFormError((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    setIsDeleting(true);
    setFormError(null);

    try {
      const res = await fetch(`/api/users/${selectedUser.id}`, {
        method: 'DELETE',
      });

      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Failed to delete user');
      }

      await fetchUsers();
      setModalMode(null);
      setSelectedUser(null);
    } catch (error) {
      setFormError((error as Error).message);
    } finally {
      setIsDeleting(false);
    }
  };

  const isFormModalOpen = modalMode === 'create' || modalMode === 'edit';
  const isDeleteModalOpen = modalMode === 'delete';

  return (
    <>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Manage Users</h1>
        <button
          type="button"
          className={styles.addButton}
          onClick={openCreateModal}
        >
          <Plus className={styles.buttonIcon} aria-label="add user" />
          New User
        </button>
      </div>

      {loadError && <p role="alert">{loadError}</p>}

      <div className={styles.tableCard}>
        <table className={styles.table} role="table">
          <thead>
            <tr role="row">
              <td role="columnheader">Name</td>
              <td role="columnheader">Email</td>
              <td role="columnheader" className={styles.actionsHeader}>
                Actions
              </td>
            </tr>
          </thead>
          <tbody>
            {isLoadingUsers ? (
              <tr role="row">
                <td colSpan={3}>Loading users…</td>
              </tr>
            ) : users.length === 0 ? (
              <tr role="row">
                <td colSpan={3}>No users yet.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} role="row">
                  <td data-label="Name">
                    {user.firstName} {user.lastName}
                  </td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Actions" className={styles.actionsCell}>
                    <span className={styles.actionButtons}>
                      <button
                        type="button"
                        className={styles.editButton}
                        onClick={() => openEditModal(user)}
                      >
                        <PencilLine
                          className={styles.buttonIcon}
                          aria-label="edit user"
                        />
                        Edit
                      </button>
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => openDeleteModal(user)}
                      >
                        <Trash2
                          className={styles.buttonIcon}
                          aria-label="remove user"
                        />
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create and edit modal have identical layout, just different text.*/}
      <Modal
        isOpen={isFormModalOpen}
        onClose={closeModal}
        title={modalMode === 'edit' ? 'Edit User' : 'Create User'}
      >
        <InputField
          label="First name:"
          name="firstName"
          value={firstNameInput}
          onChange={(e) => setFirstNameInput(e.target.value)}
          fullWidth
        />
        <InputField
          label="Last name:"
          name="lastName"
          value={lastNameInput}
          onChange={(e) => setLastNameInput(e.target.value)}
          fullWidth
        />
        <InputField
          label="Email:"
          name="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          fullWidth
        />
        {formError && <p role="alert">{formError}</p>}
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={closeModal}
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Modal>
      {/*modal for delete */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        title={
          selectedUser
            ? `Remove ${selectedUser.firstName} ${selectedUser.lastName}?`
            : ''
        }
      >
        <p className={styles.deleteText}>
          This will permanently remove the user from the database.
        </p>
        {formError && <p role="alert">{formError}</p>}
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.cancelButtonDanger}
            onClick={closeModal}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirmDeleteButton}
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </Modal>
    </>
  );
}
