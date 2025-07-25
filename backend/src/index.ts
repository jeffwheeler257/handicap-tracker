import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './Routes/health.router';
import dotenv from 'dotenv';
import { connectToDb } from './db';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true,
}));

app.use('/', router)

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();