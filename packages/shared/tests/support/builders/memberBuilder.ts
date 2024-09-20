import { v4 as uuidv4 } from 'uuid';
import { CreateMemberDto } from '@efuller/shared/src/modules/members/members.dto';
import { UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';

export class MemberBuilder {
  private memberProps: CreateMemberDto;

  constructor() {
    this.memberProps = {
      id: '',
      userId: '',
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

  withUserId(id: string = ''): MemberBuilder {
    if (!id) {
      id = uuidv4();
    }
    this.memberProps.userId = id;
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

  fromUser(user: UserRegisterDto): MemberBuilder {
    this.withId();
    this.withUserId(user.id);
    this.memberProps.email = user.email;

    return this;
  }

  toDto(): CreateMemberDto {
    return this.memberProps;
  }

  build(): CreateMemberDto {
    return this.memberProps;
  }
}