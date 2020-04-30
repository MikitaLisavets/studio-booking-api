export interface ConfirmSignUpRequest {
  email?: string;
  confirmationCode?: string;
}

export interface GetUserRequest {
  email?: string;
}

export interface SignUpRequest {
  email?: string;
  password?: string;
}
