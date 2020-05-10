import express, { Request, Response } from 'express';
import { COOKIE_TOKEN } from '../constants';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
  res.clearCookie(COOKIE_TOKEN).send();
});

export default router;
