import express, { Request, Response } from 'express';
import { getUser } from '../services/cognito';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { email } = req.body || {};

  getUser({ email})
    .then(data => res.send(data))
    .catch(error => res.status(500).send(error));
});

export default router;