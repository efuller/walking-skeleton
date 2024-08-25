import { ApiResponse } from '@efuller/shared/src/api';
import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';
import { CreateJournalCommand, Journal } from '@efuller/shared/src/modules/journals/commands';

export class JournalService {
  constructor(private readonly journalRepo: JournalRepo) {}

  async createJournal(journal: CreateJournalCommand): Promise<ApiResponse<Journal | null>> {
    const result = await this.journalRepo.createJournal(journal);

    return result;
  }

  async getJournals(): Promise<ApiResponse<Journal[]>> {
    const result = await this.journalRepo.getJournals();

    return result;
  }
}