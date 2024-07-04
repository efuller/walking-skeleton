export type CreateJournalDto = Omit<JournalDto, 'id' | 'createdAt' | 'updatedAt'>;

export type JournalDto = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}