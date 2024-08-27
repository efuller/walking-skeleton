import { UserRegisterDto } from '@efuller/shared/src/modules/auth/auth.dto';

export class UserBuilder {
  private userProps: UserRegisterDto ;

  constructor() {
    this.userProps = {
      email: '',
      password: '',
    };
  }

  withRandomEmail() {
    this.userProps.email = `test-email-${Math.random().toString(36).substring(7)}@test.com`;
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