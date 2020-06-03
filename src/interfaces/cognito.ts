export interface GeneralError {
  message: string;
  code: string;
  statusCode: number;
}

export interface ConfirmSignUpRequest {
  email?: string;
  confirmationCode?: string;
}

export interface GetAdminUserRequest {
  email?: string;
}

export interface SignUpRequest {
  email?: string;
  password?: string;
  phoneNumber?: string;
}

export interface GetTokenRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface GetUserRequest {
  accessToken: string;
}