import { v4 as uuidv4 } from 'uuid';
import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';

export class MemberBuilder {
  private memberProps: CreateMemberCommand;

  constructor() {
    this.memberProps = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
    };
  }

  withId(id: string = ''): MemberBuilder {
    if (!id) {
      id = uuidv4();
    }
    this.memberProps.id = id;
    return this;
  }

  withRandomEmail() {
    this.memberProps.email = `test-email-${Math.random().toString(36).substring(7)}@test.com`;
    return this;
  }

  withFirstName(firstName: string): MemberBuilder {
    this.memberProps.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): MemberBuilder {
    this.memberProps.lastName = lastName;
    return this;
  }

  withEmail(email: string): MemberBuilder {
    this.memberProps.email = email;
    return this;
  }

  build(): CreateMemberCommand {
    return this.memberProps;
  }
}