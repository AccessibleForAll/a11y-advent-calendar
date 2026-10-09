import Button from '@/components/Buttons/Button/Button';

import styles from '@/app/admin/manageUsers/page.module.scss';

type ConfirmDeleteProps = {
  name: string;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function ConfirmDelete({
  name,
  onCancel,
  onSubmit,
}: ConfirmDeleteProps) {
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.modalContentWrapper}>
      <p>Are you sure you want to delete {name}? This cannot be undone.</p>
      <div className={styles.buttonGroup}>
        <Button variant="primary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="secondary" type="submit" onClick={() => void 0}>
          Delete
        </Button>
      </div>
    </form>
  );
}
