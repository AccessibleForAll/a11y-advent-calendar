import { use } from 'react';
import { PencilLine, Trash2 } from 'lucide-react';
import styles from './UsersTable.module.scss';
import Button from '@/components/Buttons/Button/Button';
import type { User } from '@/types/user';

type UsersTableProps = {
  usersPromise: Promise<User[]>;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export default function UsersTable({
  usersPromise,
  onEdit,
  onDelete,
}: UsersTableProps) {
  const users = use(usersPromise);

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
                    <Button
                      variant="primary"
                      icon={PencilLine}
                      onClick={() => onEdit(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="primary"
                      icon={Trash2}
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
