import React from 'react';
import { AddJournalForm } from './components/addJournal.form.tsx';

export interface Journal {
  title: string;
  content: string;
}

export const JournalsPage = () => {
  const [journals, setJournals] = React.useState<Journal[]>([]);

  const handleOnSubmit = (newJournal: Journal) => {
    setJournals([...journals, newJournal]);
  };

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
