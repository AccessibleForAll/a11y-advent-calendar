import { useState } from 'react';

import type { CreateUserInput, User } from '@/types/user';

import Button from '@/components/Buttons/Button/Button';
import InputField from '@/components/Inputfield/Inputfield';

import styles from '@/app/admin/manageUsers/page.module.scss';

type UserFormProps = {
  user: User | null;
  onCancel: () => void;
  onSubmit: (data: CreateUserInput) => void;
};

export default function UserForm({ user, onCancel, onSubmit }: UserFormProps) {
  const [data, setData] = useState<CreateUserInput>(
    user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }
      : { firstName: '', lastName: '', email: '' },
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.modalContentWrapper}>
      <InputField
        name="firstName"
        value={data.firstName}
        onChange={handleChange}
        label="First name:"
        type="text"
      />
      <InputField
        name="lastName"
        value={data.lastName}
        onChange={handleChange}
        label="Last name:"
        type="text"
      />
      <InputField
        name="email"
        value={data.email}
        onChange={handleChange}
        label="Email:"
        type="text"
      />
      <div className={styles.buttonGroup}>
        <Button variant="primary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="secondary" type="submit" onClick={() => void 0}>
          Save
        </Button>
      </div>
    </form>
  );
}
