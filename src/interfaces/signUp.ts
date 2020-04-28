export interface SignUpRequest {
  email?: string;
  password?: string;
}

export interface SignUpSuccessResponse {
  UserConfirmed: boolean;
}

export interface SignUpFailureResponse {
  message: string;
  code: string;
}
