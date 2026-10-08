import styles from './UsersList.module.scss';

import UserCard from '@/components/UserCard/UserCard';
import UsersTable from '@/components/UsersTable/UsersTable';

import type { User } from '@/types/user';

type UsersListProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export default function UsersList({ users, onEdit, onDelete }: UsersListProps) {
  return (
    <>
      <div className={styles.table}>
        <UsersTable users={users} onEdit={onEdit} onDelete={onDelete} />
      </div>

      {/* Shown instead of the table on smaller screens. */}
      <div className={styles.cards}>
        {users.length === 0 ? (
          <p>No users yet.</p>
        ) : (
          <ul className={styles.cardList}>
            {users.map((user) => (
              <li key={user.id}>
                <UserCard user={user} onEdit={onEdit} onDelete={onDelete} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
