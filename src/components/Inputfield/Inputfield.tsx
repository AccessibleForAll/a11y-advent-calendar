import React from "react";
import styles from "./Inputfield.module.scss";


// props inputfield component accepts.

type InputFieldProps = {
  label: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: "text" | "textarea"; //text is single line input and textarea is multi line
  name?: string;
  rows?: number; //rows supports textarea height with number of rows.
  fullWidth?: boolean;
};

export default function InputField({
  label,
  value,
  placeholder = "",
  onChange,
  type = "text",
  name,
  rows = 4,
  fullWidth = false,
}: InputFieldProps) {
  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ""}`}>
        <label className={styles.label} htmlFor ={name}>
            {label}
        </label>

        {type === "textarea" ? (
            <textarea
                id={name}
                name={name}
                className={styles.field}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
            />
        ) : (
            <input
                id={name}
                name={name}
                className={styles.field}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type="text"
            />
        )}
    </div>
    );
}
