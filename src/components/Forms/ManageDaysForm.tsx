import { useState } from 'react';

import { Day } from '../../../data/days';

import InputField from '../Inputfield/Inputfield';
import Button from '@/components/Buttons/Button/Button';

import manageDaysStyles from '@/app/admin/manageDays/ManageDays.module.scss';

type ManageDaysFormProps = {
  day: Day | null;
};

export default function ManageDaysForm({ day }: ManageDaysFormProps) {
  const [data, setData] = useState<Day>(
    day ?? { day: '', title: '', text: '', linkUrl: '', linkText: '' },
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className={manageDaysStyles.modalContentWrapper}>
      <InputField
        name="day"
        value={data.day}
        onChange={handleChange}
        label="Date:"
        type="text"
      ></InputField>
      <InputField
        name="title"
        value={data.title}
        onChange={handleChange}
        label="Heading:"
        type="text"
      ></InputField>
      <InputField
        name="text"
        value={data.text}
        onChange={handleChange}
        label="Text:"
        type="textarea"
      ></InputField>
      <InputField
        name="linkText"
        value={data.linkText}
        onChange={handleChange}
        label="Link Text:"
        type="text"
      ></InputField>
      <InputField
        name="linkUrl"
        value={data.linkUrl}
        onChange={handleChange}
        label="Link URL:"
        type="text"
      ></InputField>
      <div className={manageDaysStyles.manageDaysButton}>
        <Button variant="primary" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
          Save
        </Button>
      </div>
    </div>
  );
}
