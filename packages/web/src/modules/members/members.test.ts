import { MembersPresenter } from './members.presenter';
import { CompositionRoot } from '@/shared/compositionRoot';
import { AppConfig } from '@/shared/appConfig';
import { AppApiClient } from '@efuller/shared/src/api';

describe('Members', () => {
  let membersPresenter: MembersPresenter;
  let compositionRoot: CompositionRoot;
  let clientApi: AppApiClient;
  const appConfig = new AppConfig({
    environment: 'test',
    script: 'test-unit',
  });

  beforeEach(async () => {
    compositionRoot = await CompositionRoot.create(appConfig);
    membersPresenter = compositionRoot.getMembersModule().getMembersPresenter();
    clientApi = compositionRoot.getClientApi();
  });

  it('should be able to load member details by email address', async () => {
    await clientApi.app.members.getMemberByEmail('test@test.com');

    expect(membersPresenter.viewModel.email).toBe('');

    await membersPresenter.loadMember('test@test.com');

    expect(membersPresenter.viewModel.email).toBe('test@test.com');
  });
});

// function whenPromise(condition: () => boolean) {
//   return new Promise((resolve) => {
//     when(condition, () => resolve(true))
//   })
// }