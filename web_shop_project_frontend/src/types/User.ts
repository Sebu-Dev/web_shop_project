export interface UserType {
  id: number;
  username: string;
  email: string;
  adress: string;
  role?: string;
}
export interface LoginResponse {
  user: UserType;
  accessToken: string;
  refreshToken: string;
}
