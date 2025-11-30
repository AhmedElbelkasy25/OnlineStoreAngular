export interface ILoginResponse {
  message: string;
  errors: string[];
  token: string;
  refreshToken: string;
}
