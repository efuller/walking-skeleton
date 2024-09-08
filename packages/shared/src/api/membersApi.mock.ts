import { MemberDto } from '@efuller/shared/src/modules/members/commands';
import { ApiResponse, MembersApi } from '@efuller/shared/src/api/index';

export class MockMembersApiClient implements MembersApi {
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

