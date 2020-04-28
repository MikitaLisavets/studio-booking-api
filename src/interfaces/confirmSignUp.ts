export interface ConfirmSignUpRequest {
  email?: string;
  confirmationCode?: string;
}

export interface ConfirmSignUpSuccessResponse {
  success: boolean;
}

export interface ConfirmSignUpFailureResponse {
  message: string;
  code: string;
}
