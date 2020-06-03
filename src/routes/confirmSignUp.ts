import express, { Request, Response } from 'express';
import { confirmSignUp, getToken, getUser } from '../services/cognito';
import { InitiateAuthResponse, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import convertAttributesToUser from '../utils/convertAttributesToUser';
import { COOKIE_TOKEN, MAX_COOKIE_AGE } from '../constants';
import { defaultErrorHandler } from '../utils/helpers';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { confirmationCode, password, email } = req.body || {};

  confirmSignUp({ confirmationCode, email})
    .then(() => getToken({ email, password })
      .then((tokens: InitiateAuthResponse) => getUser({ accessToken: tokens.AuthenticationResult?.AccessToken })
        .then((data: GetUserResponse) => {
          res.cookie(COOKIE_TOKEN, tokens.AuthenticationResult?.RefreshToken, { httpOnly: true, maxAge: MAX_COOKIE_AGE });
          res.send({
            user: convertAttributesToUser(data.UserAttributes)
          });
        })
        .catch((error) => defaultErrorHandler(res, error)))
      .catch((error) => defaultErrorHandler(res, error)))
    .catch((error) => defaultErrorHandler(res, error));
});

export default router;