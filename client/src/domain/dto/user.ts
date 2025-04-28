export interface SignupUser {
  email: string;
  name: string;
  password: string;
}

export interface SignupUserRes {
  user: SignupUser | undefined;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface LoginUserRes {
  user: LoginUser | undefined;
}
