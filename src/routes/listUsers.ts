import express, { Request, Response } from 'express';
import { listUsers } from '../services/cognito';
import { defaultErrorHandler } from '../utils/helpers';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  listUsers()
    .then((data) => res.send(data))
    .catch((error) => defaultErrorHandler(res, error));
});

export default router;