import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './Routes/health.router';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true,
}));

const port = parseInt(process.env.PORT || "3000", 10);

app.use('/', router)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});