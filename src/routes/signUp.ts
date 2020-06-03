import express, { Request, Response } from 'express';
import { signUp } from '../services/cognito';
import { defaultErrorHandler } from '../utils/helpers';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { password, phoneNumber, email } = req.body || {};

  signUp({ password, phoneNumber, email})
    .then(data => res.send(data))
    .catch((error) => defaultErrorHandler(res, error));
});

export default router;