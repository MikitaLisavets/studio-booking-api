import express, { Request, Response } from 'express';
import { confirmSignUp, getToken, getUser } from '../services/cognito';
import { InitiateAuthResponse, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import convertAttributesToUser, { User } from '../utils/convertAttributesToUser';
import { COOKIE_TOKEN, MAX_COOKIE_AGE } from '../constants';
import { defaultErrorHandler } from '../utils/helpers';
import { putUserToDB } from '../services/usersDB';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { confirmationCode, password, email } = req.body || {};
  let user: User;
  let refreshToken: string;

  confirmSignUp({ confirmationCode, email})
    .then(() => getToken({ email, password }))
    .then((tokens: InitiateAuthResponse) => {
      refreshToken = tokens.AuthenticationResult?.RefreshToken;
      return getUser({ accessToken: tokens.AuthenticationResult?.AccessToken });
    })
    .then((data: GetUserResponse) => {
      user = convertAttributesToUser(data.UserAttributes);
      return putUserToDB(data.Username, user);
    })
    .then(() => {
      res.cookie(COOKIE_TOKEN, refreshToken, { httpOnly: true, maxAge: MAX_COOKIE_AGE });
      res.send({ user });
    })
    .catch((error) => defaultErrorHandler(res, error));
});

export default router;