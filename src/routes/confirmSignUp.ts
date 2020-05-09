import express, { Request, Response } from 'express';
import { confirmSignUp, getToken, getUser } from '../services/cognito';
import { InitiateAuthResponse, GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import convertAttributesToUser from '../utils/convertAttributesToUser';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { confirmationCode, password, email } = req.body || {};

  confirmSignUp({ confirmationCode, email})
    .then(() => getToken({ email, password })
      .then((tokens: InitiateAuthResponse) => getUser({ accessToken: tokens.AuthenticationResult?.AccessToken })
        .then((data: GetUserResponse) => {
          res.send({
            user: convertAttributesToUser(data.UserAttributes),
            token: tokens.AuthenticationResult?.RefreshToken
          });
        })
        .catch(error => res.status(error.statusCode).send(error)))
      .catch(error => res.status(error.statusCode).send(error)))
    .catch(error => res.status(error.statusCode).send(error));
});

export default router;