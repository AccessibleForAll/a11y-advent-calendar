import InputField from '@/components/Inputfield/Inputfield';
import FormModal from '@/components/FormModals/FormModal';
import type { CreateUserInput } from '@/types/user';

type UserFormModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  values: CreateUserInput;
  onChange: (values: CreateUserInput) => void;
  onClose: () => void;
  onSave: () => void;
  isSaving: boolean;
  error: string | null;
};

export default function UserFormModal({
  isOpen,
  isEditing,
  values,
  onChange,
  onClose,
  onSave,
  isSaving,
  error,
}: UserFormModalProps) {
  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit User' : 'Create User'}
      onSave={onSave}
      isSaving={isSaving}
      error={error}
    >
      <InputField
        label="First name:"
        name="firstName"
        value={values.firstName}
        onChange={(e) => onChange({ ...values, firstName: e.target.value })}
      />
      <InputField
        label="Last name:"
        name="lastName"
        value={values.lastName}
        onChange={(e) => onChange({ ...values, lastName: e.target.value })}
      />
      <InputField
        label="Email:"
        name="email"
        value={values.email}
        onChange={(e) => onChange({ ...values, email: e.target.value })}
      />
    </FormModal>
  );
}
