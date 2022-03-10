import { Request, Response, NextFunction } from 'express';
import { User } from '../common/user';
import { findUserById } from '../services/user.service';

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.header('Auth');

  if (!authHeader) {
    sendUnauthorized(res);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userHeader: User = JSON.parse(authHeader!);

  if (
    !userHeader ||
    ((req.method === 'POST' || req.method === 'DELETE') && userHeader.id !== req.body.userId) ||
    (req.method === 'GET' && userHeader.id !== req.query['userId'])
  ) {
    sendUnauthorized(res);
  }

  const foundUser: User | undefined = findUserById(userHeader.id, userHeader.password);

  if (!foundUser) {
    sendUnauthorized(res);
  } else {
    next();
  }
};

const sendUnauthorized = (res: Response) => res.status(401).send('Unauthorized');
