import React, { useEffect } from 'react';
import { AddJournalForm } from './components/addJournal.form';
import { JournalsPresenter } from '@/modules/journals/journals.presenter.ts';
import { JournalsController } from '@/modules/journals/journals.controller.ts';
import { observer } from 'mobx-react';

export interface Journal {
  title: string;
  content: string;
}

interface JournalsPageProps {
  presenter: JournalsPresenter
  controller: JournalsController
}

export const JournalsPage = observer(({presenter, controller}: JournalsPageProps) => {
  const handleOnSubmit = async (newJournal: Journal) => {
    await controller.create(newJournal);
  };

  useEffect(() => {
    presenter.load();
  }, [presenter]);

  return (
    <div className="container mx-auto grid h-screen justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-12 min-w-[350px]">
      <h1 className="text-4xl font-bold">Add Journal</h1>
      <AddJournalForm onSubmit={handleOnSubmit} />
      <hr />
      <div className="mt-4">
        <h2 className="text-3xl font-semibold">Journal List</h2>
        {
          presenter.viewModel.journals.length === 0 ? (
            <p>No journal entries yet.</p>
          ) : (
            <ul id="journal-list">
              {presenter.viewModel.journals.map((journal, i) => {
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
          )
        }
      </div>
      </div>
    </div>
  );
});
