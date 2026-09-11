import React from 'react';
import styles from './Inputfield.module.scss';

// props inputfield component accepts.

type InputFieldProps = {
  label: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: 'text' | 'textarea'; //Text is single line input and textarea is multi line
  name: string;
  rows?: number; //rows supports textarea height with number of rows.
  fullWidth?: boolean;
};

export default function InputField({
  label,
  value,
  onChange,
  type = 'text',
  name,
  rows = 4,
  fullWidth = false,
}: InputFieldProps) {
  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
      {/* label text shown above field */}
      <label className={styles.label} htmlFor={name}>
        {label}
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
        />
      ) : (
        <input
          id={name}
          name={name}
          className={styles.field}
          value={value}
          onChange={onChange}
          type="text"
        />
      )}
    </div>
  );
}
