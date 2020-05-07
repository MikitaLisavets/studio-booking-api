import express, { Request, Response } from 'express';
import { getUser, refreshTokens } from '../services/cognito';
import { InitiateAuthResponse, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import convertAttributesToUser from '../utils/convertAttributesToUser';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { token } = req.body || {};

  refreshTokens({ refreshToken: token })
    .then((tokens: InitiateAuthResponse) => getUser({ accessToken: tokens.AuthenticationResult?.AccessToken })
      .then((data: GetUserResponse) => {
        res.send({
          user: convertAttributesToUser(data.UserAttributes),
          token: token
        });
      })
      .catch(error => res.status(error.statusCode).send(error)))
    .catch(error => res.status(error.statusCode).send(error));
});

export default router;
