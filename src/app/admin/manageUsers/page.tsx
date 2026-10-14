'use client';
import { useState } from 'react';
import styles from '@/app/admin/manageUsers/page.module.scss';
import { users } from '../../../../data/users';
import type { User } from '@/types/user';
import type { ModalMode } from '@/app/admin/manageDays/page';
import Button from '@/components/Buttons/Button/Button';
import ConfirmDelete from '@/components/Forms/ConfirmDelete';
import Modal from '@/components/Modal/Modal';
import UserForm from '@/components/Forms/UserForm';
import UsersList from '@/components/UsersList/UsersList';
import { Plus } from 'lucide-react';

export default function ManageUsersPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  function openModal(inUser: User | null, mode: ModalMode) {
    setCurrentUser(inUser);
    setModalMode(mode);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setCurrentUser(null);
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
            onSubmit={() => {
              console.log('delete user', currentUser);
              closeModal();
            }}
          />
        ) : (
          <UserForm
            key={currentUser?.id ?? 'newUser'}
            user={currentUser ?? null}
            onCancel={closeModal}
            onSubmit={(updatedUser) => {
              console.log(updatedUser);
              closeModal();
            }}
          />
        )}
      </Modal>
      <UsersList
        users={users}
        onEdit={(inUser) => {
          openModal(inUser, 'edit');
        }}
        onDelete={(inUser) => {
          openModal(inUser, 'delete');
        }}
      />
    </>
  );
}
