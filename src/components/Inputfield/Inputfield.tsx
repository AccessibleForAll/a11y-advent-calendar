import React from 'react';
import styles from './Inputfield.module.scss';
import { TriangleAlert } from 'lucide-react';

type InputFieldProps = {
  label: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: 'text' | 'textarea' | 'url' | 'password' | 'date' | 'email';
  name: string;
  rows?: number; //rows supports textarea height with number of rows.
  required?: boolean;
  autoComplete?:
    'name' | 'username' | 'email' | 'current-password' | 'new-password';
  fullWidth?: boolean;
  min?: number | string;
  error?: string;
};

export default function InputField({
  label,
  value,
  onChange,
  type = 'text',
  name,
  rows = 4,
  required,
  autoComplete,
  fullWidth = false,
  min,
  error,
}: InputFieldProps) {
  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
      {/* label text shown above field */}
      <label className={styles.label} htmlFor={name}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      {/* switch between multiline and singleline input based on type prop.. */}
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          className={styles.field}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : (
        <input
          id={name}
          name={name}
          className={styles.field}
          value={value}
          onChange={onChange}
          type={type}
          required={required}
          autoComplete={autoComplete}
          min={min}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}

      {error && (
        <p id={`${name}-error`} className={styles.error}>
          <TriangleAlert aria-hidden="true" className={styles.errorIcon} />
          {error}
        </p>
      )}
    </div>
  );
}
