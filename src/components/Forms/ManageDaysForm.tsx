import { useState } from 'react';

import { format, startOfTomorrow } from 'date-fns';
import { Day } from '../../../data/days';

import InputField from '../Inputfield/Inputfield';
import Button from '@/components/Buttons/Button/Button';

import styles from '@/app/admin/manageDays/ManageDays.module.scss';

type ManageDaysFormProps = {
  day: Day | null;
  onCancel: () => void;
  onSubmit: (data: Day) => void;
};

function validateDay(data: Day, minDate: string) {
  const result: Partial<Record<keyof Day, string>> = {};

  if (!data.day) result.day = 'Choose a date';
  else if (data.day < minDate) result.day = 'Choose a date in the future';

  if (!data.title.trim()) result.title = 'Heading is required';

  if (!data.text.trim()) result.text = 'Text is required';

  if (data.linkUrl && !data.linkText)
    result.linkText = 'Link text is required if URL is given';

  if (data.linkUrl)
    try {
      const url = new URL(data.linkUrl);
      if (url.protocol !== 'https:')
        result.linkUrl = 'URL must start with https://';
      result.linkUrl = 'URL must start with https://';
    } catch {
      result.linkUrl = 'Enter a validUrl starting with https.';
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

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors = validateDay(data, minDate);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit(data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.modalContentWrapper}
      noValidate
    >
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
      <div className={styles.buttonGroup}>
        <Button variant="primary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        {/*todo when backend exists: only submit when data hasChanged()*/}
        <Button variant="secondary" type="submit" onClick={() => void 0}>
          Save
        </Button>
      </div>
    </form>
  );
}
