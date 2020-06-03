import express, { Request, Response } from 'express';
import { getAdminUser } from '../services/cognito';
import { AWSError } from 'aws-sdk';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { email } = req.body || {};

  function errorHandler(error: AWSError): void {
    res.status(error.statusCode);
    res.send(error);
  }

  getAdminUser({ email})
    .then(data => res.send(data))
    .catch(errorHandler);
});

export default router;