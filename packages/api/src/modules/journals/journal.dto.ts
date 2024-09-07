// TODO: These need to be moved to a shared location.
export type CreateJournalDto = Omit<JournalDto, 'id' | 'createdAt' | 'updatedAt'>;

export type JournalDto = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}