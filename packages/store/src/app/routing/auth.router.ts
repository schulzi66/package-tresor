import express, { Response } from 'express';
import { Auth } from '../common/auth';

import { TypedRequestBody } from '../common/typed-request-body';
import { User } from '../common/user';
import * as UserService from '../services/user.service';

export const authRouter = express.Router();

authRouter.post('/register', async (req: TypedRequestBody<Auth>, res: Response) => {
  try {
      console.log(req.body);
    const newUser: User = await UserService.registerUser(req.body.name, req.body.password);

    res.status(201).send(JSON.stringify(newUser));
  } catch (error) {
    res.status(409).send(JSON.stringify(error));
  }
});
