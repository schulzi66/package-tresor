import express, {Response } from 'express';
import { TypedRequestBody } from '../common/typed-request-body';
import * as StoreService from '../services/store.service';

export const storeRouter = express.Router();

storeRouter.get('/', async (_req: TypedRequestBody<{id: string}>, res: Response) => {
  const packages: string[] = await StoreService.findAll();
  res.status(200).send(packages);
});

storeRouter.post('/', async (req: TypedRequestBody<{userName:string, package: string}>, res: Response) => {
  console.log(req.body.userName, req.body.package);

  const pack: string = await StoreService.addPackage(req.body.package);

  res.status(201).send(pack);
});
