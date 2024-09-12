import { ApiResponse } from '@efuller/shared/src/api/index';
import { AuthModule } from 'web/src/modules/auth/auth.module';
import { CreateJournalDto, JournalDto } from '@efuller/shared/src/modules/journals/journals.dto';

export interface JournalsApi {
  create(journal: CreateJournalDto): Promise<ApiResponse<JournalDto>>;
  getJournals(): Promise<ApiResponse<JournalDto[]>>;
}

export class JournalsApiClient implements JournalsApi {
  constructor(
    private readonly baseUrl: string,
    private readonly authModule: AuthModule
  ) {}

  public async getJournals(): Promise<ApiResponse<JournalDto[]>> {
    const response = await fetch(`${this.baseUrl}/journals`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authModule.getAccessToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching journals: ${response.statusText}`);
    }

    const result = await response.json() as ApiResponse<JournalDto[]>;

    return {
      success: true,
      data: result.data,
    }
  }

  public async create(journal: JournalDto): Promise<ApiResponse<JournalDto>> {
    const response = await fetch(`${this.baseUrl}/journals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authModule.getAccessToken()}`,
      },
      body: JSON.stringify(journal),
    });

    if (!response.ok) {
      throw new Error(`Error creating journal: ${response.statusText}`);
    }

    const result = await response.json() as ApiResponse<JournalDto>;

    return {
      success: true,
      data: result.data,
    }
  }
}

