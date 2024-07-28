import { CreateMemberCommand } from '@efuller/shared/src/modules/members/commands';

export class MemberBuilder {
  private memberProps: CreateMemberCommand;

  constructor() {
    this.memberProps = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
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

  withPassword(password: string): MemberBuilder {
    this.memberProps.password = password;
    return this;
  }

  build(): CreateMemberCommand {
    return this.memberProps;
  }
}