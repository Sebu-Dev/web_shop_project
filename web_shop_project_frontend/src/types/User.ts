// src/types/User.ts
export interface UserType {
  id: number;
  username: string;
  email: string;
  address: string;
  role: 'USER' | 'ADMIN';
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
  address: string;
}

export interface UpdateUserType extends UserType {
  currentPassword?: string;
  newPassword?: string;
}
