import { ApiResponse } from '@efuller/shared/src/api';
import { CreateJournalCommand, JournalDto } from '@efuller/api/src/shared/persistence/drizzle/schema';

export interface JournalRepo {
  createJournal(user: CreateJournalCommand): Promise<ApiResponse<JournalDto | null>>;
  getJournals(): Promise<ApiResponse<JournalDto[]>>;
  getJournalById(id: number): Promise<ApiResponse<JournalDto | null>>;
}
