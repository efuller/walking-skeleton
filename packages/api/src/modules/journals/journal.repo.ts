import { ApiResponse } from '@efuller/shared/src/api';
import { CreateJournalCommand, Journal } from '@efuller/shared/src/modules/journals/journals.dto';

export interface JournalRepo {
  createJournal(user: CreateJournalCommand): Promise<ApiResponse<Journal | null>>;
  getJournals(): Promise<ApiResponse<Journal[]>>;
  getJournalById(id: string): Promise<ApiResponse<Journal | null>>;
}
