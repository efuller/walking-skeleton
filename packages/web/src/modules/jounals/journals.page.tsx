import React, { useEffect } from 'react';
import { AddJournalForm } from './components/addJournal.form.tsx';
import { ApiClient } from '../../shared/apiClient/apiClient.ts';

export interface Journal {
  title: string;
  content: string;
}

const apiClient = new ApiClient('http://localhost:3001');

export const JournalsPage = () => {
  const [journals, setJournals] = React.useState<Journal[]>([]);

  const handleOnSubmit = async (newJournal: Journal) => {
    await apiClient.post('/journal', newJournal);
    setJournals([...journals, newJournal]);
  };

  useEffect(() => {
    const fetchJournals = async () => {
      const response = await apiClient.get<Journal[]>('/journal');
      if (response.success && response.data) {
        setJournals([...response.data]);
      }
    };
    fetchJournals();
  }, []);

  return (
    <div>
      <h1>Add Journal</h1>
      <AddJournalForm onSubmit={handleOnSubmit} />
      <hr />
      <div>
        <h1>Journal List</h1>
        <ul id="journal-list">
          {journals.map((journal, i) => {
            {
              return journal.title && journal.content ? (
                <li
                  key={i}
                  className="journal-entry"
                >
                  <h3 className="journal-title">{journal.title}</h3>
                  <p className="journal-content">{journal.content}</p>
                </li>
              ) : null;
            }
          })}
        </ul>
      </div>
    </div>
  );
};
