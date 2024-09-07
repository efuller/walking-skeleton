import { MemberDto } from '@efuller/shared/src/modules/members/commands';
import { AppConfig } from 'web/src/shared/appConfig';
import { AuthModule } from 'web/src/modules/auth/auth.module';
import { CreateJournalDto, JournalDto } from '@efuller/api/src/modules/journals/journal.dto';

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: Error | false;
}

export interface JournalsApi {
  create(journal: CreateJournalDto): Promise<ApiResponse<JournalDto>>;
  getJournals(): Promise<ApiResponse<JournalDto[]>>;
}

export interface MembersApi {
  getMemberByEmail(email: string): Promise<ApiResponse<MemberDto | null>>;
}

class MockJournalsApiClient implements JournalsApi {
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

class MockMembersApiClient implements MembersApi {
  constructor(private readonly baseUrl: string) {}

  public async getMemberByEmail(email: string): Promise<ApiResponse<MemberDto | null>> {
    return {
      success: true,
      data: {
        id: '1',
        userId: '123',
        email: email,
        firstName: 'Test',
        lastName: 'User',
        updatedAt: new Date().toString(),
        createdAt: new Date().toString(),
      }
    }
  }
}

class JournalsApiClient implements JournalsApi {
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

class MembersApiClient implements MembersApi {
  constructor(
    private readonly baseUrl: string,
    private readonly authModule: AuthModule
  ) {}

  public async getMemberByEmail(email: string): Promise<ApiResponse<MemberDto | null>> {
    const response = await fetch(`${this.baseUrl}/members/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authModule.getAccessToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching member by email: ${response.statusText}`);
    }

    const result = await response.json() as ApiResponse<MemberDto | null>;

    if (!result) {
      return {
        success: false,
        data: null
      }
    }

    const memberDto = {
      id: result.data!.id,
      userId: result.data!.userId || '',
      email: result.data!.email,
      firstName: result.data!.firstName || '',
      lastName: result.data!.lastName || '',
      updatedAt: result.data!.updatedAt,
      createdAt: result.data!.createdAt
    }

    return {
      success: true,
      data: memberDto,
    }
  }
}

export interface AppApiClient {
  app: {
    members: MembersApi;
    journals: JournalsApi;
  }
}

export class ClientApi {
  public app: AppApiClient;

  private constructor(
    private readonly config: AppConfig,
    app: AppApiClient,
    private readonly authModule: AuthModule,
  ) {
    this.app = app;
  }

  public static create(baseUrl: string, config: AppConfig, authModule: AuthModule): ClientApi {
    if (config.useMocks()) {
      const members = new MockMembersApiClient(baseUrl);
      const journals = new MockJournalsApiClient(baseUrl);
      const api = {
        app: {
          members,
          journals
        }
      }
      return new ClientApi(config, api, authModule);
    }

    const members = new MembersApiClient(baseUrl, authModule);
    const journals = new JournalsApiClient(baseUrl, authModule);

    const api = {
      app: {
        members,
        journals
      }
    }
    return new ClientApi(config, api, authModule);
  }
}