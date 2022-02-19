import express, { Request, Response } from 'express';

export const tresorRouter = express.Router();

tresorRouter.get('/', async (req: Request, res: Response) => {
  res.status(200).send('Blubber');
});
