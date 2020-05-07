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