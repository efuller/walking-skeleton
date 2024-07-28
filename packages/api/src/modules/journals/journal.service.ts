import { ApiResponse } from '@efuller/shared/src/api';
import { CreateJournalDto, JournalDto } from '@efuller/api/src/shared/persistence/drizzle/schema';
import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';

export interface Journal {
  id: string;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class JournalService {
  constructor(private readonly journalRepo: JournalRepo) {}

  async createJournal(journal: CreateJournalDto): Promise<ApiResponse<JournalDto | null>> {
    const result = await this.journalRepo.createJournal(journal);

    return result;
  }

  async getJournals(): Promise<ApiResponse<JournalDto[]>> {
    const result = await this.journalRepo.getJournals();

    return result;
  }
}