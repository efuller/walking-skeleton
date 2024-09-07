import React, { useRef } from 'react';
import { Journal } from '../journals.page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  onSubmit: (data: Journal) => void;
};

export const AddJournalForm = ({ onSubmit }: Props) => {
  const formRef = useRef(null);
  const [formData, setFormData] = React.useState<Journal>({
    title: '',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(formData);
    setFormData({ title: '', content: '' });
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-md mx-auto my-8 p-4 bg-white rounded-lg shadow-md"
      id="add-journal"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="flex flex-col gap-4">
        <Input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          placeholder="Title"
          onChange={(e) => {
            setFormData({
              ...formData,
              title: e.target.value,
            });
          }}
        />
        <Input
          id="content"
          type="text"
          name="content"
          value={formData.content}
          placeholder="Content"
          onChange={(e) => {
            setFormData({
              ...formData,
              content: e.target.value,
            });
          }}
        />
        <Button
          id="submit"
          type="submit"
        >
          Add Journal
        </Button>
      </div>
    </form>
  );
};
