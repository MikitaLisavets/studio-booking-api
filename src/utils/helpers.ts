import { Response } from 'express';
import { AWSError } from 'aws-sdk';
import { GeneralError } from '../interfaces/cognito';

export function defaultErrorHandler(res: Response, error: AWSError | GeneralError): void {
  res.status(error.statusCode);
  res.send(error);
}