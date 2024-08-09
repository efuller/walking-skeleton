import { v4 as uuidv4 } from 'uuid';
import { JournalRepo } from '@efuller/api/src/modules/journals/journal.repo';
import { ApiResponse } from '@efuller/shared/src/api';
import { CreateJournalCommand, Journal } from '@efuller/shared/src/modules/journals/commands';

export function generateRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

export class InMemoryJournalRepo implements JournalRepo {
  private journals: Journal[] = [];

  async createJournal(journal: CreateJournalCommand): Promise<ApiResponse<Journal | null>> {
    const newJournal = {
      ...journal,
      id: uuidv4(),
      content: '',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString()
    };

    this.journals.push(newJournal);

    return {
      success: true,
      data: { ...newJournal },
    }
  }

  async getJournals(): Promise<ApiResponse<Journal[]>> {
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

  async getJournalById(id: string): Promise<ApiResponse<Journal | null>> {
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
