'use client';

import { useState, type ChangeEvent } from 'react';
import Button from '@/components/Buttons/Button/Button';
import InputField from '@/components/Inputfield/Inputfield';
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

  //resusable funtion to handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(values);
      }}
    >
      <InputField
        label="First name:"
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        required
      />
      <InputField
        label="Last name:"
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        required
      />
      <InputField
        label="Email:"
        name="email"
        value={values.email}
        onChange={handleChange}
        required
      />
      {error && <p role="alert">{error}</p>}
      <div className={styles.actions}>
        <Button variant="primary" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
        <Button variant="secondary" type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
