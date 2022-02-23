import express, { Response } from 'express';
import { TypedRequestBody } from '../common/typed-request-body';
import * as StoreService from '../services/store.service';

export const storeRouter = express.Router();

storeRouter.get('/', async (_req: TypedRequestBody<{ userId: string }>, res: Response) => {
  const packages: string[] = await StoreService.findAll();
  res.status(200).send(packages);
});

storeRouter.post('/', async (req: TypedRequestBody<{ userId: string; packageName: string }>, res: Response) => {
  console.log(req.body.userId, req.body.packageName);

  const pack: string = await StoreService.addPackage(req.body.packageName);

  res.status(201).send(true);
});
