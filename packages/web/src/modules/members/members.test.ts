import { MembersPresenter } from './members.presenter';
import { CompositionRoot } from '@/shared/compositionRoot';

describe('Members', () => {
  let membersPresenter: MembersPresenter;
  let compositionRoot: CompositionRoot;

  beforeEach(async () => {
    compositionRoot = await CompositionRoot.create('test');
    membersPresenter = compositionRoot.getMembersModule().getMembersPresenter();
  });

  it('should populate members email after successful login', async () => {
    expect(membersPresenter.viewModel.email).toBe('test@test.com');
  });
});