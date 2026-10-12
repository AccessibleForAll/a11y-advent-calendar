import { useState } from 'react';

import { format, startOfTomorrow } from 'date-fns';
import { Day } from '../../../data/days';

import InputField from '../Inputfield/Inputfield';
import Button from '@/components/Buttons/Button/Button';

import styles from './ManageDaysForm.module.scss';

type ManageDaysFormProps = {
  day: Day | null;
  onCancel: () => void;
  onSubmit: (data: Day) => void;
};

function validateData(data: Day, minDate: string) {
  const result: Partial<Record<keyof Day, string>> = {};

  if (!data.day) result.day = 'Choose a date';
  else if (data.day < minDate) result.day = 'Choose a date in the future';
  else {
    const monthAndDay = data.day.slice(5);
    if (monthAndDay < '12-01' || monthAndDay > '12-24') {
      result.day = 'Choose a date between December 1 and 24';
    }
  }

  if (!data.title.trim()) result.title = 'Heading is required';

  if (!data.text.trim()) result.text = 'Text is required';

  const linkUrl = data.linkUrl.trim();
  const linkText = data.linkText.trim();

  if (linkUrl && !linkText) {
    result.linkText = 'Link text is required if URL is given';
  }

  if (linkText && !linkUrl) {
    result.linkUrl = 'Link URL is required if text is given';
  }

  if (linkUrl) {
    try {
      const url = new URL(linkUrl);
      if (url.protocol !== 'https:') {
        result.linkUrl = 'URL must start with https://';
      }
    } catch {
      result.linkUrl = 'Enter a valid URL starting with https.';
    }
  }
  return result;
}

export default function ManageDaysForm({
  day,
  onCancel,
  onSubmit,
}: ManageDaysFormProps) {
  const [data, setData] = useState<Day>(
    day ?? { day: '', title: '', text: '', linkUrl: '', linkText: '' },
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Day, string>>>({});
  const minDate = format(startOfTomorrow(), 'yyyy-MM-dd');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    const newErrors = validateData(data, minDate);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      ...data,
      title: data.title.trim(),
      text: data.text.trim(),
      linkUrl: data.linkUrl.trim(),
      linkText: data.linkText.trim(),
    });
  }

  return (
    <form className={styles.modalContentWrapper} noValidate>
      <p className={styles.requiredNote}>
        Fields marked with an asterisk (*) are required.
      </p>
      <InputField
        name="day"
        value={data.day}
        onChange={handleChange}
        label="Date:"
        type="date"
        required
        min={minDate}
        error={errors.day}
      />
      <InputField
        name="title"
        value={data.title}
        onChange={handleChange}
        label="Heading:"
        type="text"
        required
        error={errors.title}
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
        name="linkUrl"
        value={data.linkUrl}
        onChange={handleChange}
        label="Link URL:"
        type="url"
        error={errors.linkUrl}
      />
      <div className={styles.buttonGroupForm}>
        <Button variant="primary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        {/*todo when backend exists: only submit when data hasChanged()*/}
        <Button variant="secondary" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </form>
  );
}
