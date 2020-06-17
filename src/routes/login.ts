import express, { Request, Response } from 'express';
import { getToken, getUser } from '../services/cognito';
import { InitiateAuthResponse, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import convertAttributesToUser from '../utils/convertAttributesToUser';
import { COOKIE_TOKEN, MAX_COOKIE_AGE } from '../constants';
import { defaultErrorHandler } from '../utils/helpers';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  let refreshToken: string;

  getToken({ email, password })
    .then((tokens: InitiateAuthResponse) => {
      refreshToken = tokens.AuthenticationResult?.RefreshToken;
      return getUser({ accessToken: tokens.AuthenticationResult?.AccessToken });
    })
    .then((data: GetUserResponse) => {
      res.cookie(COOKIE_TOKEN, refreshToken, { httpOnly: true, maxAge: MAX_COOKIE_AGE });
      res.send({
        user: convertAttributesToUser(data.UserAttributes),
      });
    })
    .catch((error) => defaultErrorHandler(res, error));
});

export default router;
