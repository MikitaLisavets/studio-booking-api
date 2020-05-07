import express, { Request, Response } from 'express';
import { getAdminUser } from '../services/cognito';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  const { email } = req.body || {};

  getAdminUser({ email})
    .then(data => res.send(data))
    .catch(error => res.status(error.statusCode).send(error));
});

export default router;