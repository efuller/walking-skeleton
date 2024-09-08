import { JournalsApi } from '@efuller/shared/src/api/journalsApi';
import { JournalDto } from '@efuller/api/src/modules/journals/journal.dto';
import { ApiResponse } from '@efuller/shared/src/api/index';

export class MockJournalsApiClient implements JournalsApi {
  constructor(private readonly baseUrl: string) {}

  public async create(journal: JournalDto): Promise<ApiResponse<JournalDto>> {
    return {
      success: true,
      data: journal
    }
  }

  public async getJournals(): Promise<ApiResponse<JournalDto[]>> {
    return {
      success: true,
      data: []
    }
  }
}

