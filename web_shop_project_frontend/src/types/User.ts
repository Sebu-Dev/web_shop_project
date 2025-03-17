// src/types/User.ts
export interface UserType {
  id: number;
  username: string;
  email: string;
  adress: string;
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
  adress: string;
}

export interface LoginResponse {
  user: UserType;
  accessToken: string;
  refreshToken: string;
}
