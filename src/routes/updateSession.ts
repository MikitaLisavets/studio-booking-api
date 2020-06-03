import express, { Request, Response } from 'express';
import { getUser, refreshTokens } from '../services/cognito';
import { InitiateAuthResponse, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import convertAttributesToUser from '../utils/convertAttributesToUser';
import { COOKIE_TOKEN, UNAUTHORIZED_ERROR, MAX_COOKIE_AGE } from '../constants';
import { AWSError } from 'aws-sdk';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) return res.status(UNAUTHORIZED_ERROR.statusCode).send(UNAUTHORIZED_ERROR);

  function errorHandler(error: AWSError): void {
    res.clearCookie(COOKIE_TOKEN);
    res.status(error.statusCode);
    res.send(error);
  }

  refreshTokens({ refreshToken: token })
    .then((tokens: InitiateAuthResponse) => getUser({ accessToken: tokens.AuthenticationResult?.AccessToken })
      .then((data: GetUserResponse) => res.cookie(COOKIE_TOKEN, token, { httpOnly: true, maxAge: MAX_COOKIE_AGE }).send({
        user: convertAttributesToUser(data.UserAttributes)
      }))
      .catch(errorHandler))
    .catch(errorHandler);
});

export default router;
