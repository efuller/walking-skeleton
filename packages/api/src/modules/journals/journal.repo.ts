import { ApiResponse } from '@efuller/shared/src/api';
import { JournalDto } from '@efuller/api/src/shared/persistence/drizzle/schema';
import { CreateJournalCommand } from '@efuller/shared/src/modules/journals/commands';

export interface JournalRepo {
  createJournal(user: CreateJournalCommand): Promise<ApiResponse<JournalDto | null>>;
  getJournals(): Promise<ApiResponse<JournalDto[]>>;
  getJournalById(id: number): Promise<ApiResponse<JournalDto | null>>;
}
