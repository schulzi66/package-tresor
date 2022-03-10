import { authRouter } from './app/routing/auth.router';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { storeRouter } from './app/routing/store.router';
import { errorHandler } from './app/middleware/error.middleware';
import { notFoundHandler } from './app/middleware/not-found.middleware';
import { validateUser } from './app/middleware/auth.middleware';

dotenv.config();

if (!process.env['PORT']) {
  process.exit(1);
}

const PORT: number = parseInt(process.env['PORT'] as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/store', validateUser, storeRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
