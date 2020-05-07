import express, { Request, Response } from 'express';
import { signUp } from '../services/cognito';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { password, email } = req.body || {};

  signUp({ password, email})
    .then(data => res.send(data))
    .catch(error => res.status(error.statusCode).send(error));
});

export default router;