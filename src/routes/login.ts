import express, { Request, Response } from 'express';
import { getToken, getUser } from '../services/cognito';
import { InitiateAuthResponse, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import convertAttributesToUser from '../utils/convertAttributesToUser';
import { COOKIE_TOKEN, MAX_COOKIE_AGE } from '../constants';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  getToken({ email, password })
    .then((tokens: InitiateAuthResponse) => getUser({ accessToken: tokens.AuthenticationResult?.AccessToken })
      .then((data: GetUserResponse) => {
        res.cookie(COOKIE_TOKEN, tokens.AuthenticationResult?.RefreshToken, { httpOnly: true, maxAge: MAX_COOKIE_AGE })
          .send({
            user: convertAttributesToUser(data.UserAttributes),
          });
      })
      .catch(error => res.status(error.statusCode).send(error)))
    .catch(error => res.status(error.statusCode).send(error));
});

export default router;