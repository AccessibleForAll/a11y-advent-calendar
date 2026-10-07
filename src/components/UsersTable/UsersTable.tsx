import { PencilLine, Trash2 } from 'lucide-react';

import styles from './UsersTable.module.scss';

import Button from '@/components/Buttons/Button/Button';

import type { User } from '@/types/user';

type UsersTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export default function UsersTable({
  users,
  onEdit,
  onDelete,
}: UsersTableProps) {
  return (
    <div className={styles.tableCard}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col" className={styles.actionsHeader}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={3}>No users yet.</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td className={styles.actionsCell}>
                  <span className={styles.actionButtons}>
                    <Button
                      variant="primary"
                      icon={PencilLine}
                      aria-label={`Edit ${user.firstName} ${user.lastName}`}
                      onClick={() => onEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="primary"
                      icon={Trash2}
                      aria-label={`Delete ${user.firstName} ${user.lastName}`}
                      onClick={() => onDelete(user)}
                    >
                      Delete
                    </Button>
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
