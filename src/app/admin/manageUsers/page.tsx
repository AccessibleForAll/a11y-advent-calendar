'use client';

import { useState } from 'react';
import { Plus, PencilLine, Trash2 } from 'lucide-react';
import styles from './page.module.scss';
import { users, type User } from '../../../../data/users';
import Modal from '@/components/Modal/Modal';
import InputField from '@/components/Inputfield/Inputfield';

//what modal is picked if any..
type ModalMode = 'create' | 'edit' | 'delete' | null;

export default function ManageUsersPage() {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  //just ui for now
  const [fullNameInput, setFullNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  const openCreateModal = () => {
    setSelectedUser(null);
    setFullNameInput('');
    setEmailInput('');
    setModalMode('create');
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFullNameInput(`${user.firstName} ${user.lastName}`);
    setEmailInput(user.email);
    setModalMode('edit');
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setModalMode('delete');
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedUser(null);
  };

  const handleSave = () => {
    console.log('Save clicked', { mode: modalMode, fullNameInput, emailInput });
    closeModal();
  };

  const handleConfirmDelete = () => {
    console.log('Delete confirmed for', selectedUser);
    closeModal();
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
          <Plus size={16} aria-label="add user" />
          New User
        </button>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td className={styles.actionsHeader}>Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
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
                      <PencilLine size={14} aria-label="edit user" />
                      Edit
                    </button>
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => openDeleteModal(user)}
                    >
                      <Trash2 size={14} aria-label="remove user" />
                      Delete
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isFormModalOpen}
        onClose={closeModal}
        title={modalMode === 'edit' ? 'Edit User' : 'Create User'}
      >
        <InputField
          label="Full name:"
          name="fullName"
          value={fullNameInput}
          onChange={(e) => setFullNameInput(e.target.value)}
          fullWidth
        />
        <InputField
          label="Email:"
          name="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          fullWidth
        />
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeModal}
        title={`Remove ${selectedUser?.firstName} ${selectedUser?.lastName}?`}
      >
        <p className={styles.deleteText}>
          They will lose access to the calendar admin. Mock data resets on
          reload.
        </p>
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.cancelButtonDanger}
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirmDeleteButton}
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}
