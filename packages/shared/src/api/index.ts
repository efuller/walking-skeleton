import { AppConfig } from 'web/src/shared/appConfig';
import { AuthModule } from 'web/src/modules/auth/auth.module';
import { MembersApi, MembersApiClient } from '@efuller/shared/src/api/membersApi';
import { MockMembersApiClient } from '@efuller/shared/src/api/membersApi.mock';
import { JournalsApi, JournalsApiClient } from '@efuller/shared/src/api/journalsApi';
import { MockJournalsApiClient } from '@efuller/shared/src/api/journalsApi.mock';

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: Error | false;
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