import express, { Request, Response } from 'express';
import { getUser, refreshTokens } from '../services/cognito';
import { InitiateAuthResponse, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { COOKIE_TOKEN, UNAUTHORIZED_ERROR, MAX_COOKIE_AGE } from '../constants';
import { defaultErrorHandler } from '../utils/helpers';
import { convertCognitoAttributesToUser, User, convertDBAttributesToUser } from '../utils/user';
import { getUserFromDB } from '../services/usersDB';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(UNAUTHORIZED_ERROR.statusCode);
    return defaultErrorHandler(res, UNAUTHORIZED_ERROR);
  }
  
  res.clearCookie(COOKIE_TOKEN);

  refreshTokens({ refreshToken: token })
    .then((tokens: InitiateAuthResponse) => getUser({ accessToken: tokens.AuthenticationResult?.AccessToken }))
    .then((cognitoUser: GetUserResponse) => convertCognitoAttributesToUser(cognitoUser.UserAttributes))
    .then((user: User) => getUserFromDB(user.ID))
    .then((data: GetItemOutput) => {
      res.cookie(COOKIE_TOKEN, token, { httpOnly: true, maxAge: MAX_COOKIE_AGE });
      res.send({
        user: convertDBAttributesToUser(data.Item),
      });
    })
    .catch((error) => defaultErrorHandler(res, error));
});

export default router;
