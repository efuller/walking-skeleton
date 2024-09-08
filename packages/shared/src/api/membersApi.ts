import { AuthModule } from 'web/src/modules/auth/auth.module';
import { MemberDto } from '@efuller/shared/src/modules/members/commands';
import { ApiResponse } from '@efuller/shared/src/api/index';

export interface MembersApi {
  getMemberByEmail(email: string): Promise<ApiResponse<MemberDto | null>>;
}

export class MembersApiClient implements MembersApi {
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
