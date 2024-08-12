import { MembersPresenter } from './members.presenter';
import { CompositionRoot } from '@/shared/compositionRoot';
import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';
import { MemberBuilder } from '@efuller/shared/tests/support/builders/memberBuilder.ts';
import { MembersController } from '@/modules/members/members.controller.ts';
import { when } from 'mobx';

describe('Members', () => {
  let membersPresenter: MembersPresenter;
  let membersController: MembersController;
  let compositionRoot: CompositionRoot;
  let createMemberCommand: CreateMemberCommand;

  beforeEach(async () => {
    compositionRoot = await CompositionRoot.create('test');
    membersPresenter = compositionRoot.getMembersModule().getMembersPresenter();
    membersController = compositionRoot.getMembersModule().getMembersController();
  });

  it('should be able to access a members email address', async () => {
    createMemberCommand = new MemberBuilder()
      .withEmail('test@test.com')
      .withFirstName('John')
      .withLastName('Doe')
      .withId()
      .build();

    expect(membersPresenter.viewModel.email).toBe('');

    await membersController.createMember(createMemberCommand);

    await whenPromise(() => membersPresenter.viewModel.email !== '');
    expect(membersPresenter.viewModel.email).toBe('test@test.com');
  });
});

function whenPromise(condition: () => boolean) {
  return new Promise((resolve) => {
    when(condition, () => resolve(true))
  })
}