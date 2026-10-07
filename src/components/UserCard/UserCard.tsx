import { PencilLine, Trash2 } from 'lucide-react';
import Button from '@/components/Buttons/Button/Button';
import Card from '@/components/Card/Card';
import styles from './UserCard.module.scss';
import type { User } from '@/types/user';

type UserCardProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card className={styles.userCard}>
      <dl className={styles.details}>
        <div className={styles.row}>
          <dt>Name</dt>
          <dd>
            {user.firstName} {user.lastName}
          </dd>
        </div>
        <div className={styles.row}>
          <dt>Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div className={styles.row}>
          <dt>Actions</dt>
          <dd className={styles.actions}>
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
          </dd>
        </div>
      </dl>
    </Card>
  );
}
