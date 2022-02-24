import express, { Response } from 'express';
import { Auth } from '../common/auth';
import { TypedRequestBody } from '../common/typed-request-body';
import { User } from '../common/user';
import * as UserService from '../services/user.service';

export const authRouter = express.Router();

authRouter.post('/register', async (req: TypedRequestBody<Auth>, res: Response) => {
  try {
    const newUser: User = await UserService.registerUser(req.body.name, req.body.password);

    res.status(201).send(JSON.stringify(newUser));
  } catch (error) {
    res.status(409).send(JSON.stringify(error));
  }
});

authRouter.post('/login', async (req: TypedRequestBody<Auth>, res: Response) => {
  try {
    const user: User = await UserService.loginUser(req.body.name, req.body.password);

    res.status(200).send(JSON.stringify(user));
  } catch (error) {
    res.status(500).send(JSON.stringify(error));
  }
});
