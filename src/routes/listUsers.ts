import express, { Request, Response } from 'express';
import { listUsers } from '../services/cognito';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  listUsers()
    .then((data) => res.send(data))
    .catch(error => res.status(500).send(error));
});

export default router;