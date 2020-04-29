import express, { Request, Response } from 'express';
import { listUsers } from '../services/cognito';
import { ListUsersResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  listUsers()
    .then((data: ListUsersResponse) => res.send(data.Users))
    .catch(error => res.status(500).send({ error }));
});

export default router;