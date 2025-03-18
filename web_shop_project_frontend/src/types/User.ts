// src/types/User.ts
export interface UserType {
  id: number;
  username: string;
  email: string;
  address: string;
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
  address: string;
}

export interface LoginResponse {
  user: UserType;
  accessToken: string;
  refreshToken: string;
}

export interface UpdateUserType extends UserType {
  password?: string;
}
