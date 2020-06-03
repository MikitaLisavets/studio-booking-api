import express, { Request, Response } from 'express';
import { listUsers } from '../services/cognito';
import { AWSError } from 'aws-sdk';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  function errorHandler(error: AWSError): void {
    res.status(error.statusCode);
    res.send(error);
  }

  listUsers()
    .then((data) => res.send(data))
    .catch(errorHandler);
});

export default router;