import { randomUUID } from 'crypto';
import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';
import { CreateJournalDto, JournalDto } from '@efuller/api/src/modules/journals/journal.dto';
import { ApiResponse } from '@efuller/shared/src/api';

export class InMemoryJournalRepo implements JournalRepo {
  private journals: JournalDto[] = [];

  async createJournal(journal: CreateJournalDto): Promise<ApiResponse<JournalDto>> {
    const newJournal = {...journal, id: randomUUID(), createdAt: new Date(), updatedAt: new Date()};
    this.journals.push(newJournal);

    return {
      success: true,
      data: { ...newJournal },
    }
  }

  async getJournals(): Promise<ApiResponse<JournalDto[]>> {
    if (!this.journals.length) {
      return {
        success: true,
        data: [],
      }
    }

    return {
      success: true,
      data: [...this.journals],
    }
  }
}
