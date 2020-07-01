import express, { Request, Response } from 'express';
import { getToken, getUser } from '../services/cognito';
import { InitiateAuthResponse, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { COOKIE_TOKEN, MAX_COOKIE_AGE } from '../constants';
import { defaultErrorHandler } from '../utils/helpers';
import { getUserFromDB } from '../services/usersDB';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { convertDBAttributesToUser, convertCognitoAttributesToUser, User } from '../utils/user';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  let refreshToken: string;

  getToken({ email, password })
    .then((tokens: InitiateAuthResponse) => {
      refreshToken = tokens.AuthenticationResult?.RefreshToken;
      return getUser({ accessToken: tokens.AuthenticationResult?.AccessToken });
    })
    .then((cognitoUser: GetUserResponse) => convertCognitoAttributesToUser(cognitoUser.UserAttributes))
    .then((user: User) => getUserFromDB(user.ID))
    .then((data: GetItemOutput) => {
      res.cookie(COOKIE_TOKEN, refreshToken, { httpOnly: true, maxAge: MAX_COOKIE_AGE });
      res.send({
        user: convertDBAttributesToUser(data.Item),
      });
    })
    .catch((error) => defaultErrorHandler(res, error));
});

export default router;
