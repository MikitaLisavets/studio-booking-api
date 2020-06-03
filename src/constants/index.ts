import { GeneralError } from '../interfaces/cognito';

export const COOKIE_TOKEN = 'token';
export const MAX_COOKIE_AGE = 1000 * 3600 * 24 * 30;
export const UNAUTHORIZED_ERROR: GeneralError  = {
  message: 'Unauthorized error',
  code: 'unauthorized',
  statusCode: 401
};
