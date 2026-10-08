'use client';
import styles from '@/app/admin/manageUsers/page.module.scss';
import { users } from '../../../../data/users';
import Button from '@/components/Buttons/Button/Button';
import UsersList from '@/components/UsersList/UsersList';
import { Plus } from 'lucide-react';

export default function ManageUsersPage() {
  return (
    <>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Manage Users</h1>
        <Button
          variant="secondary"
          icon={Plus}
          onClick={() => {
            console.log('create user');
          }}
        >
          New User
        </Button>
      </div>
      <UsersList
        users={users}
        onEdit={(user) => {
          console.log('edit user', user);
        }}
        onDelete={(user) => {
          console.log('delete user', user);
        }}
      />
    </>
  );
}
