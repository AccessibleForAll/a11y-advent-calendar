'use client';

import { useState } from 'react';
import InputField from '@/components/Inputfield/Inputfield';
import Button from '@/components/Buttons/Button/Button';
import styles from './ModalContent.module.scss';
import type { CreateUserInput, User } from '@/types/user';

const emptyForm: CreateUserInput = { firstName: '', lastName: '', email: '' };

type UserFormProps = {
  // The user to edit, or null when creating a new user.
  user: User | null;
  onCancel: () => void;
  onSave: (values: CreateUserInput) => void;
  isSaving: boolean;
  error: string | null;
};

export default function UserForm({
  user,
  onCancel,
  onSave,
  isSaving,
  error,
}: UserFormProps) {
  const [values, setValues] = useState<CreateUserInput>(
    user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }
      : emptyForm,
  );

  return (
    <>
      <InputField
        label="First name:"
        name="firstName"
        value={values.firstName}
        onChange={(e) => setValues({ ...values, firstName: e.target.value })}
      />
      <InputField
        label="Last name:"
        name="lastName"
        value={values.lastName}
        onChange={(e) => setValues({ ...values, lastName: e.target.value })}
      />
      <InputField
        label="Email:"
        name="email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
      />
      {error && <p role="alert">{error}</p>}
      <div className={styles.actions}>
        <Button variant="primary" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
        <Button
          variant="secondary"
          onClick={() => onSave(values)}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </>
  );
}
