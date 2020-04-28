import express, { Request, Response } from 'express';
import { confirmSignUp } from '../services/cognito';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { confirmationCode, email } = req.body || {};

  confirmSignUp({ confirmationCode, email})
    .then(data => res.send(data))
    .catch(error => res.status(500).send({ error }));
});

export default router;