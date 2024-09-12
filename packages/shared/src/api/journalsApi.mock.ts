import { JournalsApi } from '@efuller/shared/src/api/journalsApi';
import { ApiResponse } from '@efuller/shared/src/api/index';
import { JournalDto } from '@efuller/shared/src/modules/journals/journals.dto';

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

