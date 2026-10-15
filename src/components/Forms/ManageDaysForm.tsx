import { useState } from 'react';

import { format, startOfTomorrow } from 'date-fns';
import type { Day, CreateDayInput } from '@/types/day';

import InputField from '../Inputfield/Inputfield';
import Button from '@/components/Buttons/Button/Button';

import styles from './ManageDaysForm.module.scss';

type ManageDaysFormProps = {
  day: Day | null;
  onCancel: () => void;
  onSubmit: (data: CreateDayInput) => void;
};

type FormState = {
  date: string;
  heading: string;
  text: string;
  linkText: string;
  link: string;
};

function validateData(data: FormState, minDate: string) {
  const result: Partial<Record<keyof FormState, string>> = {};

  if (!data.date) result.date = 'Choose a date';
  else if (data.date < minDate) result.date = 'Choose a date in the future';
  else {
    const monthAndDay = data.date.slice(5);
    if (monthAndDay < '12-01' || monthAndDay > '12-24') {
      result.date = 'Choose a date between December 1 and 24';
    }
  }

  if (!data.heading.trim()) result.heading = 'Heading is required';

  if (!data.text.trim()) result.text = 'Text is required';

  const linkText = data.linkText.trim();
  const link = data.link.trim();

  if (link && !linkText) {
    result.linkText = 'Link text is required if URL is given';
  }

  if (linkText && !link) {
    result.link = 'Link URL is required if text is given';
  }

  if (link) {
    try {
      const url = new URL(link);
      if (url.protocol !== 'https:') {
        result.link = 'URL must start with https://';
      }
    } catch {
      result.link = 'Enter a valid URL starting with https.';
    }
  }
  return result;
}

export default function ManageDaysForm({
  day,
  onCancel,
  onSubmit,
}: ManageDaysFormProps) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const minDate = format(startOfTomorrow(), 'yyyy-MM-dd');

  const [data, setData] = useState<FormState>({
    date: day?.date.slice(0, 10) ?? '',
    heading: day?.heading ?? '',
    text: day?.text ?? '',
    linkText: day?.linkText ?? '',
    link: day?.link ?? '',
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    const newErrors = validateData(data, minDate);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const base = {
      date: data.date,
      heading: data.heading.trim(),
      text: data.text.trim(),
    };
    const link = data.link.trim();
    const linkText = data.linkText.trim();

    if (link && linkText) {
      onSubmit({ ...base, link, linkText });
    } else {
      onSubmit(base);
    }
  }

  return (
    <form className={styles.modalContentWrapper} noValidate>
      <p className={styles.requiredNote}>
        Fields marked with an asterisk (*) are required.
      </p>
      <InputField
        name="date"
        value={data.date}
        onChange={handleChange}
        label="Date:"
        type="date"
        required
        min={minDate}
        error={errors.date}
      />
      <InputField
        name="heading"
        value={data.heading}
        onChange={handleChange}
        label="Heading:"
        type="text"
        required
        error={errors.heading}
      />
      <InputField
        name="text"
        value={data.text}
        onChange={handleChange}
        label="Text:"
        type="textarea"
        required
        error={errors.text}
      />
      <InputField
        name="linkText"
        value={data.linkText}
        onChange={handleChange}
        label="Link Text:"
        type="text"
        error={errors.linkText}
      />
      <InputField
        name="link"
        value={data.link}
        onChange={handleChange}
        label="Link URL:"
        type="url"
        error={errors.link}
      />
      <div className={styles.buttonGroupForm}>
        <Button variant="primary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </form>
  );
}
