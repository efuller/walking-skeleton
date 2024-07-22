import { ApiResponse } from '@efuller/shared/src/api';
import { CreateJournalDto, JournalDto } from '@efuller/api/src/shared/persistence/drizzle/schema';

export interface JournalRepo {
  createJournal(user: CreateJournalDto): Promise<ApiResponse<JournalDto | null>>;
  getJournals(): Promise<ApiResponse<JournalDto[]>>;
  getJournalById(id: number): Promise<ApiResponse<JournalDto | null>>;
}
