export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserRegisterDto {
  id?: string,
  email: string;
  password: string;
}
