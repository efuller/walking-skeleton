import { MemberDto } from '@efuller/shared/src/modules/members/commands';

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: Error | false;
}

export interface MembersApi {
  getMemberByEmail(email: string): Promise<ApiResponse<MemberDto | null>>;
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

class MembersApiClient implements MembersApi {
  constructor(private readonly baseUrl: string) {}

  public async getMemberByEmail(email: string): Promise<ApiResponse<MemberDto | null>> {
    const response = await fetch(`${this.baseUrl}/members/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
  }
}

export class ClientApi {
  public app: AppApiClient;

  private constructor(
    private readonly context: 'test' | 'production' = 'production',
    app: AppApiClient
  ) {
    this.app = app;
  }

  public static create(baseUrl: string, context: 'test' | 'production' = 'production'): ClientApi {
    if (context === 'test') {
      const members = new MockMembersApiClient(baseUrl);
      const api = {
        app: {
          members
        }
      }
      return new ClientApi(context, api);
    }

    const members = new MembersApiClient(baseUrl);

    const api = {
      app: {
        members
      }
    }
    return new ClientApi(context, api);
  }
}