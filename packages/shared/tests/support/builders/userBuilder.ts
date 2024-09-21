import { v4 as uuidv4 } from 'uuid';
import { UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';

export class UserBuilder {
  private userProps: UserRegisterDto;

  constructor() {
    this.userProps = {
      id: '',
      email: '',
      password: '',
    };
  }

  withRandomEmail() {
    this.userProps.email = `test-email-${Math.random().toString(36).substring(7)}@test.com`;
    return this;
  }

  withId(id: string = ''): UserBuilder {
    if (!id) {
      id = uuidv4();
    }

    this.userProps.id = id;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.userProps.email = email;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.userProps.password = password;
    return this;
  }

  build(): UserRegisterDto {
    return this.userProps;
  }
}