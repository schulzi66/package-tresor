import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { tresorRouter } from './app/tresor.router';
import { errorHandler } from './app/middleware/error.middleware';
import { notFoundHandler } from './app/middleware/not-found.middleware';

dotenv.config();

if (!process.env['PORT']) {
  process.exit(1);
}

const PORT: number = parseInt(process.env['PORT'] as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/tresor', tresorRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
