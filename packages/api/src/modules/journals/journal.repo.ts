import { CreateJournalDto, JournalDto } from '@efuller/api/src/modules/journals/journal.dto';
import { ApiResponse } from '@efuller/shared/src/api';

export interface JournalRepo {
  createJournal(user: CreateJournalDto): Promise<ApiResponse<JournalDto>>;
  getJournals(): Promise<ApiResponse<JournalDto[]>>;
}
