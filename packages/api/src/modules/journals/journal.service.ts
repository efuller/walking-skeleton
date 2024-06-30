import { ApiResponse } from '@efuller/shared/src/api';
import { Database } from '@efuller/api/src/shared/persistence/database';
import { CreateJournalDto, JournalDto } from '@efuller/api/src/modules/journals/journal.dto';

export interface Journal {
  id: string;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class JournalService {
  constructor(private readonly db: Database) {}

  async createJournal(journal: CreateJournalDto): Promise<ApiResponse<JournalDto>> {
    const result = await this.db.journals.createJournal(journal);

    return result;
  }

  async getJournals(): Promise<ApiResponse<JournalDto[]>> {
    const result = await this.db.journals.getJournals();

    return result;
  }
}