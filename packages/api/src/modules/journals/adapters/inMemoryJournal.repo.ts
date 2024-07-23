import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';
import { ApiResponse } from '@efuller/shared/src/api';
import { CreateJournalDto, JournalDto } from '@efuller/api/src/shared/persistence/drizzle/schema';

export function generateRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

export class InMemoryJournalRepo implements JournalRepo {
  private journals: JournalDto[] = [];

  async createJournal(journal: CreateJournalDto): Promise<ApiResponse<JournalDto | null>> {
    const newJournal = {
      ...journal,
      content: '',
      id: generateRandomNumber(),
      createdAt: new Date().toString(),
      updatedAt: new Date().toString()
    };

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

  async getJournalById(id: number): Promise<ApiResponse<JournalDto | null>> {
    const journal = this.journals.find(journal => journal.id === id);

    if (!journal) {
      return {
        success: true,
        data: null,
      }
    }

    return {
      success: true,
      data: { ...journal },
    }
  }
}
