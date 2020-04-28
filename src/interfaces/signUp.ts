export interface Request {
  email?: string;
  password?: string;
}

export interface SuccessResponse {
  UserConfirmed: boolean;
}

export interface FailureResponse {
  message: string;
  code: string;
}
